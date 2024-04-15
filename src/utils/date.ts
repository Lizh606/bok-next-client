const calculateTimeDifference = (date: string | Date): string | Date => {
  // 使用Date.now()提高性能
  const nowTimestamp: number = Date.now()
  // 将传入的日期转换为时间戳
  let inputDateTimestamp: number
  try {
    inputDateTimestamp = new Date(date).getTime()
  } catch (error) {
    throw new Error(`Failed to parse date: ${date}`)
  }

  const timeDifference: number = nowTimestamp - inputDateTimestamp

  // 判断日期是否是未来的
  // if (timeDifference < 0) {
  //   throw new Error("The provided date is in the future.")
  // }

  // 计算天数差异
  const daysDifference: number = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24)
  )

  if (daysDifference > 0) {
    if (daysDifference <= 30) {
      // 如果时间差不超过30天，返回x天前
      return `${daysDifference}天前`
    }
    // 如果时间差超过30天，返回传入的日期
    return date
  }

  // 细化到小时和分钟
  const hoursDifference: number = Math.floor(timeDifference / (1000 * 60 * 60))
  if (hoursDifference > 0) {
    return `${hoursDifference}小时前`
  }

  const minutesDifference: number = Math.floor(timeDifference / (1000 * 60))
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
export { calculateTimeDifference, formatDate }
