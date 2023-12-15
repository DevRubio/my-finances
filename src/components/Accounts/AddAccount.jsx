'use client'

import { useState } from "react";
import { Button, Modal, Checkbox, Label, Tooltip} from "flowbite-react";
import { Flex, Select, SelectItem, Text, Title, TextInput} from "@tremor/react";
import { CreditCardIcon, CashIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { saveData } from "@/app/lib/actions";


export function AddAccount({Colors}){
    
  const ValueInitial = {
    name: "",
    amount: "",
}
  const [openModal, setOpenModal] = useState("")
  const props = { openModal, setOpenModal}
  const [data, setData] = useState(ValueInitial)
  const [valueColor, setValueColor]= useState("")
  const [typeAccount, setTypeAccount]=useState("")

 const colorSave = {
  color : valueColor
 }
 const typeAccountSave={
  type : typeAccount
 }

  const getInputs = (e)=>{    
    const {name, value} = e.target   
    setData({...data, [name]:value, ...colorSave, ...typeAccountSave})
  }
  const saveAccount = (e)=>{
    e.preventDefault()
    saveData(data)
    props.setOpenModal(undefined)
  }
  

  
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
          <form onSubmit={saveAccount}>
          <div className="space-y-6">    
          <div>
            <Flex className="gap-2">
            <div className="">               
                <Text >Nombre</Text>
                <TextInput placeholder="Nombre de la cuenta" type="text" name="name" value={data.name} onChange={getInputs} required />              
            </div>
            <div className="">               
                <Text >Color</Text>
                <Select name="Color" value={valueColor} onValueChange={setValueColor}>
                  {Colors?.map((color)=>(                    
                    <SelectItem key={color.id} name={color.name} value={color.name}>{color.name}</SelectItem>
                  ))}    
                </Select>
            </div>
            </Flex>
            </div>      
            <div>
              <div className="mb-2 block">
                <Text>Tipo de Cuenta</Text>
              </div>
              <Select icon={CashIcon} value={typeAccount} onValueChange={setTypeAccount}>              
                <SelectItem value="cash" icon={CashIcon}>              
                 Efectivo
                </SelectItem>
                <SelectItem value="creditCard" icon={CreditCardIcon}>
                Tarjeta de Credito
                </SelectItem>
                <SelectItem value="investment" icon={CurrencyDollarIcon}>
                Inversion
                </SelectItem>
                <SelectItem value="BankAccount" icon={OfficeBuildingIcon}>
                Cuenta Bancaria
                </SelectItem>
            </Select>
            </div> 
            <div>
                <div className="mb-2 block">
                    <Text>Monto Inicial</Text>
                </div>
                <TextInput type="number" name="amount" value={data.amount} onChange={getInputs} placeholder="0"/>
                </div>    
                <div className="flex items-center gap-2">
                    <Checkbox id="exclude" name="exclude" value={data.exclude} onChange={getInputs} />
                    <Tooltip style="light" content="Esta opción excluye los registros de las graficas">
                    <Label htmlFor="exclude">
                    Excluir de las estadísticas
                    </Label>
                    </Tooltip>
                </div>

            <div className="flex justify-center text-sm font-medium text-gray-500 dark:text-gray-300">             
              <Button type="submit" className="rounded-3xl">Añadir Cuenta</Button>
            </div>
          </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}