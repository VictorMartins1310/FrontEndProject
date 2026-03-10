export function getFirstDayWeek(selectedDay: Date): Date {
    const dayOfWeek = selectedDay.getDay();
    return new Date(new Date().setDate(selectedDay.getDate() - dayOfWeek));
}

export function getLastDayWeek(selectedDay: Date): Date {
    const day1 = getFirstDayWeek(selectedDay);
    return new Date(new Date().setDate(day1.getDate() + 7));
}

/**
 * 
 * @returns Monday, Sunday
 */
export function thisWeek(){
    const 
        today: Date = new Date();
        // dayOfWeek = today.getDay(),

    //     day1: Date = new Date(new Date().setDate(today.getDate() - dayOfWeek)),
    //     day7: Date = new Date(new Date().setDate(day1.getDate() + 7));

    // return {
    //     "day1": day1,
    //     "day7": day7
    // };

    return {
        "day1": getFirstDayWeek(today),
        "day7": getLastDayWeek(today)
    }
};

export function thisMonth(){
    const 
        today: Date = new Date(),
        month = today.getMonth(),
        
        dayFirst: Date = new Date(today.getFullYear(), month, 1);
    
    let dayLast: Date = new Date(new Date().setDate(dayFirst.getDate() + 31));
    while(dayLast.getDate() <= 9 && dayLast.getDate()>= 1){
        dayLast = dayBefore(dayLast);
    }
    return {
        "dayFirst": dayFirst,
        "dayLast": dayLast
    };
};

export function dayBefore(selectedDay: Date): Date {
    return new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() - 1);
}

/**
 * Returns new Date (Next Day) as Date
 * @param selectedDay Input Date to return the Next Day as Date
 * @returns Next Day
 */
export function nextDay(selectedDay: Date): Date {
    return new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 1);
}
/**
 * Verify if Date is in that week
 * @param selectedDay 
 * @param date2Proof 
 * @returns 
 */
export function isInWeek(selectedDay: Date, date2Proof: Date): boolean {
    if (date2Proof >= getFirstDayWeek(selectedDay) && selectedDay <= getLastDayWeek(selectedDay))
        return true;
    return false;
}