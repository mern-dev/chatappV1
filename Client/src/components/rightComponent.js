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
            // startDate:'',
            // endDate:'',
            word: '',
            tog: true,
            arrId: '',
            arrMsg: [],
            lastmsg: null
        };
        this.cancel = '';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

    }


    handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ ...this.state, [name]: value });
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
    handleSubmit(e) {
        e.preventDefault();
        const { receiver, id } = this.context;
        axios.get(`/getWord/${id}/${receiver._id}/${this.state.word}`)
            .then(res => {
                this.setState({ ...this.state, arrId: res.data.arrId, arrMsg: res.data.arrMsg })
            })

    }
    handleScroll() {

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
                    <div className='rc-header' >

                        <div className="back-button-right">
                            <img alt="#" src="images/back-button.png" id="back-button-right" className="back-button-right" onClick={this.backtomiddle} />
                        </div>
                        <p>Contact info</p>
                        <img src={receiver.path} alt='aaa' className='rc-img' />
                        <h4>{receiver.username}</h4>
                        <button type='button' onClick={
                            () => {
                                this.setState(
                                    { ...this.state, tog: !this.state.tog }
                                )
                            }
                        }>Filter</button>

                    </div>
                </div>
            )
        }
        else {
            return (

                <div className='rightHome' >
                    <div className='rc-header'>

                        <input type="text" name="word" value={this.state.word} onChange={this.handleChange} />
                        <button type='submit' onClick={this.handleSubmit}>Search</button>
                        <button type='button' onClick={(e) => {
                            this.setState({ ...this.state, tog: !this.state.tog })
                        }}>Filter</button>
                    </div>
                    <div className="chatScroll-right" onScroll={this.handleScroll}>
                        <ul className="list-none">
                            {
                                this.state.arrMsg.map(m => {

                                    if (m.receiverId === receiver._id) {
                                        if (this.formatMaindate(m, lastmsg)) {
                                            lastmsg = m;
                                            return (

                                                <li key={m.id} id="send" >
                                                    <br />
                                                    <p className="date-main">{this.formatDisplay(m)}</p>
                                                    <br />
                                                    <SendMessage msgBody={m.msgBody} sentTime={m.sentTime} status={{ sent: m.sent, delivered: m.delivered, seen: m.seen }} />
                                                </li>
                                            )
                                        }
                                        else {
                                            lastmsg = m;
                                            return (

                                                <li key={m.id} id="send">

                                                    <SendMessage msgBody={m.msgBody} sentTime={m.sentTime} status={{ sent: m.sent, delivered: m.delivered, seen: m.seen }} />
                                                </li>)
                                        }

                                    }


                                    if (m.senderId === receiver._id) {

                                        if (this.formatMaindate(m, lastmsg)) {
                                            lastmsg = m;
                                            return (




                                                <li key={m.id} id="receive">

                                                    <p className="date-main">{this.formatDisplay(m)}</p>
                                                    <br />

                                                    <ReceiveMessage msgBody={m.msgBody} sentTime={m.sentTime} />
                                                </li>
                                            )
                                        }
                                        else {
                                            lastmsg = m;
                                            return (<li key={m.id} id="receive" >

                                                <ReceiveMessage msgBody={m.msgBody} sentTime={m.sentTime} />
                                            </li>)

                                        }


                                    }

                                    return null;
                                })}
                        </ul>
                    </div>
                </div>
            );
        }
    }
}
export default RightComponent;


