import { Grid } from "@tremor/react"
import { CardAccounts } from "./CardAccounts"
import { AddAccount } from "./AddAccount"

export function Accounts(){
    const acounts = [
        {
            name: "Efectivo",
            balance: "500000",
            color: "bg-[#1fb6ff]",
            icon: "CurrencyDollarIcon"
        },
        {
            name: "Cdt 1",
            balance: "65000.01",
            color: "bg-[#d32f2fff]",
            icon: "CreditCardIcon"
        },
        
    ]
    return(
        <div className="bg-slate-100 p-2">   
            <Grid numItems={1} numItemsSm={2} numItemsLg={5} className="gap-2 m-4">
                {acounts.map((item) =>(
                    <CardAccounts
                        key={item.name}
                        color={item.color}
                        icon={item.icon}
                        name={item.name}
                        balance={item.balance}

                    />
                ))}
                <AddAccount/>
            </Grid>
        </div>
    )
}