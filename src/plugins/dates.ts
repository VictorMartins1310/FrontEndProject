export function getFirstDayWeek(selectedDay: Date): Date {
    const dayOfWeek = selectedDay.getDay();
    return new Date(new Date().setDate(selectedDay.getDate() - dayOfWeek));
};

export function getLastDayWeek(selectedDay: Date): Date {
    const day1 = getFirstDayWeek(selectedDay);
    return new Date(new Date().setDate(day1.getDate() + 7));
};


export function getFirstDayMonth(selectedDay: Date): Date {
    let
        year = selectedDay.getFullYear(),
        month = selectedDay.getMonth(),
        day = 1;
    return new Date(year, month, day);
};

export function getLastDayMonth(selectedDay: Date): Date {
    const firstDay: Date = getFirstDayMonth(selectedDay);
    let lastDay: Date = new Date(new Date().setDate(firstDay.getDate() + 31));
    while(lastDay.getDate() <= 9 && lastDay.getDate()>= 1){
        lastDay = dayBefore(lastDay);
    }
     
    return lastDay;
};

/**
 * 
 * @returns Monday, Sunday
 */
export function getFirstLastDayWeek(day: Date){
    return {
        "day1": getFirstDayWeek(day),
        "day7": getLastDayWeek(day)
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
};

/**
 * Returns new Date (Next Day) as Date
 * @param selectedDay Input Date to return the Next Day as Date
 * @returns Next Day
 */
export function nextDay(selectedDay: Date): Date {
    let
        year = selectedDay.getFullYear(),
        month = selectedDay.getMonth(),
        day = selectedDay.getDate() + 1;
    return new Date(year, month, day);
}

export function nextWeek(selectedDay: Date): Date {
    let
        year = selectedDay.getFullYear(),
        month = selectedDay.getMonth(),
        day = selectedDay.getDate() + 7;
    return new Date(year, month, day);
}


export function weekBefore(selectedDay: Date): Date {
    let
        year = selectedDay.getFullYear(),
        month = selectedDay.getMonth(),
        day = selectedDay.getDate() - 7;
    return new Date(year, month, day);
}


export function nextMonth(selectedDay: Date): Date {
    let
        year = selectedDay.getFullYear(),
        month = selectedDay.getMonth() + 1,
        day = selectedDay.getDate();
    return new Date(year, month, day);
}

export function monthBefore(selectedDay: Date): Date {
    let
        year = selectedDay.getFullYear(),
        month = selectedDay.getMonth() - 1,
        day = selectedDay.getDate();
    return new Date(year, month, day);
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

export function isInMonth(selectedDay: Date, date2Proof: Date): boolean {
    if (date2Proof >= getFirstDayMonth(selectedDay) && selectedDay <= getLastDayMonth(selectedDay))
        return true;
    return false;
}

