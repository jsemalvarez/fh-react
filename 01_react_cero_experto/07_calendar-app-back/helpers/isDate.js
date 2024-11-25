// ------------     Ejemplos de uso     ----------------------
// console.log(isValidDate('2024-11-14')); // true
// console.log(isValidDate('Invalid Date String')); // false
// console.log(isValidDate('2024-02-29')); // true (año bisiesto)
// console.log(isValidDate('2023-02-29')); // false (no es bisiesto)
// console.log(isValidDate(1700000000000)); // true (timestamp válido)
// console.log(isValidDate(NaN)); // false

const isDate = ( date ) => {

    if( !date){
        return false
    }

    const parsedDate = new Date(date);    
    return parsedDate instanceof Date && !isNaN(parsedDate);
    
}


module.exports = {
    isDate
}