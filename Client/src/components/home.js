

import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import  { UserContext } from '../contexts/userContext'
import LeftComponent from './leftComponent';
import MiddleComponent from './middleComponent';
import RightComponent from './rightComponent';



class Home extends Component {
     static contextType = UserContext
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
      
   }
    backtomiddle = ()=>
    {
     
      document.querySelector(".rightHome").style.display="none";
      document.querySelector(".middleHome").style.display="flex";

    }
   
    
    componentDidMount() {
       
       
      
       
       
       
        const mq_wt = window.matchMedia( "(min-width: 0em) and (max-width: 59em)" );
        const mq_wt2 = window.matchMedia( "(min-width: 61em) and (max-width: 89em)" );
        const mq_wt3 = window.matchMedia( "(min-width: 90em) and (max-width: 200em)" );
        //const mq_ht = window.matchMedia( "(min-height:  41em)" );
        
    
    
    
        
        const WidthChange = (mq_wt)=>
        {    
                   
            if(mq_wt.matches)
            { 
                console.log("inside-mobile-view",mq_wt.matches)
              document.querySelector(".leftHome").style.display="flex"
              document.querySelector(".middleHome").style.display="none"
              document.querySelector(".rightHome").style.display="none"
             
            }
          
         }
         const WidthChange2 = (mq_wt2)=>
         { 
            if(mq_wt2.matches)
            { 
             
                console.log("inside-tab-view",mq_wt2.matches)
              document.querySelector(".leftHome").style.display="flex"
              document.querySelector(".middleHome").style.display="flex"
              document.querySelector(".rightHome").style.display="none"
               
            }
           
         
          }
          const WidthChange3 = (mq_wt3)=>
         {   
            if(mq_wt3.matches)
            { 
                console.log("inside-web-view",mq_wt3.matches)
               
              document.querySelector(".leftHome").style.display="flex"
              document.querySelector(".middleHome").style.display="flex"
              
              document.querySelector(".rightHome").style.display="flex"
               
            }
           
         
          }
    
          //   const HeightChange = (mq_ht)=>
        //  {  
        //     if(!mq_ht.matches)
        //     { 
        //       document.querySelector(".middleHome").style.display="none"
        //       document.querySelector(".leftHome").style.display="block"
        //       document.querySelector(".rightHome").style.display="none"
               
        //     }
          
         
        //   }
         
        
         if(mq_wt)
         {
         mq_wt.addListener(WidthChange);
         WidthChange(mq_wt);
      
         }
         if(mq_wt2)
         {
         mq_wt2.addListener(WidthChange2);
         WidthChange2(mq_wt2);

         }
         if(mq_wt3)
         {
         mq_wt3.addListener(WidthChange3);
         WidthChange3(mq_wt3);

         }

 
 }

   
 handleChange(e) {
        var value = e.target.value;



        this.setState({

            msgbody: value

        })
    }
    handleClick(e) {
        e.preventDefault();
        const newMessage = {
            msgBody: this.state.msgbody,
            receiverId: this.receiverId,
            senderId: this.id
        }

        this.socket.emit("postingMessage", newMessage);
    }

    render() {
        const {messages,middleFlag} = this.context 
               return (
              
            
            <div className="home">
                  
          
                <div className="chatBox">

                
                
                        
                          <LeftComponent messages={messages}/>
                
                 
                    
                
                       <MiddleComponent />
                       

                    {middleFlag?
                        
                    <RightComponent />

                    :<span className="rightHome" id="right"><h4>Receiver-Profile</h4></span>}


                </div>

                

            </div>
            );

    }
}

export default Home;

