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

export function useResetScroll(path) {
  useEffect(() => {
    let key = `pageScroll_${path}`;
    let pTop = localStorage.getItem(key);
    if (pTop) {
      setTop(pTop);
    }
    let pageScroll = 0;
    function handleScroll() {
      pageScroll = getTop();
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      localStorage.setItem(key, pageScroll);
    };
  }, []);
}
