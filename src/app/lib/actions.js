'use server'

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, where, firebase, updateDoc } from "firebase/firestore"
import { firebaseApp } from "../firebase"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const db = getFirestore(firebaseApp)

const criptoRef = collection(db,'CRIPTO')

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

export async function getRecordsById(refCollection , id){
    const docRef = doc(db, refCollection, id);
    const docSnap = await getDoc(docRef);
    const user =  docSnap.data()
    if (docSnap.exists()) {
        return user  
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
    
  }

export async function saveData(type, value, idAccount){
    try{  
        if(type != 'accounts'){
            const accountsCollectionRef = collection(db, 'accounts');
            const accountDocRef = doc(accountsCollectionRef, idAccount);
            await addDoc(collection(db, type),{
                ...value,            
                account: accountDocRef
            })
        }else{
            await addDoc(collection(db, type),{
                ...value
            })
        }    
       
        revalidatePath('../page.js')
    }catch(error){
        console.log("Error al guardar los datos", error)
    }
}

export async function updateData(refCollection, id, data){  
    const docRef = doc(collection(db, refCollection),id)
    updateDoc(docRef,{
        ...data
      })
      revalidatePath('../page.js') 
}

export async function deleteDocuments(type, id){   
    try{
        await deleteDoc(doc(db, type, id))        
    }catch(error){
        console.log("Error al eliminar el Documento ", error)
    }
    revalidatePath('../page.js')  
}

export async function getRecords(refcollection){
    return new Promise((resolve, reject)=>{
        const q = query(collection (db, refcollection), orderBy("investmentDate","desc"))
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

export async function getRecordsForAccounts(accountId){
    return new Promise((resolve, reject)=>{
        const accountsCollectionRef = collection(db, 'accounts');
        const accountDocRef = doc(accountsCollectionRef, accountId);

        const q = query(collection(db, "CDTS"), where("account", "==", accountDocRef), orderBy('earningsDate','desc'));

        const unsub = onSnapshot(q, (querSnapshot)=>{
         const AmountAcounts = []
         querSnapshot.forEach((doc)=>{
             AmountAcounts.push({...doc.data(), id: doc.id})
         })
         resolve(AmountAcounts)
        },(error)=>{
            reject(error)
        })
    })
  }

  export async function getAmountByAccount(accountId){
        return new Promise((resolve, reject)=>{
            const accountCollectionRef = collection(db, 'accounts')
            const accountDocRef = doc(accountCollectionRef, accountId)
            const q = query(collection(db, 'CDTS'), where('account', '==', accountDocRef)) 
            const unsub = onSnapshot(q, (querSnapshot)=>{
            let total = 0
            querSnapshot.forEach((doc)=>{
            total += doc.data().investmentEarnings
            total += doc.data().addition
                })
                updateAmountAccount(accountId, total)
            resolve(total)
        },(error)=>{
        reject(error)
        })
    })
    }

export async function updateAmountAccount(id, amount){    
        const account = doc(db,"accounts",id)        
        await updateDoc(account,{
            amount: amount
        })
}