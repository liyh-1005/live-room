import moment from 'moment'

export default {
  /**
   * 获取unixTimestamp时间戳(秒级时间戳)
   */
  getUnixTimestamp() {
    return Math.round(new Date().getTime() / 1000)
  },

  /**
   * 生成唯一的id
   * @param {*} len
   * @param {*} radix
   */
  tid(len = 8, radix = 16) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
      ''
    )
    var uuid = [],
      i
    radix = radix || chars.length

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
      var r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16)
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return 'tid-' + uuid.join('').toLowerCase()
  },

  isString(o) {
    return Object.prototype.toString.call(o) == '[object String]'
  },

  isObject(o) {
    return Object.prototype.toString.call(o) == '[object Object]'
  },

  isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]'
  },

  isFunction(o) {
    return Object.prototype.toString.call(o) == '[object Function]'
  },

  getCurrentHms() {
    return moment().format('HH:mm:ss')
  },

  formatTime(time, format) {
    return moment.unix(time).format(format)
  },

  formDate(time) {
    const thisTime = time.replace(/-/g, '/')
    var nowTime = new Date(thisTime)
    nowTime = nowTime.getTime() / 1000
    return nowTime
  },

  generateGroupId(groupId) {
    return {
      cmdGroupId: `${groupId}`,
      chatGroupId: `${groupId}_chat`
    }
  },

  getQuery: function (n, search) {
    var m = (search || window.location.search).match(
      new RegExp('(\\?|&)' + n + '=([^&]*)(&|$)')
    )
    return !m ? '' : decodeURIComponent(m[2])
  },

  getHash: function (n) {
    var m = window.location.hash.match(
      new RegExp('(#|&)' + n + '=([^&]*)(&|$)')
    )
    return !m ? '' : decodeURIComponent(m[2])
  },
  getOS: function () {
    var OSName = 'Unknown OS'
    if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows'
    if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'Mac'
    if (navigator.appVersion.indexOf('iPad') != -1) OSName = 'iOS'
    if (navigator.appVersion.indexOf('iPhone') != -1) OSName = 'iOS'
    if (navigator.appVersion.indexOf('Android') != -1) OSName = 'Android'
    return OSName
  },


  // 格式化时间：时间(s)=>hh:mm:ss
  timeFormat(time) {
    let hour = Math.floor((time % 86400) / 3600),
      min = Math.floor((time % 3600) / 60),
      sec = Math.floor(time % 60)
    return (
      (hour <= 9 ? '0' + hour : hour) +
      ':' +
      (min <= 9 ? '0' + min : min) +
      ':' +
      (sec <= 9 ? '0' + sec : sec)
    )
  },
}