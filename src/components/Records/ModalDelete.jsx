'use client'
import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { FireIcon, TrashIcon } from "@heroicons/react/outline"
import { deleteDocuments } from "@/app/lib/actions"


export function ModalDelete({collection, id}){
    const [openModal, setOpenModal] = useState('')
    const action = {openModal, setOpenModal}

    const deleteRecords = ()=>{
        deleteDocuments(collection,id)
        setOpenModal(undefined)
    }
  
    return(
        <div>
            <TrashIcon
            onClick={()=>action.setOpenModal('pop-up')}
            className="w-6 hover:w-8 hover:text-red-500 hover:cursor-pointer"
            />
            <Modal show={action.openModal === 'pop-up'} size="md" popup onClose={() => action.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FireIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            ¿Realmente desea eliminar el registro? El registro se eliminará de forma definitiva.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>deleteRecords()}>
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