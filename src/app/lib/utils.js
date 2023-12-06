
export function FormatMoney(value){    
    if(value == undefined){
        return null
    }else{        
        const valueFormater = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
        return valueFormater
    }
}

export function FormatDate(date){
    const newdateFormat = (date)?.toDate().toLocaleDateString('es-CO')
    return newdateFormat
}