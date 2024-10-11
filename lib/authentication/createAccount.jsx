import { db } from "@/important/firebase"; // Import Firestore instance
import { generateId, realEscapeString } from "../utilities";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { generateSalt, hashPassword } from "./encryption";
import { welcomeEmail } from "../emailTemplate"; // Assuming you still want to use a custom email template

export const createAccount = async (data) => {
    const { email, username, password } = data;
    const userId = generateId(); // Custom ID generation
    const auth = getAuth();

    try {
        // Clean the user inputs
        const cleanUsername = realEscapeString(username);
        const cleanEmail = realEscapeString(email);
        const cleanPassword = realEscapeString(password);

        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        const user = userCredential.user;

        // Send email verification
        try {
            await sendEmailVerification(user);
            console.log('Email verification sent.');
        } catch (emailError) {
            console.error(`Failed to send email verification: ${emailError.message}`);
            throw new Error(`Email verification failed: ${emailError.message}`);
        }

        // Hash the password
        const salt = generateSalt();
        const hashedPassword = hashPassword(cleanPassword, salt);

        // Store additional user information in Firestore
        const accountRef = collection(db, "accounts");
        const accountDetailsRef = collection(db, "AccountData");

        await setDoc(doc(accountRef, userId), {
            userId,
            email: cleanEmail,
            username: cleanUsername,
            password: hashedPassword, // Not necessary to store this in Firebase Auth
            mySalt: salt,
        });

        await setDoc(doc(accountDetailsRef, userId), {
            displayName: cleanUsername,
            links: [],
            profilePhoto: "",
            selectedTheme: "Lake White",
        });

        return userId;

    } catch (error) {
        console.error("Error during account creation:", error);
        throw new Error(`Account creation failed: ${error.message}`);
    }
};

