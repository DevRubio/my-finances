import { FormEdit } from "@/components/Records/FormEdit"
import { getRecordsById } from "@/app/lib/actions"


export default async function Edit({params}){
   
    const {id} = params
    const {name} = params
    const data = await getRecordsById(name, id)
   
    return(
        <div className="flex justify-center">
            <div>
                <FormEdit
                id={id}
                refCollection = {name}
                name={data.name}
                addition={data.addition}
                finalBalance={data.finalBalance}
                investmentDate={data.investmentDate}
                earningsDate={data.earningsDate}
                amountCripto={data.amountCripto}
                price={data.price}
                />
            </div>
        </div>
    )
}