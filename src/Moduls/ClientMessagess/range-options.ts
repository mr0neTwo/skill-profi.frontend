import {ITimeOption} from "./client-request-types"
import {
    getEndOfDayTimestamp,
    getEndOfMonthTimestamp,
    getEndOfWeekTimestamp,
    getStartOfDayTimestamp,
    getStartOfMonthTimestamp,
    getStartOfWeekTimestamp
} from "./Components/timestamp-utils"

export const rangeOptions: ITimeOption[] = [
    {
        id: 1,
        title: 'Все время',
        range: {
            startTimestamp: 0,
            endTimeStamp: getEndOfDayTimestamp()
        }
    },  {
        id: 2,
        title: 'Сегодня',
        range: {
            startTimestamp: getStartOfDayTimestamp(),
            endTimeStamp: getEndOfDayTimestamp()
        }
    }, {
        id: 3,
        title: 'Текущая неделя',
        range: {
            startTimestamp: getStartOfWeekTimestamp(),
            endTimeStamp: getEndOfWeekTimestamp()
        }
    }, {
        id: 4,
        title: 'Текущий месяц',
        range: {
            startTimestamp: getStartOfMonthTimestamp(),
            endTimeStamp: getEndOfMonthTimestamp()
        }
    }
]