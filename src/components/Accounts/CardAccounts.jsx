import { CashIcon, CreditCardIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline"
export function CardAccounts(props){
    let IconCard = ""
    
    function ReturIcon(){
        if(props.icon=='CreditCardIcon'){
            IconCard = <CreditCardIcon/>
        }else if(props.icon=='CurrencyDollarIcon'){
            IconCard = <CurrencyDollarIcon/>
        }else if(props.icon=='OfficeBuildingIcon'){
            IconCard = <OfficeBuildingIcon/>
        }else{
            IconCard = <CashIcon/>
        }
    }
    ReturIcon()
    const valueFormatter = (number) => `$ ${new Intl.NumberFormat('ES', { style: 'currency', currency: 'COP' }).format(number)}`;
    return(
        <div className={`flex ${props.color} rounded-lg`}>
            <input type="checkbox" id={props.name} value="" className="hidden peer" required=""/>
            <label htmlFor={props.name} className="flex items-center justify-between w-full text-gray-500 border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600  dark:peer-checked:text-gray-300 peer-checked:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                                   
                    <div className="w-20 flex justify-center items-center text-white">
                        <div className="w-10">{IconCard}</div>
                    </div>
                    <div className="w-full flex items-start flex-col">
                        <span className="text-gray-300 text-sm font-semibold mt-1">{props.name}</span>                     
                        <p className="text-white font-semibold mb-1">{valueFormatter(props.balance)}</p>             
                    </div>
            </label>
        </div>
    )
}