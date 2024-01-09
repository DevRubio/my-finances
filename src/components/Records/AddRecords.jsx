'use client'
import { Flex, Grid, NumberInput, Select, SelectItem, Text, TextInput, Title } from "@tremor/react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { BookOpenIcon, CalendarIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { Datepicker } from "flowbite-react";
import { FormatMoney } from "@/app/lib/utils";


export function AddRecords(){
    const [openModal, setOpenModal] = useState("")
    const props = { openModal, setOpenModal}

    return(
        <div>
            <div
            onClick={()=>props.setOpenModal("form-elements")}
            className="flex justify-center items-center w-full p-2 text-white gap-1"
            >
            <div>+</div>
            <div>Agregar</div>  
            </div>
            <Modal
            show={props.openModal === "form-elements"}
            size="lg"
            popup
            onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Header>
                    <div className="m-2">
                        <Title>Añadir Registro</Title>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div>
                            <Grid className="gap-2" numItems={1} numItemsLg={2}>
                                <div>
                                    <Text>Cuenta</Text>
                                    <Select name="account" icon={OfficeBuildingIcon}>
                                         <SelectItem>Tyba</SelectItem>
                                    </Select>
                                </div>                          
                                <div>
                                    <Text>Nota</Text>
                                    <TextInput placeholder="" icon={BookOpenIcon}/>
                                </div> 
                                <div>
                                <Text>Fecha</Text>
                                <Datepicker/>
                              </div>  
                            <div>
                                <Text>Meses</Text>
                                <NumberInput placeholder="0 Meses" icon={CalendarIcon}/>                            
                            </div>   
                            <div>
                                <Text>Inversion</Text>
                                <NumberInput placeholder="00.0" icon={CurrencyDollarIcon}/>
                                </div>
                                <div>
                                <Text>Addiccion</Text>
                                <NumberInput placeholder="00.0" icon={CurrencyDollarIcon}/>
                                </div>                          
                            </Grid>                           
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Flex className="items-center justify-center gap-2">
                         <Button pill gradientDuoTone="greenToBlue">Guardar</Button>
                         <Button pill gradientDuoTone="pinkToOrange">Cancelar</Button>
                    </Flex>                    
                </Modal.Footer>
                
            </Modal>              
        </div>
    )
}