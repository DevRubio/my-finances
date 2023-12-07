import { BadgeDelta, Card, Text, Subtitle, Grid } from "@tremor/react";
import { FormatDate, FormatMoney, CalculateMonths } from "@/app/lib/utils";

export function CardRecords(props){ 

        
    return(
        <Card decoration="top" className="mb-3">             
            <Grid numItems={2} numItemsSm={4} numItemsLg={7} className="gap-2">
                <div><Text>Nombre</Text><span className="text-sm">{props.name}</span></div>
                <div><Text>Fecha</Text><span className="text-sm">{FormatDate(props.date)}</span></div>
                <div className=""><Text>Inversion</Text><span className="text-sm">{FormatMoney(props.amount)}</span></div>
                <div><Text>Adicion</Text><span className="text-sm">{FormatMoney(props.addition)}</span></div>
                <div><Text>Ganancias</Text>
                <BadgeDelta deltaType="moderateIncrease">{FormatMoney(props.investmentEarnings)}</BadgeDelta>             
                </div>
                <div><Text>Tiempo</Text><span className="text-sm">{CalculateMonths(props.date, props.earningsDate)} Meses</span></div>
                <div><Text>Tasa</Text><span className="text-sm">{props.taxe}%</span></div>
            </Grid>  
        </Card>
    )
}