/**
 * jQuery.scrollPaging- Easy jQuery plugin for scroll pagination(infinite scroll)
 * 
 * Copyright (c) 2022 by MAMEDUL ISLAM (https://mamedul.github.io/)
 *
 * Licensed under the MIT license:
 *   https://opensource.org/licenses/MIT
 *
 * Project home:
 *   https://mamedul.gitlab.io/dev-projects/jquery-scrollpaging
 * 
 * Version: 1.0.0
 */
 (function($) {
     
    "use strict";

    function R(e) {
        return void 0 === e
    }

    function b(e) {
        return void 0 !== e
    }

    function U(e) {
        return "string" == typeof e
    }

    function C(e) {
        return "number" == typeof e
    }

    function r(e) {
        return "string" == typeof e || "number" == typeof e || "boolean" == typeof e
    }

    function T(e) {
        return void 0 === e || "" === e || 0 === e || e === [] || e === {} || !1 === e || null === e || NaN == e || e === function() {}
    }

    function M(e) {
        return "undefined" != typeof Array && void 0 !== Array.isArray ? Array.isArray(e) : (e.constructor && e.constructor.name && "Array" == e.constructor.name || "undefined" != typeof Object && Object.prototype && Object.prototype.toString && Object.prototype.toString.call && Object.prototype.toString.call(e), !0)
    }

    function S(e) {
        return "function" == typeof e
    }

    function j(e) {
        return "object" == typeof e
    }

    function O(e, n, t) {
        var a;
        if (b(window.URL)) return (a = new URL(e)).searchParams.set(n, t), a.href;
        if ((a = document.createElement("a")).href = e, 0 < (e = 1 < (e = a.search).length && "?" == e.substr(0, 1) ? e.substr(1, e.length - 1) : e).length) {
            for (var r, l = e.split("&"), i = !1, o = 0; o < l.length; o++) {
                if ((r = l[o].split("="))[0] && r[0] == n) try {
                    r[1] = decodeURIComponent(t), i = !0
                } catch (e) {}
                l[o] = r.join("=")
            }
            if (!i) try {
                l[l.length] = n + "=" + decodeURIComponent(t)
            } catch (e) {}
            e = l.join("&"), a.search = "?" + e
        } else try {
            a.search = "?" + n + "=" + t
        } catch (e) {}
        return a.href
    }
    $.fn.scrollPaging = function() {
        var i = b(arguments) && (j(arguments[0]) || M(arguments[0])) ? arguments[0] : {},
            e = b(arguments) && (U(arguments[0]) || C(arguments[0])) ? arguments[0] : O(window.location.href, "page", "scrollPaging"),
            n = b(arguments) && r(arguments[1]) ? arguments[1] : "vertical",
            t = b(arguments) && r(arguments[2]) ? arguments[2] : null,
            a = {
                target: null,
                minPage: 1,
                amount: 128,
                direction: "vertical",
                affectURL: !1,
                requestURL: O(window.location.href, "page", "scrollPaging"),
                affectTitle: !1,
                ajax: {
                    type: "GET",
                    async: !0
                }
            };
        if ((i = (b(arguments) && (j(arguments[0]) || M(arguments[0])) || (i = {
                requestURL: e,
                direction: n,
                target: t
            }), $.extend(a, i))).amount = parseFloat(i.amount), i.amount = isNaN(i.amount) ? 128 : i.amount, i.direction = -1 < ["both", "horizontal", "vertical", "up", "down", "left", "right"].indexOf(i.direction) ? i.direction : "vertical", b(i.pageList) && !T(i.pageList)) try {
            i.pageListArray = M(i.pageList) ? i.pageList : ("" + i.pageList).split(","), i.pageListArray = function(e) {
                if (M(e)) e = e.filter(function(e, n, t) {
                    return t.indexOf(e) === n
                });
                else if (U(e) || C(e)) {
                    var n = "";
                    e = "" + e;
                    for (var t = 0; t < e.length; t++) n.indexOf(e[t]) < 0 && (n += e[t]);
                    return n
                }
                return e
            }(i.pageListArray), i.currentPageIndex = i.pageListArray.indexOf(i.currentPage), i.maxPageIndex = b(i.maxPage) ? i.pageListArray.indexOf(i.maxPage) : i.pageListArray.length - 1, i.maxPageIndex = -1 < i.maxPageIndex ? i.maxPageIndex : 0, i.maxPage = i.pageListArray[i.maxPageIndex], i.minPageIndex = b(i.minPage) ? i.pageListArray.indexOf(i.minPage) : 0, i.minPageIndex = -1 < i.minPageIndex ? i.minPageIndex : 0, i.minPage = i.pageListArray[i.minPageIndex]
        } catch (e) {} else {
            if (i.currentPage = b(i.currentPage) ? i.currentPage : function(e, n) {
                    if (window.URL) return (t = new URL(e)).searchParams.get(n);
                    (t = document.createElement("a")).href = e;
                    var t = t.search;
                    if (0 < (t = 1 < t.length && "?" == t.substr(0, 1) ? t.substr(1, t.length - 1) : t).length)
                        for (var a, r = t.split("&"), l = 0; l < r.length; l++)
                            if ((a = r[l].split("="))[0] && a[0] == n) return a[1] ? decodeURIComponent(a[1]) : null;
                    return null
                }(location.href, "page"), i.currentPage = parseInt(i.currentPage), i.currentPage = isNaN(i.currentPage) ? 1 : i.currentPage, b(i.pageListArray)) {
                i.pageListArray = void 0;
                try {
                    delete i.pageListArray
                } catch (e) {}
            }
            if (b(i.currentPageIndex)) {
                i.currentPageIndex = void 0;
                try {
                    delete i.currentPageIndex
                } catch (e) {}
            }
            b(i.maxPage) && (i.maxPage = parseInt(i.maxPage), i.maxPage = isNaN(i.maxPage) ? 100 : i.maxPage), b(i.minPage) && (i.minPage = parseInt(i.minPage)), i.minPage = isNaN(i.minPage) ? 1 : i.minPage
        }
        var o = {};
        return this.each(function(e, f) {
            function s(l, e, n, t, a) {
                var i, o, c, g, u, s, P, p;
                S(x.onScroll) && x.onScroll(l, e, n, L, x), L ? S(x.onRepeat) && x.onRepeat(l, e, n, x.currentPage, x) : (i = function(e, n, t, a, r) {
                    var l = r ? 1 : -1;
                    if (M(a.pageListArray) && b(a.maxPage) && b(a.currentPageIndex)) {
                        if (b(a.maxPageIndex) && a.currentPageIndex + l > a.maxPageIndex || b(a.minPageIndex) && a.currentPageIndex + l < a.minPageIndex) return e;
                        var i = a.pageListArray[a.currentPageIndex + l];
                        if (R(i)) return e;
                        e = i, i = null
                    } else {
                        if (b(a.maxPage) && a.currentPage + l > a.maxPage || b(a.minPage) && a.currentPage + l < a.minPage) return e;
                        (n <= (i = r ? t + 1 : n - 1) || i <= t) && (e = r ? R(a.maxPage) || b(a.maxPage) && (null == a.maxPage || i <= a.maxPage) ? i : e : R(a.minPage) || b(a.minPage) && (null == a.minPage || i >= a.minPage) ? i : e, i = null)
                    }
                    return e
                }(x.currentPage, v, I, x, n), r = i != x.currentPage, S(x.onBefore) && x.onBefore(l, e, n, i, r, x), r ? (o = e, c = n, g = t, u = a, l.isPositiveScroll = c, l.isPositiveScrollX = g, l.isPositiveScrollY = u, L = !(s = 0), P = location.href, P = U(x.requestURL) || C(x.requestURL) ? x.requestURL : O(P, "page", "scrollPaging"), p = U(x.showURL) || C(x.showURL) ? x.showURL : P, P = b(P.replaceAll) ? P.replaceAll("scrollPagingTotal", y) : P.replace("scrollPagingTotal", y), P = b(P.replaceAll) ? P.replaceAll("scrollPaging", i) : P.replace("scrollPaging", i), p = b(p.replaceAll) ? p.replaceAll("scrollPagingTotal", y) : p.replace("scrollPagingTotal", y), p = b(p.replaceAll) ? p.replaceAll("scrollPaging", i) : p.replace("scrollPaging", i), d.url = P, S(x.onStart) && x.onStart(l, o, c, i, x), S(x.onMinPage) && i == x.minPage && x.onMinPage(l, o, c, i, x), S(x.onMaxPage) && i == x.maxPage && x.onMaxPage(l, o, c, i, x), (h = $.ajax(d)).done(function(e, n, t) {
                    if (j(x.ajax) && x.ajax.async && "" == e) S(x.onBlank) && x.onBlank(l, o, c, i, P, x);
                    else {
                        if (A = A.concat(i), S(x.onSuccess) && x.onSuccess(l, o, c, i, P, e, n, t, x), b(x.target) && !T(x.target) && ("this" == x.target || "same" == x.target || x.target, m = f, !0 === g || !0 === u ? $(m).append(e) : !1 !== g && !1 !== u || $(m).prepend(e)), M(x.pageListArray) && b(x.maxPage) && b(x.currentPageIndex)) {
                            var a;
                            for (x.currentPage = i, a = 0; a < x.pageListArray.length; a++)
                                if (i == x.pageListArray[a]) {
                                    x.currentPage = a, c ? (I = a, v = "" == v ? a : v) : (v = a, I = "" == I ? a : I);
                                    break
                                } a = null
                        } else x.currentPage = i, I = c ? (v = "" == v ? i : v, i) : (v = i, "" == I ? i : I);
                        if (b(x.affectURL)) {
                            var r = document.title || "";
                            b(x.affectTitle) && !0 === x.affectTitle && ((U(x.requestTitle) || C(x.requestTitle)) && (r = "" + x.requestTitle), r = b(P.replaceAll) ? r.replaceAll("scrollPagingTotal", y) : r.replace("scrollPagingTotal", y), r = b(P.replaceAll) ? r.replaceAll("scrollPaging", i) : r.replace("scrollPaging", i));
                            try {
                                history.pushState({
                                    url: p,
                                    page: i
                                }, r, p)
                            } catch (e) {}
                        }
                    }
                    1 < ++s && (h = null, L = !1)
                }), h.fail(function(e, n, t) {
                    S(x.onError) && x.onError(l, o, c, i, P, e, n, t, x), 1 < ++s && (h = null, L = !1)
                }), h.always(function(e, n, t) {
                    S(x.onComplete) && x.onComplete(l, o, c, i, P, e, n, t, x), S(x.onMinPageComplete) && i == x.minPage && x.onMinPageComplete(l, o, c, i, P, e, n, t, x), S(x.onMaxPageComplete) && i == x.maxPage && x.onMaxPageComplete(l, o, c, i, P, e, n, t, x), 1 < ++s && (h = null, L = !1)
                })) : (S(x.onBlank) && x.onBlank(l, e, n, i, null, x), S(x.onComplete) && x.onComplete(l, e, n, i, null, null, null, null, x), S(x.onMinPageComplete) && i == x.minPage && x.onMinPageComplete(l, e, n, i, null, null, null, null, x), S(x.onMaxPageComplete) && i == x.maxPage && x.onMaxPageComplete(l, e, n, i, null, null, null, null, x)))
            }
            var r, m, d = $.extend(o, i.ajax),
                h = null,
                x = i,
                y = x.maxPage,
                L = !1,
                A = [],
                v = x.currentPage,
                I = x.currentPage,
                P = $(f).scrollLeft() || f.scrollLeft || 0,
                p = $(f).scrollTop() || f.scrollTop || 0,
                n = "scroll ";
            b(f.onwheel) ? n += "wheel" : b(f.onmousewheel) && (n += "mousewheel");

            function t(e) {
                var n, t = event || new Event(e.type, e.target),
                    a = b(t.deltaX) ? t.deltaX : b(t.wheelDeltaX) ? -1 * t.wheelDeltaX : e.deltaX || -0,
                    r = b(t.deltaY) ? t.deltaY : b(t.wheelDeltaY) ? -1 * t.wheelDeltaY : e.deltaY || -0,
                    l = $(this).prop("scrollHeight") || this.scrollHeight || 0,
                    i = $(this).prop("scrollWidth") || this.scrollWidth || 0,
                    o = $(this).height() || this.getBoundingClientRect().height || 0,
                    c = $(this).width() || this.getBoundingClientRect().width || 0,
                    g = $(this).scrollLeft() || this.scrollLeft || 0,
                    u = $(this).scrollTop() || this.scrollTop || 0,
                    c = i - c - g,
                    o = l - o - u;
                r = "scroll" == t.type ? (n = P == g ? null : P < g, p == u ? null : p < u) : (n = -0 == a || 0 == a ? null : 0 < a, -0 == r || 0 == r ? null : 0 < r), S(x.onAlways) && x.onAlways(e, x.direction, isPositiveScroll, x), "vertical" == x.direction || "both" == x.direction ? (!0 === r && o < x.amount || !1 === r && p < x.amount) && s(e, x.direction, r, n, r) : "horizontal" == x.direction || "both" == x.direction ? (!0 === n && c < x.amount || !1 === n && P < x.amount) && s(e, x.direction, n, n, r) : "down" == x.direction && !0 === r && o < x.amount || "up" == x.direction && !1 === r && p < x.amount ? s(e, x.direction, r, n, r) : ("right" == x.direction && !0 === n && c < x.amount || "left" == x.direction && !1 === n && P < x.amount) && s(e, x.direction, n, n, r), P = g, p = u
            }
            if (b($.fn.on)) $(f).on(n, t);
            else if (b($.fn.bind))
                for (var a = n.split(" "), l = 0; l < a.length; l++) $(f).bind(a[l], t)
        }), this.version = "1.0.0", this.developer = "MAMEDUL ISLAM", this
    }
})(jQuery);