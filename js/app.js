/* =====================================================================
   Inbal & Alon — Wedding Management · interaction logic
   All copy comes from js/content.js. Progress lives only in memory
   (refresh = fresh case file), by design.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.WEDDING;
  if (!C) return;

  var doc = document;
  var root = doc.documentElement;
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };
  var motionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var reducedMotion = function () { return !!(motionQuery && motionQuery.matches); };

  root.classList.add("js");

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  }

  function el(tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function vibrate(pattern) {
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* ignore */ }
  }

  /* ---------- Session details: case number + scan time ---------- */
  var caseNo = "1412-" + (1000 + Math.floor(Math.random() * 9000));
  var scanTime = new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });

  /* ---------- Fill static copy ---------- */
  $$("[data-text]").forEach(function (node) {
    var v = get(node.getAttribute("data-text"));
    if (typeof v === "string") node.textContent = v;
  });
  $$("[data-lines]").forEach(function (node) {
    var lines = get(node.getAttribute("data-lines")) || [];
    lines.forEach(function (line) { node.appendChild(el("p", null, line)); });
  });
  $$("[data-case-no]").forEach(function (node) { node.textContent = "№ " + caseNo; });

  /* ---------- Ticker ---------- */
  (function buildTicker() {
    var track = $("#ticker");
    if (!track) return;
    // two identical halves -> seamless loop at translateX(-50%)
    for (var copy = 0; copy < 2; copy++) {
      for (var rep = 0; rep < 2; rep++) {
        C.ticker.forEach(function (item) {
          track.appendChild(el("span", null, item));
          track.appendChild(el("span", "tick-star", "✦"));
        });
      }
    }
  })();

  /* ---------- Opening crew: Inbal & Alon rappel in ----------
     1. slide down their ropes (hands on the rope)
     2. let go — the ropes zip back up and disappear
     3. wag an index finger ("no no no")
     4. cross their arms — that's their resting pose
     Afterwards, tapping either one replays 3 + 4 for that character only. */
  (function buildCrew() {
    var crew = $("#crew");
    if (!crew) return;

    var LOOK = {
      alon: { skin: "#efc6a4", edge: "#c98d6a", sleeve: "#fffdf8" },
      inbal: { skin: "#f2cdb0", edge: "#cf9a7a", sleeve: null },
    };

    /* --- drawing helpers (all poses are drawn with the rope on the LEFT;
           Inbal's arms + rope are mirrored so each rope is on the outer side) */
    function limb(d, c) {
      return '<path d="' + d + '" fill="none" stroke="' + c.edge + '" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="' + d + '" fill="none" stroke="' + c.skin + '" stroke-width="5.2" stroke-linecap="round"/>';
    }
    function sleeve(d, c) {
      if (!c.sleeve) return "";
      return '<path d="' + d + '" fill="none" stroke="#d8cdbb" stroke-width="9.6" stroke-linecap="round"/>' +
        '<path d="' + d + '" fill="none" stroke="' + c.sleeve + '" stroke-width="8" stroke-linecap="round"/>';
    }
    function fist(x, y, c, r) {
      return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4.4) + '" fill="' + c.skin + '" stroke="' + c.edge + '" stroke-width=".9"/>';
    }
    // A fist with ONLY the index finger raised, on the thumb side (never centred).
    function pointer(x, y, c) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(-6)">' +
        '<rect x="1.2" y="-22" width="4.2" height="14" rx="2.1" fill="' + c.skin + '" stroke="' + c.edge + '" stroke-width=".9"/>' +
        '<rect x="-5.6" y="-10.5" width="11.2" height="10.5" rx="3.8" fill="' + c.skin + '" stroke="' + c.edge + '" stroke-width=".9"/>' +
        '<path d="M-4.2 -6.4 Q0 -8.6 4.4 -6.2" fill="none" stroke="' + c.edge + '" stroke-width=".9" stroke-linecap="round"/>' +
        '<path d="M-5.4 -3.2 h2.6" fill="none" stroke="' + c.edge + '" stroke-width=".8" stroke-linecap="round"/>' +
        "</g>";
    }

    function arms(c) {
      return (
        // 1. gripping the rope: guide hand up, brake hand at the hip
        '<g class="arms arms-grip">' +
          sleeve("M27 66 L23 64.5", c) + limb("M27 66 Q17 64 12 47", c) + fist(11, 44, c) +
          sleeve("M53 66 L51 70", c) + limb("M53 66 Q42 90 15 90", c) + fist(12, 90, c) +
        "</g>" +
        // 2. letting go
        '<g class="arms arms-drop">' +
          sleeve("M27 66 L23 68", c) + limb("M27 66 Q16 72 11 80", c) + fist(10, 82, c) +
          sleeve("M53 66 L57 68", c) + limb("M53 66 Q64 72 69 80", c) + fist(70, 82, c) +
        "</g>" +
        // 3. scolding: one hand on the hip, index finger wagging
        '<g class="arms arms-wag">' +
          sleeve("M53 66 L56 69", c) + limb("M53 66 Q64 76 57 87", c) + fist(56, 88, c) +
          sleeve("M27 66 L22.5 64.5", c) + limb("M27 66 L14 62", c) +
          '<g class="fore">' + limb("M14 62 L7 49", c) + pointer(7, 49, c) + "</g>" +
          '<path class="swish" d="M-4 36 Q-8 29 -4 22 M0 18 Q6 13 12 16" fill="none" stroke="#5d5266" stroke-width="1.3" stroke-linecap="round"/>' +
        "</g>" +
        // 4. arms crossed, very unimpressed
        '<g class="arms arms-cross">' +
          sleeve("M27 66 L24.5 70.5", c) + limb("M27 66 Q20 74 23 83", c) + limb("M23 83 L49 80", c) + fist(50, 79.5, c, 3.8) +
          sleeve("M53 66 L55.5 70.5", c) + limb("M53 66 Q60 75 57 85", c) + limb("M57 85 L30 86", c) + fist(29, 86, c, 4) +
        "</g>"
      );
    }

    var COSTUME = {
      alon:
        '<g fill="#2a2338"><rect x="29" y="96" width="9" height="19" rx="3"/><rect x="42" y="96" width="9" height="19" rx="3"/></g>' +
        '<g fill="#141019"><ellipse cx="32.5" cy="116" rx="6" ry="3.4"/><ellipse cx="46.5" cy="116" rx="6" ry="3.4"/></g>' +
        '<path d="M26 63 Q40 58 54 63 L54 97 Q40 99.5 26 97 Z" fill="#fffdf8" stroke="#d8cdbb" stroke-width=".9"/>' +
        // the famous QR shirt
        '<g transform="translate(34.5 67.5) scale(.92)"><rect width="12" height="12" fill="#fff"/><g fill="#241c2f">' +
        '<rect width="4" height="4"/><rect x="8" width="4" height="4"/><rect y="8" width="4" height="4"/>' +
        '<rect x="5" y="5" width="2" height="2"/><rect x="9" y="9" width="3" height="3"/><rect x="5" y="1" width="2" height="1.6"/>' +
        '<rect x="1" y="5" width="1.6" height="2"/><rect x="9" y="5" width="2" height="2"/><rect x="5" y="9" width="2" height="2"/></g>' +
        '<g fill="#fff"><rect x="1.3" y="1.3" width="1.4" height="1.4"/><rect x="9.3" y="1.3" width="1.4" height="1.4"/><rect x="1.3" y="9.3" width="1.4" height="1.4"/></g></g>',
      inbal:
        '<path d="M18 26 Q12 70 20 104 Q40 110 60 104 Q68 70 62 26 Z" fill="rgba(255,255,255,.62)" stroke="rgba(227,214,191,.8)" stroke-width=".8"/>' +
        '<g fill="#d9b56a"><ellipse cx="34" cy="121.5" rx="4.2" ry="2.4"/><ellipse cx="46" cy="121.5" rx="4.2" ry="2.4"/></g>' +
        '<path d="M30 80 Q40 83 50 80 Q62 100 66 117 Q40 125 14 117 Q18 100 30 80 Z" fill="#fffaf2" stroke="#e3d6bf" stroke-width=".9"/>' +
        '<path d="M19 108 Q23 112 27 108 Q31 112 35 108 Q39 112 43 108 Q47 112 51 108 Q55 112 59 108" fill="none" stroke="#ead9b5" stroke-width="1.1"/>' +
        '<path d="M27 63 Q40 58 53 63 L51 67 L29 67 Z" fill="#f2cdb0"/>' +
        '<path d="M29 65 Q40 62 51 65 L50 80 Q40 82 30 80 Z" fill="#fffaf2" stroke="#e3d6bf" stroke-width=".9"/>' +
        '<path d="M30 78 Q40 81 50 78 L50 81.5 Q40 84.5 30 81.5 Z" fill="#d9b56a"/>',
    };

    var MIRROR = ' transform="matrix(-1 0 0 1 80 0)"';
    var ROPE =
      '<line x1="11" y1="-1700" x2="11" y2="102" stroke="#8a6324" stroke-width="3.4" stroke-linecap="round"/>' +
      '<line x1="11" y1="-1700" x2="11" y2="102" stroke="#f0d695" stroke-width="3.4" stroke-dasharray="2.4 2.6"/>' +
      '<circle cx="11" cy="103" r="2.7" fill="#8a6324"/>';

    function build(who) {
      var c = LOOK[who];
      var mirror = who === "inbal" ? MIRROR : "";
      var ch = el("div", "char char-" + who);
      ch.setAttribute("data-pose", "grip");
      ch.innerHTML =
        '<svg class="rope" viewBox="0 0 80 128" width="80" height="128"><g' + mirror + ">" + ROPE + "</g></svg>" +
        '<div class="mover"><div class="puppet">' +
          '<svg class="char-body" viewBox="0 0 80 128" width="80" height="128">' + COSTUME[who] + "<g" + mirror + ">" + arms(c) + "</g></svg>" +
          '<div class="head"><img class="face" alt="" decoding="async"></div>' +
        "</div></div>";
      crew.appendChild(ch);
      return ch;
    }

    var chars = [build("alon"), build("inbal")];

    /* --- photos: configured file first, then other extensions --- */
    var EXTS = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "webp", "WEBP"];
    var FALLBACK =
      '<svg class="fallback" viewBox="0 0 46 54" preserveAspectRatio="xMidYMid slice"><rect width="46" height="54" fill="#efc6a4"/>' +
      '<path d="M2 24 Q5 3 23 3 Q41 3 44 24 Q37 11 23 12 Q9 11 2 24Z" fill="#6b4a33"/>' +
      '<circle cx="16" cy="28" r="2.4" fill="#241c2f"/><circle cx="30" cy="28" r="2.4" fill="#241c2f"/>' +
      '<path d="M15 38 Q23 44 31 38" fill="none" stroke="#241c2f" stroke-width="2.2" stroke-linecap="round"/></svg>';

    function loadFace(ch, path, done) {
      var img = $(".face", ch);
      var list = [];
      if (path) {
        list.push(path);
        var base = path.replace(/\.[^./]+$/, "");
        EXTS.forEach(function (ext) {
          var cnd = base + "." + ext;
          if (list.indexOf(cnd) === -1) list.push(cnd);
        });
      }
      var i = 0;
      (function next() {
        if (i >= list.length) {
          img.remove();
          $(".head", ch).insertAdjacentHTML("beforeend", FALLBACK);
          done();
          return;
        }
        img.onload = function () { img.onload = img.onerror = null; done(); };
        img.onerror = next;
        img.src = list[i++];
      })();
    }

    /* --- choreography --- */
    function later(ms, fn) { return setTimeout(fn, ms); }
    function pose(ch, p) { ch.setAttribute("data-pose", p); }

    // Each character has their own "נו נו נו" bubble; only one shows at a time.
    chars[0].bubble = $("#bubbleAlon");
    chars[1].bubble = $("#bubbleInbal");
    function bubbleFor(ch, on) {
      if (!ch.bubble) return;
      if (on) chars.forEach(function (o) { if (o !== ch && o.bubble) o.bubble.classList.remove("show"); });
      ch.bubble.classList.toggle("show", on);
    }

    function scold(ch, then, quiet) {
      pose(ch, "wag");
      if (!quiet) bubbleFor(ch, true);
      later(1100, function () {
        pose(ch, "crossed");
        bubbleFor(ch, false);
        if (then) then();
      });
    }

    var started = false;
    function start() {
      if (started) return;
      started = true;
      crew.classList.add("in");
      if (reducedMotion()) {
        chars.forEach(function (ch) { pose(ch, "crossed"); $(".rope", ch).classList.add("gone"); });
        return;
      }
      chars.forEach(function (ch, k) {
        var off = k * 150; // Inbal is a beat behind Alon
        ch.busy = true;
        later(off + 950, function () {
          pose(ch, "drop");
          $(".rope", ch).classList.add("gone");
        });
        later(off + 1250, function () {
          // entrance: one bubble only (Alon's), so they don't overlap
          scold(ch, function () { ch.busy = false; }, k > 0);
        });
      });
    }

    var pending = 2;
    function ready() { if (--pending === 0) start(); }
    loadFace(chars[0], C.faces && C.faces.alon, ready);
    loadFace(chars[1], C.faces && C.faces.inbal, ready);
    setTimeout(start, 1200); // never keep guests waiting on a slow connection

    // Tap a character: they uncross, wag, and cross their arms again.
    chars.forEach(function (ch) {
      ch.addEventListener("click", function () {
        if (!started || ch.busy) return;
        ch.busy = true;
        vibrate(10);
        scold(ch, function () { ch.busy = false; });
      });
    });
  })();

  /* ---------- Sparkles in the background ---------- */
  (function buildSparkles() {
    var box = $("#sparkles");
    if (!box) return;
    var count = window.innerWidth < 600 ? 26 : 46;
    for (var i = 0; i < count; i++) {
      var s = el("span", "spark");
      s.style.left = (Math.random() * 100).toFixed(2) + "%";
      s.style.top = (Math.random() * 100).toFixed(2) + "%";
      s.style.setProperty("--t", (3.5 + Math.random() * 5).toFixed(2) + "s");
      s.style.setProperty("--delay", (-Math.random() * 8).toFixed(2) + "s");
      s.style.setProperty("--o", (0.35 + Math.random() * 0.6).toFixed(2));
      var size = Math.random() < 0.15 ? 4 : Math.random() < 0.5 ? 2 : 3;
      s.style.width = s.style.height = size + "px";
      box.appendChild(s);
    }
  })();

  /* ---------- Case file ---------- */
  var statusEl = null;
  var caseStamp = $("#caseStamp");
  (function buildCase() {
    var dl = $("#caseFields");
    if (!dl) return;
    C.caseFile.fields.forEach(function (f) {
      dl.appendChild(el("dt", null, f.label));
      var dd = el("dd");
      if (f.value === "{caseNo}") {
        dd.className = "mono";
        dd.dir = "ltr";
        dd.style.textAlign = "right";
        dd.textContent = caseNo;
      } else if (f.value === "{time}") {
        dd.className = "mono";
        dd.textContent = scanTime;
      } else if (f.value === "{status}") {
        statusEl = el("span", "status", C.caseFile.statusOpen);
        dd.appendChild(statusEl);
      } else {
        dd.textContent = f.value;
      }
      dl.appendChild(dd);
    });
    if (caseStamp) caseStamp.textContent = C.caseFile.stampOpen;
  })();

  /* ---------- Quests ---------- */
  var list = $("#quests");
  var total = C.challenges.length;
  var done = C.challenges.map(function () { return false; });
  var buttons = [];

  C.challenges.forEach(function (text, i) {
    var li = el("li");
    li.style.setProperty("--i", i);

    var btn = el("button", "quest-btn");
    btn.type = "button";
    btn.setAttribute("role", "checkbox");
    btn.setAttribute("aria-checked", "false");

    var num = el("span", "quest-num", String(i + 1).padStart(2, "0"));
    num.setAttribute("aria-hidden", "true");

    var txt = el("span", "quest-text");
    txt.appendChild(el("span", "quest-ink", text));

    var seal = el("span", "seal");
    seal.setAttribute("aria-hidden", "true");
    seal.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

    var stamp = el("span", "stamp done-stamp", C.quest.doneStamp);
    stamp.setAttribute("aria-hidden", "true");

    btn.appendChild(num);
    btn.appendChild(txt);
    btn.appendChild(seal);
    btn.appendChild(stamp);
    btn.addEventListener("click", function () { toggle(i); });

    li.appendChild(btn);
    list.appendChild(li);
    buttons.push(btn);
  });

  /* ---------- Progress UI ---------- */
  var countEl = $("#count");
  var totalEl = $("#total");
  var bar = $("#bar");
  var barFill = $("#barFill");
  var barTicks = $("#barTicks");
  var verdictEl = $("#verdict");
  var wasComplete = false;
  var pardonTimer = null;

  totalEl.textContent = total;
  bar.setAttribute("aria-valuemax", total);
  barTicks.style.setProperty("--n", total);

  function verdictFor(count) {
    if (count >= total) return C.verdictDone;
    if (total - count === 1 && total > 1) return C.verdictAlmost;
    var v = C.verdicts;
    var idx = count === 0 ? 0 : 1 + Math.floor((count / total) * (v.length - 1));
    return v[Math.min(idx, v.length - 1)];
  }

  function render(animate) {
    var count = done.filter(Boolean).length;

    buttons.forEach(function (b, i) { b.setAttribute("aria-checked", done[i] ? "true" : "false"); });

    if (countEl.textContent !== String(count)) {
      countEl.textContent = count;
      if (animate) {
        countEl.classList.remove("bump");
        void countEl.offsetWidth; // restart animation
        countEl.classList.add("bump");
      }
    }

    barFill.style.width = (count / total) * 100 + "%";
    bar.setAttribute("aria-valuenow", count);
    bar.setAttribute("aria-valuetext", count + " מתוך " + total);

    var verdict = verdictFor(count);
    if (verdictEl.textContent !== verdict) {
      verdictEl.textContent = verdict;
      if (animate) {
        verdictEl.classList.remove("swap");
        void verdictEl.offsetWidth;
        verdictEl.classList.add("swap");
      }
    }

    var complete = count === total;
    doc.body.classList.toggle("is-pardoned", complete);
    if (statusEl) statusEl.textContent = complete ? C.caseFile.statusClosed : C.caseFile.statusOpen;
    if (caseStamp) caseStamp.textContent = complete ? C.caseFile.stampClosed : C.caseFile.stampOpen;

    if (complete && !wasComplete && animate) {
      clearTimeout(pardonTimer);
      pardonTimer = setTimeout(openPardon, reducedMotion() ? 150 : 650);
    }
    if (!complete) clearTimeout(pardonTimer);
    wasComplete = complete;
  }

  function toggle(i) {
    done[i] = !done[i];
    if (done[i]) {
      burst(buttons[i]);
      vibrate(12);
    }
    disarmReset();
    render(true);
  }

  /* ---------- Little gold burst from the seal ---------- */
  var burstColors = ["#e6c67e", "#f3e3b6", "#b48a3c", "#e0594c", "#fff4dc"];
  function burst(btn) {
    if (reducedMotion() || !btn.animate) return;
    var seal = $(".seal", btn);
    var bRect = btn.getBoundingClientRect();
    var sRect = seal.getBoundingClientRect();
    var cx = sRect.left - bRect.left + sRect.width / 2;
    var cy = sRect.top - bRect.top + sRect.height / 2;
    for (var k = 0; k < 10; k++) {
      var p = el("span", "burst");
      var size = 4 + Math.random() * 5;
      p.style.width = p.style.height = size + "px";
      p.style.left = cx - size / 2 + "px";
      p.style.top = cy - size / 2 + "px";
      p.style.background = burstColors[k % burstColors.length];
      if (k % 3 === 0) p.style.borderRadius = "2px";
      btn.appendChild(p);
      var angle = (Math.PI * 2 * k) / 10 + Math.random() * 0.5;
      var dist = 26 + Math.random() * 26;
      var anim = p.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: "translate(" + Math.cos(angle) * dist + "px," + Math.sin(angle) * dist + "px) scale(.2)", opacity: 0 },
        ],
        { duration: 550 + Math.random() * 250, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
      anim.onfinish = (function (node) { return function () { node.remove(); }; })(p);
    }
  }

  /* ---------- Reset (two taps, no ugly confirm dialog) ---------- */
  var resetBtn = $("#reset");
  var resetTimer = null;
  function disarmReset() {
    clearTimeout(resetTimer);
    resetBtn.classList.remove("armed");
    resetBtn.textContent = C.quest.reset;
  }
  resetBtn.addEventListener("click", function () {
    if (!resetBtn.classList.contains("armed")) {
      resetBtn.classList.add("armed");
      resetBtn.textContent = C.quest.resetConfirm;
      resetTimer = setTimeout(disarmReset, 3500);
      return;
    }
    disarmReset();
    done = done.map(function () { return false; });
    render(true);
    vibrate(20);
  });

  /* ---------- Pardon dialog ---------- */
  var pardon = $("#pardon");
  var pardonClose = $("#pardonClose");
  var lastFocus = null;

  function openPardon() {
    if (!pardon.hidden) return;
    lastFocus = doc.activeElement;
    pardon.hidden = false;
    doc.body.classList.add("locked");
    void pardon.offsetWidth;
    pardon.classList.add("open");
    setTimeout(function () { pardonClose.focus({ preventScroll: true }); }, 60);
    vibrate([30, 60, 30, 60, 120]);
    confetti();
  }

  function closePardon() {
    if (pardon.hidden) return;
    pardon.classList.remove("open");
    doc.body.classList.remove("locked");
    setTimeout(function () { pardon.hidden = true; }, reducedMotion() ? 0 : 350);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  pardonClose.addEventListener("click", closePardon);
  $$("[data-close]", pardon).forEach(function (n) { n.addEventListener("click", closePardon); });
  $("#reopenPardon").addEventListener("click", openPardon);

  doc.addEventListener("keydown", function (e) {
    if (pardon.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closePardon(); }
    if (e.key === "Tab") {
      // only one interactive element inside — keep focus there
      e.preventDefault();
      pardonClose.focus();
    }
  });

  /* ---------- Confetti (tiny canvas engine, no libraries) ---------- */
  var canvas = $("#confetti");
  var ctx = canvas.getContext && canvas.getContext("2d");
  var confettiRunning = false;

  function confetti() {
    if (!ctx || reducedMotion() || confettiRunning) return;
    confettiRunning = true;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = window.innerWidth, H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var colors = ["#e6c67e", "#f3e3b6", "#b48a3c", "#fff8e8", "#e9b7ad", "#d9584b", "#c9a052"];
    var pieces = [];
    var N = W < 600 ? 150 : 230;

    function spawn(x, y, angleMin, angleMax, speedMin, speedMax) {
      var a = angleMin + Math.random() * (angleMax - angleMin);
      var sp = speedMin + Math.random() * (speedMax - speedMin);
      var shape = Math.random();
      pieces.push({
        x: x, y: y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        w: 6 + Math.random() * 7, h: 4 + Math.random() * 6,
        r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        tilt: Math.random() * Math.PI, vt: 0.05 + Math.random() * 0.1,
        color: colors[(Math.random() * colors.length) | 0],
        kind: shape < 0.12 ? "heart" : shape < 0.35 ? "dot" : "rect",
        drag: 0.985 + Math.random() * 0.01,
      });
    }
    // two side cannons + a gentle top shower
    for (var i = 0; i < N * 0.35; i++) spawn(0, H * 0.75, -Math.PI * 0.45, -Math.PI * 0.2, 9, 17);
    for (var j = 0; j < N * 0.35; j++) spawn(W, H * 0.75, -Math.PI * 0.8, -Math.PI * 0.55, 9, 17);
    for (var k = 0; k < N * 0.3; k++) spawn(Math.random() * W, -20 - Math.random() * 120, Math.PI * 0.4, Math.PI * 0.6, 1, 3);

    function heart(c, s) {
      c.beginPath();
      c.moveTo(0, s * 0.3);
      c.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
      c.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
      c.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
      c.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
      c.fill();
    }

    var start = performance.now();
    var DURATION = 4200;
    function frame(now) {
      var t = now - start;
      ctx.clearRect(0, 0, W, H);
      var fade = t > DURATION - 900 ? Math.max(0, (DURATION - t) / 900) : 1;
      for (var p = 0; p < pieces.length; p++) {
        var q = pieces[p];
        q.vx *= q.drag;
        q.vy = q.vy * q.drag + 0.22;
        q.x += q.vx + Math.sin(q.tilt) * 0.6;
        q.y += q.vy;
        q.r += q.vr;
        q.tilt += q.vt;
        if (q.y > H + 30) continue;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(q.x, q.y);
        ctx.rotate(q.r);
        ctx.fillStyle = q.color;
        if (q.kind === "rect") {
          ctx.scale(1, Math.cos(q.tilt));
          ctx.fillRect(-q.w / 2, -q.h / 2, q.w, q.h);
        } else if (q.kind === "dot") {
          ctx.beginPath();
          ctx.arc(0, 0, q.h / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          heart(ctx, q.w + 3);
        }
        ctx.restore();
      }
      if (t < DURATION) requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, W, H); confettiRunning = false; }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Scroll reveals ---------- */
  var revealTargets = $$(".reveal").concat([list]);
  if ("IntersectionObserver" in window && !reducedMotion()) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealTargets.forEach(function (t) { io.observe(t); });
  } else {
    revealTargets.forEach(function (t) { t.classList.add("in"); });
  }

  /* ---------- CTA: smooth scroll + move focus to the quest ---------- */
  var cta = $(".sheet-notice .btn-cta");
  if (cta) {
    cta.addEventListener("click", function (e) {
      var target = $("#quest");
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      target.focus({ preventScroll: true });
    });
  }

  render(false);
})();
