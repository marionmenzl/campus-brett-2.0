import * as firebase from 'firebase';
import React from 'react';
import { Component } from 'react';
import HeaderIcon from '../../components/HeaderIcon';
import InputField from '../../components/InputField';
import './Chatroom.css'
<<<<<<< HEAD
import authentification from '../../services/Authentification';
=======
>>>>>>> 96781840ed45f4c1d908e0372b952e3e974a9a6b

export default class Chatroom extends Component {
    state = {
        message: '',
        messages: []
    }

    //live - cicle - method -> System calls this function is the conection to firebase
    //reload - must shown in Console
    componentDidMount(){
        console.log('componentDidMount');
        firebase.database().ref('messages/').on('value', (snapshot)=> {

            const currentMessages = snapshot.val()

            if(currentMessages != null){
                this.setState({
                    messages: currentMessages
                })
            }
        })
    }

    handleMessage(event) {
        console.log('Message update: ' + event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit(event){
        console.log('submit Message: ' + this.state.message)
        //preparing next message
        const nextMessage = {
            id: this.state.message.length,
            text: this.state.message
        }

        //connect to firebase
        firebase.database().ref('messages/' + nextMessage.id).set(nextMessage);


        // //list of messages
        // var list = Object.assign([], this.state.messages);
        // //Message in den Chat schicken
        // list.push(nextMessage);
        // this.setState({
        //     messages: list
        // })
    }

    handleBack = event => {
        this.props.history.push('/messenger')
    }

    render() {
        const currentMessage = this.state.messages.map((message, i) => {
            return (
                <li key={message.id}>{message.text}</li>
            )
        })

        return (
            <React.Fragment>
                <HeaderIcon text="CHATROOM" icon="back" onClick={this.handleBack}/>
                <div className="container-chat">
                    <ol className="chat-messages">
                        {currentMessage}
                    </ol>
                    <div className="chat-bar">
                        <div className="chat-input" >
                            <InputField placeholder="Nachricht verfassen..." onChange={this.handleMessage} value={this.state.message}/>
                        </div>
                        <span className="send-icon icon-arrow-up" onClick={this.handleSubmit} ></span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}