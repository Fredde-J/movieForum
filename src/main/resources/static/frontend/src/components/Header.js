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
    const {user,setUser} = useContext(UserContext)

    const goToLoginPage = ()=>{
      history.push("/login")

    }

    const logout = async ()=>{
      await fetch("/api/v1/users/logout");
      setUser(null);
      history.push("/");
    }

   
  
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Film Forum</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {user ? ( 
              <div> <NavItem onClick={logout} >
               Logga ut
              </NavItem>
              <NavbarText>{user.username}</NavbarText>
              </div>)
              :
              ( 
                <NavItem onClick={goToLoginPage} >
               Logga in
              </NavItem>)}
             
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
    );
}

export default Header;