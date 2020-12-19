import React, {useState,useEffect} from "react";
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";


const ThreadPage = () => {
    const [threads, setThreads] = useState(null);

    const getThreads = async () =>{
            let res = await fetch(`api/v1/threads`);
            console.log(res)
            try {
              res = await res.json();
              setThreads(res);
            } catch(e) {
              console.log(e)
              console.error("Faild to fetch threads");
            }
        }

       

        useEffect(() => {
           getThreads()
           console.log(threads)
        }, [])
         
  return (
    <div>
      <Card>
        <CardBody>
          {threads&&
          threads.map((thread, i)=> {
            return  <Button  key={i}  block size="lg" >{thread.title}</Button>
          })}
         
        </CardBody>
      </Card>
    </div>
  );
};
export default ThreadPage
