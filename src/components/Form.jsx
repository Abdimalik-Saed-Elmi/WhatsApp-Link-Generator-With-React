import { useState, useEffect } from "react";
import { RiWhatsappFill,  RiFileCopyLine  } from "react-icons/ri";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = () => {

  // Https://api.whatsapp.com/send?phone=${linkData.phone}&text=${linkData.message}

  const [linkData, setlinkData] = useState({
    phone: "",
    message: ""

  });

  const [whatsappApi, setWhatsappApi] = useState("");
  const [resultLink, setResultLink] = useState({
    value:"",
    copied: false
  })

  const [copymaker, setCopyMaker] = useState("Copy to clibroard")
  

  const handleSubmit =(event)=>{
      event.preventDefault();
     
      if (!linkData.phone || !linkData.message ) {
        toast.error("Please fill the from")

        return  
      }
      else {
        setResultLink({...resultLink, value: whatsappApi});
      }
  }
  
  const handleChange =(event)=>{
          setlinkData({ ...linkData, [event.target.name]: event.target.value })
  }

useEffect(() => {
  
    setWhatsappApi(`https://api.whatsapp.com/send?phone=${linkData.phone}&text=${linkData.message}`);
    
}, [linkData]);

  return (
    <div className="container">
      <form  onSubmit={handleSubmit}>
        <header>
          <h1>Whatsapp Link Generator </h1>
          <RiWhatsappFill className="whatsapp-icon"/>
        </header>
        <div className="row">
          <label htmlFor="phone">Enter your phone number</label>
          <input 
          type="text" 
          className="form-control" 
          name="phone" 
          placeholder="Enter your phone number"
          onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="message">Enter your email message</label>
          <textarea 
          name="message" 
          className="form-control" 
          cols="80" rows="3" 
          placeholder="Enter your message"
          onChange={handleChange}
          ></textarea>
        </div>
        <button className="btn">Generate Link</button>

        <div className="result-area">
          <input type="text" readOnly 
          className="form-control-result"
          value={resultLink.value}/>
          <CopyToClipboard
            text={resultLink.value}
            onCopy={()=>{
              if(!resultLink.value){
                toast.error("please fill the form");
                return;
              }
              else
              setResultLink({...resultLink, copied:true});
              setCopyMaker("Copied")
              toast.success("Copied To Clibroad");
            }
            }
          >
          <div className="result-text">
            <span>{copymaker}</span>
            <RiFileCopyLine className="copy-icon" />  
          </div>
          </CopyToClipboard>
        </div>
      </form>

      <ToastContainer  position="top-right"/>
    </div>
  )
}

 
