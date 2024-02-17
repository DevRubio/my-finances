import { Italic } from "@tremor/react"

export function FormatMoney(value){ 

    const valueFormater = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value ? value : 0)
    return valueFormater
    
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

export const CalTaxe = (addition, finalBalance) =>{
    if(finalBalance){
        return (((finalBalance-addition)/addition)*100/1).toFixed(2)
    }
    return 0
}

export const CalTaxeCripto = (priceCompra, PriceActual) =>{
    const diferenciaPrecio = PriceActual - priceCompra;
    const porcentajeGanancia = (diferenciaPrecio / priceCompra) * 100
    return porcentajeGanancia.toFixed(2)
}

export const CalEarningCripto = (compra, priceCompra, priceBTC)=>{
    const Earnings = (compra * CalTaxeCripto(priceCompra, priceBTC))/100
    return FormatMoney(Earnings)
}

export const CalEarning = (finalBalance, addition) =>{
    if(finalBalance != 0 ){
       return FormatMoney(finalBalance - addition)
    }
    return FormatMoney(0)

    
}

export const StringToDate=(date)=>{
    if(date){
        const partsDate = date.split('/')
        const day = parseInt(partsDate[0], 10)
        const mount = parseInt(partsDate[1], 10)-1
        const year = parseInt(partsDate[2],10)
    
        const newDate = new Date(year, mount, day)
    
        return newDate
    }

}

export const calcDeltaType=(taxe)=>{
    
    if (taxe >= 10) {
        return "increase";
    } else if (taxe >= 5) {
        return "moderateIncrease";
    } else if (taxe >= 0) {
        return "unchanged";
    } else if (taxe >= -4) {
        return "moderateDecrease";
    } else {
        return "decrease"; 
    }
  }