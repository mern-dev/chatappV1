import React, { Component  } from "react";
import { UserContext } from '../contexts/userContext'
import ReceiveMessage from "./chatComponents/receivemessage"
import SendMessage from './chatComponents/sendmessage';
import axios from 'axios';





class RightComponent extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            
            word: '',
            tog: true,
            arrId: [],
            arrMsg: [],
            lastmsg: null,
            arrPos:[],
            i: 0,
            data: true,
            date:"",
            flagdate:false

        };
        this.cancel = '';
        this.handleChange = this.handleChange.bind(this);
       
        this.handleScroll = this.handleScroll.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleOffset = this.handleOffset.bind(this);

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
        // if (name === 'word') {
        //     if (this.cancel) {
        //         this.cancel.cancel();
        //     }
        //     this.cancel = axios.CancelToken.source();

        //     axios.get(`/getWord/${id}/${receiver._id}/${value}`, {
        //         cancelToken: this.cancel.token
        //     }).then(res => {
        //         console.log(res.data)

        //     })

        // }
    }
    handleOffset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    
        
        

    handleCount() {
        
    
       
      const container = document.getElementById('searchChatScroll')
     const t = container.querySelectorAll(".search-message")
     if(this.state.i>=1)
      { t[this.state.arrPos[this.state.i-1]].style.backgroundColor="transparent";
       t[this.state.arrPos[this.state.i]].style.backgroundColor="#f4f6ff17"
      container.scrollTop = t[this.state.arrPos[this.state.i]].offsetTop-container.offsetTop-container.clientHeight/2;
     }
    else
     {
        t[this.state.arrPos[this.state.i]].style.backgroundColor="#f4f6ff17"
        container.scrollTop = t[this.state.arrPos[this.state.i]].offsetTop-container.offsetTop-container.clientHeight/2;
     }
     

    }
  
    handleSubmit = () =>{
        
     
        this.setState({flagdate:false})
        const { receiver, id } = this.context;
     
        axios.get(`/getWord/${id}/${receiver._id}/${this.state.word}`)
            .then(res => {
                
                   
                const hightlight = (str) =>
                { 
                 var resdata = str.split(" ");
                 var cmp = this.state.word.split(" ");
              console.log(cmp,"l")
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
                                 let temp1 = `<span class="hightcolor-search">${resdata[i]}+</span>`
                                 reStr.push(temp1);  
                             }
                             else
                             {
                                 reStr.push(resdata[i])
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
                                   reStr.push(temp3)
                               }
                               else{
            
                                 reStr.push(resdata[i])
                               }
                         }
                         else
                         {
                             reStr.push(resdata[i])
                         }
            
                     }
                 
                       
                 }
                
                 return reStr.join(" ");
                }
              
                      if(res.data.status==="success")
                      {   this.setState({ ...this.state,data: false , arrId: res.data.arrId,arrPos:res.data.arrPos, arrMsg: res.data.arrMsg })
                           
                               
                            for (var j = 0; j < this.state.arrId.length; j++)
                          
                           document.getElementById(`${res.data.arrId[j]}`).innerHTML=hightlight(document.getElementById(`${res.data.arrId[j]}`).innerHTML);
                        
                        
                        }
                        else
                        {
                         this.setState({ data: true })
                       }
                 
            })

        

          
           

    }
    handleScroll() {

      
        const container = document.getElementById("searchChatScroll");
        let t = container.querySelectorAll(".date-main")
      
        for(let i=0;i<t.length;i++)
        { 
   
          if(t[i].offsetTop<container.scrollTop+120)
          {  
           
           this.setState({date:t[i].textContent})
          }
         
          
        }
        document.querySelector(".date-right").style.display="block";

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
                        <h4 >Contact info</h4>
                    </div>





                    <div className="contact-info">
                        {receiver.path ? <img src={receiver.path} alt='aaa' className='rc-img' /> : <img src='uploads/nodp.png' alt='a' className='rc-img' />}

                        <h4>{receiver.username}</h4>
                        <button onClick={
                            () => {
                                this.setState(
                                    { ...this.state, tog: !this.state.tog }
                                )
                            }
                        } type='button' >Filter</button>

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

                        <button type='button' onClick={this.handleSubmit}> <i className="fa fa-search" aria-hidden="true"></i> Search</button>
                       
                     
                        <button type='button' id='plus' onClick={(e) => {
                           
                           if(this.state.arrId!==[])
                           {
                            if (this.state.i <=this.state.arrId.length - 1) {
                                
                                this.setState({ ...this.state, i: this.state.i + 1 })
                                this.handleCount()
                                
                            }
                           } 
                          

                        }}>+</button>



                        <button type='button' id='minus' onClick={(e) => {
                             if(this.state.arrId!==[])
                             {
                                if (this.state.i > 0) {
                                    this.setState({ ...this.state, i: this.state.i - 1 })
                                    this.handleCount()
    
                                }
                             }
                          
                        }}>-</button>


                    </div>

                    {this.state.arrMsg.length ? <div className="chatScroll" id='searchChatScroll' onScroll={this.handleScroll}>
                       

                     <p className="date-right">{this.state.date}</p>

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
                    </div> : <div className="search-img">
                            <h3> {this.state.word.length ? this.state.data ? `"${this.state.word}" not found` : '' : "Search"}</h3>
                            <img className="img-search" alt="#" src="./images/search--v2.png" />
                        </div>}

                </div>
            );
        }
    }
}
export default RightComponent;


