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
})();
