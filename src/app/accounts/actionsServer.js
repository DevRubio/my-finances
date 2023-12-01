'use server'
import { firebaseApp } from "@/app/firebase";
import { addDoc, collection, deleteDoc, doc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp)

export async function deleteAcount(id){   
    await deleteDoc(doc(db, 'accounts', id))
}

export const saveData = async(value)=>{  
    try{
      await addDoc(collection(db, 'accounts'),{
        ...value
      })
    }catch(error){
      console.error("ERROR AL GUARDAR DATOS ",error)
    }
  }