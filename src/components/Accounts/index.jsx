import { Grid } from "@tremor/react"
import { CardAccounts } from "./CardAccounts"
import { AddAccount } from "./AddAccount"
import { firebaseApp } from "@/app/firebase"
import { collection, getDocs, getFirestore } from "firebase/firestore"

const db = getFirestore(firebaseApp)
const querySnapshot = await  getDocs(collection(db,'accounts'));
const acounts = []
querySnapshot.forEach((doc) => {
    acounts.push({...doc.data(), id: doc.id})
})

export function Accounts(){
    

    return(
        <div className="bg-slate-100 p-2">   
            <Grid numItems={1} numItemsSm={2} numItemsLg={5} className="gap-2 m-4">
                {acounts.map((item) =>(
                    <CardAccounts
                        key={item.id}
                        color={item.color}
                        icon={item.icon}
                        name={item.name}
                        balance={item.amount}
                    />
                ))}
                <AddAccount/>
            </Grid>
        </div>
    )
}