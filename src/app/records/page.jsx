import { Records } from "@/components/Records";
import { Title, Button } from "@tremor/react";

export default function Page(){
    return(
        <div className="flex">
            <div className="w-[20%] bg-white rounded-md p-3">
                <Title className="m-3">Registros</Title>
                <Button className="w-full">+ Agregar</Button>
            </div>
            <div className="w-[80%] ml-4">
                <Records/>
            </div>
            
        </div>
        
    )
}