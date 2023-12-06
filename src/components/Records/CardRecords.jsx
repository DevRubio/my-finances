import { BadgeDelta, Card, Text } from "@tremor/react";
import { FormatDate, FormatMoney } from "@/app/lib/utils";

export function CardRecords(props){ 

        
    return(
        <Card decoration="top"> 
            <div className="flex justify-between">
                <span><Text>Nombre</Text>{props.name}</span>
                <span><Text>Fecha de Inversion</Text>{FormatDate(props.date)}</span>
                <span><Text>Inversion</Text>{FormatMoney(props.amount)}</span>
                <span><Text>Ganancias</Text>
                <BadgeDelta deltaType="moderateIncrease">{FormatMoney(props.investmentEarnings)}</BadgeDelta>             
                </span>
                <span><Text>Fecha de Ganancias</Text>{FormatDate(props.earningsDate)}</span>
                <span><Text>Tasa</Text>{props.taxe}%</span>
            </div>  
        </Card>
    )
}