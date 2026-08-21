(function () {
	document.documentElement.classList.add("js");

	var toggle = document.querySelector(".nav-toggle");
	if (toggle) {
		toggle.addEventListener("click", function () {
			var isOpen = toggle.getAttribute("aria-expanded") === "true";
			toggle.setAttribute("aria-expanded", String(!isOpen));
		});
	}

	// Timeline: translate vertical wheel motion into horizontal scroll while
	// the row can still move in that direction; otherwise let the page scroll.
	var strip = document.querySelector(".timeline-bleed");
	if (strip) {
		strip.addEventListener(
			"wheel",
			function (ev) {
				if (ev.deltaMode !== 0) return;
				if (Math.abs(ev.deltaX) >= Math.abs(ev.deltaY)) return;
				var max = strip.scrollWidth - strip.clientWidth;
				if (max <= 0) return;
				var next = strip.scrollLeft + ev.deltaY;
				if ((ev.deltaY < 0 && strip.scrollLeft > 0) || (ev.deltaY > 0 && strip.scrollLeft < max)) {
					strip.scrollLeft = Math.max(0, Math.min(max, next));
					ev.preventDefault();
				}
			},
			{ passive: false }
		);
	}

	// Timeline layout toggle (desktop only — the button is hidden under
	// 641px, where the stacked layout applies via media query regardless).
	var tlToggle = document.querySelector(".tl-toggle");
	if (tlToggle) {
		var KEY = "timeline-layout";
		var saved = null;
		try { saved = window.localStorage.getItem(KEY); } catch (err) {}
		var setStacked = function (stacked) {
			if (stacked) {
				document.documentElement.setAttribute("data-timeline", "stacked");
			} else {
				document.documentElement.removeAttribute("data-timeline");
			}
			tlToggle.setAttribute("aria-pressed", String(stacked));
			tlToggle.textContent = stacked ? "Show as row" : "Stack by year";
		};
		setStacked(saved === "stacked");
		tlToggle.addEventListener("click", function () {
			var stacked = document.documentElement.getAttribute("data-timeline") !== "stacked";
			setStacked(stacked);
			try { window.localStorage.setItem(KEY, stacked ? "stacked" : "row"); } catch (err) {}
		});
	}
})();
