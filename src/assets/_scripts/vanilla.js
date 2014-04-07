// just it case scripts below breack everything on a browser, just put the css like if there is no js
var html = document.documentElement
html.className = html.className.replace(/\bjs\b/, "no-js")

if (document.querySelector && html.classList) {
  var forEach = Array.prototype.forEach
    , parallax = {}
    , whenDOMReady = function () {
        ///
        // Delay not visible CSS animations on load
        ///
        new WOW({
          boxClass: "Animate"
        , animateClass: "Animated"
        , offset: 100
        , initAlreadyVisible: false
        }).init()

        ///
        // Responsive navigation menu
        ///
        forEach.call(document.getElementsByClassName("js-Togglable"), function(el) {
          var toggler = el.querySelector(".js-Togglable-toggler")
          var items = [].slice.call(el.getElementsByClassName("js-Togglable-item"))

          var toggle = function(event) {
            el.classList.toggle("js-Togglable--toggled")
            items.forEach(function(item) {
              item.classList.toggle("js-Togglable-item--hidden")
            })
          }

          toggler.addEventListener("click", toggle)
          toggler.addEventListener("keyup", toggle)
        })

        ///
        // Mailto
        ///
        forEach.call(document.getElementsByClassName("js-MailTo"), function(el) {
          el.setAttribute("href", "mailto:" + el.getAttribute("data-mailto-user") + "@" + (el.getAttribute("data-mailto-domain") || window.location.host))
        })
      }

  whenDOMReady()

  ///
  // Enable Ajax animation
  ///
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
    selectors: ["title", ".Navbar", ".mx-Header-body", ".mx-Content", ".mx-Footer-body", ".js-Disqus"]
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


  ///
  // Lazy display background image
  ///
  var updateLoadStatus = function() {
    this.classList.remove("js-is-Loading")
    this.classList.add("js-is-Loaded")
  }
  document.documentElement.addEventListener("load", function listenImgLoad(event) {
    if (event.target.classList.contains("js-is-Loading")) {
      updateLoadStatus.call(event.target)
    }
  }, true)

  // background images
  forEach.call(document.getElementsByClassName("js-is-Loading"), function(el) {
    var backgroundImages = window.getComputedStyle(el, null).getPropertyValue("background-image")
      , backgroundUrlRegex = /url\((?:'|")?([^\)'"]+)(?:'|")?\),?\s?/g
      , backgroundImagesUrl = backgroundUrlRegex.exec(backgroundImages)
      , imgLoaded = updateLoadStatus.bind(el)
    while(backgroundImagesUrl && backgroundImagesUrl[1]) {
      var img = new Image()
      img.src = backgroundImagesUrl[1]
      img.onload = imgLoaded
      backgroundImagesUrl = backgroundUrlRegex.exec(backgroundImages)
    }
  })

  // CSS .loaded class
  window.addEventListener("load", function() {
    html.classList.add("loaded")
  })

  ///
  // Parallax effect for background image when scrolling
  ///
  new Parallaxify({elements: ".mx-BackgroundImg" }).registerUpdate()

  // CSS js class
  html.className = html.className.replace(/\bno-js\b/, "js")
}
