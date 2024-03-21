import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


function Homepage() {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const { onCreate, Getall, onDelete, onUpdate } = useAuth();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    Showalltodos();

  }, [])


  const handleChange = (e: any) => {
    setInput(e.target.value);
  }
  
  const handleSubmit = async() => {
    if(!input){
      console.log("fields are empty here !");
    }
    setLoading(true);
    try{
      const data = await onCreate!(input);
      console.log("this is inside the handleSubmit ", data);
      setInput(" ");
    }catch(err){
      console.log("there is somthing wrong with the api call !");

    }finally{
      setLoading(false);
      
    }


  }

  const Showalltodos = async() => {
    try{
      const data = await Getall!();
      console.log("all data", data);
      setData(data);

    }catch(err){
      console.log('something wrong in fetching data !');

    }
  }

  const deleteTodo = async(id: any) => {
    try{
      const data = await onDelete!(id);
      console.log("deleted data", data);

    }catch(err){
      console.log("error encountered", err);

    }

  }

  const updateTodo = async(id: any, todo: string) => {
    try{
      const result = await onUpdate!(id, todo);
      console.log("this is a result", result);

    }catch(err){
      console.log("something went wrong !");

    }
  }


  return (
    <div className="container">
      <h2 className="text">Todo List</h2>
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter the name"
          className="inputBox"
          onChange={handleChange}
        />
        <button className="btn" onClick={handleSubmit}>
          Add todo
        </button>
      </div>
      {data.map((items: any) => (
        <div className="iteratorContainer" key={items._id}>
          <h5 className="heading">{items.Items}</h5>
          <button className="deletebtn" onClick={() => deleteTodo(items._id)}>
            Delete
          </button>
          <button className="upbtn">Update</button>
        </div>
      ))}
    </div>
  );
}

export default Homepage