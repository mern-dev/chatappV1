import React, { Component } from 'react'
import axios from 'axios';
import  { UserContext } from '../contexts/userContext'



class Dp extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props);

        this.state = {
            
            fileInfo: null,
            loaded: '',
            path: '/images/nodp.png',
         
            status: '',
           

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
 


    handleChange = (e) => {
        if (e.target.type === 'file') {
            if(e.target.files.length===0)
            { 
                return null
            }

           const {id,username} = this.context
            const file = e.target.files[0];
            let ls = file.name.split('.');
            let extension = ls[ls.length-1]
           
            if(extension==='png' || extension==='jpg' || extension==='jpeg' || extension==='jpe' || extension==='jif' || extension==='jfif' || extension==='jfi' || extension==='.webp'){ 

                const formData = new FormData();

                formData.append('image', file);
                formData.append('name', username);
                formData.append('id', id);

        
        
                axios.post('/dp', formData, {
                    onUploadProgress: ProgressEvent => {
                        this.setState({
                            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                        })
                    },
                })
                    .then((res) => {
                        this.setState({...this.state, path: res.data })
                
                    })
                    .catch((err) => console.log(err));

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
        axios.post("/status",{status:this.state.status,username:username}).then(res =>{
            if(res.data.status==="success")
            {       this.setState({updateUser:true})
                window.location='/home';
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
                   

                    
              
                    
                    <input type='text' className="status-input" name="status" value={this.state.status} onChange={this.handleChange} placeholder='Status' />
                    <br/>
                    <button type="submit" class="btn btn-light" name='status' onClick={this.handleClick}>Update</button>
                    
                </form>
                </div>
            </div>
        )
    }
}

export default Dp;
