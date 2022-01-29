
import Decimal from "decimal.js"/*
 *存储 Localstorage
 */
 export const setLocalStorage = (name, value) => {
  if (!name) return;
  if (typeof value !=="string") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(name, value);
};
// setLocalStorage, getLocalStorage;
/**
 * 获取localStorage
 */
export const getLocalStorage = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/*
 * 删除LocalStorage
 */
export const removeLocalStorage = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
/**
 * 时间处理
 * @param Time :时间
 * @param format: 返回的时间格式，默认MM-dd
 */
export const Timestamp = (Time, format) => {
  if (!Time) {
    return "";
  }
  try {
    var date = new Date(Time);
    return date.getMonth() + 1 + ":" + date.getDate();
  } catch (err) {
    return Time;
  }
};
/**
 * 时间戳处理
 * @param inputTime :时间戳
 * @param format: 返回的时间格式，默认yyyy-MM-dd hh:mm
 */
export const formatDateTime = (inputTime, format) => {
  if (!inputTime) {
    return "";
  }
  try {
    var date = new Date(parseInt(inputTime));
    if (!format) {
      format = "yyyy-MM-dd hh:mm";
    }
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      S: date.getMilliseconds(), //millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  } catch (err) {
    return inputTime;
  }
};

/**
 *截取字符串中间显示省略号
 *
 */
export const getSubstr = function(chainAddress) {
  let str1 = chainAddress.substr(0, 12);
  let str2 = chainAddress.substr(chainAddress.length - 12, 12);
  let subStr = str1 + "..." + str2;
  return subStr;
};

export const rTime = function(date) {
  var json_date = new Date(date).toJSON();
  return new Date(+new Date(json_date) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
};

export const formartadd = function(add) {
  if (!add || add.length < 10) {
    return add;
  }
  return add.substring(0, 5) + "****" + add.substring(add.length - 4);
};

/**
 * 功能：乘
 * 参数：a；因数
 */
export const mul = function(a, factor, n, rounding) {
  if (!a || (!factor && typeof factor !== "number")) {
    return "0";
  }
  let mulAmount = new Decimal(a || 0).mul(factor || 0);
  return this.format(mulAmount, n, rounding);
};

/**
 * 功能：除
 * 参数：a除数；b被除数
 */
export const div = function(a, b, n, rounding) {
  if (!b || b === "0") return null;
  let divAmount = new Decimal(a || 0).div(b);
  return this.format(divAmount, n, rounding);
};

/**
 * 功能：左移
 */
export const movePointLeft = function(a, n) {
  if (!a || a === "0") return 0;
  return this.div(a, new Decimal("10").toPower(n));
};

/**
 * 功能：右移
 */
export const movePointRight = function(a, n) {
  if (!a || a === "0") return 0;
  return this.mul(a, new Decimal("10").toPower(n));
};

export const isMobile = function() {
  var flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};

export const  getQueryStringRegExp = function(name) { 
  if(!name) return false
  var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");   
  return reg.test(window.location.href) ? unescape(RegExp.$2.replace(/\+/g, " ")) : ""; 
};


export function getCookie(name) {
  let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // 判断这个cookie的参数名是不是我们想要的
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//设置cookie
export function setCookie(cName, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = cName + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//清除cookie
export function removeCookie(name) {
  setCookie("token", '');
}

