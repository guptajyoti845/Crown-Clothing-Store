// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjaQVWJksjOfNXY6Hj58y1FCzUD6Xxl_M",
    authDomain: "wn-clothing-db.firebaseapp.com",
    projectId: "wn-clothing-db",
    storageBucket: "wn-clothing-db.appspot.com",
    messagingSenderId: "1051338907832",
    appId: "1:1051338907832:web:9b2d4235af50ccae86544d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        console.log("come herer")
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef,
                {
                    displayName,
                    email,
                    createAt,
                    ...additionalInformation
                })
        } catch (error) {
            console.log("Error creating the user", error.message)
        }
    }

    return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
