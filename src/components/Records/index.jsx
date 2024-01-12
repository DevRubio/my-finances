import { CardRecords } from "./CardRecords"
import { getRecords } from "@/app/lib/actions"
import { FormatDate, CalculateMonths } from "../../app/lib/utils"

export async function Records(){
    const Records = await getRecords() 
    //console.log("first ", Records)   
    return(
        <div>            
            {Records.map((item)=>(
                <CardRecords
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    addition={item.addition}
                    date={FormatDate(item.investmentDate)}
                    months={CalculateMonths(item.investmentDate, item.earningsDate)}
                    taxe={item.taxe}
                    earningsDate={item.earningsDate}
                    investmentEarnings={item.investmentEarnings}
                />
            ))}
            
        </div>
    )
}