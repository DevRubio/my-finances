'use client'

import { useState } from "react";
import { Button, Modal, Checkbox, Label, Tooltip} from "flowbite-react";
import { Flex, Select, SelectItem, Text, Title, TextInput} from "@tremor/react";
import { CreditCardIcon, CashIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { useForm, Controller } from "react-hook-form";
import { saveData } from "@/app/lib/actions";
import { spamErrorForm } from "@/app/lib/utils";


export function AddAccount({Colors}){    
  
const { register, formState:{errors}, handleSubmit, control, reset } = useForm()
  const [openModal, setOpenModal] = useState("")
  const props = { openModal, setOpenModal}

  const saveAccount = (data)=>{
    const newData={
      name: data.name,
      color: data.color,
      type: data.type,     
      amount: parseInt(data.amount),
      exclude: Boolean(data.exclude)
    }   
    saveData('accounts',newData)
    onCloseModal()
  }

  const onCloseModal =()=>{
    props.setOpenModal(undefined)
    reset()
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
        onClose={() => onCloseModal()}
      >
        <Modal.Header>
            <div className="m-2">
            <Title>Añadir Cuenta</Title>     
            </div>

        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(saveAccount)}>
          <div className="space-y-6">    
          <div>
            <Flex className="gap-2">
            <div className="">               
                <Text >Nombre</Text>
                <TextInput placeholder="Nombre de la cuenta" type="text" name="name" {...register('name',{
                  required: true
                })}/>    
              {errors.name?.type === 'required' && spamErrorForm('El nombre es requerido')}            
            </div>
            <div className="">               
                <Text >Color</Text>
                <Controller 
                  name="color"
                  control={control}
                  rules={{required: true}}
                  render={({field})=>(
                    <Select
                      value={field.value}
                      onChange={(value)=>field.onChange(value)}
                    >
                      {Colors?.map((color)=>(
                        <SelectItem key={color.id} value={color.name}>{color.name}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.color?.type === "required" && spamErrorForm('El color es requerido')}
            </div>
            </Flex>
            </div>      
            <div>
              <div className="mb-2 block">
                <Text>Tipo de Cuenta</Text>
              </div>
              <Controller 
                name="type"
                control={control}
                rules={{required: true}}
                render={({field})=>(
                  <Select icon={CashIcon} value={field.value} onChange={(value)=>field.onChange(value)}>              
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
                )}
              />
            {errors.type?.type === 'required' && spamErrorForm('El tipo de cuenta es requerido')}
            </div> 
            <div>
                <div className="mb-2 block">
                    <Text>Monto Inicial</Text>
                </div>
                <TextInput placeholder="0" {...register('amount',{
                  required: true
                })}/>
                {errors.amount?.type === 'required' && spamErrorForm('El monto es requerido')}
                </div>    
                <div className="flex items-center gap-2">
                    <Checkbox {...register('exclude')} />
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