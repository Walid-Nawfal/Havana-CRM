import { ErrorMessage, Form, Formik } from 'formik';
import { useHistory } from 'react-router';
import { Button, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import agent from '../api/agent';
import MyTextInput from '../common/form/MyTextInput';
import ValidationErrors from '../common/form/ValidationErrors';
import { User, UserFormValues } from '../models/user';

interface Props {
    setIsModalOpen: (bool: boolean) => void
}

export default function RegisterForm({setIsModalOpen}: Props) {
    const history = useHistory();
    async function register (creds: UserFormValues) {
        try {
            const user: User = await agent.Account.register(creds);
            console.log(user);
            history.replace('/companies')
            setIsModalOpen(false)
        } catch (error) {
            throw error;
        }
    }
    return (
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', error: null, company:''}}
            onSubmit={(values, {setErrors}) => register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
                company: Yup.string().required()
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Havana Properties' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage 
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} primary content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
}