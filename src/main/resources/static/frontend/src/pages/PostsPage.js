import React, {useState,useEffect} from "react";
import { useParams,useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";


const PostPage = () => {
    const [posts, setPosts] = useState(null);
    let { id } = useParams();

    const getPosts = async () =>{
            let res = await fetch(`/api/v1/posts/getPostsByThreadId/`+id);
            console.log(res)
            try {
              res = await res.json();
              setPosts(res);
            } catch(e) {
              console.log(e)
              console.error("Faild to fetch post");
            }
        }

    
        useEffect(() => {
           getPosts()
           console.log(posts)
        }, [])
         
  return (
    <div>
      <Card>
        <CardBody>
          {posts&&
          posts.map((post, i)=> {
            return  <p>{post.message}</p>
          })}
         
        </CardBody>
      </Card>
    </div>
  );
};
export default PostPage
