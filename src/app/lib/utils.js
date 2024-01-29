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