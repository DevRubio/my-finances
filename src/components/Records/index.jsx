import { CardRecords } from "./CardRecords"
import { getRecords } from "@/app/lib/actions"

export async function Records(){
    const Records = await getRecords() 
    //console.log("first ", Records)   
    return(
        <div>
            <h3>Registros</h3>
            {Records.map((item)=>(
                <CardRecords
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    date={item.investmentDate}
                    taxe={item.taxe}
                    earningsDate={item.earningsDate}
                    investmentEarnings={item.investmentEarnings}
                />
            ))}
            
        </div>
    )
}