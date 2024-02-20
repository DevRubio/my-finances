import { Records } from "@/components/Records";
import { Title} from "@tremor/react";
import { AddRecords } from "@/components/Records/AddRecords";
import { getAccounts, getConfig } from "../lib/actions";


export default async function Page(){
    const Accounts = await getAccounts()
    const typeInvestment = await getConfig('typeInvestment')
    return(
        <div className="flex">
            <div className="w-[20%] bg-white rounded-md p-3">
                <Title className="m-3 text-gray-900">Registros</Title>               
                    <div className="flex items-center justify-center bg-blue-500 cursor-pointer rounded-lg h-[40px] w-full">
                        <AddRecords
                            Accounts={Accounts}
                            typeInvestment={typeInvestment}
                        />
                    </div>               
             
            </div>
            <div className="w-[80%] ml-4">
                <Records/>
            </div>
            
        </div>
        
    )
}