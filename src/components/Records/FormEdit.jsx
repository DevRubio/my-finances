'use client'
import { Divider, TextInput } from '@tremor/react';
import { useForm, Controller } from "react-hook-form";
import { Datepicker } from 'flowbite-react';
import { StringToDate, spamErrorForm } from '@/app/lib/utils';
import Link from 'next/link';
import { updateData } from '@/app/lib/actions';
import { useRouter } from 'next/navigation'

export function FormEdit({id, refCollection, name, addition, finalBalance, investmentDate, earningsDate, amountCripto, price}) {  
   
    const dateInvesment = new Date(((investmentDate?.seconds)*1000))
    const dateEarnings = earningsDate ? new Date((earningsDate?.seconds*1000)) : ''
    const {register, formState:{errors}, handleSubmit, control, reset, watch} = useForm({
        defaultValues:{
            name,
            addition,
            finalBalance,
            investmentDate: dateInvesment.toLocaleDateString('es-CO'),
            earningsDate: dateEarnings ? dateEarnings.toLocaleDateString('es-CO') : '',
            amountCripto,
            price
        }
    })
    const router = useRouter()
    const onSubmit = (data) =>{
      const newData= {
        name: data.name, 
        addition: parseInt(data.addition), 
        finalBalance: finalBalance ? parseInt(data.finalBalance) : 0, 
        investmentDate: StringToDate(data.investmentDate), 
        earningsDate: StringToDate(data.earningsDate)
      }
      updateData(refCollection, id, newData)
      router.push('/records')
    }

  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-2">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >Nombre
              <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"              
                className="mt-2"
                {...register('name',{
                  required: true
                })}
              />
              {errors.name?.type === 'required' && spamErrorForm('El nombre es requerido')}
            </div>
            <div className="col-span-full sm:col-span-2">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                {refCollection === 'CRIPTO' ? 'Total Compra':'Capital inicial o addiccion'}
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                className="mt-2"
                {...register('addition',{
                  required: true
                })}
              />
              {errors.addition?.type === 'required' && spamErrorForm('El valor de la inversion es obligatorio')}
            </div>
            {refCollection ==='CRIPTO' &&(
              <>
              <div className="col-span-full sm:col-span-2">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Total Cripto
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                className="mt-2"
                {...register('amountCripto',{
                  required: true
                })}
              />
              {errors.amountCripto?.type === 'required' && spamErrorForm('El total de la criptomoneda es obligatorio')}            
              </div> 
              <div className="col-span-full sm:col-span-2">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Valor Cripto
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                className="mt-2"
                {...register('price',{
                  required: true
                })}
              />
              {errors.price?.type === 'required' && spamErrorForm('El valor de la compra es obligatorio')}            
              </div> 
          </>             
            )}
            <div className="col-span-full sm:col-span-2">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Saldo Final
              </label>
              <TextInput
                className="mt-2"
                placeholder='$ 0,00'
                {...register('finalBalance')}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Fecha Inversion
                <span className="text-red-500">*</span>
              </label>
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
                 defaultDate={dateInvesment}                                            
                 />                 
                 )}
             />  
             {errors.investmentDate?.type === "required" && spamErrorForm('La fecha de inversion es requerida')}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Fecha Ganancias
                <span className="text-red-500">*</span>
              </label>
              <Controller name='earningsDate'
                control={control}
                render={
                  ({field})=>(
                    <Datepicker
                      value={field.value}
                      language='es-CO'
                      onSelectedDateChanged={(date)=>field.onChange(date.toLocaleDateString('es-CO'))}
                      maxDate={new Date()}
                      defaultValue={dateEarnings}
                    />
                  )
                }
              />
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <Link href={`/records`}>
              <button
                type="button"
                className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Cancel
              </button>            
            </Link>
            <button
              type="submit"
              className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}