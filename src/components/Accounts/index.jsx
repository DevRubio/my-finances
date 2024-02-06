import { Grid } from "@tremor/react"
import { CardAccounts } from "./CardAccounts"
import { AddAccount } from "./AddAccount"
import { getAccounts, getConfig } from "@/app/lib/actions"

export async function Accounts(){ 

    const Accounts = await getAccounts()
    const Colors = await getConfig('colors')
    
    return(
        <div className="bg-slate-100 p-2">   
            <Grid numItems={1} numItemsSm={2} numItemsLg={5} className="gap-2 m-4">
                {Accounts.map((item) =>(
                    <CardAccounts
                        key={item.id}
                        id={item.id}
                        color={item.color}
                        icon={item.icon}
                        name={item.name}
                        balance={item.amount}
                    />
                ))}
                <AddAccount
                Colors={Colors}
                />
            </Grid>
        </div>
    )
}