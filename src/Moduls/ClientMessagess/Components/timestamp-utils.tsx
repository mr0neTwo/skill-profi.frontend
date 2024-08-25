export const getEndOfDayTimestamp = (): number => {

    const now = new Date();
    now.setHours(23, 59, 59, 999);

    return Math.round(now.getTime() / 1000);
}

export const getStartOfDayTimestamp = (): number => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round(now.getTime() / 1000);
}

export const getEndOfWeekTimestamp = (): number => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    now.setDate(now.getDate() + diff);
    now.setHours(23, 59, 59, 999);
    return Math.round(now.getTime() / 1000);
}

export const getStartOfWeekTimestamp = (): number => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    now.setDate(now.getDate() + diff);
    now.setHours(0, 0, 0, 0);
    return Math.round(now.getTime() / 1000);
}


export const getStartOfMonthTimestamp = (): number => {
    const now = new Date();
    now.setDate(1); // Первый день месяца
    now.setHours(0, 0, 0, 0);
    return Math.round(now.getTime() / 1000);
}

export const getEndOfMonthTimestamp = (): number => {
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    now.setDate(0);
    now.setHours(23, 59, 59, 999);
    return Math.round(now.getTime() / 1000);
}