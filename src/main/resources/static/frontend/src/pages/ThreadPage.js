import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
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
} from "reactstrap";

const ThreadPage = () => {
  const [threads, setThreads] = useState(null);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [warning, setWarning] = useState(false)
  const { user } = useContext(UserContext);
  const [category, setCategory] = useState(null)

  let { id } = useParams();
  let history = useHistory();

  const toggle = () => setModal(!modal);

  const getThreads = async () => {
    let res = await fetch("/api/v1/threads/getThreadsByCategoryId/" + id);
    if(res.status===200){
      try {
        res = await res.json();
        setThreads(res);
        await checkCategory()
      } catch (e) {
        console.error(e);
      }
    }else{
      console.error(await res.json())
    }
    
  };

  const goToPosts = (thread) => {
    history.push("/posts/" + thread.id);
  };

  const addThread = async (e) => {
    e.preventDefault();
    
    let thread = {
      title: title,
      timestamp: Date.now(),
      category: category,
      user:user,
      isLocked: false,
      warning: warning
    };

    let response = await fetch("/api/v1/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(thread),
    });

    if (response.status === 200) {
      try {
        thread = await response.json();
      } catch (e) {
        console.error(e);
      }
      let postBody = {
        message: message,
        timestamp: Date.now(),
        thread: thread,
        user: user
      };
      response = await fetch("/api/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody),
      });
    }
    else{
      console.error(await response.json())
    }
    toggle();
    getThreads();
  };

  const editorOptionsInList = (thread) => {
    if (user) {
      if(category&&category.user){
        if ((user.roles.includes("EDITOR")&& user.id===thread.category.user.id) || user.roles.includes("ADMIN")) {
          return (
            <Row >
              <Col>
                <Label check>
                  <Input type="checkbox" readOnly checked={thread.isLocked} onClick={() => {
                  lockThread(thread);
                }} />
                  lås
                </Label>
              </Col>
              <Col>
              <p className="text-danger text-center" onClick={()=>{deleteThread(thread)}}> Radera </p>
              </Col>
             
            </Row>
          );
        }
      }
     
    }
  };

  const editorOptionsInAddThread = ()=>{
      if (user.roles.includes("ADMIN") || (user.roles.includes("EDITOR") && user.id===category.user.id)) {
        return (
          <FormGroup check className="mb-2">
          <Label check>
            <Input type="checkbox" readOnly checked={warning} onClick={()=>{setWarning(!warning)}}  />
            Varningsinlägg
          </Label>
        </FormGroup>
        );
        } 
  }

  const lockThread = async (thread) => {
    thread.isLocked = !thread.isLocked;
    let response = await fetch("/api/v1/threads/" + thread.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(thread),
    });
    if (response.status === 204) {
      getThreads();
    }
  };

  const deleteThread = async (thread) => {
    let response = await fetch("/api/v1/threads/" + thread.id, {
      method: "DELETE",
    });
    if (response.status === 204) {
      getThreads();
    }else{
      console.error(await response.json())
    }
  }

  const checkCategory = async ()=>{
    if (threads===null||threads[0]===undefined||threads[0]===null) {
      let res = await fetch("/api/v1/categories/" + id);
      if(res.status===200){
        try {
          res = await res.json();
           setCategory(res);
        } catch (e) {
          console.error(e);
        }
      }else{
        console.error(await res.json())
      }
     
    } else {
      setCategory(threads[0].category);
    }
  }

  useEffect(() => {
   getThreads();
  }, []);

  return (
      <Card>
        <Row >
        <CardBody>
          {user ? (
            <Button onClick={toggle} block size="lg" color="warning" className="mb-3">
              Skapa en tråd
            </Button>
          ) : (
            ""
          )}

          {threads &&
            threads.map((thread, i) => {
              return (
                <div>
                  {thread.isLocked ? (
                    <Button disabled key={thread.id} block size="lg" className="mb-1">
                      {thread.title} (låst)
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        goToPosts(thread);
                      }}
                      key={i}
                      block
                      color={thread.warning?("danger"):("secondary")}
                      className="mb-1"
                      size="lg"
                    >
                      {thread.title}
                    </Button>
                  )}

                  {editorOptionsInList(thread)}
                </div>
              );
            })}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Skapa Tråd</ModalHeader>
            <ModalBody>
              <Form onSubmit={addThread}>
                <FormGroup>
                  <Label>Titel</Label>
                  <Input
                    required
                    minLength="3"
                    maxLength="20"
                    type="title"
                    name="title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Skriv ditt inlägg här </Label>
                  <Input
                    required
                    minLength="2"
                    maxLength="1000"
                    type="textarea"
                    name="text"
                    id="exampleText"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </FormGroup>
                {category && category.user && user && editorOptionsInAddThread()}
                <Button color="primary">Skapa tråd</Button>
              </Form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
        </CardBody>
        </Row>
      </Card>
    
  );
};
export default ThreadPage;
