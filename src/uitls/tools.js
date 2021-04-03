import { useState, useEffect } from "react";
import { baseUrl } from "../api";
//解析url请求参数
export function parseQuery(query) {
  var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  var obj = {};
  while (reg.exec(query)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
}

export function getVideoData() {
  let sourceList = JSON.parse(localStorage.getItem("sourceList"));
  let queryData = parseQuery(window.location.search.slice(1));
  return sourceList.find((item) => item.id == queryData.id);
}

export function useVideo() {
  let [data, setData] = useState({});
  useEffect(() => {
    setData(getVideoData());
  }, []);
  return data;
}

export function getImgSrc(src) {
  return src && src.startsWith("http") ? src : `${baseUrl}${src}`;
}
export function getThumbSrc(src, size = "sm") {
  return src && src.startsWith("http") ? src : `${baseUrl}/file/thumb?img=${src}&size=${size}`;
}

export function clearAllCookie() {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  console.log("需要删除的cookie名字：" + keys);
  if (keys) {
    for (var i = keys.length; i--; ) document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
  }
}

//获取图片高宽
function getImageWidth(url) {
  var img = new Image();
  img.src = url;
  let obj = {};
  // 如果图片被缓存，则直接返回缓存数据
  if (img.complete) {
    obj.width = img.width;
    obj.height = img.height;
    return obj;
  } else {
    img.onload = function () {
      obj.width = img.width;
      obj.height = img.height;
      return obj;
    };
  }
}

//复制节点中的文字
export function copyTranslateResult(copyDOM, setMessage) {
  if (copyDOM.innerHTML !== "") {
    var range = document.createRange(); //创建一个range

    window.getSelection().removeAllRanges(); //清楚页面中已有的selection

    range.selectNode(copyDOM); // 选中需要复制的节点

    window.getSelection().addRange(range); // 执行选中元素

    var successful = document.execCommand("copy"); // 执行 copy 操作
    console.log(successful);
    if (successful) {
      setMessage("复制成功！");
    } else {
      setMessage("复制失败，请手动复制！");
    }

    // 移除选中的元素

    window.getSelection().removeAllRanges();
  } else {
    setMessage("没有内容");
  }
}
