import './App.css';
import {useState} from 'react'
import {LC,UC,SC,NC} from './data/passChar'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {

  let [uppercase,setUppercase]=useState(false);
  let [lowercase,setLowercase]=useState(false);
  let [numbercase,setNumbercase]=useState(false);
  let [specialcase,setSpecialcase]=useState(false);
  let [passlength,setPasslength]=useState(5);
  let [finalpass,setFinalpass]=useState("");

  let createPassword=()=>{
    let finalPass=''
    let charSet=''
    if(uppercase || lowercase || numbercase ||specialcase){
      if(uppercase) charSet+=UC;
      if(lowercase) charSet+=LC;
      if(numbercase) charSet+=NC;
      if(specialcase) charSet+=SC;
      for(let i=0;i<passlength;i++){
        finalPass+=charSet.charAt(Math.floor(Math.random()*charSet.length));
      }
      NotificationManager.success("Successfully! Password is created");
      setFinalpass(finalPass);

    }else{
      NotificationManager.error("Please Select at least one");
    }
  }

  let copyPass=()=>{
    console.log(finalpass);
    if(finalpass!==""){
      navigator.clipboard.writeText(finalpass);
    NotificationManager.success("Copy the Password");
    }
    else{
      NotificationManager.error("Password is not generated yet");
    }
  }

  return (
    <div className="passwordBox">
      <h1>Password Generator</h1>
      <div className="passwordBoxin">
        <input type="text" readOnly value={finalpass}/><button onClick={copyPass}>Copy</button>
      </div>

      <div className="passlength">
        <label>Password length</label>
        <input type="number" max={30} min={5} value={passlength} onChange={(event)=>setPasslength(event.target.value)}></input>
      </div>
      <div className="passlength">
        <label>Include uppercase letters</label>
        <input type="checkbox" checked={uppercase} onChange={()=>setUppercase(!uppercase)}></input>
      </div>
      <div className="passlength">
        <label>Include lowercase letters </label>
        <input type="checkbox" checked={lowercase} onChange={()=>setLowercase(!lowercase)}></input>
      </div>
      <div className="passlength">
        <label>Include Numbers </label>
        <input type="checkbox" checked={numbercase} onChange={()=>{ setNumbercase(!numbercase)}}></input>
      </div>
      <div className="passlength">
        <label>Include Symbols </label>
        <input type="checkbox" checked={specialcase} onChange={()=>{ setSpecialcase(!specialcase)}}></input>
      </div>
      <button class="btn" onClick={createPassword }>Generate Password</button>
      <NotificationContainer/>
    </div>
  );
}

export default App;
