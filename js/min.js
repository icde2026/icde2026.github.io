!function(e) {
    "use strict";
    e.matches = e.matches || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector,
    e.closest = e.closest || function(e) {
        for (var t = this; t.parentElement; ) {
            if (t.matches(e))
                return t;
            t = t.parentElement
        }
        return null
    }
}(Element.prototype),
function(e, t, a) {
    "use strict";
    var n = {}
      , o = {}
      , i = "data-delegate-stamp"
      , r = function(e, t, a, c) {
        var s = o[e];
        if (e && n[e] && s && (!t || n[e][t]))
            if (t) {
                if (c && !n[e][t][c])
                    return;
                void 0 !== a ? (c && [c] || Object.keys(n[e][t])).forEach(function(o) {
                    var i = n[self][t][o].indexOf(a);
                    i >= 0 && (n[e][t][o].splice(i, 1),
                    0 === n[e][t][o].length && (s.removeEventListener(t, o),
                    delete n[self][t][o]))
                }) : Object.keys(n[e][t]).forEach(function(e) {
                    s.removeEventListener(t, e),
                    delete n[self][t][e]
                })
            } else
                Object.keys(n[e]).forEach(function(t) {
                    r(e, t)
                }),
                delete n[e],
                s.removeAttribute(i),
                delete o[e]
    };
    new MutationObserver(function(e) {
        e.some(function(e) {
            return e.removedNodes.length
        }) && setTimeout(function() {
            Object.keys(o).forEach(function(e) {
                var t = o[e];
                t.parentNode || 9 === t.nodeType || r(e)
            })
        }, 1e3)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    var c = e.prototype.stopPropagation;
    e.prototype.stopPropagation = function() {
        this.propagationStopped = !0,
        c.apply(this, arguments)
    }
    ;
    var s = e.prototype.stopImmediatePropagation;
    e.prototype.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = !0,
        this.propagationStopped = !0,
        s.apply(this, arguments)
    }
    ,
    t.prototype.delegateEventListener = function(e, t, a) {
        if ("function" == typeof a && "string" == typeof t) {
            document.querySelector(t);
            var r = this
              , c = 9 === r.nodeType ? "document" : r.getAttribute(i);
            if (!c)
                do {
                    c = Math.random()
                } while (n[c]);
            o[c] = r,
            n[c] = n[c] || {},
            n[c][e] = n[c][e] || {},
            n[c][e][a] || (r.addEventListener(e, function(t) {
                var o = t.target;
                n[c][e][a].forEach(function(e) {
                    t.immediatePropagationStopped || o.matches(e) && a.call(o, t, e)
                }),
                t.propagationStopped || n[c][e][a].forEach(function(e) {
                    if (!t.propagationStopped) {
                        var n = o.parentElement;
                        n && (o = n.closest(e),
                        r.contains(o) && a.call(o, t, e))
                    }
                })
            }),
            n[c][e][a] = []),
            -1 === n[c][e][a].indexOf(t) && n[c][e][a].push(t)
        }
    }
    ,
    t.prototype.undelegateEventListener = function() {
        var e = this.getAttribute(i)
          , t = [e].concat(arguments);
        n[e] && r.apply(null, t)
    }
}(window.Event, window.EventTarget || window.Element, window),
function e(t) {
    var a, n = t.querySelector(".carousel[data-images]");
    if (!n)
        return setTimeout(e, 1e3);
    try {
        a = JSON.parse(n.getAttribute("data-images"))
    } catch (e) {
        return
    }
    var o = a
      , i = []
      , r = !0
      , c = 0;
    function s() {
        o.length > 0 && function(e) {
            if (!e || !e.i)
                return console.log("Failed to parse", e),
                s();
            var t = new Image;
            t.onload = function() {
                this.onerror = this.onabort = this.onload = null,
                i.push(e),
                s()
            }
            ,
            t.onerror = t.onabort = function() {
                this.onerror = this.onabort = this.onload = null,
                s()
            }
            ,
            t.src = e.i
        }(o.shift())
    }
    function l() {
        [].forEach.call(n.querySelectorAll("div:not(:last-child)"), function(e) {
            n.removeChild(e)
        })
    }
    s(),
    s(),
    s(),
    n.addEventListener("transitionend", function(e) {
        l()
    }),
    function e() {
        var a = i.length
          , o = (c + 1) % a
          , s = i[o]
          , d = s && s.t
          , u = s && s.i;
        if (0 === a || !u)
            return setTimeout(e, 1e3);
        if (a > 1) {
            c = o;
            var p = t.createElement("div");
            if (p.style.backgroundImage = "url(" + u + ")",
            p.setAttribute("data-url", u),
            t.body.setAttribute("carousel-img", u),
            d) {
                var f = t.createElement("div");
                f.classList.add("carousel-credit"),
                f.innerHTML = d,
                p.appendChild(f)
            }
            n.appendChild(p),
            setTimeout(function() {
                p.style.opacity = 1,
                r = !1
            }, r ? 100 : 1e3),
            setTimeout(function() {
                l()
            }, 3e3)
        }
        setTimeout(e, 15e3)
    }()
}(document);
var lastScrollY, smallMenu = document.querySelector("header .small-menu");
smallMenu && smallMenu.addEventListener("click", function(e) {
    e.preventDefault();
    var t = smallMenu.parentElement;
    "true" === t.getAttribute("aria-expanded") ? (t.removeAttribute("aria-expanded"),
    window.scrollTo(0, lastScrollY)) : (lastScrollY = window.scrollY,
    window.scrollTo(0, 0),
    t.setAttribute("aria-expanded", "true"))
}),
function(e, t) {
    var a;
    e.loadPage = function(e, n) {
        a && a.abort();
        var o = e.split("#", 2)
          , i = o[0]
          , r = o[1]
          , c = t.querySelector("main.body");
        if (c) {
            var s = t.querySelector("body>header");
            s && (s.setAttribute("aria-disabled", "true"),
            s.removeAttribute("aria-expanded")),
            c.classList.add("loading");
            var l = t.querySelector("header .carousel");
            l && (i && "home" !== i ? l.classList.add("small") : l.classList.remove("small")),
            (a = new XMLHttpRequest).addEventListener("load", function() {
                var e = this.responseText
                  , a = "ICDE 2026 - " + this.getResponseHeader("X-Page-Title")
                  , o = i && "home" !== i ? "?" + i : "";
                r && (o += "#" + r),
                !1 !== n && history.pushState(null, "", "./" + o),
                c.innerHTML = e + '<div class="spinner"></div>',
                c.classList.remove("loading"),
                document.title = a,
                r ? setTimeout(function() {
                    document.location.hash = "#" + r,
                    setTimeout(function() {
                        var e = document.querySelector("#" + r);
                        e && Math.abs(e.getBoundingClientRect().top) > 15 && e.scrollIntoView(!0)
                    }, 100)
                }, 100) : window.scrollTo(0, 0),
                gtag && gtag("config", "UA-115776710-1", {
                    page_path: "/2027/" + o
                }),
                t.documentElement.setAttribute("data-page", i),
                s && setTimeout(function() {
                    s.removeAttribute("aria-disabled")
                }, 200)
            }),
            a.open("GET", "./include.php?" + i),
            a.send()
        }
    }
    ,
    window.onpopstate = function(e) {
        var t = document.location.href.replace(/^.*\/\??([^\/]*)$/, "$1").replace(/^index.*\?/, "");
        loadPage(t, !1)
    }
    ,
    t.delegateEventListener("click", 'a[href^="./\\?"], a[href="./"]', function(e) {
        if (!(3 === e.which || 2 === e.button || e.shiftKey || e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            var t = this.getAttribute("href").replace(/^\.\/\??/, "").replace(/^index.*\?/, "");
            loadPage(t)
        }
    }),
    t.delegateEventListener("click", 'a[href^="http://"], a[href^="https://"]', function(e) {
        if (!(3 === e.which || 2 === e.button || e.shiftKey || e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            var t = this.getAttribute("href");
            window.open(t)
        }
    }),
    t.delegateEventListener("click", 'a[href^="mailto:"][data-uz][data-at]', function(e) {
        e.preventDefault();
        var t = "mailto:" + this.getAttribute("data-uz") + "@" + this.getAttribute("data-at");
        document.location.href = t
    })
}(window, document),
document.delegateEventListener("click", ".accepted-abstract:not(.accepted-expanded), .accepted-abstract.accepted-expanded .accepted-abstract-action", function(e) {
    console.log(e.target),
    e.preventDefault(),
    e.stopPropagation();
    var t = e.target.closest(".accepted-abstract");
    t && t.classList.toggle("accepted-expanded")
}),
function(e) {
    e.delegateEventListener("click", ".talk-abstract:not(.talks-expanded), .talk-abstract.talks-expanded .talk-abstract-action", function(e) {
        e.preventDefault(),
        e.stopPropagation();
        var t = e.target.closest(".talk-abstract");
        t && t.classList.toggle("talk-expanded")
    }),
    e.delegateEventListener("click", ".talk-bio:not(.bio-expanded), .talk-bio.bio-expanded .talk-bio-action", function(e) {
        e.preventDefault(),
        e.stopPropagation();
        var t = e.target.closest(".talk-bio");
        t && t.classList.toggle("bio-expanded")
    })
}(document),
function(e) {
    e.delegateEventListener("click", ".schedule-item-abstract:not(.schedule-item-expanded), .schedule-item-abstract.schedule-item-expanded .schedule-item-action", function(e) {
        e.preventDefault(),
        e.stopPropagation();
        var t = e.target.closest(".schedule-item-abstract");
        t && t.classList.toggle("schedule-item-expanded")
    }),
    e.delegateEventListener("click", ".schedule-item-bio:not(.schedule-item-expanded), .schedule-item-bio.schedule-item-expanded .schedule-item-action", function(e) {
        e.preventDefault(),
        e.stopPropagation();
        var t = e.target.closest(".schedule-item-bio");
        t && t.classList.toggle("schedule-item-expanded")
    })
}(document);
