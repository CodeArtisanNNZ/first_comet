(function () {
  "use strict";
  const el=document.getElementById("fcVisitorStats");
  if (!el) return;
  async function showVisitors() {
    try {
      const result=await fetch("/api/visitors",{method:"POST",credentials:"same-origin",cache:"no-store"});
      if (!result.ok) throw new Error("Stats API unavailable");
      const stats=await result.json();
      if (!Number.isSafeInteger(stats.opens)||!Number.isSafeInteger(stats.uniqueBrowsers)) throw new Error("Invalid counters");
      el.textContent="Page opens: "+stats.opens.toLocaleString()+" · Unique browsers: "+stats.uniqueBrowsers.toLocaleString();
      el.title="Counts start from deployment of this counter. Unique means a browser retaining the same first-party cookie, not verified individuals.";
    } catch (_) {
      el.textContent="Visitor stats unavailable";
      el.title="The shared counter requires the Cloudflare Worker and Durable Object to be deployed.";
    }
  }
  showVisitors();
})();
