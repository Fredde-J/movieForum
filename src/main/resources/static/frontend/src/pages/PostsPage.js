import React, { useState, useEffect } from "react";
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

const PostPage = () => {
  const [posts, setPosts] = useState(null);
  const [answer, setAnswers] = useState(null);
  let { id } = useParams();
  let {thread} = useParams();

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
      thread: {id: id}
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
          <Label for="exampleText">Svara här:</Label>
          <Input type="textarea" name="text" id="exampleText" onChange={(e)=> setAnswers(e.target.value)} />
        </FormGroup>
        <Button>Skicka</Button>
      </Form>
    </div>
  );
};
export default PostPage;
