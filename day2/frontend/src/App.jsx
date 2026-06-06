
import { useState , useEffect} from 'react'
import axios from 'axios'



function App() {
  const [jokes , setJokes] = useState([]);

  useEffect(()=>{
    axios.get("/api/jokes")
    .then((response)=>{
      setJokes(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])
  

  return (
    <>
      <h1>Hello Tarun Yadav</h1>
      <div>
        <h2> joke : {jokes.length} </h2>


         {
          jokes.map((item , index)=>(
            <div key={item.id} >
              <h2>{item.title}</h2>
              <h3>{item.content}</h3>
            </div>
          ))
         }
       
      </div>
    </>
  )
}

export default App
