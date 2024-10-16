import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "../authentication/testForActiveSession";
import { db } from "@/important/firebase";

export default async function updateDisplayName(displayNameText) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(db, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const previousData = docSnap.data();
                const objectToUpdate = {...previousData, displayName: displayNameText};
                await setDoc(docRef, objectToUpdate);
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}