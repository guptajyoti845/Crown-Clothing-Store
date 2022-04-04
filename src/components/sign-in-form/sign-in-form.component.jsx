import React from "react";
import {useState} from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth, signInUserAuthEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () => {
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInUserAuthEmailAndPassword(email, password)
            console.log("responsee", response)
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case'auth/wrong-password':
                    alert('incorrect password')
                    break;
                case 'auth/user-not-found':
                    alert('user-not-found password')
                    break;
                default:
                    console.log(error)
            }
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }
    return (<div className='sign-in-container'>
        <h2>Already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>

            <FormInput label={"Email"}
                       type="email"
                       id="Email"
                       required
                       onChange={handleChange} name="email"
                       value={email}/>

            <FormInput label={"Password"}
                       type="password"
                       id="Password"
                       required
                       onChange={handleChange}
                       name="password"
                       value={password}/>
            <div className='buttons-container'>
                <Button buttonType='inverted' type="button">Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
            </div>
        </form>
    </div>)
}

export default SignInForm;
