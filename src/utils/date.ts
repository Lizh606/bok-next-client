const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60
const MILLISECONDS_IN_MINUTE = 1000 * 60

const calculateTimeDifference = (date: string | Date): string | Date => {
  const nowTimestamp: number = Date.now()
  let inputDate: Date
  if (typeof date === "string") {
    inputDate = new Date(date)
    if (isNaN(inputDate.getTime())) {
      throw new Error(
        `Failed to parse date "${date}". Please provide a valid date format.`
      )
    }
  } else if (date instanceof Date) {
    inputDate = date
  } else {
    throw new TypeError(
      "Invalid date type. Please provide a string or a Date object."
    )
  }

  const inputDateTimestamp: number = inputDate.getTime()
  const timeDifference: number = nowTimestamp - inputDateTimestamp

  // 判断是否是有效的日期
  if (Number.isNaN(timeDifference)) {
    throw new Error(
      `Invalid date/time difference calculated for date "${date}".`
    )
  }

  // 计算天数差异
  const daysDifference: number = Math.floor(
    timeDifference / MILLISECONDS_IN_DAY
  )

  if (daysDifference > 0) {
    if (daysDifference <= 30) {
      // 如果时间差不超过30天，返回x天前
      return `${daysDifference}天前`
    }
    // 如果时间差超过30天，返回传入的日期
    return formatDateWithEnglishMonth(inputDate)
  }
  if (timeDifference < MILLISECONDS_IN_MINUTE) {
    return "刚刚"
  }
  // 细化到小时和分钟
  const hoursDifference: number = Math.floor(
    timeDifference / MILLISECONDS_IN_HOUR
  )
  if (hoursDifference > 0) {
    return `${hoursDifference}小时前`
  }

  const minutesDifference: number = Math.floor(
    timeDifference / MILLISECONDS_IN_MINUTE
  )
  return `${minutesDifference}分钟前`
}

const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString)

  // 提取年月日
  const year: number = date.getFullYear()
  const month: number = date.getMonth() + 1
  const day: number = date.getDate()

  // 格式化为 YYYY-MM-DD
  const formattedDate: string = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`

  return formattedDate
}
const formatDateWithEnglishMonth = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  const day = String(date.getDate()).padStart(2, "0") // 获取日期，并确保是两位数
  const month = months[date.getMonth()] // 获取月份的英文缩写
  const year = date.getFullYear() // 获取年份

  return `${month} ${day}, ${year}`
}
export { calculateTimeDifference, formatDate }
