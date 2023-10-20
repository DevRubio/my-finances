'use client'

import { useState } from "react";
import { Button, Modal, Checkbox, Label, Tooltip} from "flowbite-react";
import { Flex, Select, SelectItem, Text, Title, TextInput} from "@tremor/react";
import { CreditCardIcon, CashIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline";


export function AddAccount(){
  const [openModal, setOpenModal] = useState("")
  const props = { openModal, setOpenModal}
  const [value, setValue] = useState("")
  
  return (
    <div>
      <div
        onClick={() => props.setOpenModal("form-elements")}
        className="flex justify-around w-full items-center border-2 border-dashed hover:border-blue-600 cursor-pointer rounded-lg h-16"
      >
        <div>+</div>
        <div> Añadir Cuenta</div>
      </div>    
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>
            <div className="m-2">
            <Title>Añadir Cuenta</Title>     
            </div>

        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">    
          <div>
            <Flex className="gap-2">
            <div className="">               
                <Text >Nombre</Text>
                <TextInput placeholder="Nombre de la cuenta" required />
            </div>
            <div className="">               
                <Text >Color</Text>
                <Select>
                  <SelectItem value="1" color="bg-red" className="bg-red">Red</SelectItem>
                  <SelectItem value="2" color="fuchsia" className="bg-fuchsia">Blue</SelectItem>
                </Select>
            </div>
            </Flex>
            </div>      
            <div>
              <div className="mb-2 block">
                <Text>Tipo de Cuenta</Text>
              </div>
              <Select icon={CashIcon} value={value} onChange={setValue}>              
                <SelectItem value="1" icon={CashIcon}>              
                 Efectivo
                </SelectItem>
                <SelectItem value="2" icon={CreditCardIcon}>
                Tarjeta de Credito
                </SelectItem>
                <SelectItem value="3" icon={CurrencyDollarIcon}>
                Inversion
                </SelectItem>
                <SelectItem value="4" icon={OfficeBuildingIcon}>
                Cuenta Bancaria
                </SelectItem>
            </Select>
            </div> 
            <div>
                <div className="mb-2 block">
                    <Text>Monto Inicial</Text>
                </div>
                <TextInput placeholder="0"/>
                </div>    
                <div className="flex items-center gap-2">
                    <Checkbox id="Excluir" />
                    <Tooltip style="light" content="Esta opción excluye los registros de las graficas">
                    <Label htmlFor="Excluir">
                    Excluir de las estadísticas
                    </Label>
                    </Tooltip>
                </div>

            <div className="flex justify-center text-sm font-medium text-gray-500 dark:text-gray-300">             
              <Button className="rounded-3xl">Añadir Cuenta</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}