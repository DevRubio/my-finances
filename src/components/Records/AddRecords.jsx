'use client'
import { Flex, NumberInput, Select, SelectItem, Text, TextInput, Title } from "@tremor/react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { Datepicker } from "flowbite-react";


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
            size="md"
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
                            <Flex className="gap-2">
                                <div>
                                <Text>Cuenta</Text>
                                <Select name="account">
                                <SelectItem>Tyba</SelectItem>
                                </Select>
                                </div>                          
                                <div>
                                    <Text>Nota</Text>
                                    <TextInput placeholder=""/>
                                </div>
                                
                            </Flex>
                            <div className="gap-2">
                            <Text>Importe</Text>
                            <NumberInput placeholder="00.0" icon={CurrencyDollarIcon}/>
                            </div>
                            <div className="gap-2">
                                <Text>Fecha</Text>
                                <Datepicker/>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Guardar</Button>
                </Modal.Footer>
                
            </Modal>              
        </div>
    )
}