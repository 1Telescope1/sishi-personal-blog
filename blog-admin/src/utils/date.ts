import dayjs from "dayjs"

export function formatDate(date: string | Date, format = "YYYY-MM-DD") {
  return dayjs(date).format(format);
}

export function formatDateTime(date: string | Date, format = "YYYY-MM-DD HH:mm:ss") {
  return formatDate(date, format);
}
