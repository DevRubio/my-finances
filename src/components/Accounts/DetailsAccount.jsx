'use client'
import { Divider, Flex, Icon, Subtitle, Title } from "@tremor/react"
import { Button, Card } from "flowbite-react"
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/outline"
import { DeleteModal } from "@/components/Accounts/DeleteModal"
import { GetIcons } from "../GetIcons"
import Link from "next/link"

export function DetailsAccount(props){
    return(
        <Flex flexDirection="col">
            <Card className="m-3 w-full">
                <div className="flex justify-between">
                    <Flex justifyContent="start" className="gap-3">
                        <Link href={`/accounts`}>
                            <Icon icon={ArrowLeftIcon} size="lg" />
                        </Link>
                        <Subtitle>Detalles de Cuenta</Subtitle> 
                    </Flex>
                    <Flex justifyContent="end" className="gap-3">                        
                    <Button gradientDuoTone="greenToBlue" outline> <PencilIcon className="mr-2 h-5 w-5"/> Editar </Button>
                        <DeleteModal id={props.id}/>
                    </Flex>
                </div> 
                <Divider/>
                <Flex justifyContent="start" className="gap-3">
                    <div className="">
                    {<GetIcons 
                                icon={props.icon}
                                size={"xl"} 
                                color={props.color}
                                variant={"shadow"}
                            />}
                    </div>
                    <div>
                        <Subtitle>Nombre</Subtitle>  
                        <Title>{props.name}</Title>
                        <Subtitle>Tipo</Subtitle> 
                        <Title>{props.type}</Title> 
                    </div> 
                </Flex>
                <Divider/>
            </Card>         
        </Flex>
    )
}