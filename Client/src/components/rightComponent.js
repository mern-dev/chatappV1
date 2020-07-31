import React, { Component } from "react";
import { UserContext } from '../contexts/userContext'
import ReceiveMessage from "./chatComponents/receivemessage"
import SendMessage from './chatComponents/sendmessage';
import axios from 'axios';





class RightComponent extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {

            startDate: false,
            endDate: false,

            word: '',
            tog: true,
            arrId: [],
            arrMsg: [],
            lastmsg: null,

            i: 0,
         
            start:'',
            end: new Date(),
           

            arrPos:[],
           
            data: true,
            date:"",
            flagdate:false


        };
        this.cancel = '';
        this.handleChange = this.handleChange.bind(this);
       
        this.handleScroll = this.handleScroll.bind(this);

       

    }
    formatDisplay = (msg) => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var msg_sent = new Date(msg.sentTime)

        var t_now = new Date()
        let month = months[msg_sent.getMonth()].slice(0, 3)
        let day = days[msg_sent.getDay()].slice(0, 3)
        let date = msg_sent.getDate()

        if (msg_sent.getFullYear() === t_now.getFullYear()) {
            if (msg_sent.getMonth() === t_now.getMonth()) {
                if (msg_sent.getDate() === t_now.getDate()) {
                    return "Today"
                }
                if (t_now.getDate() - msg_sent.getDate() === 1)
                    return "Yesterday"
                if (t_now.getDate() - msg_sent.getDate() <= 7)
                    return days[msg_sent.getDay()]
                else {


                    return day + "," + date + " " + month
                }
            }
            else {
                return day + "," + date + " " + month
            }
        }
        else {
            return day + "," + date + " " + month + "," + msg_sent.getFullYear().toString().slice(-2);
        }
    }

    handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ ...this.state, [name]: value, data: false });

    }



 

    handleCountDown = (i) => {
   
       const uparrow = document.getElementById("up-arrow");
       const downarrow =document.getElementById("down-arrow");
       if(i===this.state.arrId.length-1)
       {
           downarrow.style.opacity="0.25";
           downarrow.style.pointerEvents="none";
           uparrow.style.opacity="1";
           uparrow.style.pointerEvents="auto";
       }
       else if(i===0)
       {
           uparrow.style.opacity="0.25";
           uparrow.style.pointerEvents="none";
           downarrow.style.opacity="1";
           downarrow.style.pointerEvents="auto";
       }
       else
       {
        uparrow.style.opacity="1";
        uparrow.style.pointerEvents="auto";
        downarrow.style.opacity="1";
        downarrow.style.pointerEvents="auto";
       }
  
      
       
       
      const container = document.getElementById('searchChatScroll')
     const t = container.querySelectorAll(".search-message")
     if(i>=1)
      { t[this.state.arrPos[i-1]].style.backgroundColor="transparent";
       t[this.state.arrPos[i]].style.backgroundColor="#f4f6ff17"
      container.scrollTop = t[this.state.arrPos[i]].offsetTop-container.offsetTop-container.clientHeight/2;
     }
    else
     {
        t[this.state.arrPos[i]].style.backgroundColor="#f4f6ff17"
        container.scrollTop = t[this.state.arrPos[i]].offsetTop-container.offsetTop-container.clientHeight/2;
     }
     

    }
  handleCountUp =(i) =>
  {
    const uparrow = document.getElementById("up-arrow");
    const downarrow =document.getElementById("down-arrow");
    if(i===this.state.arrId.length-1)
    {
        downarrow.style.opacity="0.25";
        downarrow.style.pointerEvents="none";
        uparrow.style.opacity="1";
        uparrow.style.pointerEvents="auto";
    }
    else if(i===0)
    {
        uparrow.style.opacity="0.25";
        uparrow.style.pointerEvents="none";
        downarrow.style.opacity="1";
        downarrow.style.pointerEvents="auto";
    }
    else
    {
     uparrow.style.opacity="1";
     uparrow.style.pointerEvents="auto";
     downarrow.style.opacity="1";
     downarrow.style.pointerEvents="auto";
    }
  
   const container = document.getElementById('searchChatScroll')
  const t = container.querySelectorAll(".search-message")
  if(i===this.state.arrId.length-1)
    {
        t[this.state.arrPos[i]].style.backgroundColor="#f4f6ff17"
     container.scrollTop = t[this.state.arrPos[i]].offsetTop-container.offsetTop-container.clientHeight/2;
    }
 else
  {
     
     t[this.state.arrPos[i+1]].style.backgroundColor="transparent";
     t[this.state.arrPos[i]].style.backgroundColor="#f4f6ff17"
    container.scrollTop = t[this.state.arrPos[i]].offsetTop-container.offsetTop-container.clientHeight/2;
  }
  }
    handleSubmit = () =>{
        
        
        
        const { receiver, id } = this.context;
      if (!(this.state.startDate && this.state.endDate)){
         
        axios.get(`/getWord/${id}/${receiver._id}/${this.state.word.trim()}`)
            .then(res => {
                this.i=0;
                   
                const hightlight = (str) =>
                { 
                 var resdata = str.split(" ");
                 
                 var cmp = this.state.word.trim().split(" ");
               
             
                 var reStr=[];
                 for(let i=0;i<resdata.length;i++)
                 {  
                     for(let k=0;k<cmp.length;k++)
                     {  if(resdata[i].length===cmp[k].length)
                         {  let flag =true;
                             for(let j=0;j<cmp[k].length;j++)
                             { 
                                 if(resdata[i].charAt(j).toLowerCase()!==cmp[k].charAt(j).toLowerCase())
                                 {
                                        flag=false;   
                                 }
                             
                             }
                             if(flag)
                             {
                                 let temp1 = `<span class="hightcolor-search">${resdata[i]}</span>`
                                 reStr.push({str:temp1,index:i});  
                             }
                           
                         }
                         
                        else if(resdata[i].length>cmp[k].length)
                         {   let gflag = true;
                               for(let p=cmp[k].length-1;p>=0;p--)
                               {
                                   if(resdata[i].charAt(p).toLowerCase()!==cmp[k].charAt(p).toLowerCase())
                                         gflag=false;
                               }
                               if(gflag)
                               {
                                   let temp2 = resdata[i].slice(0,cmp[k].length);
                                   let temp3 = `<span class="hightcolor-search">${temp2}</span>`+resdata[i].slice(cmp[k].length,resdata[i].length)
                                   reStr.push({str:temp3,index:i})
                               }
                              
                         }
                       
            
                     }
                 
                       
                 }
                
                 if(reStr.length)
                 {
                    for(let i=0;i<reStr.length;i++)
                    {
                        resdata[reStr[i].index]=reStr[i].str;
                    }
                    return resdata.join(" ");
                 }

                
                 return str;
                }
              
                      if(res.data.status==="success")
                      {   this.setState({ data: false , arrId: res.data.arrId,arrPos:res.data.arrPos, arrMsg: res.data.arrMsg })
                           
                               
                            for (var j = 0; j < this.state.arrId.length; j++)
                          
                           document.getElementById(`${res.data.arrId[j]}`).innerHTML=hightlight(document.getElementById(`${res.data.arrId[j]}`).textContent);
                           const uparrow = document.getElementById("up-arrow");
                           const downarrow =document.getElementById("down-arrow");
                           if(uparrow&&downarrow)
                           {
                            uparrow.style.opacity="0.5";
                            uparrow.style.pointerEvents="none";
                            downarrow.style.opacity="1";
                            downarrow.style.pointerEvents="auto";

                           }
                           
                           const container = document.getElementById('searchChatScroll');
                           const t = container.querySelectorAll(".search-message");

                           t[this.state.arrPos[0]].style.backgroundColor="#f4f6ff17"
                          container.scrollTop = t[this.state.arrPos[0]].offsetTop-container.offsetTop-container.clientHeight/2;
                        
                        }
                        else
                        {
                            this.i=0;
                         this.setState({ data: true ,arrId:[],arrMsg:[],arrPos:[]})
                       }
                 
            })
        
        
      }
      else 
      {
        
                console.log('with date');
            axios.get(`/getWord/${id}/${receiver._id}/${this.state.word}/${this.state.start}/${this.state.end}`)
                .then(res => {
                    this.setState({ ...this.state, arrId: res.data.arrId, arrMsg: res.data.arrMsg })

                    console.log(this.state.arrId);


                    if (res.data.arrId.length === 0) {
                        this.setState({ data: true })
                    }
                    else {
                        this.setState({ data: false })
                    }
        
      }


    }
    handleScroll() {


        this.setState({ flagdate: true })
        const container = document.getElementById("searchChatScroll");
        let t = container.querySelectorAll(".date-main")

        for (let i = 0; i < t.length; i++) { //console.log(t[i].nextSibling.clientHeight,t[i].offsetTop)

            if (t[i].offsetTop - 120 < container.scrollTop) {
                console.log("lll")
                this.date = t[i].textContent

            }


        document.querySelector(".date-right").style.display="table";

       if(container.scrollHeight-container.scrollTop===container.offsetHeight)
       {
       
        
        document.querySelector(".date-right").style.display="none"
        
        
       }
       if(0===container.scrollTop)
       {
        document.querySelector(".date-right").style.display="none"
       }

    }

    backtomiddle = () => {

        document.querySelector(".rightHome").style.display = "none";
        document.querySelector(".middleHome").style.display = "flex";

    }

    formatMaindate = (msg, lastMsg) => {
        var msg_sent = new Date(msg.sentTime)


        if (lastMsg == null) {

            return true
        }
        else {
            let lastmsg = new Date(lastMsg.sentTime)

            if (lastmsg.getFullYear() === msg_sent.getFullYear() && lastmsg.getMonth() === msg_sent.getMonth() && lastmsg.getDate() === msg_sent.getDate()) {
                return false
            }
            else {
                return true
            }

        }
    }


    render() {
        var lastmsg = 'null'
         
        const { receiver } = this.context;
        if (this.state.tog) {
            return (
                <div className='rightHome' id='right' >

                    <div className="rc-header">
                        <div className="back-button-right">
                            <img alt="#" src="images/back-button.png" id="back-button-right" className="back-button-right" onClick={this.backtomiddle} />
                        </div>
                       
                    </div>





                    <div className="contact-info">
                        {receiver.path ? <img src={receiver.path} alt='aaa' className='rc-img' /> : <img src='uploads/nodp.png' alt='a' className='rc-img' />}

                        <h4 className="contact-name">{receiver.username}</h4>
                        {/* <div className="contact-status">{receiver.status}</div> */}
                        <div onClick={
                            () => {
                                this.setState(
                                    { ...this.state, tog: !this.state.tog }
                                )
                            }
                        }  className="chat-search-button"><span><img alt="#" src="images/chat-search.png" className="chat-search-png" /></span>Chat Search</div>

                    </div>

                </div>

            )
        }
        else {

            return (

                <div className='rightHome' >
                    <div className='rc-header'>

                        <img src="images/back-button.png" alt='a' className='rc-button' onClick={(e) => {
                            this.setState({ ...this.state, tog: !this.state.tog })
                        }} />
                        <input type="text" className='rc-searchBar' name="word" value={this.state.word} onChange={this.handleChange} />


                        <button type='submit' onClick={this.handleSubmit}> <i class="fa fa-search" aria-hidden="true"></i>Search</button>





                    </div>
                    <div>
                        <input type='date' name='start'  onChange={(e) => {
                            this.setState({...this.state,startDate:true,start:e.target.value})
                          
                        }} />
                        <input type='date' name='end' onChange={(e) => {
                              this.setState({...this.state,endDate:true,end:e.target.value})
                              }} />
                    </div>

                    {this.state.arrMsg.length ? <div className="chatScroll" id='searchChatScroll' onScroll={this.handleScroll}>


                   
                   

                    <div className="outer-div"> <p className="date-right">{this.state.date}</p> </div>


                        <ul className="list-none">
                            {
                                this.state.arrMsg.map(m => {

                                    if (m.receiverId === receiver._id) {
                                        if (this.formatMaindate(m, lastmsg)) {
                                            lastmsg = m;
                                            return (

                                                <li key={m.id} id="sendTop" className="search-message" >
                                                    <br />
                                                    <p className="date-main">{this.formatDisplay(m)}</p>
                                                    <br />
                                                    <SendMessage msgBody={m.msgBody} msgid={m.id} sentTime={m.sentTime} status={{ sent: m.sent, delivered: m.delivered, seen: m.seen }} />
                                                </li>
                                            )
                                        }
                                        else {
                                            lastmsg = m;
                                            return (

                                                <li key={m.id} id="send"className="search-message">

                                                    <SendMessage msgBody={m.msgBody} msgid={m.id} sentTime={m.sentTime} status={{ sent: m.sent, delivered: m.delivered, seen: m.seen }} />
                                                </li>)
                                        }

                                    }


                                    if (m.senderId === receiver._id) {

                                        if (this.formatMaindate(m, lastmsg)) {
                                            lastmsg = m;
                                            return (




                                                <li key={m.id} id="receiveTop"className="search-message">

                                                    <p className="date-main">{this.formatDisplay(m)}</p>
                                                    <br />

                                                    <ReceiveMessage msgBody={m.msgBody} msgid={m.id} sentTime={m.sentTime} />
                                                </li>
                                            )
                                        }
                                        else {
                                            lastmsg = m;
                                            return (<li key={m.id} id="receive" className="search-message">

                                                <ReceiveMessage msgBody={m.msgBody} msgid={m.id} sentTime={m.sentTime} />
                                            </li>)

                                        }


                                    }

                                    return null;
                                })}
                        </ul>
                    </div>
                   
                    : <div className="search-img">
                            <h3> {this.state.word.length ? this.state.data ? `"${this.state.word}" not found` : '' : "Search"}</h3>
                            <img className="img-search" alt="#" src="./images/search--v2.png" />
                        </div>}
                   {this.state.arrId.length>1  ? <div className="search-bottom">
                    <div className="arrows" id="down-arrow" onClick={(e) => {
                           
                           if(this.state.arrId!==[])
                           {
                            if (this.i <=this.state.arrId.length - 1) 
                            {
                                this.i=this.i+1;
                            
                                this.handleCountDown(this.i)
                                
                            }
                           } 
                          

                        }}><img src="images/down-arrow-sea.png" alt='#' className="downarrow" /></div>

                     <div className="search-no-messages ">{this.state.arrId.length} matches</div>

                        <div className="arrows" id="up-arrow" onClick={(e) => {
                             if(this.state.arrId!==[])
                             {
                                if (this.i > 0) 
                                {
                                    this.i=this.i-1;
                                    this.handleCountUp(this.i)
    
                                }
                             }
                          
                        }}><img src="images/up-arrow.png" alt='#' className="uparrow" /></div>


                    </div>:<span></span>}

                </div>
            );
        }
    }
}
export default RightComponent;


