import React from "react";
import {useEffect} from "react";
import {getRedirectResult} from 'firebase/auth';
import {
    auth,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'
import SignUpForm from "../../components/sign-up-forms/sign-up-form.component";

const SignIn = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user)
        }
        console.log("response", response)
    }, [])
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log("userDoicRef", userDocRef)
        // console.log("response", response)
    }
    const logGoogleRedirectUser = async () => {
        const {user} = await signInWithGoogleRedirect();
        // const userDocRef = await createUserDocumentFromAuth(user);
        // console.log("userDoicRef", userDocRef)
        console.log("usr", user)
        // console.log("response", response)
    }
    return (<div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign In with Google User</button>
        <button onClick={logGoogleRedirectUser}>Sign In with Google Redirect</button>
        <SignUpForm/>
    </div>)
}


export default SignIn;
