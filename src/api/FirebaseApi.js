import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore/lite";
const firebaseConfig = {
    apiKey: "AIzaSyBmLkjBf_fJHgH-PkExdMzPXy0CvSC0jtg",
    authDomain: "todo-management-1caac.firebaseapp.com",
    projectId: "todo-management-1caac",
    storageBucket: "todo-management-1caac.appspot.com",
    messagingSenderId: "616438243366",
    appId: "1:616438243366:web:714a9b1b784754977e86e7"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const todoCollection = collection(db, "Todo-app");

class FirebaseApi {
    async addData(task) {
        try {
            const response = await addDoc(todoCollection, task);
            return {
                id: response.id,
                ...task,
            };
        } catch (e) {
            console.warn(`Error => ${e}`);
        }
    }

    async readData() {
        try {
            const resp = await getDocs(todoCollection);
            return resp.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
        } catch (error) {
            console.warn("Error => ", error);
        }
    }

    async updateData(task) {
        try {
            const ref = doc(todoCollection, task.id);
            await updateDoc(ref, task);
        } catch (e) {
            console.warn(`Error => ${e}`);
        }
    }

    async deleteData(id) {
        try {
            const ref = doc(todoCollection, id);
            await deleteDoc(ref);
        } catch (e) {
            console.warn(`Error => ${e}`);
        }
    }
}

export default new FirebaseApi();   
