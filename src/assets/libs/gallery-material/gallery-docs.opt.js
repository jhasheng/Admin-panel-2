self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var Prism = function () {
  var a = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
    b = self.Prism = {
      util: {
        encode: function (a) {
          return a instanceof c ? new c(a.type, b.util.encode(a.content), a.alias) : "Array" === b.util.type(a) ? a.map(b.util.encode) : a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
        },
        type: function (a) {
          return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]
        },
        clone: function (a) {
          var c = b.util.type(a);
          switch (c) {
            case "Object":
              var d = {};
              for (var e in a) a.hasOwnProperty(e) && (d[e] = b.util.clone(a[e]));
              return d;
            case "Array":
              return a.slice()
          }
          return a
        }
      },
      languages: {
        extend: function (a, c) {
          var d = b.util.clone(b.languages[a]);
          for (var e in c) d[e] = c[e];
          return d
        },
        insertBefore: function (a, c, d, e) {
          e = e || b.languages;
          var f = e[a];
          if (2 == arguments.length) {
            d = arguments[1];
            for (var g in d) d.hasOwnProperty(g) && (f[g] = d[g]);
            return f
          }
          var h = {};
          for (var i in f)
            if (f.hasOwnProperty(i)) {
              if (i == c)
                for (var g in d) d.hasOwnProperty(g) && (h[g] = d[g]);
              h[i] = f[i]
            }
          return b.languages.DFS(b.languages, function (b, c) {
            c === e[a] && b != a && (this[b] = h)
          }), e[a] = h
        },
        DFS: function (a, c, d) {
          for (var e in a) a.hasOwnProperty(e) && (c.call(a, e, a[e], d || e), "Object" === b.util.type(a[e]) ? b.languages.DFS(a[e], c) : "Array" === b.util.type(a[e]) && b.languages.DFS(a[e], c, e))
        }
      },
      highlightAll: function (a, c) {
        for (var d, e = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), f = 0; d = e[f++];) b.highlightElement(d, a === !0, c)
      },
      highlightElement: function (d, e, f) {
        for (var g, h, i = d; i && !a.test(i.className);) i = i.parentNode;
        if (i && (g = (i.className.match(a) || [, ""])[1], h = b.languages[g]), h) {
          d.className = d.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g, i = d.parentNode, /pre/i.test(i.nodeName) && (i.className = i.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g);
          var j = d.textContent;
          if (j) {
            var k = {
              element: d,
              language: g,
              grammar: h,
              code: j
            };
            if (b.hooks.run("before-highlight", k), e && self.Worker) {
              var l = new Worker(b.filename);
              l.onmessage = function (a) {
                k.highlightedCode = c.stringify(JSON.parse(a.data), g), b.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(k.element), b.hooks.run("after-highlight", k)
              }, l.postMessage(JSON.stringify({
                language: k.language,
                code: k.code
              }))
            } else k.highlightedCode = b.highlight(k.code, k.grammar, k.language), b.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(d), b.hooks.run("after-highlight", k)
          }
        }
      },
      highlight: function (a, d, e) {
        var f = b.tokenize(a, d);
        return c.stringify(b.util.encode(f), e)
      },
      tokenize: function (a, c) {
        var d = b.Token,
          e = [a],
          f = c.rest;
        if (f) {
          for (var g in f) c[g] = f[g];
          delete c.rest
        }
        a: for (var g in c)
          if (c.hasOwnProperty(g) && c[g]) {
            var h = c[g];
            h = "Array" === b.util.type(h) ? h : [h];
            for (var i = 0; i < h.length; ++i) {
              var j = h[i],
                k = j.inside,
                l = !!j.lookbehind,
                m = 0,
                n = j.alias;
              j = j.pattern || j;
              for (var o = 0; o < e.length; o++) {
                var p = e[o];
                if (e.length > a.length) break a;
                if (!(p instanceof d)) {
                  j.lastIndex = 0;
                  var q = j.exec(p);
                  if (q) {
                    l && (m = q[1].length);
                    var r = q.index - 1 + m,
                      q = q[0].slice(m),
                      s = q.length,
                      t = r + s,
                      u = p.slice(0, r + 1),
                      v = p.slice(t + 1),
                      w = [o, 1];
                    u && w.push(u);
                    var x = new d(g, k ? b.tokenize(q, k) : q, n);
                    w.push(x), v && w.push(v), Array.prototype.splice.apply(e, w)
                  }
                }
              }
            }
          }
        return e
      },
      hooks: {
        all: {},
        add: function (a, c) {
          var d = b.hooks.all;
          d[a] = d[a] || [], d[a].push(c)
        },
        run: function (a, c) {
          var d = b.hooks.all[a];
          if (d && d.length)
            for (var e, f = 0; e = d[f++];) e(c)
        }
      }
    },
    c = b.Token = function (a, b, c) {
      this.type = a, this.content = b, this.alias = c
    };
  if (c.stringify = function (a, d, e) {
      if ("string" == typeof a) return a;
      if ("[object Array]" == Object.prototype.toString.call(a)) return a.map(function (b) {
        return c.stringify(b, d, a)
      }).join("");
      var f = {
        type: a.type,
        content: c.stringify(a.content, d, e),
        tag: "span",
        classes: ["token", a.type],
        attributes: {},
        language: d,
        parent: e
      };
      if ("comment" == f.type && (f.attributes.spellcheck = "true"), a.alias) {
        var g = "Array" === b.util.type(a.alias) ? a.alias : [a.alias];
        Array.prototype.push.apply(f.classes, g)
      }
      b.hooks.run("wrap", f);
      var h = "";
      for (var i in f.attributes) h += i + '="' + (f.attributes[i] || "") + '"';
      return "<" + f.tag + ' class="' + f.classes.join(" ") + '" ' + h + ">" + f.content + "</" + f.tag + ">"
    }, !self.document) return self.addEventListener ? (self.addEventListener("message", function (a) {
    var c = JSON.parse(a.data),
      d = c.language,
      e = c.code;
    self.postMessage(JSON.stringify(b.util.encode(b.tokenize(e, b.languages[d])))), self.close()
  }, !1), self.Prism) : self.Prism;
  var d = document.getElementsByTagName("script");
  return d = d[d.length - 1], d && (b.filename = d.src, document.addEventListener && !d.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", b.highlightAll)), self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism), Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/g,
    prolog: /<\?.+?\?>/,
    doctype: /<!DOCTYPE.+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
      pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
      inside: {
        tag: {
          pattern: /^<\/?[\w:-]+/i,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[\w-]+?:/
          }
        },
        "attr-value": {
          pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
          inside: {
            punctuation: /=|>|"/g
          }
        },
        punctuation: /\/?>/g,
        "attr-name": {
          pattern: /[\w:-]+/g,
          inside: {
            namespace: /^[\w-]+?:/
          }
        }
      }
    },
    entity: /\&#?[\da-z]{1,8};/gi
  }, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
  }), Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
      pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
      inside: {
        punctuation: /[;:]/g
      }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    punctuation: /[\{\};:]/g,
    "function": /[-a-z0-9]+(?=\()/gi
  }, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
      pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
      inside: {
        tag: {
          pattern: /<style[\w\W]*?>|<\/style>/gi,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.css
      },
      alias: "language-css"
    }
  }), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
      pattern: /\s*style=("|').+?\1/gi,
      inside: {
        "attr-name": {
          pattern: /^\s*style/gi,
          inside: Prism.languages.markup.tag.inside
        },
        punctuation: /^\s*=\s*['"]|['"]\s*$/,
        "attr-value": {
          pattern: /.+/gi,
          inside: Prism.languages.css
        }
      },
      alias: "language-css"
    }
  }, Prism.languages.markup.tag)), Prism.languages.clike = {
    comment: [{
      pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
      lookbehind: !0
    }, {
      pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
      lookbehind: !0
    }],
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
      pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
      lookbehind: !0,
      inside: {
        punctuation: /(\.|\\)/
      }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
      pattern: /[a-z0-9_]+\(/gi,
      inside: {
        punctuation: /\(/
      }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
  }, Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,
    "function": /(?!\d)[a-z0-9_$]+(?=\()/gi
  }), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
      lookbehind: !0
    }
  }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
      pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
      inside: {
        tag: {
          pattern: /<script[\w\W]*?>|<\/script>/gi,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.javascript
      },
      alias: "language-javascript"
    }
  }), Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
      pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
      lookbehind: !0
    },
    atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,
    url: /([-a-z]+-)*url(?=\()/gi,
    selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
  }), Prism.languages.insertBefore("scss", "atrule", {
    keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
  }), Prism.languages.insertBefore("scss", "property", {
    variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
  }), Prism.languages.insertBefore("scss", "ignore", {
    placeholder: /%[-_\w]+/i,
    statement: /\B!(default|optional)\b/gi,
    "boolean": /\b(true|false)\b/g,
    "null": /\b(null)\b/g,
    operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
  }), Prism.languages.bash = Prism.languages.extend("clike", {
    comment: {
      pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
      lookbehind: !0
    },
    string: {
      pattern: /("|')(\\?[\s\S])*?\1/g,
      inside: {
        property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
      }
    },
    keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
  }), Prism.languages.insertBefore("bash", "keyword", {
    property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
  }), Prism.languages.insertBefore("bash", "comment", {
    important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
  }), ! function (a, b) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", b) : "object" == typeof module && module.exports ? module.exports = b() : a.EvEmitter = b()
  }(this, function () {
    function a() {}
    var b = a.prototype;
    return b.on = function (a, b) {
      if (a && b) {
        var c = this._events = this._events || {},
          d = c[a] = c[a] || [];
        return -1 == d.indexOf(b) && d.push(b), this
      }
    }, b.once = function (a, b) {
      if (a && b) {
        this.on(a, b);
        var c = this._onceEvents = this._onceEvents || {},
          d = c[a] = c[a] || [];
        return d[b] = !0, this
      }
    }, b.off = function (a, b) {
      var c = this._events && this._events[a];
      if (c && c.length) {
        var d = c.indexOf(b);
        return -1 != d && c.splice(d, 1), this
      }
    }, b.emitEvent = function (a, b) {
      var c = this._events && this._events[a];
      if (c && c.length) {
        var d = 0,
          e = c[d];
        b = b || [];
        for (var f = this._onceEvents && this._onceEvents[a]; e;) {
          var g = f && f[e];
          g && (this.off(a, e), delete f[e]), e.apply(this, b), d += g ? 0 : 1, e = c[d]
        }
        return this
      }
    }, a
  }),
  function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (c) {
      return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter")) : a.imagesLoaded = b(a, a.EvEmitter)
  }(window, function (a, b) {
    function c(a, b) {
      for (var c in b) a[c] = b[c];
      return a
    }

    function d(a) {
      var b = [];
      if (Array.isArray(a)) b = a;
      else if ("number" == typeof a.length)
        for (var c = 0; c < a.length; c++) b.push(a[c]);
      else b.push(a);
      return b
    }

    function e(a, b, f) {
      return this instanceof e ? ("string" == typeof a && (a = document.querySelectorAll(a)), this.elements = d(a), this.options = c({}, this.options), "function" == typeof b ? f = b : c(this.options, b), f && this.on("always", f), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
        this.check()
      }.bind(this))) : new e(a, b, f)
    }

    function f(a) {
      this.img = a
    }

    function g(a, b) {
      this.url = a, this.element = b, this.img = new Image
    }
    var h = a.jQuery,
      i = a.console;
    e.prototype = Object.create(b.prototype), e.prototype.options = {}, e.prototype.getImages = function () {
      this.images = [], this.elements.forEach(this.addElementImages, this)
    }, e.prototype.addElementImages = function (a) {
      "IMG" == a.nodeName && this.addImage(a), this.options.background === !0 && this.addElementBackgroundImages(a);
      var b = a.nodeType;
      if (b && j[b]) {
        for (var c = a.querySelectorAll("img"), d = 0; d < c.length; d++) {
          var e = c[d];
          this.addImage(e)
        }
        if ("string" == typeof this.options.background) {
          var f = a.querySelectorAll(this.options.background);
          for (d = 0; d < f.length; d++) {
            var g = f[d];
            this.addElementBackgroundImages(g)
          }
        }
      }
    };
    var j = {
      1: !0,
      9: !0,
      11: !0
    };
    return e.prototype.addElementBackgroundImages = function (a) {
      var b = getComputedStyle(a);
      if (b)
        for (var c = /url\((['"])?(.*?)\1\)/gi, d = c.exec(b.backgroundImage); null !== d;) {
          var e = d && d[2];
          e && this.addBackground(e, a), d = c.exec(b.backgroundImage)
        }
    }, e.prototype.addImage = function (a) {
      var b = new f(a);
      this.images.push(b)
    }, e.prototype.addBackground = function (a, b) {
      var c = new g(a, b);
      this.images.push(c)
    }, e.prototype.check = function () {
      function a(a, c, d) {
        setTimeout(function () {
          b.progress(a, c, d)
        })
      }
      var b = this;
      return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (b) {
        b.once("progress", a), b.check()
      }) : void this.complete()
    }, e.prototype.progress = function (a, b, c) {
      this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded, this.emitEvent("progress", [this, a, b]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, a), this.progressedCount == this.images.length && this.complete(), this.options.debug && i && i.log("progress: " + c, a, b)
    }, e.prototype.complete = function () {
      var a = this.hasAnyBroken ? "fail" : "done";
      if (this.isComplete = !0, this.emitEvent(a, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
        var b = this.hasAnyBroken ? "reject" : "resolve";
        this.jqDeferred[b](this)
      }
    }, f.prototype = Object.create(b.prototype), f.prototype.check = function () {
      var a = this.getIsImageComplete();
      return a ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, f.prototype.getIsImageComplete = function () {
      return this.img.complete && void 0 !== this.img.naturalWidth
    }, f.prototype.confirm = function (a, b) {
      this.isLoaded = a, this.emitEvent("progress", [this, this.img, b])
    }, f.prototype.handleEvent = function (a) {
      var b = "on" + a.type;
      this[b] && this[b](a)
    }, f.prototype.onload = function () {
      this.confirm(!0, "onload"), this.unbindEvents()
    }, f.prototype.onerror = function () {
      this.confirm(!1, "onerror"), this.unbindEvents()
    }, f.prototype.unbindEvents = function () {
      this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, g.prototype = Object.create(f.prototype), g.prototype.check = function () {
      this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
      var a = this.getIsImageComplete();
      a && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, g.prototype.unbindEvents = function () {
      this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, g.prototype.confirm = function (a, b) {
      this.isLoaded = a, this.emitEvent("progress", [this, this.element, b])
    }, e.makeJQueryPlugin = function (b) {
      b = b || a.jQuery, b && (h = b, h.fn.imagesLoaded = function (a, b) {
        var c = new e(this, a, b);
        return c.jqDeferred.promise(h(this))
      })
    }, e.makeJQueryPlugin(), e
  }), ! function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (c) {
      b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("jquery")) : a.jQueryBridget = b(a, a.jQuery)
  }(window, function (a, b) {
    "use strict";

    function c(c, f, h) {
      function i(a, b, d) {
        var e, f = "$()." + c + '("' + b + '")';
        return a.each(function (a, i) {
          var j = h.data(i, c);
          if (!j) return void g(c + " not initialized. Cannot call methods, i.e. " + f);
          var k = j[b];
          if (!k || "_" == b.charAt(0)) return void g(f + " is not a valid method");
          var l = k.apply(j, d);
          e = void 0 === e ? l : e
        }), void 0 !== e ? e : a
      }

      function j(a, b) {
        a.each(function (a, d) {
          var e = h.data(d, c);
          e ? (e.option(b), e._init()) : (e = new f(d, b), h.data(d, c, e))
        })
      }
      h = h || b || a.jQuery, h && (f.prototype.option || (f.prototype.option = function (a) {
        h.isPlainObject(a) && (this.options = h.extend(!0, this.options, a))
      }), h.fn[c] = function (a) {
        if ("string" == typeof a) {
          var b = e.call(arguments, 1);
          return i(this, a, b)
        }
        return j(this, a), this
      }, d(h))
    }

    function d(a) {
      !a || a && a.bridget || (a.bridget = c)
    }
    var e = Array.prototype.slice,
      f = a.console,
      g = "undefined" == typeof f ? function () {} : function (a) {
        f.error(a)
      };
    return d(b || a.jQuery), c
  }),
  function (a, b) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", b) : "object" == typeof module && module.exports ? module.exports = b() : a.EvEmitter = b()
  }(this, function () {
    function a() {}
    var b = a.prototype;
    return b.on = function (a, b) {
      if (a && b) {
        var c = this._events = this._events || {},
          d = c[a] = c[a] || [];
        return -1 == d.indexOf(b) && d.push(b), this
      }
    }, b.once = function (a, b) {
      if (a && b) {
        this.on(a, b);
        var c = this._onceEvents = this._onceEvents || {},
          d = c[a] = c[a] || [];
        return d[b] = !0, this
      }
    }, b.off = function (a, b) {
      var c = this._events && this._events[a];
      if (c && c.length) {
        var d = c.indexOf(b);
        return -1 != d && c.splice(d, 1), this
      }
    }, b.emitEvent = function (a, b) {
      var c = this._events && this._events[a];
      if (c && c.length) {
        var d = 0,
          e = c[d];
        b = b || [];
        for (var f = this._onceEvents && this._onceEvents[a]; e;) {
          var g = f && f[e];
          g && (this.off(a, e), delete f[e]), e.apply(this, b), d += g ? 0 : 1, e = c[d]
        }
        return this
      }
    }, a
  }),
  function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
      return b()
    }) : "object" == typeof module && module.exports ? module.exports = b() : a.getSize = b()
  }(window, function () {
    "use strict";

    function a(a) {
      var b = parseFloat(a),
        c = -1 == a.indexOf("%") && !isNaN(b);
      return c && b
    }

    function b() {}

    function c() {
      for (var a = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        }, b = 0; j > b; b++) {
        var c = i[b];
        a[c] = 0
      }
      return a
    }

    function d(a) {
      var b = getComputedStyle(a);
      return b || h("Style returned " + b + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), b
    }

    function e() {
      if (!k) {
        k = !0;
        var b = document.createElement("div");
        b.style.width = "200px", b.style.padding = "1px 2px 3px 4px", b.style.borderStyle = "solid", b.style.borderWidth = "1px 2px 3px 4px", b.style.boxSizing = "border-box";
        var c = document.body || document.documentElement;
        c.appendChild(b);
        var e = d(b);
        f.isBoxSizeOuter = g = 200 == a(e.width), c.removeChild(b)
      }
    }

    function f(b) {
      if (e(), "string" == typeof b && (b = document.querySelector(b)), b && "object" == typeof b && b.nodeType) {
        var f = d(b);
        if ("none" == f.display) return c();
        var h = {};
        h.width = b.offsetWidth, h.height = b.offsetHeight;
        for (var k = h.isBorderBox = "border-box" == f.boxSizing, l = 0; j > l; l++) {
          var m = i[l],
            n = f[m],
            o = parseFloat(n);
          h[m] = isNaN(o) ? 0 : o
        }
        var p = h.paddingLeft + h.paddingRight,
          q = h.paddingTop + h.paddingBottom,
          r = h.marginLeft + h.marginRight,
          s = h.marginTop + h.marginBottom,
          t = h.borderLeftWidth + h.borderRightWidth,
          u = h.borderTopWidth + h.borderBottomWidth,
          v = k && g,
          w = a(f.width);
        w !== !1 && (h.width = w + (v ? 0 : p + t));
        var x = a(f.height);
        return x !== !1 && (h.height = x + (v ? 0 : q + u)), h.innerWidth = h.width - (p + t), h.innerHeight = h.height - (q + u), h.outerWidth = h.width + r, h.outerHeight = h.height + s, h
      }
    }
    var g, h = "undefined" == typeof console ? b : function (a) {
        console.error(a)
      },
      i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      j = i.length,
      k = !1;
    return f
  }),
  function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", b) : "object" == typeof module && module.exports ? module.exports = b() : a.matchesSelector = b()
  }(window, function () {
    "use strict";
    var a = function () {
      var a = Element.prototype;
      if (a.matches) return "matches";
      if (a.matchesSelector) return "matchesSelector";
      for (var b = ["webkit", "moz", "ms", "o"], c = 0; c < b.length; c++) {
        var d = b[c],
          e = d + "MatchesSelector";
        if (a[e]) return e
      }
    }();
    return function (b, c) {
      return b[a](c)
    }
  }),
  function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["matches-selector/matches-selector"], function (c) {
      return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.matchesSelector)
  }(window, function (a, b) {
    var c = {};
    c.extend = function (a, b) {
      for (var c in b) a[c] = b[c];
      return a
    }, c.modulo = function (a, b) {
      return (a % b + b) % b
    }, c.makeArray = function (a) {
      var b = [];
      if (Array.isArray(a)) b = a;
      else if (a && "number" == typeof a.length)
        for (var c = 0; c < a.length; c++) b.push(a[c]);
      else b.push(a);
      return b
    }, c.removeFrom = function (a, b) {
      var c = a.indexOf(b); - 1 != c && a.splice(c, 1)
    }, c.getParent = function (a, c) {
      for (; a != document.body;)
        if (a = a.parentNode, b(a, c)) return a
    }, c.getQueryElement = function (a) {
      return "string" == typeof a ? document.querySelector(a) : a
    }, c.handleEvent = function (a) {
      var b = "on" + a.type;
      this[b] && this[b](a)
    }, c.filterFindElements = function (a, d) {
      a = c.makeArray(a);
      var e = [];
      return a.forEach(function (a) {
        if (a instanceof HTMLElement) {
          if (!d) return void e.push(a);
          b(a, d) && e.push(a);
          for (var c = a.querySelectorAll(d), f = 0; f < c.length; f++) e.push(c[f])
        }
      }), e
    }, c.debounceMethod = function (a, b, c) {
      var d = a.prototype[b],
        e = b + "Timeout";
      a.prototype[b] = function () {
        var a = this[e];
        a && clearTimeout(a);
        var b = arguments,
          f = this;
        this[e] = setTimeout(function () {
          d.apply(f, b), delete f[e]
        }, c || 100)
      }
    }, c.docReady = function (a) {
      "complete" == document.readyState ? a() : document.addEventListener("DOMContentLoaded", a)
    }, c.toDashed = function (a) {
      return a.replace(/(.)([A-Z])/g, function (a, b, c) {
        return b + "-" + c
      }).toLowerCase()
    };
    var d = a.console;
    return c.htmlInit = function (b, e) {
      c.docReady(function () {
        var f = c.toDashed(e),
          g = "data-" + f,
          h = document.querySelectorAll("[" + g + "]"),
          i = document.querySelectorAll(".js-" + f),
          j = c.makeArray(h).concat(c.makeArray(i)),
          k = g + "-options",
          l = a.jQuery;
        j.forEach(function (a) {
          var c, f = a.getAttribute(g) || a.getAttribute(k);
          try {
            c = f && JSON.parse(f)
          } catch (h) {
            return void(d && d.error("Error parsing " + g + " on " + a.className + ": " + h))
          }
          var i = new b(a, c);
          l && l.data(a, e, i)
        })
      })
    }, c
  }),
  function (a, b) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], function (c, d) {
      return b(a, c, d)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter"), require("get-size")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EvEmitter, a.getSize))
  }(window, function (a, b, c) {
    "use strict";

    function d(a) {
      for (var b in a) return !1;
      return b = null, !0
    }

    function e(a, b) {
      a && (this.element = a, this.layout = b, this.position = {
        x: 0,
        y: 0
      }, this._create())
    }

    function f(a) {
      return a.replace(/([A-Z])/g, function (a) {
        return "-" + a.toLowerCase()
      })
    }
    var g = document.documentElement.style,
      h = "string" == typeof g.transition ? "transition" : "WebkitTransition",
      i = "string" == typeof g.transform ? "transform" : "WebkitTransform",
      j = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
      }[h],
      k = [i, h, h + "Duration", h + "Property"],
      l = e.prototype = Object.create(b.prototype);
    l.constructor = e, l._create = function () {
      this._transn = {
        ingProperties: {},
        clean: {},
        onEnd: {}
      }, this.css({
        position: "absolute"
      })
    }, l.handleEvent = function (a) {
      var b = "on" + a.type;
      this[b] && this[b](a)
    }, l.getSize = function () {
      this.size = c(this.element)
    }, l.css = function (a) {
      var b = this.element.style;
      for (var c in a) {
        var d = k[c] || c;
        b[d] = a[c]
      }
    }, l.getPosition = function () {
      var a = getComputedStyle(this.element),
        b = this.layout._getOption("originLeft"),
        c = this.layout._getOption("originTop"),
        d = a[b ? "left" : "right"],
        e = a[c ? "top" : "bottom"],
        f = this.layout.size,
        g = -1 != d.indexOf("%") ? parseFloat(d) / 100 * f.width : parseInt(d, 10),
        h = -1 != e.indexOf("%") ? parseFloat(e) / 100 * f.height : parseInt(e, 10);
      g = isNaN(g) ? 0 : g, h = isNaN(h) ? 0 : h, g -= b ? f.paddingLeft : f.paddingRight, h -= c ? f.paddingTop : f.paddingBottom, this.position.x = g, this.position.y = h
    }, l.layoutPosition = function () {
      var a = this.layout.size,
        b = {},
        c = this.layout._getOption("originLeft"),
        d = this.layout._getOption("originTop"),
        e = c ? "paddingLeft" : "paddingRight",
        f = c ? "left" : "right",
        g = c ? "right" : "left",
        h = this.position.x + a[e];
      b[f] = this.getXValue(h), b[g] = "";
      var i = d ? "paddingTop" : "paddingBottom",
        j = d ? "top" : "bottom",
        k = d ? "bottom" : "top",
        l = this.position.y + a[i];
      b[j] = this.getYValue(l), b[k] = "", this.css(b), this.emitEvent("layout", [this])
    }, l.getXValue = function (a) {
      var b = this.layout._getOption("horizontal");
      return this.layout.options.percentPosition && !b ? a / this.layout.size.width * 100 + "%" : a + "px"
    }, l.getYValue = function (a) {
      var b = this.layout._getOption("horizontal");
      return this.layout.options.percentPosition && b ? a / this.layout.size.height * 100 + "%" : a + "px"
    }, l._transitionTo = function (a, b) {
      this.getPosition();
      var c = this.position.x,
        d = this.position.y,
        e = parseInt(a, 10),
        f = parseInt(b, 10),
        g = e === this.position.x && f === this.position.y;
      if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
      var h = a - c,
        i = b - d,
        j = {};
      j.transform = this.getTranslate(h, i), this.transition({
        to: j,
        onTransitionEnd: {
          transform: this.layoutPosition
        },
        isCleaning: !0
      })
    }, l.getTranslate = function (a, b) {
      var c = this.layout._getOption("originLeft"),
        d = this.layout._getOption("originTop");
      return a = c ? a : -a, b = d ? b : -b, "translate3d(" + a + "px, " + b + "px, 0)"
    }, l.goTo = function (a, b) {
      this.setPosition(a, b), this.layoutPosition()
    }, l.moveTo = l._transitionTo, l.setPosition = function (a, b) {
      this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
    }, l._nonTransition = function (a) {
      this.css(a.to), a.isCleaning && this._removeStyles(a.to);
      for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
    }, l._transition = function (a) {
      if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
      var b = this._transn;
      for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
      for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
      if (a.from) {
        this.css(a.from);
        var d = this.element.offsetHeight;
        d = null
      }
      this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
    };
    var m = "opacity," + f(k.transform || "transform");
    l.enableTransition = function () {
      this.isTransitioning || (this.css({
        transitionProperty: m,
        transitionDuration: this.layout.options.transitionDuration
      }), this.element.addEventListener(j, this, !1))
    }, l.transition = e.prototype[h ? "_transition" : "_nonTransition"], l.onwebkitTransitionEnd = function (a) {
      this.ontransitionend(a)
    }, l.onotransitionend = function (a) {
      this.ontransitionend(a)
    };
    var n = {
      "-webkit-transform": "transform"
    };
    l.ontransitionend = function (a) {
      if (a.target === this.element) {
        var b = this._transn,
          c = n[a.propertyName] || a.propertyName;
        if (delete b.ingProperties[c], d(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
          var e = b.onEnd[c];
          e.call(this), delete b.onEnd[c]
        }
        this.emitEvent("transitionEnd", [this])
      }
    }, l.disableTransition = function () {
      this.removeTransitionStyles(), this.element.removeEventListener(j, this, !1), this.isTransitioning = !1
    }, l._removeStyles = function (a) {
      var b = {};
      for (var c in a) b[c] = "";
      this.css(b)
    };
    var o = {
      transitionProperty: "",
      transitionDuration: ""
    };
    return l.removeTransitionStyles = function () {
      this.css(o)
    }, l.removeElem = function () {
      this.element.parentNode.removeChild(this.element), this.css({
        display: ""
      }), this.emitEvent("remove", [this])
    }, l.remove = function () {
      return h && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
        this.removeElem()
      }), void this.hide()) : void this.removeElem()
    }, l.reveal = function () {
      delete this.isHidden, this.css({
        display: ""
      });
      var a = this.layout.options,
        b = {},
        c = this.getHideRevealTransitionEndProperty("visibleStyle");
      b[c] = this.onRevealTransitionEnd, this.transition({
        from: a.hiddenStyle,
        to: a.visibleStyle,
        isCleaning: !0,
        onTransitionEnd: b
      })
    }, l.onRevealTransitionEnd = function () {
      this.isHidden || this.emitEvent("reveal")
    }, l.getHideRevealTransitionEndProperty = function (a) {
      var b = this.layout.options[a];
      if (b.opacity) return "opacity";
      for (var c in b) return c
    }, l.hide = function () {
      this.isHidden = !0, this.css({
        display: ""
      });
      var a = this.layout.options,
        b = {},
        c = this.getHideRevealTransitionEndProperty("hiddenStyle");
      b[c] = this.onHideTransitionEnd, this.transition({
        from: a.visibleStyle,
        to: a.hiddenStyle,
        isCleaning: !0,
        onTransitionEnd: b
      })
    }, l.onHideTransitionEnd = function () {
      this.isHidden && (this.css({
        display: "none"
      }), this.emitEvent("hide"))
    }, l.destroy = function () {
      this.css({
        position: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
        transition: "",
        transform: ""
      })
    }, e
  }),
  function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (c, d, e, f) {
      return b(a, c, d, e, f)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.EvEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
  }(window, function (a, b, c, d, e) {
    "use strict";

    function f(a, b) {
      var c = d.getQueryElement(a);
      if (!c) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
      this.element = c, i && (this.$element = i(this.element)), this.options = d.extend({}, this.constructor.defaults), this.option(b);
      var e = ++k;
      this.element.outlayerGUID = e, l[e] = this, this._create();
      var f = this._getOption("initLayout");
      f && this.layout()
    }

    function g(a) {
      function b() {
        a.apply(this, arguments)
      }
      return b.prototype = Object.create(a.prototype), b.prototype.constructor = b, b
    }
    var h = a.console,
      i = a.jQuery,
      j = function () {},
      k = 0,
      l = {};
    f.namespace = "outlayer", f.Item = e, f.defaults = {
      containerStyle: {
        position: "relative"
      },
      initLayout: !0,
      originLeft: !0,
      originTop: !0,
      resize: !0,
      resizeContainer: !0,
      transitionDuration: "0.4s",
      hiddenStyle: {
        opacity: 0,
        transform: "scale(0.001)"
      },
      visibleStyle: {
        opacity: 1,
        transform: "scale(1)"
      }
    };
    var m = f.prototype;
    return d.extend(m, b.prototype), m.option = function (a) {
      d.extend(this.options, a)
    }, m._getOption = function (a) {
      var b = this.constructor.compatOptions[a];
      return b && void 0 !== this.options[b] ? this.options[b] : this.options[a]
    }, f.compatOptions = {
      initLayout: "isInitLayout",
      horizontal: "isHorizontal",
      layoutInstant: "isLayoutInstant",
      originLeft: "isOriginLeft",
      originTop: "isOriginTop",
      resize: "isResizeBound",
      resizeContainer: "isResizingContainer"
    }, m._create = function () {
      this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), d.extend(this.element.style, this.options.containerStyle);
      var a = this._getOption("resize");
      a && this.bindResize()
    }, m.reloadItems = function () {
      this.items = this._itemize(this.element.children)
    }, m._itemize = function (a) {
      for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0; e < b.length; e++) {
        var f = b[e],
          g = new c(f, this);
        d.push(g)
      }
      return d
    }, m._filterFindItemElements = function (a) {
      return d.filterFindElements(a, this.options.itemSelector)
    }, m.getItemElements = function () {
      return this.items.map(function (a) {
        return a.element
      })
    }, m.layout = function () {
      this._resetLayout(), this._manageStamps();
      var a = this._getOption("layoutInstant"),
        b = void 0 !== a ? a : !this._isLayoutInited;
      this.layoutItems(this.items, b), this._isLayoutInited = !0
    }, m._init = m.layout, m._resetLayout = function () {
      this.getSize()
    }, m.getSize = function () {
      this.size = c(this.element)
    }, m._getMeasurement = function (a, b) {
      var d, e = this.options[a];
      e ? ("string" == typeof e ? d = this.element.querySelector(e) : e instanceof HTMLElement && (d = e), this[a] = d ? c(d)[b] : e) : this[a] = 0
    }, m.layoutItems = function (a, b) {
      a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
    }, m._getItemsForLayout = function (a) {
      return a.filter(function (a) {
        return !a.isIgnored
      })
    }, m._layoutItems = function (a, b) {
      if (this._emitCompleteOnItems("layout", a), a && a.length) {
        var c = [];
        a.forEach(function (a) {
          var d = this._getItemLayoutPosition(a);
          d.item = a, d.isInstant = b || a.isLayoutInstant, c.push(d)
        }, this), this._processLayoutQueue(c)
      }
    }, m._getItemLayoutPosition = function () {
      return {
        x: 0,
        y: 0
      }
    }, m._processLayoutQueue = function (a) {
      a.forEach(function (a) {
        this._positionItem(a.item, a.x, a.y, a.isInstant)
      }, this)
    }, m._positionItem = function (a, b, c, d) {
      d ? a.goTo(b, c) : a.moveTo(b, c)
    }, m._postLayout = function () {
      this.resizeContainer()
    }, m.resizeContainer = function () {
      var a = this._getOption("resizeContainer");
      if (a) {
        var b = this._getContainerSize();
        b && (this._setContainerMeasure(b.width, !0), this._setContainerMeasure(b.height, !1))
      }
    }, m._getContainerSize = j, m._setContainerMeasure = function (a, b) {
      if (void 0 !== a) {
        var c = this.size;
        c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
      }
    }, m._emitCompleteOnItems = function (a, b) {
      function c() {
        e.dispatchEvent(a + "Complete", null, [b])
      }

      function d() {
        g++, g == f && c()
      }
      var e = this,
        f = b.length;
      if (!b || !f) return void c();
      var g = 0;
      b.forEach(function (b) {
        b.once(a, d)
      })
    }, m.dispatchEvent = function (a, b, c) {
      var d = b ? [b].concat(c) : c;
      if (this.emitEvent(a, d), i)
        if (this.$element = this.$element || i(this.element), b) {
          var e = i.Event(b);
          e.type = a, this.$element.trigger(e, c)
        } else this.$element.trigger(a, c)
    }, m.ignore = function (a) {
      var b = this.getItem(a);
      b && (b.isIgnored = !0)
    }, m.unignore = function (a) {
      var b = this.getItem(a);
      b && delete b.isIgnored
    }, m.stamp = function (a) {
      a = this._find(a), a && (this.stamps = this.stamps.concat(a), a.forEach(this.ignore, this))
    }, m.unstamp = function (a) {
      a = this._find(a), a && a.forEach(function (a) {
        d.removeFrom(this.stamps, a), this.unignore(a)
      }, this)
    }, m._find = function (a) {
      return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = d.makeArray(a)) : void 0
    }, m._manageStamps = function () {
      this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
    }, m._getBoundingRect = function () {
      var a = this.element.getBoundingClientRect(),
        b = this.size;
      this._boundingRect = {
        left: a.left + b.paddingLeft + b.borderLeftWidth,
        top: a.top + b.paddingTop + b.borderTopWidth,
        right: a.right - (b.paddingRight + b.borderRightWidth),
        bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
      }
    }, m._manageStamp = j, m._getElementOffset = function (a) {
      var b = a.getBoundingClientRect(),
        d = this._boundingRect,
        e = c(a),
        f = {
          left: b.left - d.left - e.marginLeft,
          top: b.top - d.top - e.marginTop,
          right: d.right - b.right - e.marginRight,
          bottom: d.bottom - b.bottom - e.marginBottom
        };
      return f
    }, m.handleEvent = d.handleEvent, m.bindResize = function () {
      a.addEventListener("resize", this), this.isResizeBound = !0
    }, m.unbindResize = function () {
      a.removeEventListener("resize", this), this.isResizeBound = !1
    }, m.onresize = function () {
      this.resize()
    }, d.debounceMethod(f, "onresize", 100), m.resize = function () {
      this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, m.needsResizeLayout = function () {
      var a = c(this.element),
        b = this.size && a;
      return b && a.innerWidth !== this.size.innerWidth
    }, m.addItems = function (a) {
      var b = this._itemize(a);
      return b.length && (this.items = this.items.concat(b)), b
    }, m.appended = function (a) {
      var b = this.addItems(a);
      b.length && (this.layoutItems(b, !0), this.reveal(b))
    }, m.prepended = function (a) {
      var b = this._itemize(a);
      if (b.length) {
        var c = this.items.slice(0);
        this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
      }
    }, m.reveal = function (a) {
      this._emitCompleteOnItems("reveal", a), a && a.length && a.forEach(function (a) {
        a.reveal()
      })
    }, m.hide = function (a) {
      this._emitCompleteOnItems("hide", a), a && a.length && a.forEach(function (a) {
        a.hide()
      })
    }, m.revealItemElements = function (a) {
      var b = this.getItems(a);
      this.reveal(b)
    }, m.hideItemElements = function (a) {
      var b = this.getItems(a);
      this.hide(b)
    }, m.getItem = function (a) {
      for (var b = 0; b < this.items.length; b++) {
        var c = this.items[b];
        if (c.element == a) return c
      }
    }, m.getItems = function (a) {
      a = d.makeArray(a);
      var b = [];
      return a.forEach(function (a) {
        var c = this.getItem(a);
        c && b.push(c)
      }, this), b
    }, m.remove = function (a) {
      var b = this.getItems(a);
      this._emitCompleteOnItems("remove", b), b && b.length && b.forEach(function (a) {
        a.remove(), d.removeFrom(this.items, a)
      }, this)
    }, m.destroy = function () {
      var a = this.element.style;
      a.height = "", a.position = "", a.width = "", this.items.forEach(function (a) {
        a.destroy()
      }), this.unbindResize();
      var b = this.element.outlayerGUID;
      delete l[b], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace)
    }, f.data = function (a) {
      a = d.getQueryElement(a);
      var b = a && a.outlayerGUID;
      return b && l[b]
    }, f.create = function (a, b) {
      var c = g(f);
      return c.defaults = d.extend({}, f.defaults), d.extend(c.defaults, b), c.compatOptions = d.extend({}, f.compatOptions), c.namespace = a, c.data = f.data, c.Item = g(e), d.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c
    }, f.Item = e, f
  }),
  function (a, b) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], b) : "object" == typeof module && module.exports ? module.exports = b(require("outlayer"), require("get-size")) : a.Masonry = b(a.Outlayer, a.getSize)
  }(window, function (a, b) {
    var c = a.create("masonry");
    return c.compatOptions.fitWidth = "isFitWidth", c.prototype._resetLayout = function () {
      this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
      for (var a = 0; a < this.cols; a++) this.colYs.push(0);
      this.maxY = 0
    }, c.prototype.measureColumns = function () {
      if (this.getContainerWidth(), !this.columnWidth) {
        var a = this.items[0],
          c = a && a.element;
        this.columnWidth = c && b(c).outerWidth || this.containerWidth
      }
      var d = this.columnWidth += this.gutter,
        e = this.containerWidth + this.gutter,
        f = e / d,
        g = d - e % d,
        h = g && 1 > g ? "round" : "floor";
      f = Math[h](f), this.cols = Math.max(f, 1)
    }, c.prototype.getContainerWidth = function () {
      var a = this._getOption("fitWidth"),
        c = a ? this.element.parentNode : this.element,
        d = b(c);
      this.containerWidth = d && d.innerWidth
    }, c.prototype._getItemLayoutPosition = function (a) {
      a.getSize();
      var b = a.size.outerWidth % this.columnWidth,
        c = b && 1 > b ? "round" : "ceil",
        d = Math[c](a.size.outerWidth / this.columnWidth);
      d = Math.min(d, this.cols);
      for (var e = this._getColGroup(d), f = Math.min.apply(Math, e), g = e.indexOf(f), h = {
          x: this.columnWidth * g,
          y: f
        }, i = f + a.size.outerHeight, j = this.cols + 1 - e.length, k = 0; j > k; k++) this.colYs[g + k] = i;
      return h
    }, c.prototype._getColGroup = function (a) {
      if (2 > a) return this.colYs;
      for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
        var e = this.colYs.slice(d, d + a);
        b[d] = Math.max.apply(Math, e)
      }
      return b
    }, c.prototype._manageStamp = function (a) {
      var c = b(a),
        d = this._getElementOffset(a),
        e = this._getOption("originLeft"),
        f = e ? d.left : d.right,
        g = f + c.outerWidth,
        h = Math.floor(f / this.columnWidth);
      h = Math.max(0, h);
      var i = Math.floor(g / this.columnWidth);
      i -= g % this.columnWidth ? 0 : 1, i = Math.min(this.cols - 1, i);
      for (var j = this._getOption("originTop"), k = (j ? d.top : d.bottom) + c.outerHeight, l = h; i >= l; l++) this.colYs[l] = Math.max(k, this.colYs[l])
    }, c.prototype._getContainerSize = function () {
      this.maxY = Math.max.apply(Math, this.colYs);
      var a = {
        height: this.maxY
      };
      return this._getOption("fitWidth") && (a.width = this._getContainerFitWidth()), a
    }, c.prototype._getContainerFitWidth = function () {
      for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
      return (this.cols - a) * this.columnWidth - this.gutter
    }, c.prototype.needsResizeLayout = function () {
      var a = this.containerWidth;
      return this.getContainerWidth(), a != this.containerWidth
    }, c
  });
var CanvasImage = function (a) {
  this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), document.body.appendChild(this.canvas), this.width = this.canvas.width = a.width, this.height = this.canvas.height = a.height, this.context.drawImage(a, 0, 0, this.width, this.height)
};
CanvasImage.prototype.clear = function () {
  this.context.clearRect(0, 0, this.width, this.height)
}, CanvasImage.prototype.update = function (a) {
  this.context.putImageData(a, 0, 0)
}, CanvasImage.prototype.getPixelCount = function () {
  return this.width * this.height
}, CanvasImage.prototype.getImageData = function () {
  return this.context.getImageData(0, 0, this.width, this.height)
}, CanvasImage.prototype.removeCanvas = function () {
  this.canvas.parentNode.removeChild(this.canvas)
};
var ColorThief = function () {};
if (ColorThief.prototype.getColor = function (a, b) {
    var c = this.getPalette(a, 5, b),
      d = c[0];
    return d
  }, ColorThief.prototype.getPalette = function (a, b, c) {
    "undefined" == typeof b && (b = 10), ("undefined" == typeof c || 1 > c) && (c = 10);
    for (var d, e, f, g, h, i = new CanvasImage(a), j = i.getImageData(), k = j.data, l = i.getPixelCount(), m = [], n = 0; l > n; n += c) d = 4 * n, e = k[d + 0], f = k[d + 1], g = k[d + 2], h = k[d + 3], h >= 125 && (e > 250 && f > 250 && g > 250 || m.push([e, f, g]));
    var o = MMCQ.quantize(m, b),
      p = o ? o.palette() : null;
    return i.removeCanvas(), p
  }, !pv) var pv = {
  map: function (a, b) {
    var c = {};
    return b ? a.map(function (a, d) {
      return c.index = d, b.call(c, a)
    }) : a.slice()
  },
  naturalOrder: function (a, b) {
    return b > a ? -1 : a > b ? 1 : 0
  },
  sum: function (a, b) {
    var c = {};
    return a.reduce(b ? function (a, d, e) {
      return c.index = e, a + b.call(c, d)
    } : function (a, b) {
      return a + b
    }, 0)
  },
  max: function (a, b) {
    return Math.max.apply(null, b ? pv.map(a, b) : a)
  }
};
var MMCQ = function () {
  function a(a, b, c) {
    return (a << 2 * i) + (b << i) + c
  }

  function b(a) {
    function b() {
      c.sort(a), d = !0
    }
    var c = [],
      d = !1;
    return {
      push: function (a) {
        c.push(a), d = !1
      },
      peek: function (a) {
        return d || b(), void 0 === a && (a = c.length - 1), c[a]
      },
      pop: function () {
        return d || b(), c.pop()
      },
      size: function () {
        return c.length
      },
      map: function (a) {
        return c.map(a)
      },
      debug: function () {
        return d || b(), c
      }
    }
  }

  function c(a, b, c, d, e, f, g) {
    var h = this;
    h.r1 = a, h.r2 = b, h.g1 = c, h.g2 = d, h.b1 = e, h.b2 = f, h.histo = g
  }

  function d() {
    this.vboxes = new b(function (a, b) {
      return pv.naturalOrder(a.vbox.count() * a.vbox.volume(), b.vbox.count() * b.vbox.volume())
    })
  }

  function e(b) {
    var c, d, e, f, g = 1 << 3 * i,
      h = new Array(g);
    return b.forEach(function (b) {
      d = b[0] >> j, e = b[1] >> j, f = b[2] >> j, c = a(d, e, f), h[c] = (h[c] || 0) + 1
    }), h
  }

  function f(a, b) {
    var d, e, f, g = 1e6,
      h = 0,
      i = 1e6,
      k = 0,
      l = 1e6,
      m = 0;
    return a.forEach(function (a) {
      d = a[0] >> j, e = a[1] >> j, f = a[2] >> j, g > d ? g = d : d > h && (h = d), i > e ? i = e : e > k && (k = e), l > f ? l = f : f > m && (m = f)
    }), new c(g, h, i, k, l, m, b)
  }

  function g(b, c) {
    function d(a) {
      var b, d, e, f, g, h = a + "1",
        j = a + "2",
        k = 0;
      for (i = c[h]; i <= c[j]; i++)
        if (o[i] > n / 2) {
          for (e = c.copy(), f = c.copy(), b = i - c[h], d = c[j] - i, g = d >= b ? Math.min(c[j] - 1, ~~(i + d / 2)) : Math.max(c[h], ~~(i - 1 - b / 2)); !o[g];) g++;
          for (k = p[g]; !k && o[g - 1];) k = p[--g];
          return e[j] = g, f[h] = e[j] + 1, [e, f]
        }
    }
    if (c.count()) {
      var e = c.r2 - c.r1 + 1,
        f = c.g2 - c.g1 + 1,
        g = c.b2 - c.b1 + 1,
        h = pv.max([e, f, g]);
      if (1 == c.count()) return [c.copy()];
      var i, j, k, l, m, n = 0,
        o = [],
        p = [];
      if (h == e)
        for (i = c.r1; i <= c.r2; i++) {
          for (l = 0, j = c.g1; j <= c.g2; j++)
            for (k = c.b1; k <= c.b2; k++) m = a(i, j, k), l += b[m] || 0;
          n += l, o[i] = n
        } else if (h == f)
          for (i = c.g1; i <= c.g2; i++) {
            for (l = 0, j = c.r1; j <= c.r2; j++)
              for (k = c.b1; k <= c.b2; k++) m = a(j, i, k), l += b[m] || 0;
            n += l, o[i] = n
          } else
            for (i = c.b1; i <= c.b2; i++) {
              for (l = 0, j = c.r1; j <= c.r2; j++)
                for (k = c.g1; k <= c.g2; k++) m = a(j, k, i), l += b[m] || 0;
              n += l, o[i] = n
            }
      return o.forEach(function (a, b) {
        p[b] = n - a
      }), d(h == e ? "r" : h == f ? "g" : "b")
    }
  }

  function h(a, c) {
    function h(a, b) {
      for (var c, d = 1, e = 0; k > e;)
        if (c = a.pop(), c.count()) {
          var f = g(i, c),
            h = f[0],
            j = f[1];
          if (!h) return;
          if (a.push(h), j && (a.push(j), d++), d >= b) return;
          if (e++ > k) return
        } else a.push(c), e++
    }
    if (!a.length || 2 > c || c > 256) return !1;
    var i = e(a),
      j = 0;
    i.forEach(function () {
      j++
    });
    var m = f(a, i),
      n = new b(function (a, b) {
        return pv.naturalOrder(a.count(), b.count())
      });
    n.push(m), h(n, l * c);
    for (var o = new b(function (a, b) {
        return pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume())
      }); n.size();) o.push(n.pop());
    h(o, c - o.size());
    for (var p = new d; o.size();) p.push(o.pop());
    return p
  }
  var i = 5,
    j = 8 - i,
    k = 1e3,
    l = .75;
  return c.prototype = {
    volume: function (a) {
      var b = this;
      return (!b._volume || a) && (b._volume = (b.r2 - b.r1 + 1) * (b.g2 - b.g1 + 1) * (b.b2 - b.b1 + 1)), b._volume
    },
    count: function (b) {
      var c = this,
        d = c.histo;
      if (!c._count_set || b) {
        var e, f, g, h = 0;
        for (e = c.r1; e <= c.r2; e++)
          for (f = c.g1; f <= c.g2; f++)
            for (g = c.b1; g <= c.b2; g++) index = a(e, f, g), h += d[index] || 0;
        c._count = h, c._count_set = !0
      }
      return c._count
    },
    copy: function () {
      var a = this;
      return new c(a.r1, a.r2, a.g1, a.g2, a.b1, a.b2, a.histo)
    },
    avg: function (b) {
      var c = this,
        d = c.histo;
      if (!c._avg || b) {
        var e, f, g, h, j, k = 0,
          l = 1 << 8 - i,
          m = 0,
          n = 0,
          o = 0;
        for (f = c.r1; f <= c.r2; f++)
          for (g = c.g1; g <= c.g2; g++)
            for (h = c.b1; h <= c.b2; h++) j = a(f, g, h), e = d[j] || 0, k += e, m += e * (f + .5) * l, n += e * (g + .5) * l, o += e * (h + .5) * l;
        k ? c._avg = [~~(m / k), ~~(n / k), ~~(o / k)] : c._avg = [~~(l * (c.r1 + c.r2 + 1) / 2), ~~(l * (c.g1 + c.g2 + 1) / 2), ~~(l * (c.b1 + c.b2 + 1) / 2)]
      }
      return c._avg
    },
    contains: function (a) {
      var b = this,
        c = a[0] >> j;
      return gval = a[1] >> j, bval = a[2] >> j, c >= b.r1 && c <= b.r2 && gval >= b.g1 && gval <= b.g2 && bval >= b.b1 && bval <= b.b2
    }
  }, d.prototype = {
    push: function (a) {
      this.vboxes.push({
        vbox: a,
        color: a.avg()
      })
    },
    palette: function () {
      return this.vboxes.map(function (a) {
        return a.color
      })
    },
    size: function () {
      return this.vboxes.size()
    },
    map: function (a) {
      for (var b = this.vboxes, c = 0; c < b.size(); c++)
        if (b.peek(c).vbox.contains(a)) return b.peek(c).color;
      return this.nearest(a)
    },
    nearest: function (a) {
      for (var b, c, d, e = this.vboxes, f = 0; f < e.size(); f++) c = Math.sqrt(Math.pow(a[0] - e.peek(f).color[0], 2) + Math.pow(a[1] - e.peek(f).color[1], 2) + Math.pow(a[2] - e.peek(f).color[2], 2)), (b > c || void 0 === b) && (b = c, d = e.peek(f).color);
      return d
    },
    forcebw: function () {
      var a = this.vboxes;
      a.sort(function (a, b) {
        return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color))
      });
      var b = a[0].color;
      b[0] < 5 && b[1] < 5 && b[2] < 5 && (a[0].color = [0, 0, 0]);
      var c = a.length - 1,
        d = a[c].color;
      d[0] > 251 && d[1] > 251 && d[2] > 251 && (a[c].color = [255, 255, 255])
    }
  }, {
    quantize: h
  }
}();
! function (a) {
  var b = {
    init: function (b) {
      var c = {
        inDuration: 300,
        outDuration: 200,
        responsiveThreshold: 992,
        contentPadding: 40,
        onShow: null,
        defaultColor: "#444",
        fillScreen: !1
      };
      return b = a.extend(c, b), this.each(function () {
        function c() {
          if (H) {
            H = !1;
            var c = !J;
            window.clearTimeout(A), A = null, O.stop(), J = !0, s = void 0;
            var d = a("#placeholder-overlay").first();
            d.off("click.galleryExpand").off("mouseenter.galleryExpand").off("mouseleave.galleryExpand"), e.scrollTop(0), e.attr("style", B.attr("style")), L.css("left", B.find(".gallery-cover").css("left")).removeClass("dh ep"), Y(), d.css({
              transition: "none",
              opacity: .9
            }), M.show(), setTimeout(function () {
              if (a(window).off("resize", z), K.find(".gallery-body").css("display", "none"), P && P.find(R).removeClass("k"), a("nav").removeClass("ed"), a("#placeholder-navbar").fadeOut(b.outDuration, "easeInQuad", function () {
                  a(this).remove()
                }), I = !1, d.fadeOut(b.outDuration, "easeInQuad", function () {
                  a(this).remove()
                }), !c) {
                K.css({
                  width: f,
                  height: g,
                  transform: "translate3d(0,0,0)",
                  transition: "transform " + b.outDuration / 1e3 + "s " + T,
                  "-webkit-transition": "-webkit-transform " + b.outDuration / 1e3 + "s " + T
                });
                var i = n.top - Q - S;
                N.css({
                  transform: "translate3d(0, " + i + "px, 0)",
                  transition: "transform " + b.outDuration / 1e3 + "s",
                  "-webkit-transition": "-webkit-transform " + b.outDuration / 1e3 + "s"
                });
                var j = {};
                F && D ? (j.width = l, j.height = m, j.transform = "translate3d(" + n.left + "px, " + S + "px, 0)", j.transition = "transform " + b.outDuration / 1e3 + "s, width " + b.outDuration / 1e3 + "s, height " + b.outDuration / 1e3 + "s", j["-webkit-transition"] = "-webkit-transform " + b.outDuration / 1e3 + "s, width " + b.outDuration / 1e3 + "s, height " + b.outDuration / 1e3 + "s", X.css({
                  background: ""
                })) : (j.transform = "translate3d(" + (n.left - y - S) + "px, 0, 0)", j.transition = "transform " + b.outDuration / 1e3 + "s " + T, j["-webkit-transition"] = "-webkit-transform " + b.outDuration / 1e3 + "s " + T), L.css(j), M.css({
                  transform: "scaleX(1) translate3d(" + h.left + "px," + k + "px,0)",
                  transition: "transform " + b.outDuration / 1e3 + "s",
                  "-webkit-transition": "-webkit-transform " + b.outDuration / 1e3 + "s"
                })
              }
              A = setTimeout(function () {
                a("body").css("overflow", ""), e.removeAttr("style"), K.css({
                  width: "",
                  height: "",
                  overflow: "",
                  "z-index": "",
                  transform: "",
                  transition: "",
                  "-webkit-transition": ""
                }), L.removeAttr("style").attr("style", C), N.removeAttr("style"), M.removeAttr("style"), M.children().removeAttr("style"), O.find(".title-wrapper").css({
                  marginTop: "",
                  marginLeft: "",
                  paddingLeft: "",
                  height: ""
                }), K.removeClass("k"), G = !0, a(".gallery").data("masonry") && a(".gallery").masonry("layout")
              }, b.outDuration)
            }, 0)
          }
        }
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D = a(this).attr("data-fillScreen") || b.fillScreen,
          E = a(this).hasClass("en"),
          F = !1,
          G = !0,
          H = !1,
          I = !1,
          J = !0,
          K = a(this),
          L = K.find(".gallery-cover"),
          M = K.find(".gallery-header"),
          N = K.find(".gallery-curve-wrapper"),
          O = K.find(".gallery-body"),
          P = K.find(".gallery-action"),
          Q = 64,
          R = ".btn, .btn-large, .btn-floating",
          S = b.contentPadding,
          T = "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
          U = 1280,
          V = window.innerWidth,
          W = window.innerHeight;
        e = K.children(".placeholder").first(), e.length || (K.wrapInner(a('<div class="placeholder"></div>')), e = K.children(".placeholder").first());
        var X = L.find(".gradient").first();
        D && (X.length || (X = a('<div class="gradient"></div>'), L.append(X)), K.attr("data-fillscreen", !0));
        var Y = function () {
            L = K.find(".gallery-cover"), M = K.find(".gallery-header"), N = K.find(".gallery-curve-wrapper"), O = K.find(".gallery-body"), P = K.find(".gallery-action"), e = K.find(".placeholder")
          },
          Z = function () {
            origContainerRect = K[0].getBoundingClientRect(), f = origContainerRect.width, g = K.height(), h = M[0].getBoundingClientRect(), i = h.width, j = h.height, l = L.width(), m = L.height(), n = L[0].getBoundingClientRect(), o = a(window).scrollTop()
          };
        K.off("click.galleryExpand").on("click.galleryExpand", function (o) {
          if (!G) return !!a(o.target).is("a") && void 0;
          G = !1, window.clearTimeout(A), A = null, Z();
          var Y, $, _, aa, ba, ca = K.find(".gallery-cover").height(),
            da = function () {
              if (V = window.innerWidth, W = window.innerHeight, d = V <= b.responsiveThreshold, F = l > V / 2 || D, Q = d ? 56 : 64, r = -K[0].getBoundingClientRect().top, s = void 0 === s ? -e[0].getBoundingClientRect().left : s + -e[0].getBoundingClientRect().left, t = Math.round(ca / 2 + S + Q), Y = ca / 2 - S, $ = Math.min(.7 * V, U), _ = W - Y - Q, y = Math.max((V - $) / 2, S), d ? ($ = V, y = 0, S = 20) : S = b.contentPadding, F)
                if (D) {
                  var a = L.children("img").first(),
                    c = imgHeight = 1 / 0;
                  if (a.length) {
                    var h = a[0].getBoundingClientRect();
                    c = h.width, imgHeight = h.height
                  }
                  p = Math.min(V, c), q = Math.min(W - Q, imgHeight), t = d ? Math.round((W - Q) / 2) : Math.round(3 * S + Q), Y = q - t + Q, _ = W - t
                } else {
                  var k = f / g;
                  p = V / 2, q = p / k, t = Math.round(q / 2) + S + Q, Y = q / 2 + S, _ = W - Y - Q
                }
              aa = $ / i, ba = _ / j
            };
          da(), B = e.clone(!0), a("body").css("overflow", "hidden"), K.css({
            height: g,
            width: f
          }), C = L.attr("style");
          var ea = function () {
            var a = "translate3d(";
            D ? a += n.left + "px, " + S + "px, 0)" : (L.css({
              left: y + S,
              top: S
            }), a += n.left - y - S + "px, 0, 0)"), L.css({
              height: m,
              width: l,
              transform: a
            })
          };
          ea();
          var fa = n.top - Q - S;
          N.css({
            display: "block",
            transform: "translate3d(0, " + fa + "px, 0)"
          }), k = E ? S - j : S, M.css({
            height: j,
            width: i,
            transform: "translate3d(" + h.left + "px," + k + "px,0)"
          }), e.css({
            height: W,
            width: V,
            transform: "translate3d(" + Math.round(s) + "px, " + Math.round(r) + "px, 0)"
          }), K.addClass("k"), "absolute" !== K.css("position") && K.css({
            position: "relative"
          }), I = !0, J = !1;
          var ga = a("#placeholder-overlay");
          ga.length || (ga = a('<div id="placeholder-overlay"></div>'), e.prepend(ga)), ga.off("click.galleryExpand").on("click.galleryExpand", function () {
            c()
          }), D && ga.off("mouseenter.galleryExpand").off("mouseleave.galleryExpand").on("mouseenter.galleryExpand", function () {
            L.addClass("ep")
          }).on("mouseleave.galleryExpand", function () {
            L.removeClass("ep")
          }), setTimeout(function () {
            ga.addClass("et")
          }, 0);
          var ha = a('<nav id="placeholder-navbar"></nav>'),
            ia = a('<div class="nav-wrapper"></div>'),
            ja = a('<div class="db"></div>'),
            ka = a('<button class="back-btn"><i class="material-icons">arrow_back</i><span>Back</span></button>'),
            la = "";
          if (a("nav").length && (la = a("nav").css("background-color"), a("nav").addClass("ed")), ha.css({
              "background-color": la
            }), ja.append(ka), ia.append(ja), ha.append(ia), e.prepend(ha), ka.click(function () {
              c()
            }), "undefined" != typeof ColorThief) {
            u = new ColorThief;
            var ma = new Image;
            ma.onload = function () {
              u.getColor(ma)
            }, ma.crossOrigin = "Anonymous", ma.src = K.find("img").attr("src");
            try {
              v = u.getPalette(K.find("img")[0], 2), w = "rgb(" + v[0][0] + "," + v[0][1] + "," + v[0][2] + ")", x = "rgb(" + v[1][0] + "," + v[1][1] + "," + v[1][2] + ")", ha.css({
                backgroundColor: x
              })
            } catch (o) {
              console.log("Cross Origin error. Falling back to defaultColor. Try using a locally hosted image", o), w = b.defaultColor;
              var na = a("body").children("canvas:last-child");
              if (na.length) {
                var oa = imgHeight = 0,
                  ma = L.children("img").first();
                if (ma.length) {
                  var pa = ma[0].getBoundingClientRect();
                  oa = Math.round(pa.width), imgHeight = Math.round(pa.height)
                }
                na[0].getContext("2d").canvas.width === oa && na[0].getContext("2d").canvas.height === imgHeight && na.remove()
              }
            }
            ga.css({
              backgroundColor: w
            }), D && X.length && X.css({
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, " + w + " 100%)"
            })
          }
          var qa = {};
          if (qa.transform = "", qa.transition = "transform " + b.inDuration / 1e3 + "s", qa["-webkit-transition"] = "-webkit-transform " + b.inDuration / 1e3 + "s", F)
            if (D) {
              qa.width = p, qa.height = q, qa.transition = "transform " + b.inDuration / 1e3 + "s, width " + b.inDuration / 1e3 + "s, height " + b.inDuration / 1e3 + "s", qa["-webkit-transition"] = "-webkit-transform " + b.inDuration / 1e3 + "s, width " + b.inDuration / 1e3 + "s, height " + b.inDuration / 1e3 + "s";
              p < V && (qa.transform = "scale(" + V / p + ")")
            } else qa.transform = "scale(" + p / l + ")";
          L.css(qa), N.css({
            height: W,
            transition: "transform " + b.inDuration / 1e3 + "s " + T,
            "-webkit-transition": "-webkit-transform " + b.inDuration / 1e3 + "s " + T,
            transform: ""
          }), M.children().css("opacity", 0);
          var ra = function () {
            var a = y / aa,
              c = -Y / ba;
            F && !D && (c = (Y - m) / ba), M.css({
              transition: "transform " + b.inDuration / 1e3 + "s " + T,
              "-webkit-transition": "-webkit-transform " + b.inDuration / 1e3 + "s " + T,
              transform: "scale(" + aa + "," + ba + ") translate3d(" + a + "px," + c + "px,0)",
              transformOrigin: "0 0"
            })
          };
          ra(), O.length && (O.css({
            marginTop: t,
            padding: S,
            minHeight: W - t
          }), D || (d ? O.find(".title-wrapper").css({
            marginTop: t / 2
          }) : O.find(".title-wrapper").css({
            marginLeft: l,
            paddingLeft: S,
            height: Y
          }))), P.length && (P.css({
            top: t
          }), P.find(R).each(function () {
            a(this).css({
              backgroundColor: x
            })
          })), z = Materialize.throttle(function () {
            da()
          }, 150), a(window).resize(z), A = setTimeout(function () {
            P.length && P.find(R).each(function () {
              a(this).addClass("k")
            });
            var c = function () {
              B = e.clone(!0), e.css({
                transform: "",
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                overflow: "auto"
              }), N.css({
                height: "100%"
              }), D ? L.css({
                width: "",
                height: "",
                transform: "",
                transition: "opacity .3s"
              }) : L.css({
                left: S
              }), L.addClass("dh"), M.hide()
            };
            O.length ? O.fadeIn(300, function () {
              c()
            }) : c(), J = !0, H = !0, "function" == typeof b.onShow && b.onShow.call(this, K)
          }, b.inDuration)
        }), a(document).keyup(function (a) {
          27 === a.keyCode && I && c()
        })
      })
    },
    open: function () {
      a(this).trigger("click.galleryExpand")
    },
    close: function () {
      var b = a("#placeholder-overlay");
      b.length && b.trigger("click.galleryExpand")
    }
  };
  a.fn.galleryExpand = function (c) {
    return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.galleryExpand") : b.init.apply(this, arguments)
  }
}(jQuery),
function (a) {
  a(function () {
    a(".button-collapse").sideNav();
    var b = a("nav .categories-container");
    if (b.length) {
      b.pushpin({
        top: b.offset().top
      });
      var c = b.find("li");
      c.each(function () {
        var b = a(this);
        b.on("click", function () {
          c.removeClass("m"), b.addClass("m");
          var d = b.find("a").first()[0].hash.substr(1);
          a(".c .gallery-expand").addClass("cb").stop().fadeIn(100), "all" !== d && a(".c .gallery-expand").not("." + d).hide().removeClass("cb"), $masonry.masonry({
            transitionDuration: ".3s"
          }), $masonry.one("layoutComplete", function (a, b) {
            $masonry.masonry({
              transitionDuration: 0
            })
          }), $masonry.masonry("layout")
        })
      })
    }
    a(".carousel").carousel({
      dist: 0,
      padding: 10
    }), a("a.filter").click(function (a) {
      a.preventDefault()
    }), a("form .form-control").focus(function () {
      a(this).siblings("label").first().children("i").first().css({
        color: "#aaa",
        left: 0
      })
    }), a("form .form-control").blur(function () {
      a(this).siblings("label").first().children("i").first().css({
        color: "transparent",
        left: "-20px"
      })
    });
    var d = function (a) {
      var b = a.find(".carousel.initialized");
      b.carousel({
        dist: 0,
        padding: 10
      })
    };
    a(".gallery-expand").galleryExpand({
      onShow: d
    }), a(".blog .gallery-expand").galleryExpand({
      onShow: d,
      fillScreen: !0
    }), a(".gallery-expand.fill-screen").galleryExpand({
      onShow: d,
      fillScreen: !0
    });
    var e = a(".table-of-contents");
    a(".scrollspy").scrollSpy()
  })
}(jQuery);
