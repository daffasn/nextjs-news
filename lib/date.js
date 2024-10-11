export function FormattedDate(date) {
    const dateObject = new Date(date);
    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    const formattedDate = dateObject.toLocaleDateString('id-ID', options);

    return formattedDate;
}
