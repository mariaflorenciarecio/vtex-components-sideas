import { TimeSplit } from '../typings/global'

const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE

const fillWithZero = (digits: number, number: number): string => {
  const filled = `${'0'.repeat(digits - 1)}${number}`

  return filled.slice(filled.length - digits)
}

export const parseTimeRemaining = (totalSeconds: number): TimeSplit => {
  const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR)
  const minutes = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
  )

  const seconds = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) % SECONDS_IN_MINUTE
  )

  return {
    hours: fillWithZero(2, hours),
    minutes: fillWithZero(2, minutes),
    seconds: fillWithZero(2, seconds),
  }
}

/**
 *
 * @param targetDate ISOString for the date that the countdown will expire
 * @param dispatchFn A function that updates the state of the component
 */
export const tick = (
  targetDate: string,
  dispatchFn: React.Dispatch<React.SetStateAction<TimeSplit>>
) => {
  const ONE_SECOND_IN_MILLIS = 1000
  const finalDate = new Date(targetDate)
  const now = new Date()

  const secondsLeft =
    (finalDate.getTime() - now.getTime()) / ONE_SECOND_IN_MILLIS

  setTimeout(() => {
    dispatchFn(parseTimeRemaining(secondsLeft))
  }, ONE_SECOND_IN_MILLIS)
}

export const getOneDaysFromNow = () => {
  const today = new Date()

  today.setDate(today.getDate() + 1)

  return today.toISOString()
}

export const getYearFromNow = () => {
  const year = new Date()
  const yearNow = year.getFullYear().toString()

  return yearNow
}

export const getMonthFromNow = () => {
  const month = new Date()
  const monthNow = (month.getMonth() + 1).toString().padStart(2, '0')

  return monthNow
}

export const getDayFromNow = () => {
  const day = new Date()
  const dayNow = day.getDate().toString().padStart(2, '0')

  return dayNow
}
