export function formatToLocalUKTime  (dateString) {
    console.log(dateString)
    if (dateString === "" || dateString === "0001-01-01 00:00:00 +0000 UTC") {
        return "";
    }
    try {
        const regex = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d:2}) ([+\-\d]{5}) (.+)/;
        const match = dateString.match(regex);

        if (match) {
            const yearMonthDay = match[1];
            const time = match[2];
            const offset = match[3];
            const newDateString = `${yearMonthDay}T${time}${offset}`;
            const date = new Date(newDateString);
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const formattedDate = date.toLocaleString('en-GB', options);
            return formattedDate;
        }
    } catch (error) {
        console.error('Error formatting date:', error);
    }

    return "";
};
