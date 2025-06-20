import { useState } from "react";
import { toast } from "react-toastify";
 import './from_Style.css'
const AddUser=()=>{
const[name,setName]=useState(' ');
const[age,setAge]=useState(' ');
const[place,setPlace]=useState(' ');
 
 
const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
 
fetch('http://localhost:5000/api/users',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({ name, age: Number(age),place })
})
    .then(res=>res.json())
    .then(data=>{
        toast.success(data.message)
        console.log('user added',data)
        //alert(JSON.stringify(data))
        setAge('');
        setPlace('');
        setName('');
    })
    .catch(err=>console.error(err));
};
 
return(
    <form onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <label>Name</label>
        <input type="text" value={name} placeholder="name" onChange={e=>setName(e.target.value)} required />
        <input type="number" value={age} placeholder="Age" onChange={e=>setAge(e.target.value)} required />
        <input type="text" value={place} placeholder="Place" onChange={e=>setPlace(e.target.value)} required />
        <button type="submit">Add User</button>
    </form>
)
};
 
export default AddUser;
 
 