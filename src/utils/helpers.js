export const chunkArray = (inputArr, chunkSize) => {
    let outputArr = []
    if (!chunkSize) return outputArr;

    for (var i=0;i< inputArr.length; i+=chunkSize) outputArr.push(inputArr.slice(i, i+chunkSize));
    
    return outputArr
}

export const formatDateAndTime = (dateToFormat) => {
    const dateInProperFormat = new Date(dateToFormat);
    const today = new Date();

    if (isNaN(dateInProperFormat.getTime())) return "1st January 1999 at 12:00 AM";
    
    const isSameYear = dateInProperFormat.getFullYear() === today.getFullYear() ? true : false;
    const isSameMonth = dateInProperFormat.getMonth() === today.getMonth();

    const formattedDate = dateInProperFormat.getDate() + " " + dateInProperFormat.toLocaleString('default', { month: 'long' });
    const formattedTime = dateInProperFormat.toLocaleTimeString();
    
    if (!isSameYear) return formattedDate + " " + dateInProperFormat.getFullYear() + " at " + formattedTime;

    const differenceBtwTodayAndPassedDate = today.getDay() - dateInProperFormat.getDay();

    if (!isSameMonth) return formattedDate + " at " + formattedTime;
    
    const day = differenceBtwTodayAndPassedDate === 0 ? "today" :
    differenceBtwTodayAndPassedDate === 1 ? "yesterday" :
    differenceBtwTodayAndPassedDate <= 7 ? dateInProperFormat.toDateString() :
    formattedDate;
    
    return day + " at " + formattedTime;
}