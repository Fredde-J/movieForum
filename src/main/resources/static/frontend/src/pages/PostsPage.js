import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import {UserContext} from '../contexts/UserContext'

const PostPage = () => {
  const [posts, setPosts] = useState(null);
  const [answer, setAnswers] = useState(null);
  const {user} = useContext(UserContext)
  let { id } = useParams()

  const getPosts = async () => {
    let res = await fetch(`/api/v1/posts/getPostsByThreadId/` + id);
    console.log(res);
    try {
      res = await res.json();
      setPosts(res);
    } catch (e) {
      console.log(e);
      console.error("Faild to fetch post");
    }
  };

  const postAnswer = async (e) => {
    e.preventDefault();

    let postBody = {
      message: answer,
      timestamp: Date.now(),
      thread:  posts[0].thread
    }

    let response = await fetch("/api/v1/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    })

    console.log(response)

  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  return (
    <div>
      {posts &&
        posts.map((post, i) => {
          return (
            <Card>
              <CardBody>
                <CardText> {post.message} </CardText>
              </CardBody>
            </Card>
          );
        })}
      <Form onSubmit={postAnswer}>
        <FormGroup>
          {user ? (
          <div>
          <Label for="exampleText">Svara här:</Label>
          <Input type="textarea" name="text" id="exampleText" onChange={(e)=> setAnswers(e.target.value)} />
          <Button>Skicka</Button>
          </div>):(
            <p>logga in för att svara</p>
          )}
        </FormGroup>
        
      </Form>
    </div>
  );
};
export default PostPage;
