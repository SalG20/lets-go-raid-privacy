// Language menu helper for every page. The menu itself is plain HTML (<details> with links), so it works without
// JavaScript; this file only (1) remembers the language the visitor picks (browser storage, never sent anywhere),
// (2) keeps the current #section when switching language, and (3) closes the menu with Escape or an outside click.
(function () {
  var KEY = "lgr_lang";

  document.addEventListener("click", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest("a[data-lang]") : null;
    if (link) {
      try {
        localStorage.setItem(KEY, link.getAttribute("data-lang"));
      } catch (e) {
        // Storage blocked (private mode): the choice still works for this visit.
      }
      var href = link.getAttribute("href");
      if (location.hash && href.indexOf("#") < 0) {
        event.preventDefault();
        location.href = href + location.hash;
      }
      return;
    }
    var openMenus = document.querySelectorAll("details.lang-menu[open]");
    for (var i = 0; i < openMenus.length; i++) {
      if (!openMenus[i].contains(target)) openMenus[i].removeAttribute("open");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var openMenus = document.querySelectorAll("details.lang-menu[open]");
    for (var i = 0; i < openMenus.length; i++) {
      openMenus[i].removeAttribute("open");
      var summary = openMenus[i].querySelector("summary");
      if (summary) summary.focus();
    }
  });
})();
