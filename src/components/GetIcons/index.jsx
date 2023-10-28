'use client'
import { CashIcon, CreditCardIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { Icon } from "@tremor/react";

export function GetIcons(props){

    let IconCard     
    function ReturIcon(){
        if(props.icon=='CreditCardIcon'){
            IconCard = CreditCardIcon
        }else if(props.icon=='CurrencyDollarIcon'){
            IconCard = CurrencyDollarIcon
        }else if(props.icon=='OfficeBuildingIcon'){
            IconCard = OfficeBuildingIcon
        }else{
            IconCard = CashIcon
        }
    }
    ReturIcon()

    return(
        <Icon icon={IconCard} variant={props.variant} size={props.size} color={`${props.color}`}/>
    )
}