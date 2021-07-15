import { ErrorMessage, Form, Formik } from "formik";
import { useHistory } from "react-router";
import { Button, Header, Label } from "semantic-ui-react";
import agent from "../api/agent";
import MyTextInput from "../common/form/MyTextInput";
import { UserFormValues } from "../models/user";

export interface Props {
    setIsModalOpen: (bool:boolean) => void
}
 
const LoginForm = ({setIsModalOpen}: Props) => {
    const history = useHistory();
    async function login(creds: UserFormValues) {
        try {
            console.log(creds.password);
            const user = await agent.Account.login(creds);
            console.log(user);
            window.localStorage.setItem('jwt', user.token);
            history.replace('/companies');
            setIsModalOpen(false);
        } catch (error) {
            throw error;
        }
    }
    return ( 
        <Formik
            initialValues={{email: '', password: '', error: null, company: ''}}
            onSubmit={(values, {setErrors}) => login(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header content='Login to Backbone Application' as='h2' color='teal' textAlign='center' />
                    <MyTextInput name='email' type='email' placeholder='Email' />
                    <MyTextInput name='password' type='password' placeholder='Password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} primary content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    );
}
 
export default LoginForm;