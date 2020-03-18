export const dateTransformationService = dateString => {
    var date = new Date(Date.parse(dateString));

    return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getUTCDate()
    );
};

export const dateddMMYYYTransformationService = dateString => {
    var date = new Date(Date.parse(dateString));

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    return (
        date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    );
};