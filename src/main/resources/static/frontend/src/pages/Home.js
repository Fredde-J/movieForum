import React, {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";


const Home = () => {
    const [categories, setCategories] = useState(null);
    let history = useHistory()

    const getCategories = async () =>{
            let res = await fetch(`api/v1/categories`);
            if(res.status===200){
              try {
                res = await res.json();
                setCategories(res);
              } catch(e) {
                console.log(e)
                console.error("Faild to fetch categories");
              }
            }else{
              console.error(await res.json())
            }
           
        }

        const goToThreads = (category)=>{
          history.push("/threads/"+category.id)
        }

        useEffect(() => {
           getCategories()
        }, [])
         
  return (
    <div>
      <Card>
        <CardBody>
          {categories&&
          categories.map((category, i)=> {
            return  <Button  key={i} onClick={()=>{goToThreads(category)}} block size="xl" >{category.name}</Button>
          })}
         
        </CardBody>
      </Card>
    </div>
  );
};
export default Home
