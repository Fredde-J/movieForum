import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { UserContext } from "../contexts/UserContext";

const PostPage = () => {
  const [posts, setPosts] = useState(null);
  const [answer, setAnswer] = useState(null);
  const { user } = useContext(UserContext);
  let { id } = useParams();

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
      thread: posts[0].thread,
      user: user,
    };

    let response = await fetch("/api/v1/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    });
    if (response.status == 200) {
      setAnswer(null);
      getPosts();
    } else {
      console.error(await response.json());
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post, i) => {
          return (
            <Card className="mt-2" outline color= {post.thread.warning ? ("danger"):("secondary")}>
              <CardBody >
                <h5>{post.user.username}</h5>
                <CardText>{post.message}</CardText> 
              </CardBody>
            </Card>
          );
        })}
      <Form onSubmit={postAnswer}>
        <FormGroup>
          {user ? (
            <div>
              <Label for="exampleText">Svara här:</Label>
              <Input
                minLength="2"
                maxLength="1000"
                required
                type="textarea"
                name="text"
                id="exampleText"
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button>Skicka</Button>
            </div>
          ) : (
            <p>logga in för att svara</p>
          )}
        </FormGroup>
      </Form>
    </div>
  );
};
export default PostPage;
