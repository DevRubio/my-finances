import { getDetailsAccount } from "@/app/lib/actions"
import { DetailsAccount } from "@/components/Accounts/DetailsAccount"

export default async function Detail({params}){
    
    const {id} = params
    const account = await getDetailsAccount(id)
   
    return(
          <DetailsAccount
            id={id}
            name={account.name}
            type={account.type}
            icon={account.icon}
            color={account.color}
          />    
    )
}