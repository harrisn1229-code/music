/* PA.lists: setlists, repertoire, routines. Needs app.js (PA.app) and store.js.
   data.lists = [ { id, name, order: [pieceId], updated, deleted? } ]; piece.lists = [listId]. A list's order is the order pieces were put in
   (↑ / ↓ on the list screen); pieces not in `order` come after, newest first. Deleting a list leaves its pieces alone (a tombstone for sync).
   The list screen shows chips (All, each list, +) and a search box when there are more than 8 pieces; opening a piece from a list
   gives previous / next in the player (the #lrow under the view tabs).
   API: PA.lists.items() -> pieces to show now; top() draws the chips and search; addTo(piece); decorate(li, piece, index, count);
   opening(piece) (called before a piece opens from the list); cur / q / ctx. */
(function () {
  "use strict";
  var PA = window.PA, ST = PA.store, A = PA.app, S = PA.S;
  var $ = function (id) { return document.getElementById(id); };
  var esc = A.esc, el = A.el;
  var L = PA.lists = { cur: "all", q: "", ctx: null };
  var SEARCH_MIN = 9;

  function allLists() { return (ST.data.lists || []).filter(function (l) { return !l.deleted; }); }
  function listById(id) { var a = allLists(); for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function live() { return ST.data.pieces.filter(function (p) { return !p.deleted; }); }
  function byUpdated(a, b) { return (b.updated || 0) - (a.updated || 0); }
  function ordered(id) {
    var l = listById(id), order = (l && l.order) || [];
    var mem = live().filter(function (p) { return (p.lists || []).indexOf(id) >= 0; });
    mem.sort(function (a, b) {
      var x = order.indexOf(a.id), y = order.indexOf(b.id);
      if (x < 0 && y < 0) return byUpdated(a, b);
      if (x < 0) return 1;
      if (y < 0) return -1;
      return x - y;
    });
    return mem;
  }
  L.ordered = ordered;
  function touch(l) { l.updated = Date.now(); ST.save(); }

  L.items = function () {
    if (L.cur !== "all" && !listById(L.cur)) L.cur = "all";
    var arr = L.cur === "all" ? live().sort(byUpdated) : ordered(L.cur);
    var q = (L.q || "").trim().toLowerCase();
    if (q) arr = arr.filter(function (p) { return String(p.title || "").toLowerCase().indexOf(q) >= 0; });
    return arr;
  };

  /* ---------------- the chips and the search box ---------------- */
  L.top = function () {
    var box = $("listTop"), ch = $("lChips"), qn = $("lSearch");
    if (!box) return;
    var n = live().length, ls = allLists();
    box.hidden = !n && !ls.length;
    if (L.cur !== "all" && !listById(L.cur)) L.cur = "all";
    var h = '<button class="chip" type="button" data-l="all" aria-pressed="' + (L.cur === "all") + '">All</button>';
    ls.forEach(function (l) {
      h += '<button class="chip" type="button" data-l="' + esc(l.id) + '" aria-pressed="' + (L.cur === l.id) + '">' + esc(l.name) + "</button>";
      if (L.cur === l.id) h += '<button class="chip ic" type="button" data-opts="' + esc(l.id) + '" aria-label="List options">' + A.ICON.dots + "</button>";
    });
    h += '<button class="chip ic" type="button" id="lNew" aria-label="New list">+</button>';
    ch.innerHTML = h;
    Array.prototype.forEach.call(ch.querySelectorAll("[data-l]"), function (b) {
      b.onclick = function () { L.cur = b.getAttribute("data-l"); L.q = ""; A.renderList(); };
    });
    Array.prototype.forEach.call(ch.querySelectorAll("[data-opts]"), function (b) { b.onclick = function () { listMenu(listById(b.getAttribute("data-opts"))); }; });
    $("lNew").onclick = function () { newList(); };
    var showQ = n >= SEARCH_MIN;
    qn.hidden = !showQ;
    if (!showQ) L.q = "";
    if (qn.value !== L.q) qn.value = L.q;
    qn.oninput = function () { L.q = qn.value; A.renderList(true); };
  };

  function newList(then) {
    A.askText("New list", "", function (name) {
      var l = { id: A.uid(), name: name, order: [], updated: Date.now() };
      ST.data.lists = ST.data.lists || []; ST.data.lists.push(l);
      ST.save();
      if (then) then(l); else { L.cur = l.id; A.renderList(); }
    });
  }
  function listMenu(l) {
    if (!l) return;
    var d = A.dialog('<div class="sh-h"><h2>' + esc(l.name) + '</h2></div><div class="menu"><button class="btn" id="lmRen" type="button">Rename</button><button class="btn" id="lmDel" type="button" style="color:var(--danger)">Delete list</button></div>');
    d.querySelector("#lmRen").onclick = function () { A.askText("Rename", l.name, function (v) { l.name = v; touch(l); A.renderList(); }); };
    d.querySelector("#lmDel").onclick = function () {
      A.confirmBox("Delete the list “" + l.name + "”? The pieces stay.", "Delete", function () {
        ST.data.lists.forEach(function (x) { if (x === l) { x.deleted = true; x.order = []; x.updated = Date.now(); } });
        live().forEach(function (p) { if ((p.lists || []).indexOf(l.id) >= 0) p.lists = p.lists.filter(function (i) { return i !== l.id; }); });
        if (L.cur === l.id) L.cur = "all";
        ST.save(); A.renderList();
      });
    };
  }

  /* ---------------- a piece's lists ---------------- */
  L.addTo = function (p) {
    var ls = allLists();
    var h = '<div class="sh-h"><h2>Add to list</h2></div><div class="menu" id="alRows">';
    ls.forEach(function (l) {
      h += '<button class="btn pickrow" type="button" data-l="' + esc(l.id) + '" aria-pressed="' + ((p.lists || []).indexOf(l.id) >= 0) + '">' + esc(l.name) + '<i class="tick" aria-hidden="true"></i></button>';
    });
    h += '</div><div class="btns"><button class="btn" id="alNew" type="button">New list</button><button class="btn pri" id="alDone" type="button">Done</button></div>';
    var d = A.dialog(h);
    Array.prototype.forEach.call(d.querySelectorAll("[data-l]"), function (b) {
      b.onclick = function () {
        var id = b.getAttribute("data-l"), set = p.lists = p.lists || [], i = set.indexOf(id);
        if (i >= 0) set.splice(i, 1); else set.push(id);
        b.setAttribute("aria-pressed", String(i < 0));
        var l = listById(id);
        if (l && i < 0) { l.order = (l.order || []).filter(function (x) { return x !== p.id; }); l.order.push(p.id); l.updated = Date.now(); }
        p.updated = Date.now(); ST.save();
      };
    });
    d.querySelector("#alNew").onclick = function () { newList(function (l) { L.addTo(p); }); };
    d.querySelector("#alDone").onclick = function () { A.closeDlg(); A.renderList(); };
  };

  /* ---------------- order within a list ---------------- */
  L.move = function (p, dir) {
    var l = listById(L.cur);
    if (!l) return;
    var ids = ordered(l.id).map(function (x) { return x.id; }), i = ids.indexOf(p.id), j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length) return;
    var t = ids[i]; ids[i] = ids[j]; ids[j] = t;
    l.order = ids; touch(l);
    A.renderList();
  };
  L.decorate = function (li, p, i, n) {
    if (L.cur === "all" || (L.q || "").trim()) return;
    var box = el("span", "mv");
    var up = el("button", "mvb", A.ICON.up), dn = el("button", "mvb", A.ICON.down);
    up.type = dn.type = "button";
    up.setAttribute("aria-label", "Move up"); dn.setAttribute("aria-label", "Move down");
    up.disabled = i === 0; dn.disabled = i === n - 1;
    up.onclick = function () { L.move(p, -1); }; dn.onclick = function () { L.move(p, 1); };
    box.appendChild(up); box.appendChild(dn);
    li.insertBefore(box, li.lastChild);
  };

  /* ---------------- opening from a list, next / previous in the player ---------------- */
  L.opening = function () { L.ctx = L.cur !== "all" && listById(L.cur) ? L.cur : null; };
  function nav() {
    var row = $("lrow");
    if (!row) return;
    var p = S.piece, l = L.ctx && listById(L.ctx), ids = l ? ordered(l.id).map(function (x) { return x.id; }) : [], i = p ? ids.indexOf(p.id) : -1;
    row.hidden = i < 0;
    if (i >= 0) {
      $("lName").textContent = l.name + " · " + (i + 1) + "/" + ids.length;
      $("lPrev").disabled = i === 0; $("lNext").disabled = i === ids.length - 1;
      $("lPrev").onclick = function () { go(ids[i - 1]); }; $("lNext").onclick = function () { go(ids[i + 1]); };
    }
    A.layout();
  }
  function go(id) { if (id) location.hash = "#/p/" + id; }
  PA.on("open", nav);
  PA.on("leave", function () { var row = $("lrow"); if (row) { row.hidden = true; A.layout(); } });
  A.listsChanged = function () { if (S.route === "player") nav(); };
})();
