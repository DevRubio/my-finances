import { getDetailsAccount } from "@/app/lib/actions"
import { DetailsAccount } from "@/components/Accounts/DetailsAccount"
import { CardBalance } from "@/components/Accounts/CardBalance"

export default async function Detail({params}){
    
    const {id} = params
    const account = await getDetailsAccount(id)  
   
    return(
      <div>
        <DetailsAccount
            id={id}
            name={account.name}
            type={account.type}
            icon={account.icon}
            color={account.color}
          />
        <CardBalance
            id={id}
            color={account.color}
        />
        </div>   
    )
}