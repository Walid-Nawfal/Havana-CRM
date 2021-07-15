import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import LoginForm from "../authentication/LoginForm";
import ModalContainer from "../common/modal/ModalContainer";

export default function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalBody, setModalBody] = useState(<h1>Hello</h1>);
    
    function openModal(content: JSX.Element) {
        setIsModalOpen(true);
        setModalBody(content);
    }
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <ModalContainer isModalOpen={isModalOpen} modalBody={modalBody} setIsModalOpen={setIsModalOpen} setModalBody={setModalBody} />
            <Container text>
                <Header as='h1' inverted>
                    Backbone Data Application<br />
                </Header>
                <Icon name='home' size='huge' />
            </Container>
            {window.localStorage.getItem("jwt") ? (
                <>
                    <Header as='h2' inverted content='Welcome to Backbone Data Application' />
                    <Button as={Link} to='/companies' size='huge' inverted>
                        Go to Dashboard!
                    </Button>
                </>
            ) : (
                <>
                    <Container style={{ marginBottom: '10px' }}>
                        <Button onClick={() => openModal(<LoginForm setIsModalOpen={setIsModalOpen} />)} size='huge' inverted>
                            Login!
                        </Button>
                    </Container>
                </>
            )}
    </Segment>
    )
}