
// 时间戳(长度为10位) 转 日期（YY-MM-dd）
export function dateNumToDateString (dateNum) {
  let d = new Date(+(dateNum + '000'))
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

// 日期 转 时间戳(长度为10位)
export function dateStringToDateNum (dateString) {
  let d = new Date(dateString)
  d.setHours(0, 0, 0, 0)
  return (d.getTime() + '').substring(0, 10)
}

// 求日期（YY-MM-dd）是星期几
export function getDateWeekByDateString (dateString) {
  let d = new Date(dateString)
  let week = ['日', '一', '二', '三', '四', '五', '六']
  return week[d.getDay()]
}

// 求时间戳（10位）是星期几
export function getDateWeekByDateNum (dateNum) {
  let d = new Date(+(dateNum + '000'))
  let week = ['日', '一', '二', '三', '四', '五', '六']
  return week[d.getDay()]
}

// 获取当前时间，格式YYYY-MM-DD
export function getNowFormatDate () {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}