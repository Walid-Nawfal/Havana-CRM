import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import agent from "../api/agent";
import RegisterForm from "../authentication/RegisterForm";
import ModalContainer from "../common/modal/ModalContainer";
import { User } from "../models/user";

export default function Navbar() {

    const [user, setUser] = useState<User>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalBody, setModalBody] = useState(<h1>Hello</h1>);

    function openModal(content: JSX.Element) {
        setIsModalOpen(true);
        setModalBody(content);
    }

    async function getUser() {
        const tempUser = await agent.Account.current();
        setUser(tempUser);
    }

    useEffect(() => {
        getUser();
    }, [])
    function logout() {
        window.localStorage.removeItem('jwt');
        window.location.replace('/');
    }
    return (
        <>
            <ModalContainer isModalOpen={isModalOpen} modalBody={modalBody} setIsModalOpen={setIsModalOpen} setModalBody={setModalBody} />
            <Menu inverted color='teal' fixed='top' size='large'>
                <Container>
                    <Menu.Item as={NavLink} to="/" exact header>
                        <Icon name='home' size='big' />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/" exact header>
                        Home
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/employees" exact header>
                        Employees
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/companies" exact header>
                        Companies
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src='assets/user.png' avatar spaced='right' />
                        <Dropdown pointing='top right' text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/${user?.displayName}`} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    {(user?.username === "Hanine_N") &&
                        <Menu.Item header>
                            <Button onClick={() => openModal(<RegisterForm setIsModalOpen={setIsModalOpen} />)} size='huge' inverted>
                                Create Agent
                            </Button>
                        </Menu.Item>
                    }
                </Container>
            </Menu>
        </>
    )
}