import React from "react";
import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("paswword not match");
            return;
        }
        try {
            const {user} = createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user,
                {displayName});
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Cannot create email already in use")
            }
            console.log('user creation encounter error', error);
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }
    return (<div className='sign-up-container'>
        <h2>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label={"Display Name"}
                       type="text"
                       id="Display Name"
                       required
                       onChange={handleChange}
                       name="displayName"
                       value={displayName}/>

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

            <FormInput label={"Confirm Password"}
                       type="password"
                       id="Confirm Password"
                       required
                       onChange={handleChange}
                       name="confirmPassword"
                       value={confirmPassword}/>

            <Button buttonType='google' type="submit">Sign Up</Button>
        </form>
    </div>)
}

export default SignUpForm;
