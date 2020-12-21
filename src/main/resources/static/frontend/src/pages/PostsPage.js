import React, {useState,useEffect} from "react";
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";


const PostPage = () => {
    const [posts, setPosts] = useState(null);

    const getPosts = async () =>{
            let ThreadId = "5fde02b4d37ef9422b037f64"
            let res = await fetch(`api/v1/posts/getPostsByThreadId/`+ThreadId);
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
