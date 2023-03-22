
import React,{useState,useEffect} from 'react';
import axios from 'axios';
const App = () => {
const [countries,setCountries]=useState([])
const [query,setQuery]=useState('')
const [list,setList]=useState([])
const [error,setError]=useState("");
const [show,setShow]=useState(null)
const [ex,setEx]=useState(false)
const [btn,setBtn]=useState("Show")
const fetchCountries=async()=>{
  const con=axios.get('https://restcountries.com/v3.1/all')
  .then((res)=>{
    setCountries(res.data)
  })
}
useEffect(()=>{
 
  fetchCountries()
},[list,ex])

const filterList=(e)=>{
  setQuery(e.target.value)
 const newList= countries.filter((item)=>{
    return item.name.common.toLowerCase().includes(query.toLowerCase()) 
  })

  setList(newList)
}
const showHide=(id,i)=>{

  if(ex){
    setShow(i)
    setBtn("Hide")
  }else{
    setShow(null)
    setBtn("Show")
  }

}
console.log(list)
  return (
    <div>
      <p>find countries <input value={query} onChange={(e)=>filterList(e)}/></p>
      {
        list.length === 1 ?
        list.map((item)=>(
          <>
          <h1>{item.name.common}</h1>
          <p>capital{item.capital.map((sp)=>(
            <>
            <p>{sp}</p>
            </>
          ))}</p>
          <p>area{item.area}</p>
          <h4>language</h4>
            <ul>
               {Object.keys(item.languages).map((key,index)=>(
                <li>{item.languages[key]}</li>  
               ))}
            </ul>
            <p>{item.flag}</p>
          </>
        )) : list.length <= 10 || list.length ===2 ? 
        list.map((item,i)=>(
          <>
         <p key={i}>{item.name.common} <button onClick={()=>{
             setEx(!ex)
           showHide(item.area,i)}}>{ i === show ? btn : "Show"}</button></p>
           {
             i === show ?
             (
               <>
                 <p>capital{item.capital.map((sp)=>(
            <>
            <p>{sp}</p>
            </>
          ))}</p>
          <p>area{item.area}</p>
          <h4>language</h4>
            <ul>
               {Object.keys(item.languages).map((key,index)=>(
                <li>{item.languages[key]}</li>  
               ))}
            </ul>
            <p>{item.flag}</p>
               </>
             ):null
           }
          </>
        )):  "Too many matches, be more specific "
      }

    </div>
  )
}

export default App