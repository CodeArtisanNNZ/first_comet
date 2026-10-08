import { DurableObject } from "cloudflare:workers";

// Runs in Cloudflare Workers alongside the static First Comet site.
// A Durable Object stores page opens + browser IDs, not personal identities.
const JSON_HEADERS = {"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"};
const VISITOR_COOKIE = "fc_visitor";
const SAFE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class VisitorCounter extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS opens (id INTEGER PRIMARY KEY, total INTEGER NOT NULL DEFAULT 0)");
    this.sql.exec("INSERT OR IGNORE INTO opens (id, total) VALUES (1, 0)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS browsers (token TEXT PRIMARY KEY, first_seen INTEGER NOT NULL)");
  }

  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== "/stats") return new Response("Not found", {status:404});
    if (request.method === "POST") {
      const token = request.headers.get("x-private-visitor-token") || "";
      if (!SAFE_ID.test(token)) return new Response("Invalid visitor", {status:400});
      // These synchronous statements are serialized by the Durable Object.
      this.sql.exec("INSERT OR IGNORE INTO browsers (token, first_seen) VALUES (?, ?)", token, Date.now());
      this.sql.exec("UPDATE opens SET total = total + 1 WHERE id = 1");
    } else if (request.method !== "GET") {
      return new Response("Method not allowed", {status:405});
    }
    const opens = this.sql.exec("SELECT total FROM opens WHERE id=1").one().total;
    const unique = this.sql.exec("SELECT COUNT(*) AS total FROM browsers").one().total;
    return new Response(JSON.stringify({opens,uniqueBrowsers:unique}),{headers:JSON_HEADERS});
  }
}

function getCookie(cookieString, name) {
  const match = cookieString.split(";").map(part=>part.trim()).find(part=>part.startsWith(name+"="));
  return match ? match.slice(name.length+1) : "";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/visitors") {
      if (request.method !== "GET" && request.method !== "POST") return new Response("Method not allowed",{status:405,headers:{"allow":"GET, POST"}});
      if (request.method === "POST" && request.headers.get("origin") && request.headers.get("origin") !== url.origin) {
        return new Response("Cross-origin counting is not allowed",{status:403});
      }
      if (!env.VISITOR_COUNTER) return new Response(JSON.stringify({error:"Counter storage not configured"}),{status:503,headers:JSON_HEADERS});
      let visitor = getCookie(request.headers.get("cookie")||"",VISITOR_COOKIE);
      let fresh = false;
      if (!SAFE_ID.test(visitor)) {visitor=crypto.randomUUID();fresh=true;}
      const stub = env.VISITOR_COUNTER.get(env.VISITOR_COUNTER.idFromName("first-comet-public-site"));
      const internal = new Request("https://visitor.internal/stats",{
        method:request.method,
        headers:request.method==="POST"?{"x-private-visitor-token":visitor}:{}
      });
      const result = await stub.fetch(internal);
      const headers = new Headers(result.headers);
      headers.set("cache-control","no-store");
      if (fresh && request.method==="POST") {
        headers.append("set-cookie",VISITOR_COOKIE+"="+visitor+"; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly"+(url.protocol==="https:"?"; Secure":""));
      }
      return new Response(result.body,{status:result.status,headers});
    }
    if (url.pathname.startsWith("/api/")) return new Response(JSON.stringify({error:"Unknown API route"}),{status:404,headers:JSON_HEADERS});
    return env.ASSETS.fetch(request);
  }
};
