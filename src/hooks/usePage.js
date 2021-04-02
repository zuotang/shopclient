import React, { useEffect } from "react";

function getTarget() {
  return document.documentElement;
}

function getTop() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}

function setTop(top) {
  document.body.scrollTop = top;
  document.documentElement.scrollTop = top;
}

export function useScrollBottom(callback, params) {
  useEffect(() => {
    let target = getTarget();
    function handleScroll(e) {
      let bottomPadding = 100;
      var scrollTop = getTop();
      var windowHeight = target.clientHeight;
      var scrollHeight = target.scrollHeight;
      if (scrollTop + windowHeight >= scrollHeight - bottomPadding) {
        callback();
      }
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, params);
}

let scrolls = {};
export function useResetScroll(path, active) {
  console.log(path, active);
  useEffect(() => {
    let key = `pageScroll_${path}`;
    let pTop = scrolls[key + "_s"];
    let pHeight = scrolls[key + "_h"];
    if (pTop && active == "POP") {
      document.body.style.minHeight = pHeight + "px";
      setTop(pTop);
    }
    let pageScroll = 0;
    let pageHeight = 0;
    function handleScroll() {
      pageScroll = getTop();
      pageHeight = document.body.offsetHeight;
      scrolls[key + "_s"] = pageScroll;
      scrolls[key + "_h"] = pageHeight;
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.body.style.minHeight = "auto";
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
