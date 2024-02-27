import { convertDateToString } from "./converDateToString";

export default function addOneDayToDate(date: string) {

    // Add one day to the selected date
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return convertDateToString(nextDay);

}