(function () {
	document.documentElement.classList.add("js");

	var toggle = document.querySelector(".nav-toggle");
	if (!toggle) return;

	toggle.addEventListener("click", function () {
		var isOpen = toggle.getAttribute("aria-expanded") === "true";
		toggle.setAttribute("aria-expanded", String(!isOpen));
	});
})();
