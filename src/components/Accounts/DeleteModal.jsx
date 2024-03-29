'use client'
import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { FireIcon, XCircleIcon } from "@heroicons/react/outline"
import { deleteDocuments } from "@/app/lib/actions"


export function DeleteModal(props){
    const [openModal, setOpenModal] = useState('')
    const action = {openModal, setOpenModal}

    const id = props.id
    return(
        <div>
            <Button onClick={()=>action.setOpenModal('pop-up')} gradientDuoTone="pinkToOrange" outline color="red">
                <XCircleIcon className="mr-2 h-5 w-5"/>
                Eliminar
                
            </Button>
            <Modal show={action.openModal === 'pop-up'} size="md" popup onClose={() => action.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FireIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            ¿Realmente desea eliminar la cuenta ? La cuenta se eliminará de sus presupuestos. Todas las transacciones, órdenes y deudas de esta cuenta se perderán de forma definitiva.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>deleteDocuments('accounts',id)}>
                Si, Estoy Seguro
              </Button>
              <Button color="gray" onClick={() => action.setOpenModal(undefined)}>
                No, Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

        </div>

    )
}