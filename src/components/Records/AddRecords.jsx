'use client'
import { Flex, Grid, NumberInput, Select, SelectItem, Text, TextInput, Title, Italic } from "@tremor/react";
import { Button, Modal, Datepicker } from "flowbite-react";
import { useState } from "react";
import { BookOpenIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { useForm, Controller } from "react-hook-form";
import { saveData } from "@/app/lib/actions";
import { spamErrorForm } from "@/app/lib/utils";

export function AddRecords({Accounts}){ 

    const [openModal, setOpenModal] = useState("")
    const propsModal = { openModal, setOpenModal}
    const {register, formState:{errors}, handleSubmit, control, reset} = useForm()    

    const onSubmit = (data)=>{
        const newData = {
            account: data.account,
            name: data.name,
            investmentDate: new Date(data.investmentDate),
            earningsDate: new Date(data.earningsDate),            
            reinvestment : parseInt(data.reinvestment),
            addition : parseInt(data.addition),
            investmentEarnings: parseInt(data.investmentEarnings)
        }
        const idAccount = data.account   
        saveData('CDTS', newData, idAccount)
        reset()
        setOpenModal(undefined)
    }

    const onCloseModal = ()=>{
        setOpenModal(undefined)
        reset()
    }

    return(
        <div>
            
            <div
            onClick={()=>propsModal.setOpenModal("form-elements")}
            className="flex justify-center items-center w-full p-2 text-white gap-1"
            >
            <div>+</div>
            <div>Agregar</div>  
            </div>
            <Modal
            show={propsModal.openModal === "form-elements"}
            size="lg"
            popup
            onClose={()=>onCloseModal()}
            >
                <Modal.Header>
                    <div className="m-2">
                        <Title>Añadir Registro</Title>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Grid className="gap-2" numItems={1} numItemsLg={2}>
                                <div>
                                    <Text>Cuenta</Text>                                  
                                    <Controller
                                    name="account"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                        value={field.value}
                                        onChange={(value) => field.onChange(value)}
                                        icon={OfficeBuildingIcon}
                                        >
                                            {Accounts.map((item)=>(
                                                <SelectItem value={item.id} icon={OfficeBuildingIcon}>
                                                {item.name}
                                            </SelectItem>
                                            ))}
                                        
                                        </Select>    
                                    )}                                    
                                    />   
                                    {errors.account?.type === "required" && spamErrorForm('La cuenta es requerida')}                                

                                </div>                          
                                <div>
                                    <Text>Name</Text>
                                    <TextInput placeholder="" icon={BookOpenIcon} {...register('name',{
                                        required: true
                                    })} />
                                    {errors.name?.type === "required" && spamErrorForm('El nombre es requerido')}
                                </div> 
                                <div>
                                    <Text>Fecha Inversion</Text>
                                    <Controller name="investmentDate"
                                        control={control}
                                        rules={{ required: true }}
                                        render=
                                        {({ field }) => (
                                        <Datepicker
                                        value={field.value}
                                        onSelectedDateChanged={(date) => field.onChange(date.toLocaleDateString('es-CO'))}   
                                        maxDate={new Date()} 
                                        language="es-CO"                                   
                                        />
                                        )}
                                    />  
                                    {errors.investmentDate?.type === "required" && spamErrorForm('La fecha de inversion es requerida')}
                                </div>  
                            <div>                                
                                <Text>Fecha Ganacias</Text>
                                    <Controller name="earningsDate"
                                        control={control}
                                        rules={{ required: true }}
                                        render=
                                        {({ field }) => (
                                        <Datepicker
                                        value={field.value}
                                        onSelectedDateChanged={(date) => field.onChange(date.toLocaleDateString('es-CO'))}   
                                        maxDate={new Date()}                                 
                                        />
                                        )}
                                    />  
                                    {errors.earningsDate?.type === "required" && spamErrorForm('La fecha de ganacia es requerida')}                            
                            </div>   
                            <div>
                                <Text>Reinversión</Text>
                                <NumberInput type="number" placeholder="00.0" icon={CurrencyDollarIcon} {...register('reinvestment')}/>
                                </div>
                                <div>
                                <Text>Capital inicial o addiccion</Text>
                                <NumberInput placeholder="00.0" icon={CurrencyDollarIcon} {...register('addition')}/>
                                </div>    
                                <div>
                                <Text>Ganancias</Text>
                                <NumberInput placeholder="00.0" icon={CurrencyDollarIcon} {...register('investmentEarnings')}/>
                                </div>                           
                            </Grid>                           
                        </div>
                        <Flex className="m-4 items-center justify-center gap-2">
                            <Button pill gradientDuoTone="greenToBlue" type="submit">Guardar</Button>
                            <Button pill gradientDuoTone="pinkToOrange" onClick={()=>onCloseModal()}>Cancelar</Button>
                        </Flex>
                    </form>
                </Modal.Body>                
            </Modal>              
        </div>
    )
}