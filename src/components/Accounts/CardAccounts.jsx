'use client'
import { PencilIcon } from "@heroicons/react/outline"
import { GetIcons } from "../GetIcons";
import { FormatMoney } from "@/app/lib/utils";


export function CardAccounts(props){

   
    const deleteAccount =() =>{
        console.log("Editar")
    }
    
    return(
        <div className={`flex bg-${props.color}-500 relative rounded-lg`}>
            <span 
                onClick={deleteAccount}
                className="grid place-items-center w-7 h-7 absolute right-2 top-2 hover:cursor-pointer">
            <PencilIcon
                className="w-4 hover:w-6"
            />
            </span>

            <input type="checkbox" id={props.name} value="" className="hidden peer" required=""/>
            <label htmlFor={props.name} className="flex items-center justify-between w-full text-gray-500 border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600  dark:peer-checked:text-gray-300 peer-checked:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                                   
                    <div className="w-20 flex justify-center items-center text-white">
                        <div className="w-10 text-white">
                            {<GetIcons 
                                icon={props.icon}
                                size={"xl"} 
                                color={"white"}
                                variant={"simple"}
                            />}
                            </div>
                    </div>
                    <div className="w-full flex items-start flex-col">
                        <span className="text-gray-300 text-sm font-semibold mt-1">{props.name}</span>                     
                        <p className="text-white font-semibold mb-1">{FormatMoney(props.balance)}</p>             
                    </div>
            </label>
        </div>
    )
}