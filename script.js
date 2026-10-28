"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.classList.add("js-ready");
  initMobileMenu();
  initScrollReveal();
  initActiveNavigation();
  initBackToTop();
  initFooterYear();
  console.log("Kenzhi Portfolio is ready! 🚀");

  function initMobileMenu() {
    const toggle = document.querySelector("#menu-toggle");
    const nav = document.querySelector("#nav-links");
    if (!toggle || !nav) return;

    function closeMenu() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (element) { element.classList.add("visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    elements.forEach(function (element) { observer.observe(element); });
  }

  function initActiveNavigation() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-link");
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  function initBackToTop() {
    const button = document.querySelector("#back-to-top");
    if (!button) return;

    function updateVisibility() {
      button.classList.toggle("show", window.scrollY > 350);
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    button.addEventListener("click", function () {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
    updateVisibility();
  }

  function initFooterYear() {
    const year = document.querySelector("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }
});
