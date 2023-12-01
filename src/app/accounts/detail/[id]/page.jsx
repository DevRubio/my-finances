'use client'
import { Divider, Flex, Icon, Subtitle, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from "@tremor/react"
import { Button, Card } from "flowbite-react"
import { ArrowLeftIcon, CashIcon, PencilIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { DeleteModal } from "@/components/Accounts/DeleteModal"


export default function Detail({params}){
    const {id} = params
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
                        <DeleteModal id={id}/>
                    </Flex>
                </div> 
                <Divider/>
                <Flex justifyContent="start" className="gap-3">
                    <div className="w-24 h-24 text-white bg-blue-500 rounded-lg">
                        <CashIcon/>
                    </div>
                    <div>
                        <Subtitle>Nombre</Subtitle>  
                        <Title>Efectivo</Title>
                        <Subtitle>Tipo</Subtitle> 
                        <Title>Inversion</Title> 
                    </div> 
                </Flex>
                <Divider/>
            </Card> 

            <Card className="w-full">
            <TabGroup>
                    <TabList>
                        <Tab>Saldo</Tab>
                        <Tab>Registros</Tab>
                    </TabList>          
                <TabPanels>
                    <TabPanel>
                        A
                    </TabPanel>
                    <TabPanel>
                        B
                    </TabPanel>
                </TabPanels>
            </TabGroup>
            </Card>           
        </Flex>
        
    )
}