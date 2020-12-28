import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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
  FormText,
} from "reactstrap";

const ThreadPage = () => {
  const [threads, setThreads] = useState(null);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(null);
  const [message,setMessage] = useState(null)

  let { id } = useParams();
  let history = useHistory();

  const getThreads = async () => {
    let res = await fetch("/api/v1/threads/getThreadsByCategoryId/" + id);
    console.log(res);
    try {
      res = await res.json();
      setThreads(res);
    } catch (e) {
      console.log(e);
      console.error("Faild to fetch threads");
    }
  };

  const goToPosts = (thread) => {
    console.log(thread.id);
    history.push("/posts/" + thread.id);
  };

  const addThread = async (e) => {
    e.preventDefault();
    console.log(threads[0])
    let thread = {
      title:title,
      timestamp: Date.now(),
      category: threads[0].category
    }

   

    let response = await fetch("/api/v1/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(thread),
    })
    console.log(response)
    if(response.status==200){
      try{
        thread = await response.json();
      }catch(e){
        console.error(e)
      }
      console.log("thread", thread)
      let postBody = {
        message: message,
        timestamp: Date.now(),
        thread:  thread
      }
      response = await fetch("/api/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody),
      })  
      console.log(response)
    }
    
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    console.log("id:", id);
    getThreads();
    console.log(threads);
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          {threads &&
            threads.map((thread, i) => {
              return (
                <Button
                  onClick={() => {
                    goToPosts(thread);
                  }}
                  key={i}
                  block
                  size="lg"
                >
                  {thread.title}
                </Button>
              );
            })}
          <Button onClick={toggle} block size="lg" color="warning">
            Skapa en tråd
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Skapa Tråd</ModalHeader>
            <ModalBody>
              <Form onSubmit={addThread}>
                <FormGroup>
                  <Label>Titel</Label>
                  <Input required type="title" name="title" onChange={(e)=>{setTitle(e.target.value)}} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Skriv ditt inlägg här </Label>
                  <Input required type="textarea" name="text" id="exampleText" onChange={(e)=>{setMessage(e.target.value)}} />
                </FormGroup>
                <Button color="primary">
              Skapa tråd
              </Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
};
export default ThreadPage;
