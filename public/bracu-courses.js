(() => {
  'use strict';

  const root = document.querySelector('#bracuCoursesApp');
  if (!root) return;

  const courses = [
    {code:'CSE110', title:'Programming Language I', area:'Programming', hp:'N/A', sp:'', focus:'Programming foundations, problem solving and introductory Java.', detailed:true},
    {code:'CSE111', title:'Programming Language 2', area:'Programming', hp:'CSE110', sp:'', focus:'Continue programming with more structured problem solving and program design.'},
    {code:'CSE220', title:'Data Structure', area:'Programming', hp:'CSE111', sp:'', focus:'Organise data efficiently using fundamental data structures.'},
    {code:'CSE221', title:'Algorithm Analysis & Design', area:'Theory', hp:'CSE220', sp:'', focus:'Design algorithms and reason about correctness and efficiency.'},
    {code:'CSE230', title:'Discrete Mathematics', area:'Theory', hp:'', sp:'', focus:'Mathematical foundations used throughout computer science.'},
    {code:'CSE250', title:'Circuits and Electronics', area:'Hardware', hp:'', sp:'PHY112', focus:'Circuit and electronics foundations for computer engineering.'},
    {code:'CSE251', title:'Electronic Devices and Circuits', area:'Hardware', hp:'CSE250', sp:'', focus:'Electronic devices and circuits used in computing systems.'},
    {code:'CSE260', title:'Digital Logic Design', area:'Hardware', hp:'CSE251', sp:'', focus:'Digital logic, combinational/sequential design and hardware reasoning.'},
    {code:'CSE320', title:'Data Communications', area:'Systems', hp:'N/A', sp:'', focus:'How digital data is transmitted across communication systems.'},
    {code:'CSE321', title:'Operating Systems', area:'Systems', hp:'CSE221', sp:'CSE340', focus:'Processes, memory, files, scheduling and operating-system concepts.'},
    {code:'CSE330', title:'Numerical Methods', area:'Theory', hp:'MAT216', sp:'', focus:'Numerical techniques for solving computational mathematics problems.'},
    {code:'CSE331', title:'Automata and Computability', area:'Theory', hp:'CSE221', sp:'', focus:'Formal languages, automata and the limits of computation.'},
    {code:'CSE340', title:'Computer Architecture', area:'Systems', hp:'CSE260', sp:'N/A', focus:'How processors, memory and computer hardware execute programs.'},
    {code:'CSE341', title:'Microprocessors', area:'Hardware', hp:'N/A', sp:'CSE340', focus:'Microprocessor architecture, programming and interfacing fundamentals.'},
    {code:'CSE350', title:'Digital Electronics and Pulse Techniques', area:'Hardware', hp:'CSE251', sp:'', focus:'Digital electronics, pulse circuits and related techniques.'},
    {code:'CSE360', title:'Computer Interfacing', area:'Hardware', hp:'CSE341', sp:'', focus:'Connect processors with peripherals, sensors and external hardware.'},
    {code:'CSE370', title:'Database', area:'Software & Data', hp:'CSE221', sp:'', focus:'Relational data modelling, SQL and database-system foundations.'},
    {code:'CSE400', title:'Final Year Design Project', area:'Capstone', hp:'', sp:'', focus:'Plan, build, document and present a substantial final-year project.'},
    {code:'CSE420', title:'Compiler Design', area:'Systems', hp:'CSE321, CSE331, CSE340', sp:'', focus:'How source code is analysed, translated and executed by compilers.'},
    {code:'CSE421', title:'Computer Networks', area:'Systems', hp:'', sp:'CSE320', focus:'Network architecture, protocols and communication between computers.'},
    {code:'CSE422', title:'Artificial Intelligence', area:'AI', hp:'CSE221', sp:'', focus:'Core artificial-intelligence concepts and problem-solving methods.'},
    {code:'CSE423', title:'Computer Graphics', area:'Creative Computing', hp:'MAT216', sp:'', focus:'Represent, transform and render visual objects with computation.'},
    {code:'CSE460', title:'VLSI Design', area:'Hardware', hp:'CSE260', sp:'', focus:'Very-large-scale integrated circuit design foundations.'},
    {code:'CSE461', title:'Introduction to Robotics', area:'Hardware', hp:'CSE260, CSE341, CSE360', sp:'', focus:'Combine sensing, control, hardware and computation in robotic systems.'},
    {code:'CSE470', title:'Software Engineering', area:'Software & Data', hp:'CSE370', sp:'', focus:'Requirements, design, development process, testing and team software work.'},
    {code:'CSE471', title:'System Analysis and Design', area:'Software & Data', hp:'CSE370', sp:'', focus:'Analyse requirements and design information/software systems.'}
  ];

  window.FC_BRACU_COURSES = courses;

  const courseOutlines = {
    CSE110: [
      ['Programming foundations','Problem solving, algorithms, flowcharts and how programs execute.'],
      ['Variables & data types','Values, variables, primitive types, operators and expressions.'],
      ['Input & output','Reading user input and displaying program output.'],
      ['Conditions','if, else-if, else and decision-making.'],
      ['Loops','for, while, repeated logic and tracing iterations.'],
      ['Strings','Text processing, indexing and common String operations.'],
      ['Arrays','Storing collections, traversing arrays and manipulating values.'],
      ['Sorting','Understanding how simple sorting algorithms rearrange data.'],
      ['Methods','Reusable blocks with parameters and return values.'],
      ['Recursion','Methods that solve a problem by calling themselves on a smaller version.'],
      ['File I/O','Reading from and writing to files.'],
      ['Debugging & complete programs','Finding errors, using an IDE and combining topics into small programs.']
    ],
    CSE111: [
      ['Collections','Fundamentals of collections and structured data.'],
      ['Functions & file I/O','Reusable functions plus reading from and writing to files.'],
      ['Procedural vs OOP','Why object-oriented design breaks larger problems into reusable modules.'],
      ['Classes & objects','Classes, objects, constructors, instance variables and methods.'],
      ['Encapsulation','Public, private and protected access; information hiding and class-level members.'],
      ['Inheritance','Reuse and extend behaviour through class hierarchies.'],
      ['Polymorphism','Use shared interfaces/behaviour across related object types.'],
      ['Abstract classes & methods','Define standards that subclasses must implement.'],
      ['Application design','Model real-world entities and build complete object-oriented applications.']
    ],
    CSE220: [
      ['Linear & circular arrays','Array representation, circular arrays and why they can outperform linear layouts in some structures.'],
      ['Linked lists','Construct and manipulate different linked-list forms.'],
      ['Stacks','LIFO behaviour, implementations and applications.'],
      ['Queues','FIFO behaviour, implementations and applications.'],
      ['Recursion','Build recursive models for small problems.'],
      ['Trees','Tree structures, terminology and core operations.'],
      ['Tree traversal','Traverse tree structures systematically.'],
      ['Searching','Use data structures to implement search procedures.'],
      ['Sorting','Implement and compare sorting algorithms using the learned structures.']
    ],
    CSE221: [
      ['Algorithm analysis','Correctness, performance bounds, asymptotic analysis, worst-case and average-case behaviour.'],
      ['Sorting, heaps & hashing','Core structures and algorithms used to organise and retrieve data efficiently.'],
      ['Divide and conquer','Split a problem into smaller independent subproblems and combine their solutions.'],
      ['Greedy algorithms','Make locally optimal choices and analyse when they produce a correct global result.'],
      ['Dynamic programming','Reuse overlapping subproblem results to solve optimisation problems.'],
      ['Backtracking','Explore candidate solutions and undo choices that cannot lead to a valid answer.'],
      ['Graph traversal','Breadth-first search and depth-first search.'],
      ['Graph algorithms','Shortest paths, minimum spanning trees and network flow.'],
      ['Computational geometry','Apply algorithm-design ideas to geometric problems.'],
      ['Number & matrix algorithms','GCD, primality, polynomial and matrix calculations.'],
      ['Lower bounds','Reason about how efficient any solution to a problem can be.'],
      ['NP-hard & NP-complete problems','Understand computational intractability and complexity classes.'],
      ['Elementary parallel algorithms','Introductory approaches to performing algorithmic work in parallel.']
    ],
    CSE230: [
      ['Counting principles','Rule of sum, product, subtraction, division and the pigeonhole principle.'],
      ['Combinatorics','Permutations, combinations, binomial coefficients and identities.'],
      ['Discrete probability','Probability theory, conditional probability and independence.'],
      ['Random variables','Distributions, expectation and variance.'],
      ['Bayes’ theorem','Probabilistic reasoning and updating beliefs from evidence.'],
      ['Propositional logic','Logic, proofs, puzzles, circuits, equivalences and satisfiability.'],
      ['Predicates & quantifiers','Formal statements involving variables and quantified claims.'],
      ['Number theory','Modular arithmetic, exponentiation, primes and the sieve algorithm.'],
      ['Cryptography foundations','Use number-theoretic ideas in cryptographic problems.'],
      ['Induction & recursion','Mathematical induction, recursive algorithms and correctness.'],
      ['Recurrence relations','Model and solve recursively defined quantities.'],
      ['Graphs','Graph models, terminology and selected graph algorithms.']
    ],
    CSE250: [
      ['Electrical quantities','Charge, voltage, current, resistance, energy and power.'],
      ['Circuit elements & sources','Resistors, capacitors, inductors and dependent/independent sources.'],
      ['Ohm, KCL & KVL','Use the fundamental laws governing linear electrical circuits.'],
      ['Series/parallel & divider rules','Reduce circuits and analyse voltage/current division.'],
      ['Nodal & mesh analysis','Systematically solve linear circuits.'],
      ['Circuit theorems','Source transformation, superposition, Thevenin, Norton and maximum power transfer.'],
      ['First-order transients','Analyse RC and RL behaviour in the time domain.'],
      ['AC & phasors','Sinusoidal sources and phasor-domain analysis of RLC networks.'],
      ['Measurement & simulation','Use oscilloscopes, function generators, multimeters and circuit-simulation tools.']
    ],
    CSE251: [
      ['Semiconductor fundamentals','p-type/n-type materials and nonlinear I-V characteristics.'],
      ['PN junction diodes','Diode behaviour and characteristic curves.'],
      ['Diode applications','Half/full-wave rectifiers, Zener regulation and diode logic.'],
      ['BJT fundamentals','Bipolar transistor operation and I-V characteristics.'],
      ['BJT biasing & load lines','Set transistor operating points and analyse configurations.'],
      ['Transistor switching','Use BJTs as electronic switches.'],
      ['Small-signal amplifiers','Analyse single-stage transistor amplifiers.'],
      ['Operational amplifiers','Summer, subtractor, differentiator, integrator and comparator circuits.'],
      ['MOSFET/FET fundamentals','Enhancement/depletion devices, NMOS/PMOS behaviour and biasing.'],
      ['FET switching & analysis','Use MOSFETs in switching circuits and analyse BJT/MOS-based circuits.']
    ],
    CSE260: [
      ['Number systems','Represent and convert values used in digital systems.'],
      ['Boolean algebra & gates','Logic operations and digital-gate behaviour.'],
      ['K-map simplification','Minimise Boolean expressions and two-level logic.'],
      ['Tabulation method','Use systematic Boolean simplification beyond K-maps.'],
      ['Combinational circuits','Design logic from specifications.'],
      ['MSI circuits','Decoders, encoders, multiplexers and demultiplexers.'],
      ['Latches & flip-flops','Store binary state and analyse sequential behaviour.'],
      ['Counters','Asynchronous and synchronous counting circuits.'],
      ['Registers','Store and move groups of bits.'],
      ['Memory elements','Introductory digital-memory concepts and organisation.'],
      ['Lab design project','Build and test digital circuits using practical components/tools.']
    ],
    CSE320: [
      ['Data communication basics','Elements of communication, network topology, protocols and standards.'],
      ['OSI & TCP/IP models','Understand layered networking models.'],
      ['Signals & transmission','Analog/digital signals, properties, impairment and data-rate limits.'],
      ['Digital-to-digital conversion','Line coding, block coding and scrambling.'],
      ['Analog-to-digital conversion','PCM and delta modulation.'],
      ['Digital-to-analog modulation','ASK, FSK and PSK.'],
      ['Multiplexing','FDM, WDM and synchronous time-division multiplexing.'],
      ['Spread spectrum','FHSS and direct-sequence spread spectrum.'],
      ['Data-link services','Data-link concepts and services.'],
      ['Multiple access','Channel partitioning, random-access and taking-turns protocols.'],
      ['Error control','Hamming distance, block coding, CRC and checksum techniques.']
    ],
    CSE321: [
      ['Processes & IPC','Process states, creation/termination and inter-process communication.'],
      ['Threads','Multicore programming, multithreading models, libraries and threading issues.'],
      ['CPU scheduling','FCFS, SJF, Priority, Round Robin, multilevel queue and feedback-queue scheduling.'],
      ['Synchronization','Race conditions, critical sections, atomic operations, mutexes and semaphores.'],
      ['Classical synchronization problems','Apply synchronization mechanisms to common concurrency problems.'],
      ['Storage & file systems','Disks, files, allocation, UNIX inodes, implementation, crash consistency and journaling.'],
      ['Main memory','Address spaces, paging, page tables and shared/hierarchical paging.'],
      ['Virtual memory','Demand paging, page faults and FIFO/LRU/Optimal replacement.'],
      ['Security & protection','Threats, firewalls, access matrices, domains, capabilities and protection mechanisms.'],
      ['Virtual machines & containers','Hypervisors, VMs, containers and mobile-OS concepts.'],
      ['Systems lab','Shell/C, system calls, scripting, pthreads, IPC and xv6 practice.']
    ],
    CSE330: [
      ['Numerical error & fixed-point arithmetic','Understand approximation and error in numerical computation.'],
      ['Polynomial interpolation','Approximate functions from known sample points.'],
      ['Numerical differentiation','Estimate derivatives using numerical techniques.'],
      ['Nonlinear equations','Solve nonlinear equations through iterative numerical methods.'],
      ['Linear systems','Solve systems of linear equations numerically.'],
      ['Gaussian elimination','Use elimination methods to solve linear systems.'],
      ['QR decomposition','Factor matrices and use the decomposition in numerical solutions.'],
      ['Least-squares approximation','Fit approximate solutions to overdetermined data.'],
      ['Numerical integration','Approximate definite integrals computationally.']
    ],
    CSE331: [
      ['Alphabets, strings & languages','Formal foundations for describing languages.'],
      ['DFA & regular languages','Deterministic finite automata and closure properties.'],
      ['NFA & subset construction','Nondeterminism and DFA/NFA equivalence.'],
      ['Regular expressions','Relationship between regular expressions and finite automata.'],
      ['Automata conversions','Regex→NFA and DFA→regex through state elimination.'],
      ['Nonregular languages','Use the pumping lemma to prove nonregularity.'],
      ['CFG & CFL','Context-free grammars and context-free languages.'],
      ['Parse trees & ambiguity','Derivations, parse trees and ambiguous grammars.'],
      ['CNF & CYK','Chomsky Normal Form and the CYK parsing algorithm.'],
      ['Pushdown automata','PDA behaviour and equivalence with CFGs.'],
      ['Turing machines','TM models, variants, recognisable and decidable languages.'],
      ['Undecidability','Halting problem, reductions and limits of computation.']
    ],
    CSE340: [
      ['Processor technology & performance','Processor technologies, performance metrics and design trade-offs.'],
      ['Number representation & arithmetic','Represent data and perform computer arithmetic.'],
      ['RISC-V architecture','Instruction formats and core RISC-V design.'],
      ['Assembly translation','Translate simple C/Java snippets into RISC-V assembly.'],
      ['Datapath & control','Design processor datapaths and understand control logic.'],
      ['Pipelining','Pipeline execution and performance.'],
      ['Pipeline hazards','Recognise hazards and apply techniques to resolve them.'],
      ['Memory hierarchy','Caches, main memory and performance analysis.'],
      ['RISC & CISC','Compare major instruction-set design approaches.'],
      ['Parallel architecture','Foundations of parallel computer organisation.'],
      ['Parallel programming','Introductory programming ideas for parallel systems.']
    ],
    CSE341: [
      ['Microprocessor foundations','Microcomputers, microcontrollers and the role of the processor.'],
      ['8086 memory organisation','Partitioning, segmentation, address translation and physical addresses.'],
      ['8086 architecture','Registers, flags, internal architecture and hardware modes.'],
      ['Addressing modes & machine code','Instruction addressing and machine-level representation.'],
      ['Clocking & timing','Clock signals, timing diagrams and memory banking.'],
      ['Interrupts','Software/hardware interrupts, vectors and interrupt handling.'],
      ['8259A PIC','Programmable interrupt controller and cascading.'],
      ['I/O addressing','Address peripheral devices and understand basic I/O systems.'],
      ['DMA','Direct Memory Access and the 8237 DMA controller.'],
      ['Later 80x86 processors','80186/80286 features and introductory pipelining concepts.']
    ],
    CSE350: [
      ['Logic families','Diode/transistor/MOS logic; TTL, ECL, IIL and CMOS families.'],
      ['Digital-switch characteristics','Propagation delay, noise immunity, open-collector and high-impedance gates.'],
      ['Sequential circuit electronics','Circuit-level flip-flops, counters, registers and memory systems.'],
      ['Data converters','A/D, D/A and sample-and-hold circuits.'],
      ['Display/opto circuits','LED, LCD and optically coupled circuits.'],
      ['Nonlinear op-amp applications','Comparator and switching applications of operational amplifiers.'],
      ['Wave shaping','Diode clipping, clamping and linear/nonlinear shaping techniques.'],
      ['Pulse transmission','Pulse transformers and pulse-transmission concepts.'],
      ['Multivibrators & timing','Monostable, bistable and astable multivibrators and timing circuits.'],
      ['Sweep & trigger circuits','Voltage/time-base sweeps, Schmitt triggers and blocking oscillators.']
    ],
    CSE360: [
      ['Interfacing fundamentals','Interface components, characteristics and system-level interfacing.'],
      ['Sensors & transducers','Sensor operation, hall-effect sensing and real-world applications.'],
      ['Sensor calibration','Hardware/software calibration for sensor interfaces.'],
      ['GPIO & MCU/MPU interfacing','Use development boards to connect digital I/O.'],
      ['82C55 PPI','Programmable Peripheral Interface operation.'],
      ['Storage & electromechanical devices','Disk, drum, motors and printers.'],
      ['Serial communication','I2C, SPI, UART, USART and USB formats/protocols.'],
      ['Displays & input devices','LCD, LED, seven-segment, keyboard and mouse interfacing.'],
      ['Simulation tools','Model and test interfacing systems in software.'],
      ['Advanced interfaces','Introductory HCI and BCI case studies.']
    ],
    CSE370: [
      ['DBMS foundations','Advantages/disadvantages of DBMS and database architecture.'],
      ['ER modelling','Entities, relationships and conceptual database design.'],
      ['EER modelling','Extended modelling concepts for richer schemas.'],
      ['Relational model & constraints','Keys, relationships and integrity constraints.'],
      ['ER/EER to relational mapping','Convert conceptual models into relational schemas.'],
      ['SQL','Formulate and practise relational queries extensively.'],
      ['Normalization','Reduce redundancy and update anomalies through schema design.'],
      ['Indexing','Use indexes to improve data access.'],
      ['Hashing','Hash-based data access techniques.'],
      ['Database project','Design and implement a complete database system with a user interface.']
    ],
    CSE400: [
      ['Project orientation','Learning outcomes, expectations, assessment and project checklist.'],
      ['Problem identification','Identify and formulate a complex engineering/computing problem.'],
      ['Objectives & requirements','Analyse objectives, specifications and requirements.'],
      ['Engineering design process','Move from problem formulation to design, implementation and evaluation.'],
      ['Constraints & standards','Consider realistic constraints, standards and solution impacts.'],
      ['Proposal & project planning','Prepare proposals, estimates, schedules and project-management plans.'],
      ['Ethics & professional practice','Engineering ethics, professional responsibilities and norms.'],
      ['Safety & sustainability','Safety, reliability and environmental/social sustainability.'],
      ['Literature review & research','Investigate prior work and establish a technical foundation.'],
      ['Design reviews & simulation','Review, simulate and refine candidate solutions.'],
      ['Development & validation','Implement, test and validate the final solution.'],
      ['Documentation & communication','Technical reports, drawings, oral presentation and teamwork.'],
      ['Three project phases','Problem Identification & Planning → Design Solutions → Development & Validation.']
    ],
    CSE420: [
      ['Compiler structure','Language-processing systems, compiler phases and analysis/synthesis.'],
      ['Lexical analysis','Tokens, lexical scanners and regular-expression based recognition.'],
      ['Finite-state machines','Transform regular expressions into automata for tokenisation.'],
      ['Symbol tables','Design and use symbol tables during compilation.'],
      ['Context-free grammars','Describe programming-language syntax formally.'],
      ['Top-down parsing','Recursive-descent and related parsing techniques.'],
      ['Bottom-up parsing','Bottom-up parsing and compiler-writing tools such as Yacc.'],
      ['Semantic analysis','Syntax-directed definitions, translation schemes and type checking.'],
      ['Intermediate code','Represent programs between source analysis and final target code.'],
      ['Runtime storage','Run-time memory allocation and machine-level considerations.'],
      ['Code generation','Generate target code while considering registers, memory and instruction cost.'],
      ['Optimisation','Improve intermediate/target code for efficiency.']
    ],
    CSE421: [
      ['Protocols & layers','Network architecture, layering and protocol roles.'],
      ['HTTP','Application-layer web communication.'],
      ['Email & DNS','Application-layer services beyond the web.'],
      ['UDP','Connectionless transport and its trade-offs.'],
      ['TCP','Reliable transport, flow and congestion-related behaviour.'],
      ['IPv4 addressing','Addressing and packet delivery in IP networks.'],
      ['Subnetting','Divide address space into useful network segments.'],
      ['DHCP & NAT/PAT','Address assignment and address translation.'],
      ['Routing','Static routing, distance-vector and link-state approaches.'],
      ['IPv6','Modern Internet addressing and packet delivery.'],
      ['Data-link layer','Link-layer responsibilities and local delivery.'],
      ['Network lab','Packet Tracer, Wireshark, NS3, sockets, troubleshooting and routing configuration.']
    ],
    CSE422: [
      ['AI & rational agents','Artificial intelligence, rationality and intelligent-agent structures.'],
      ['Task environments','Describe the environment and requirements of an intelligent agent.'],
      ['Problem representation','Formulate problems so they can be solved computationally.'],
      ['Uninformed search','Systematically explore state spaces without problem-specific heuristics.'],
      ['Informed/heuristic search','Use heuristics to guide search more efficiently.'],
      ['Game playing','Adversarial and stochastic decision-making.'],
      ['Constraint satisfaction','CSP modelling, constraint propagation and search.'],
      ['Rule chaining & inference','Use logical rules to derive new conclusions.'],
      ['Uncertain knowledge','Probabilistic reasoning and decision-making under uncertainty.'],
      ['Expert/intelligent systems','General problem solving, expert consultation, recognition and translation.'],
      ['Machine learning basics','Introductory learning concepts within intelligent systems.'],
      ['AI applications','Robotics and other systems that apply AI reasoning.']
    ],
    CSE423: [
      ['Graphics pipeline','Understand the major stages of creating computer graphics.'],
      ['Line drawing','Algorithms for drawing lines on raster displays.'],
      ['Circle & ellipse drawing','Circle/ellipse algorithms and 8-way symmetry.'],
      ['Clipping','Cohen-Sutherland and Cyrus-Beck clipping techniques.'],
      ['2D transformations','Translation, scaling, rotation, reflection and shear.'],
      ['3D transformations','Transformation matrices and 3D object manipulation.'],
      ['Projection','Represent 3D scenes in 2D space.'],
      ['Colour models','RGB, CMYK and HSV.'],
      ['Illumination','Model how light interacts with surfaces.'],
      ['Shading','Apply shading techniques to rendered objects.'],
      ['Graphics project','Use graphics algorithms to design and implement a practical project.']
    ],
    CSE460: [
      ['VLSI foundations','History, IC trends, design approaches and Moore’s law.'],
      ['MOS logic families','nMOS, pMOS, pseudo-nMOS and CMOS.'],
      ['CMOS logic design','Pull-up/pull-down networks and series/parallel MOS implementations.'],
      ['Combinational CMOS','Gates and complex AOI/OAI logic.'],
      ['Sequential CMOS','Multiplexers, encoders, latches and flip-flops.'],
      ['FSM hardware','Moore/Mealy machines, state encoding and minimisation.'],
      ['Fabrication & design rules','Photolithography, CMOS process flow and physical design constraints.'],
      ['Layout & area','Resistance/capacitance estimation, stick diagrams, Euler paths and area estimation.'],
      ['Transistor/DC behaviour','MOS operating modes, I-V curves, capacitance and transfer characteristics.'],
      ['Power','Static/dynamic power, activity factor and power-reduction techniques.'],
      ['Timing & delay','Rise/fall time, propagation, RC/Elmore delay, fan-in and fan-out.'],
      ['Physical design','Floorplanning, partitioning, routing and clock-tree synthesis.'],
      ['Design tools','Verilog, Quartus II, Microwind and DSCH2 for design/simulation/layout.']
    ],
    CSE461: [
      ['Robotics foundations','Basic laws, robot architectures and multidisciplinary design.'],
      ['Electrical/mechanical/software integration','Understand how the three major parts of a robot work together.'],
      ['Kinematics','Forward and inverse kinematics for robot motion.'],
      ['Motor action & actuation','Control motion through motors and mechanical systems.'],
      ['Perception','Sensors and techniques for perceiving the environment.'],
      ['Control systems','Build feedback/control approaches for robotic behaviour.'],
      ['Navigation','Algorithms for robot movement and navigation.'],
      ['Robot communication','Advanced communication protocols used in robotics.'],
      ['4DOF arm control','Apply kinematic and control algorithms to a multi-joint arm.'],
      ['AI in robotics','Use artificial-intelligence ideas in robotic systems.'],
      ['Robot design project','Implement hardware and software for a basic robot.']
    ],
    CSE470: [
      ['Software engineering & SDLC','Software process models: Waterfall, V-model, Incremental, Iterative, Spiral and CMMI.'],
      ['Requirements engineering','Analyse and document what a software system must do.'],
      ['Agile development','XP, AUP, Scrum and iterative team practices.'],
      ['UML modelling','Use-case and class diagrams for system design.'],
      ['Software architecture','High-level structures for organising software systems.'],
      ['Design patterns','Observer, Adapter, Singleton and pattern-oriented design.'],
      ['Architectural patterns','MVC, Layered, Repository, Client-Server and Pipe-Filter.'],
      ['Software testing','Evaluate software behaviour and quality.'],
      ['Software metrics','Control-flow graphs, cyclomatic complexity and quality measures.'],
      ['Effort estimation','COCOMO and economic/project feasibility thinking.'],
      ['Project scheduling','Critical Path Method and planning project work.'],
      ['Refactoring','Improve internal code structure without changing intended behaviour.'],
      ['Documentation','Create maintainable technical/project documentation.']
    ],
    CSE471: [
      ['Systems analysis & SDLC','Elements of system analysis/design and the software-development life cycle.'],
      ['Business value & system requests','Identify why a proposed system should be built.'],
      ['Feasibility analysis','Evaluate major feasibility dimensions before committing to a system.'],
      ['Behavioural UML','Use case, activity and sequence diagrams.'],
      ['Structural/process modelling','Data-flow diagrams and related structural models.'],
      ['Logical → physical processes','Convert logical process models into implementable physical designs.'],
      ['Program design','Structure charts and program specifications.'],
      ['Logical → physical data','Choose storage formats and optimise data storage.'],
      ['UI design','Navigation, input, output and user-interface design principles.'],
      ['Project workflow','Requirements approval, modular implementation and project/report submission.'],
      ['Git collaboration','Push, commit, pull, merge and branch in a team project.'],
      ['Presentation & viva','Communicate the designed system through reports, presentations and viva.']
    ]
  };

  const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);

  function prerequisite(c) {
    const parts = [];
    if (c.hp) parts.push('<span><b>HP</b>' + esc(c.hp) + '</span>');
    if (c.sp) parts.push('<span><b>SP</b>' + esc(c.sp) + '</span>');
    return parts.length ? parts.join('') : '<span><b>Prerequisite</b>Not listed</span>';
  }

  function detailedOutline(c) {
    const topics = courseOutlines[c.code] || [];
    return `
      <div class="bracu-cse110-detail bracu-official-outline">
        <div class="bracu-outline-head">
          <div><span class="eyebrow">COURSE OUTLINE</span><h3>${topics.length} topic areas</h3></div>
          <small>Structured from BRACU's current official course description / lecture listing.</small>
        </div>
        <ol class="bracu-topic-map">
          ${topics.map(([title,text]) => `<li><b>${esc(title)}</b><span>${esc(text)}</span></li>`).join('')}
        </ol>
        ${c.code === 'CSE110' ? `
        <div class="bracu-study-order">
          <span class="eyebrow">RECOMMENDED STUDY ORDER</span>
          <div><span>Basics</span><i>→</i><span>Conditions</span><i>→</i><span>Loops</span><i>→</i><span>Strings</span><i>→</i><span>Arrays</span><i>→</i><span>Methods</span><i>→</i><span>Recursion</span><i>→</i><span>Files</span></div>
        </div>` : ''}
      </div>`;
  }

  function card(c, index) {
    return `
      <article class="bracu-catalog-card" data-bracu-course="${esc(c.code)}" data-area="${esc(c.area)}">
        <details ${c.code === 'CSE110' ? 'open' : ''}>
          <summary>
            <span class="bracu-catalog-code">${esc(c.code)}</span>
            <span class="bracu-catalog-title"><b>${esc(c.title)}</b><small>${esc(c.area)} · ${esc(c.focus)}</small></span>
            <span class="bracu-catalog-toggle" aria-hidden="true">+</span>
          </summary>
          <div class="bracu-catalog-body">
            <div class="bracu-course-facts">
              <span><b>Area</b>${esc(c.area)}</span>
              ${prerequisite(c)}
            </div>
            <p class="bracu-focus"><b>First Comet overview:</b> ${esc(c.focus)}</p>
            ${detailedOutline(c)}
            <div class="bracu-course-actions">
              <a class="secondary" href="https://cse.bracu.ac.bd/course/view/${encodeURIComponent(c.code)}" target="_blank" rel="noopener">Official course page ↗</a>
              ${c.code === 'CSE110' ? '<button type="button" class="primary" data-view="cse110notes">Open visual notes →</button><button type="button" class="secondary" data-view="learn">Practise programming</button>' : ''}
            </div>
          </div>
        </details>
      </article>`;
  }

  const areas = ['All', ...new Set(courses.map((course) => course.area))];
  const levels = [
    { id:'100', label:'100 Level', courses:courses.filter((course) => /^CSE1/.test(course.code)) },
    { id:'200', label:'200 Level', courses:courses.filter((course) => /^CSE2/.test(course.code)) },
    { id:'300', label:'300 Level', courses:courses.filter((course) => /^CSE3/.test(course.code)) },
    { id:'400', label:'400 Level', courses:courses.filter((course) => /^CSE4/.test(course.code)) }
  ];

  root.innerHTML = `
    <section class="bracu-hero">
      <div>
        <span class="eyebrow">BRAC UNIVERSITY · UNDERGRADUATE CSE</span>
        <h1>BRACU Courses</h1>
        <p>Browse the current undergraduate CSE course list, then turn each course into a topic map, study order and practice plan.</p>
      </div>
      <aside>
        <span class="eyebrow">26 COURSES</span>
        <b>Start with the official course structure. Study one course in a clear order instead of collecting random resources.</b>
      </aside>
    </section>

    <section class="bracu-catalog-tools">
      <div>
        <label for="bracuCourseSearch">Find a course</label>
        <input id="bracuCourseSearch" type="search" placeholder="Try CSE423, database, robotics…" autocomplete="off">
      </div>
      <div class="bracu-area-select-wrap">
        <label for="bracuAreaSelect">Area</label>
        <select id="bracuAreaSelect" class="bracu-area-select" aria-label="Filter BRACU CSE courses by area">
          ${areas.map((area) => `<option value="${esc(area)}">${esc(area === 'All' ? 'All areas' : area)}</option>`).join('')}
        </select>
      </div>
    </section>

    <nav class="bracu-level-nav" aria-label="Jump to BRACU CSE course level">
      ${levels.map((level) => `<button type="button" data-bracu-level-jump="${level.id}"><b>${level.id}</b><span>${level.courses.length} courses</span></button>`).join('')}
    </nav>

    <div class="bracu-catalog-count" id="bracuCatalogCount" role="status"></div>
    <div class="bracu-level-groups">
      ${levels.map((level) => `
        <section class="bracu-level-group" data-bracu-level-group="${level.id}" aria-labelledby="bracuLevel${level.id}">
          <div class="bracu-level-heading">
            <div><span class="eyebrow">COURSE LEVEL</span><h2 id="bracuLevel${level.id}">${level.label} Courses</h2></div>
            <span>${level.courses.length} courses</span>
          </div>
          <div class="bracu-catalog-grid">
            ${level.courses.map(card).join('')}
          </div>
        </section>`).join('')}
    </div>

    <details class="bracu-source-note">
      <summary>Source</summary>
      <div>
        <p>Based on BRACU's official CSE course pages. First Comet simplifies the topics for study.</p>
        <a href="https://cse.bracu.ac.bd/undergraduate/program" target="_blank" rel="noopener">Official source ↗</a>
      </div>
    </details>
  `;

  const search = root.querySelector('#bracuCourseSearch');
  const cards = [...root.querySelectorAll('.bracu-catalog-card')];
  const areaSelect = root.querySelector('#bracuAreaSelect');
  const groups = [...root.querySelectorAll('[data-bracu-level-group]')];
  const jumpButtons = [...root.querySelectorAll('[data-bracu-level-jump]')];
  const count = root.querySelector('#bracuCatalogCount');
  let activeArea = 'All';
  let activeLevel = null;

  function applyFilters() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const group = card.closest('[data-bracu-level-group]');
      const cardLevel = group?.dataset.bracuLevelGroup || '';
      const levelOk = query ? true : activeLevel === cardLevel;
      const areaOk = activeArea === 'All' || card.dataset.area === activeArea;
      const textOk = !query || card.textContent.toLowerCase().includes(query);
      card.hidden = !(levelOk && areaOk && textOk);
      if (!card.hidden) visible++;
    });

    groups.forEach((group) => {
      const visibleCards = [...group.querySelectorAll('.bracu-catalog-card')].some((card) => !card.hidden);
      group.hidden = !visibleCards;
    });

    jumpButtons.forEach((button) => {
      const selected = !query && button.dataset.bracuLevelJump === activeLevel;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    if (!query && !activeLevel) {
      count.textContent = 'Choose 100, 200, 300 or 400 Level to see its courses.';
    } else {
      count.textContent = visible + (visible === 1 ? ' course' : ' courses') + ' shown';
    }
  }

  search.addEventListener('input', () => {
    if (search.value.trim()) activeLevel = null;
    applyFilters();
  });

  areaSelect?.addEventListener('change', () => {
    activeArea = areaSelect.value;
    applyFilters();
  });

  jumpButtons.forEach((button) => button.addEventListener('click', () => {
    activeLevel = button.dataset.bracuLevelJump;
    search.value = '';
    applyFilters();
    const group = root.querySelector('[data-bracu-level-group="' + activeLevel + '"]');
    group?.scrollIntoView({ behavior:'smooth', block:'start' });
  }));

  window.FirstCometBracuCourses = {
    openLevel(level) {
      const normalized = String(level).replace(/[^0-9]/g, '').slice(0, 3);
      if (!['100','200','300','400'].includes(normalized)) return;
      activeLevel = normalized;
      search.value = '';
      applyFilters();
    }
  };

  applyFilters();
})();
