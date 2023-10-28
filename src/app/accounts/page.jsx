import { Button, Card, Icon, Title } from "@tremor/react"
import { firebaseApp } from "@/app/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { GetIcons } from "@/components/GetIcons";
import Link from "next/link";

async function getAccounts(){
  const db = getFirestore(firebaseApp);
        const querySnapshot = await getDocs(collection(db, 'accounts'))
        const accounts = [] 
        querySnapshot.forEach((doc) => {            
          accounts.push({ ...doc.data(), id: doc.id })
        })     
        return accounts
}

export default async function Accounts(){

  const Accounts = await getAccounts()

    return(
        <div className="flex">
            <div className="w-[20%] bg-white m-5 p-3 rounded-md">                
                <Title className="mb-3">Cuentas</Title>
                <Button className="w-full">+ Agregar</Button>                
            </div>
            <div className="w-[80%] m-5">
                
            {
            Accounts.map((item) =>(
                    <Card key={item.id} className="mb-3 cursor-pointer" decoration="top" decorationColor={item.color} color={item.color}>
                        <Link href={`/accounts/detail/${item.id}`}>
                        <div className="flex items-center justify-between">
                        <GetIcons 
                                icon={item.icon}
                                size={"xl"} 
                                color={item.color}
                                variant={"shadow"}
                            />
                        <span>{item.name}</span>
                        <span>{item.type}</span>
                        <span>{item.amount}</span>
                        </div>                        
                        </Link>

                    </Card>
                ))}
            </div>
        </div>
    )
}