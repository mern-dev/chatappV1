import React, { Component } from 'react'
import axios from 'axios';
import  { UserContext } from '../contexts/userContext'
import {storage} from "../firebase/index"

class Dp extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props);

        this.state = {
            
            fileInfo: null,
            loaded: '',
            path: 'https://firebasestorage.googleapis.com/v0/b/texting--dp.appspot.com/o/dp%2Fnodp.png?alt=media&token=533360ed-39f7-4938-b56d-1bd945818cbe',
         
            status: '',
           

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
 
    upload = (file) =>
    { 
        const {username} = this.context
    
             const uploadTask = storage.ref(`dp/${username+file.name}`).put(file);
             
             uploadTask.on(
                 "state_changed",
                 snapshot => {},
                 error =>
                 {
                     console.log(error)
                 },
               () =>
                 {
                     storage.ref('dp')
                     .child(username+file.name)
                     .getDownloadURL()
                     .then(url =>
                         {
                             
 
                             axios.post('/api/dp',{name:username,path:url})
                                 .then((res) => {
                                    document.querySelector(".dp-setting").style.opacity = "1";
                                 if(res.data.status==="success")
                                 this.setState({path:url})
                                  
                                 })
                                 .catch((err) => console.log(err));
 
 
 
 
 
 
 
 
                         })
 
                 }
             )
 
 
    }

    handleChange = (e) => {
        if (e.target.type === 'file') {
            if(e.target.files.length===0)
            { 
                return null
            }

            const file = e.target.files[0];
            let ls = file.name.split('.');
            let extension = ls[ls.length-1]
           
            if(extension==='png' || extension==='jpg' || extension==='jpeg' || extension==='jpe' || extension==='jif' || extension==='jfif' || extension==='jfi' || extension==='.webp'){ 

                
                document.querySelector(".dp-setting").style.opacity = "0.25";
                this.upload(file)
        

            }
            else{
                alert("choose an image file")
            }
            
        }
        else
       {
            const status = e.target.value;
            this.setState({status:status})
           
        }



    }
  

    handleClick = (e) => {
        e.preventDefault();
        const {username} = this.context
        axios.post("/api/status",{status:this.state.status,username:username}).then(res =>{
            if(res.data.status==="success")
            {       this.setState({updateUser:true})
            this.props.history.push("/home")
            }
            
            else
            {
                alert("unknown  error");
            }
        })

        

    }


    render() {
        const {username} = this.context
        return (
            <div className="FormContent">
                
                  <div className="heading-form" >
                            Hi {username} ,<div className="setting-profile-text">set your profile</div>
                              </div>
                              <div className="button-signup skip-button" onClick={()=>{ this.setState({updateUser:true});window.location='/home'}}>Skip</div>
                 <div className="inputFrom">
                  
                  
                <form  onSubmit={this.handleClick}>
                    <div className="dp-setting">
                      <img className="dp"  src={this.state.path} alt="#" /> 
                      <label for="file-upload"   className="dp-input">
                      change profile
                   </label>
                      <input
                        id="file-upload"
                        type="file" onChange={this.handleChange}
                        placeholder=""
                        />
                    </div>
                   

                    
              
                    
                    <input type='text' 
                    className="status-input" maxlength="30" name="status" value={this.state.status} onChange={this.handleChange} placeholder='Status' />
                  
                    <button type="submit" class="btn btn-light" name='status' onClick={this.handleClick}>Update</button>
                    
                </form>
                </div>
            </div>
        )
    }
}

export default Dp;
