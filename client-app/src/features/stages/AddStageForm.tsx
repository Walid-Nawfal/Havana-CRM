import { ErrorMessage, Form, Formik } from 'formik';
// import { useState } from 'react';
import { Button, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import agent from '../../api/agent';
import MyTextInput from '../../common/form/MyTextInput';
import ValidationErrors from '../../common/form/ValidationErrors';
import { Stage } from '../../models/stage';

interface Props {
    id: string;
    setIsModalOpen: (bool: boolean) => void
}

export default function AddStageForm({id}: Props) {
    // const [status, setStatus] = useState(null);
    return (
        <Formik
            initialValues={{status: '', percentage: '', company: '', commissions:'', remarks: '', error: null}}
            onSubmit={(values, {setErrors}) => {
                var stage: Stage = {
                    status: values.status,
                    percentage: values.percentage,
                    commissions: values.commissions,
                    company: values.company,
                    remarks: values.remarks
                }
                agent.Companies.addStage(stage, id).catch(error => 
                setErrors({error}))}
            }
            validationSchema={Yup.object({
                status: Yup.string().required(),
                percentage: Yup.string().required(),
                company: Yup.string().required(),
                commisions: Yup.string().required(),
                remarks: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Add Stage' color='teal' textAlign='center' />
                    {/* <Select id="MySelect1" placeholder='Select Status' options={[{key:"Follow Up" , value:"Follow Up", text:"Follow Up"}, {key:"Negotiation" , value:"Negotiation", text:"Negotiation"},{key:"Done Deal" , value:"Done Deal", text:"Done Deal"}, {key:"Lost Deal" , value:"Lost Deal", text:"Lost Deal"}]} onChange={(e, data) => setStatus(data.value)} /> */}
                    <MyTextInput name='status' placeholder='Status' />
                    <MyTextInput name='percentage' placeholder='Percentage' />
                    <MyTextInput name='company' placeholder='Compnay' />
                    <MyTextInput name='commisions' placeholder='Commissions' />
                    <MyTextInput name='remarks' placeholder='Remarks' />
                    <ErrorMessage
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} primary content='Add' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
}