import { Nav, Navbar, NavItem, Collapse, NavbarToggler, NavbarBrand, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <Navbar className='nav' expand='md'>
                <NavbarBrand onClick={() => navigate('/')}>
                    <h1>Herb-A-Pharmacy</h1>
                </NavbarBrand>
                <NavbarToggler onClick={() => setOpenNav(!openNav)} />
                <Collapse isOpen={openNav} navbar>
                    <Nav className='ms-auto' navbar>
                        <NavItem className='m-3'>
                            <NavLink style={{ color: '#CFDDD1' }} className='nav-link' to='/newRx'>New Rx</NavLink>
                        </NavItem>
                        <NavItem className='m-3'>
                            <NavLink style={{ color: '#CFDDD1' }} className='nav-link' onClick={() => setOpenModal(true)}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Modal className='logout-modal' isOpen={openModal}>
                <ModalHeader className='logout-modal-header'>
                    <h2>Are you sure you want to logout?</h2>
                </ModalHeader>
                <ModalBody className='logout-modal-header'>
                    <div className='logout-selection-container'>
                        <button onClick={() => navigate('/login')}>Yes</button>
                        <button onClick={() => setOpenModal(!openModal)}>Cancel</button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
};

export default Header;