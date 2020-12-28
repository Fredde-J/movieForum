import React, {useState,useEffect} from "react";
import { useParams,useHistory } from "react-router-dom";

import {
  Card,
  CardBody,
  Button,
} from "reactstrap";


const ThreadPage = () => {
    const [threads, setThreads] = useState(null);
    let { id } = useParams();
    let history = useHistory()

    const getThreads = async () =>{
      let res = await fetch("/api/v1/threads/getThreadsByCategoryId/"+id);
      console.log(res)
            try {
              res = await res.json();
              setThreads(res);
            } catch(e) {
              console.log(e)
              console.error("Faild to fetch threads");
            }
        }

        const goToPosts = (thread)=>{
          console.log(thread.id);
          history.push("/posts/"+thread.id)

        }

       

        useEffect(() => {
          console.log("id:", id)
           getThreads()
           console.log(threads)
        }, [])
         
  return (
    <div>
      <Card>
        <CardBody>
          {threads&&
          threads.map((thread, i)=> {
            return  <Button onClick={()=>{goToPosts(thread)}} key={i}  block size="lg" >{thread.title}</Button>
          })}
         
        </CardBody>
      </Card>
    </div>
  );
};
export default ThreadPage
