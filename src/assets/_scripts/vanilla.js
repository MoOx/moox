// just it case scripts below breack everything on a browser, just put the css like if there is no js
var docEl = document.documentElement
docEl.className = docEl.className.replace(/\bjs\b/, "no-js")

// call me just before bottom, I’ll be dom ready :p
//document.addEventListener('DOMContentReady', function() {

if (document.querySelector && document.documentElement.classList) {
  var forEach = Array.prototype.forEach
    , whenDOMReady = function() {
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

  new Pjax({
    selectors: ["title", ".Navbar", ".mx-Header", ".mx-Content", ".mx-Footer"]
  , switches: {
        ".mx-Header": Pjax.switches.sideBySide
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

  // everything run fine, let’s tell this to our stylesheets
  docEl.className = docEl.className.replace(/\bno-js\b/, "js")
}
