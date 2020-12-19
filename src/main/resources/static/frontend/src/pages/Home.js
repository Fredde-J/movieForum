import React, {useState,useEffect} from "react";
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";


const Home = () => {
    const [categories, setCategories] = useState(null);

    const getCategories = async () =>{
            let res = await fetch(`api/v1/categories`);
            console.log(res)
            try {
              res = await res.json();
              setCategories(res);
            } catch(e) {
              console.log(e)
              console.error("Faild to fetch categories");
            }
        }

        const goToThreads = (category)=>{
          console.log(category)
        }

        useEffect(() => {
           getCategories()
           console.log(categories)
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
