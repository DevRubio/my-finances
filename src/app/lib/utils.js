import { Italic } from "@tremor/react"

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

    if(fechaInicio && fechaFin){
        const inicio = new Date(fechaInicio * 1000)
        const fin = new Date(fechaFin * 1000)    
        const añosDiferencia = fin.getFullYear() - inicio.getFullYear()
        const mesesDiferencia = (fin.getMonth() + 1) - (inicio.getMonth() + 1)
    
        return (añosDiferencia * 12) + mesesDiferencia;
        
    }else{
        return 0
    }
}

export const spamErrorForm =(err)=>{
    return <Italic className="text-red-600" >{err}</Italic>
}

export const CalTaxe = (Earnings, total) =>{
    if(Earnings != 0){
        return ((Earnings/total)*100/1).toFixed(2)
    }
    return 0
}

export const StringToDate=(date)=>{
    const partsDate = date.split('/')
    const day = parseInt(partsDate[0], 10)
    const mount = parseInt(partsDate[1], 10)-1
    const year = parseInt(partsDate[2],10)

    const newDate = new Date(year, mount, day)

    return newDate
}