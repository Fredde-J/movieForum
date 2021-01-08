import React, { createContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Collapse,
} from "reactstrap";

const AdminPage = () => {
  const [users, setUsers] = useState(null);
  const [modal, setModal] = useState(false);
  const [collapse, setCollapse] = useState(false)
  const [user, setUser] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);

  const modalToggle = () => setModal(!modal);
  const collapseToggle = () => setCollapse((prevState)=>!prevState);

  const fetchUsers = async () => {
    let res = await fetch("/api/v1/users/");
    try {
      if (res.ok) {
        res = await res.json();
        setUsers(res);
      } else {
        setUsers(null);
      }
    } catch {}
  };

  const deleteUser = async () => {
    let response = await fetch("/api/v1/users/" + user.id, {
      method: "DELETE",
    });
    if (response.status == 204) {
      fetchUsers();
      modalToggle();
    }else{
      console.error(await response.json())
    }
  }
  
  const updateUser = async (role) => {
    user.roles=role

    if(user.roles.includes("EDITOR")){
        let response = await fetch("/api/v1/users/" + user.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          if (response.status == 204) {
            collapseToggle()
          }else{
              console.error(await response.json())
          }
        }else{
        let response = await fetch("/api/v1/users/updateRole/" + user.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          if (response.status == 204) {
            collapseToggle()
          }else{
              console.error(await response.json())
          }
        };
}

  const fetchAvailableCategories = async ()=>{
    let res = await fetch("/api/v1/categories/availableCategories");
    try {
      if (res.status===200) {
        res = await res.json();
        setAvailableCategories(res);
        collapseToggle()
      } else {
        console.error(await res.json())
      }
    } catch(e) {console.error(e)}
  };

  const updateCategory = async (category) => {
    category.user=user;

    let response = await fetch("/api/v1/categories/" + category.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (response.status == 204) {
      fetchAvailableCategories()
    }
  };


  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);

  return (
    <Card>
      <CardBody>
        {users &&
          users.map((user, i) => {
            return (
              <Button
                block
                key={i}
                onClick={() => {
                  setUser(user);
                  modalToggle();
                }}
              >
                {user.username}
              </Button>
            );
          })}

        {user && (
          <Modal isOpen={modal} toggle={modalToggle}>
            <ModalHeader toggle={modalToggle}>{user.username}</ModalHeader>
            <ModalBody>
              <Button onClick={deleteUser} className="mb-2" block color="danger">
                Radera användare
              </Button>
              {user.roles.includes("EDITOR") ? (
                <div>
                  <Button block onClick={()=>{updateUser(["USER"]);}}>Ta bort rollen som moderator</Button>
                  <Button block onClick={fetchAvailableCategories}>Gör användaren moderator för ett underforum</Button>
                  <Collapse isOpen={collapse}>
                  <Card>
                      <CardBody>
                         {availableCategories.map((category,i)=>{
                             return(
                                 <Button key={i} block onClick={()=>{updateCategory(category)}}>{category.name}</Button>
                             )
                         })} 
                      </CardBody>
                  </Card>
                  </Collapse>
                </div>
              ) : (
                <Button block onClick={()=>{updateUser(["USER","EDITOR"])}} >Gör användare till Moderator</Button>
              )}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
        )}
      </CardBody>
    </Card>
  );
};
export default AdminPage;
