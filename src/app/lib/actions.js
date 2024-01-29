'use server'

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, where, firebase } from "firebase/firestore"
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

export async function getConfig(type){
    const querySnapshot = await getDocs(collection(db,`app_config/ewwoHea9UOUwnscABJzq/${type}`))
    const colors = []
    querySnapshot.forEach((doc)=>{
        colors.push({...doc.data(), id: doc.id})
    })
    return colors
}

export async function saveData(type, value){
    try{
        await addDoc(collection(db, type),{
            ...value
        })
    }catch(error){
        console.log("Error al guardar los datos", error)
    }
}

export async function deleteDocuments(type, id){   
    try{
        await deleteDoc(doc(db, type, id))
        //redirect('/accounts')
    }catch(error){
        console.log("Error al eliminar el Documento ", error)
    }    
}

export async function getRecords(){
    return new Promise((resolve, reject)=>{
        const q = query(collection (db, 'records'), orderBy("earningsDate","desc"))
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