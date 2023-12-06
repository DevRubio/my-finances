'use server'
import { firebaseApp } from "@/app/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, query } from "firebase/firestore";
import { redirect } from "next/navigation";

const db = getFirestore(firebaseApp)

/* export async function getData(){
  const querySnapshot = await  getDocs(collection(db,'accounts'));
  const acounts = []
  querySnapshot.forEach((doc) => {
      acounts.push({...doc.data(), id: doc.id})
  })

  return acounts
} */

export async function getData(){

  return new Promise((resolve, reject)=>{
    const q = query(collection(db, 'accounts'))
    const unsubcribe = onSnapshot(q, (querySnapshot)=>{
      const accounts = []
      querySnapshot.forEach((doc)=>{
        accounts.push({...doc.data(), id: doc.id})
      })
      unsubcribe()
      resolve(accounts)
    },(error)=>{
      reject(error)
    })
  })

}

export async function getColors(){
  const querySnapshot = await getDocs(collection(db,'app_config/ewwoHea9UOUwnscABJzq/colors'))
  const colors = []
  querySnapshot.forEach((doc)=>{
    colors.push({...doc.data(), id: doc.id})
  })
  return colors
}

export async function deleteAcount(id){   
    await deleteDoc(doc(db, 'accounts', id))
    redirect('/accounts')
}

export const saveData = async(value)=>{  
    try{
      await addDoc(collection(db, 'accounts'),{
        ...value
      })
    }catch(error){
      console.error("ERROR AL GUARDAR DATOS ",error)
    }
    redirect('/')
  }