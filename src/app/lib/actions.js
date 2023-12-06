'use server'

import { collection, getDoc, getFirestore, onSnapshot, query, where } from "firebase/firestore"
import { firebaseApp } from "../firebase"

const db = getFirestore(firebaseApp)

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