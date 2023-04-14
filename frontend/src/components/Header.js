import { Nav, Navbar, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [openNav, setOpenNav] = useState(false);

    return (
        <Navbar className='nav' expand='md'>
            <NavbarToggler onClick={() => setOpenNav(!openNav)} />
            <Collapse isOpen={openNav} navbar>
                <Nav className='ms-auto' navbar>
                    <NavItem>
                        <NavLink to='/newRx'>New Rx</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
};

export default Header;