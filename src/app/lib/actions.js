'use server'

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore"
import { firebaseApp } from "../firebase"
import { redirect } from "next/navigation"

const db = getFirestore(firebaseApp)

export async function getAccounts(){
    return new Promise((resolve, reject)=>{
        const q = query(collection(db,'accounts'))
        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            const accounts = []
            querySnapshot.forEach((doc)=>{
                accounts.push({...doc.data(), id: doc.id})
            })
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

export async function saveData(value){
    try{
        await addDoc(collection(db,'accounts'),{
            ...value
        })
    }catch(error){
        console.log("Error al guardar los datos", error)
    }
}

export async function deleteAccount(id){
    try{
        await deleteDoc(doc(db,'accounts',id))
        redirect('/accounts')
    }catch(error){
        console.log("Error ")
    }    
}

export async function getRecords(){
    return new Promise((resolve, reject)=>{
        const q = query(collection (db, 'records'))
        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            const records =[]
            querySnapshot.forEach((doc)=>{
                records.push({...doc.data(), id: doc.id})
            })
            unsubscribe()
            resolve(records)
        },(error)=>{
            reject(error)
        })
    })
}

export async function getDetailsAccount(id){   
    try {
        const docRef = doc(db,'accounts',id)
        const snapshot = await getDoc(docRef)
        if (!snapshot.exists) {         
          return null;
        }
        const data = snapshot.data()      
        return data;
      } catch (error) {        
        console.error(error);
        return null;
      }
}