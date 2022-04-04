import React, {useEffect} from "react";
import {getRedirectResult} from 'firebase/auth';
import {auth, createUserDocumentFromAuth, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils'
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import './authentication.styles.scss'

const Authentication = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user)
        }
    }, [])
    const logGoogleRedirectUser = async () => {
        const {user} = await signInWithGoogleRedirect();
    }
    return (<div className='authentication-container'>
        <SignInForm/>
        <SignUpForm/>
    </div>)
}


export default Authentication;
