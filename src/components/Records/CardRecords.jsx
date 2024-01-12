'use client'
import { BadgeDelta, Card, Text, Grid } from "@tremor/react";
import { TrashIcon } from "@heroicons/react/outline";
import { deleteDocuments } from "@/app/lib/actions";


export function CardRecords(props){ 
    return(
        <Card decoration="top" className="mb-3"> 
            <span className="absolute right-2 top-2 hover:cursor-pointer" onClick={()=>deleteDocuments('records', props.id)}>
                <TrashIcon
                    className="w-6 hover:w-8 text-red-600"
                />                  
            </span>            
            <Grid numItems={2} numItemsSm={4} numItemsLg={7} className="gap-2">
                <div><Text>Nombre</Text><span className="text-sm">{props.name}</span></div>
                <div><Text>Fecha</Text><span className="text-sm">{props.date}</span></div>
                <div className=""><Text>Inversion</Text><span className="text-sm">{props.amount}</span></div>
                <div><Text>Adicion</Text><span className="text-sm">{props.addition}</span></div>
                <div><Text>Ganancias</Text>
                <BadgeDelta deltaType="moderateIncrease">{props.investmentEarnings}</BadgeDelta>             
                </div>
                <div><Text>Tiempo</Text><span className="text-sm">{props.months} Meses</span></div>
                <div><Text>Tasa</Text><span className="text-sm">{props.taxe}%</span></div>
            </Grid>  
        </Card>
    )
}