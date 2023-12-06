
export function FormatMoney(value){
    const valueFormater = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
    return valueFormater
}

export function FormatDate(date){
    const newdateFormat = (date).toDate().toDateString() 
    return newdateFormat
}