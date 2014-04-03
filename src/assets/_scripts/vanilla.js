// just it case scripts below breack everything on a browser, just put the css like if there is no js
var html = document.documentElement
html.className = html.className.replace(/\bjs\b/, "no-js")

if (document.querySelector && html.classList) {
  var forEach = Array.prototype.forEach
    , parallax = {}
    , whenDOMReady = function () {
        new WOW({
          boxClass: "Animate"
        , animateClass: "Animated"
        , offset: 100
        , initAlreadyVisible: false
        }).init()

        forEach.call(document.getElementsByClassName("js-Togglable"), function(el) {
          var toggler = el.querySelector(".js-Togglable-toggler")
          var items = [].slice.call(el.getElementsByClassName("js-Togglable-item"))

          var toggle = function(event) {
            el.classList.toggle("js-Togglable--toggled")
            items.forEach(function(item) {
              item.classList.toggle("js-Togglable-item--hide")
            })
          }

          toggler.addEventListener("click", toggle)
          toggler.addEventListener("keyup", toggle)
        })

        forEach.call(document.getElementsByClassName("js-MailTo"), function(el) {
          el.setAttribute("href", "mailto:" + el.getAttribute("data-mailto-user") + "@" + (el.getAttribute("data-mailto-domain") || window.location.host))
        })
      }

  whenDOMReady()

  var sideBySideOptions = {
      classNames: {
        remove: "Animated Animated--reverse Animate--fast Animate--noDelay"
      , add: "Animated"
      , backward: "Animate--slideInRight"
      , forward: "Animate--slideInLeft"
      }
    , callbacks: {
        removeElement: function(el) {
          el.style.marginLeft = "-" + (el.getBoundingClientRect().width/2) + "px"
        }
      }
    }
  , mxHtmlClassNameRegex = /mx--[a-z]+/;

  new Pjax({
    selectors: ["title", ".Navbar", ".mx-Header-body", ".mx-Content", ".mx-Footer-body"]
  , switches: {
      "title": function(oldEl, newEl, options, switchOptions) {
        // switch html class
        var htmlClassName = newEl.parentNode.parentNode.className.match(mxHtmlClassNameRegex)
        if (htmlClassName && htmlClassName.length) {
          oldEl.parentNode.parentNode.className = oldEl.parentNode.parentNode.className.replace(mxHtmlClassNameRegex, htmlClassName[0])
        }
        Pjax.switches.outerHTML.apply(this, arguments)
      }
    , ".mx-Header": Pjax.switches.sideBySide
    , ".mx-Content": Pjax.switches.sideBySide
    }
  , switchesOptions: {
      ".mx-Header": sideBySideOptions
    , ".mx-Content": sideBySideOptions
    }
  // , debug: window.location.hostname == "localhost"
  })

  document.addEventListener("pjax:send", function() {
    document.querySelector(".mx-Content .js-Pjax-child").classList.add("js-Pjax-child--willChange")
  })
  document.addEventListener("pjax:success", whenDOMReady)

  // CSS .loaded class
  window.addEventListener("load", function() {
    html.classList.add("loaded")
  })

  new Parallaxify({elements: ".mx-BackgroundImg" }).registerUpdate()

  // CSS js class
  html.className = html.className.replace(/\bno-js\b/, "js")
}
