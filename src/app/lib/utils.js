
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

export function CalculateMonths(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio * 1000)
    const fin = new Date(fechaFin * 1000)

    const añosDiferencia = fin.getFullYear() - inicio.getFullYear()
    const mesesDiferencia = (fin.getMonth() + 1) - (inicio.getMonth() + 1)

    return (añosDiferencia * 12) + mesesDiferencia;
}