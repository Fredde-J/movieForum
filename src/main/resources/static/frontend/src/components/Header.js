import React, { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import {  Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText } from 'reactstrap';
import {UserContext} from '../contexts/UserContext'

const Header = () => {
    let history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {user} = useContext(UserContext)

    const goToLoginPage = ()=>{
      history.push("/login")

    }

    const logout = ()=>{

    }

   
  
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {user ? ( <NavItem onClick={logout} >
               Logga ut
              </NavItem>):
              ( 
                <NavItem onClick={goToLoginPage} >
               Logga in
              </NavItem>)}
             
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
}

export default Header;