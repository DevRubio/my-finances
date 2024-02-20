'use client'
import { Flex, Grid, NumberInput, Select, SelectItem, Text, TextInput, Title } from "@tremor/react";
import { Button, Modal, Datepicker, Checkbox } from "flowbite-react";
import { useState } from "react";
import { BookOpenIcon, CashIcon, CurrencyDollarIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { useForm, Controller } from "react-hook-form";
import { saveData, getAmountByAccount } from "@/app/lib/actions";
import { spamErrorForm, StringToDate } from "@/app/lib/utils";

export function AddRecords({Accounts, typeInvestment}){ 

    const [openModal, setOpenModal] = useState("")
    const propsModal = { openModal, setOpenModal}
    
    const {register, formState:{errors}, handleSubmit, control, reset, watch} = useForm()  
    
    const InvesmentType = watch('typeInvestment')
    const Activeinvestment = watch('ActiveInvestment')   

    const onSubmit = (data)=>{
        const idAccount = data.account
        const typeInvestment = data.typeInvestment

        const newData = {
            account: data.account,
            name: data.name,
            investmentDate: StringToDate(data.investmentDate),
            addition : parseInt(data.addition),
            earningsDate: StringToDate(data.earningsDate),
            finalBalance : parseInt(data.finalBalance ? data.finalBalance : 0)
        }

        if(data.typeInvestment === 'CDTS'){
            newData.reinvestment = parseInt(data.reinvestment ? data.reinvestment : 0)          
        }else if(data.typeInvestment === 'FICS'){
            
        }else if(data.typeInvestment === 'CRIPTO'){
            newData.amountCripto = parseFloat(data.amountCripto)
            newData.price = parseFloat(data.price)
            delete newData.finalBalance
        }   
        saveData(typeInvestment, newData, idAccount)
        reset()
        setOpenModal(undefined)
        getAmountByAccount(idAccount)
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
            size="2xl"
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
                                                <SelectItem key={item.id} value={item.id} icon={OfficeBuildingIcon}>
                                                {item.name}
                                            </SelectItem>
                                            ))}
                                        
                                        </Select>    
                                    )}                                    
                                    />   
                                    {errors.account?.type === "required" && spamErrorForm('La cuenta es requerida')}                                

                                </div>                          
                                <div>
                                    <Text>Tipo de Inversión</Text>
                                    <Controller
                                        name="typeInvestment"
                                        control={control}
                                        rules={{require: true}}
                                        render={({field})=>(
                                            <Select
                                                value={field.value}
                                                onChange={(value) => field.onChange(value)}
                                                icon={CashIcon}
                                            >
                                                {typeInvestment.map((item)=>(
                                                    <SelectItem key={item.id} value={item.name} icon={CashIcon}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </Select> 
                                        )}
                                    />
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
                                        language="es-CO"
                                        onSelectedDateChanged={(date) => field.onChange(date.toLocaleDateString('es-CO'))}   
                                        maxDate={new Date()}                                
                                        />
                                        )}
                                    />  
                                    {errors.investmentDate?.type === "required" && spamErrorForm('La fecha de inversion es requerida')}
                                </div>
                                <div>
                                    <Text>
                                        {InvesmentType == 'CRIPTO' ? 'COP' :'Capital inicial o addiccion'}                                        
                                    </Text>
                                    <NumberInput placeholder="00.0" icon={CurrencyDollarIcon} {...register('addition',{
                                        required: true
                                    })}/>
                                    {errors.addition?.type === 'required' && spamErrorForm('El valor es requerido')}
                                </div> 

                                    {
                                        InvesmentType === 'CRIPTO' &&(
                                        <>
                                        <div>
                                            <Text>Total Criptomoneda</Text>
                                            <TextInput placeholder="0.0000" icon={CurrencyDollarIcon} {...register('amountCripto',{
                                                required: true
                                            })}/>  
                                            {errors.amountCripto?.type === 'required' && spamErrorForm('El saldo de la criptomoneda es requerido')}  
                                        </div>
                                        <div>
                                            <Text>Precio de compra</Text>
                                            <TextInput placeholder="0.00" icon={CurrencyDollarIcon}{...register('price',{
                                                required: true
                                            })}/>
                                            {errors.price?.type === 'required' && spamErrorForm('El precio de compra es requerido')}
                                        </div>
                                        </>
                                        )
                                    }
 
                                {
                                    InvesmentType === 'CDTS' &&(
                                        <div>
                                            <Text>Reinversión</Text>
                                            <NumberInput type="number" placeholder="00.0" icon={CurrencyDollarIcon} {...register('reinvestment')}/>                                            
                                        </div>
                                    )                                
                                }
                                <div className="flex items-center justify-center">
                                    <Text className="p-4">¿Inversión Finalizada? </Text>
                                    <Checkbox {...register('ActiveInvestment')} />
                                </div>
                                {
                                    Activeinvestment === true &&(
                                        <>
                                        <div>                                
                                        <Text>Fecha Ganancias</Text>
                                            <Controller name="earningsDate"
                                                control={control}
                                                rules={{ required: true }}
                                                render=
                                                {({ field }) => (
                                                <Datepicker
                                                value={field.value}
                                                language="es-CO"
                                                onSelectedDateChanged={(date) => field.onChange(date.toLocaleDateString('es-CO'))}   
                                                maxDate={new Date()}                                 
                                                />
                                                )}
                                            />  
                                            {errors.earningsDate?.type === "required" && spamErrorForm('La fecha de ganacia es requerida')}                            
                                    </div> 
                                    <div>
                                        <Text>Saldo Final</Text>
                                        <NumberInput placeholder="00.0" icon={CurrencyDollarIcon} {...register('finalBalance')} />                                
                                    </div>  
                                        </>                         
                                    )
                                }
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