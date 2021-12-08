import moment from "moment";

export function getUserDateFromUTCString(UTCString) {
    // Parse the UTC date, so that it looks better
    let now = moment(new Date()); // todays date
    let time = moment(UTCString); // time of utc string
    let duration = moment.duration(now.diff(time));
    let days = duration.asDays();
    let hours = duration.asHours();
    let userDate = "";
    if (hours <= 24) {
        userDate = time.fromNow(); // 3 hours ago, an hour ago
    } else if (days <= 7) {
        userDate = time.calendar(); // Yesterday at 2:57 AM, Wednesday at 2:58 AM
    } else {
        userDate = time.format('LL'); // November 28, 2021
    }
    return userDate;
}