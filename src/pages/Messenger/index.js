import React from 'react';
import { Component } from 'react';
import * as firebase from 'firebase';
import Navigation from '../../components/Navigation';
import HeaderText from '../../components/HeaderText';
import Chats from '../../components/Chats';
import dataHandling from '../../services/DataHandling';
import './Messenger.css'
import { Link } from 'react-router-dom';
import { userId } from '../../components/EnsureLoggedInContainer/index';

export default class Messenger extends Component {
    state = {
        chatWith: '',
        myID: userId,
        chats: []
    }

    //alle chats aus DB in Liste speichern und auf der Seite ausgeben
    componentWillMount() {
        dataHandling.addDataChangeListener('chats', this.handleChatsDataChange);
    }
    //alle chats aus DB in Liste speichern und auf der Seite ausgeben
    handleChatsDataChange = data => {
        //TODO: Improve data query
        const chatList = data.val();

        if (chatList === null) {
            return;
        }

        const chatKeys = Object.keys(chatList);

        let chats = [];
        for (let i = 0; i < chatKeys.length; i++) {
            const k = chatKeys[i];
            const fromUser = chatList[k].fromUser;
            const toUser = chatList[k].toUser;
            const toUserName = chatList[k].toUserName;

            if(fromUser === userId || toUser === userId){
                chats.push({
                    id: k,
                    fromUser: fromUser,
                    toUser: toUser,
                    toUserName: toUserName
                });
            }

            this.setState({
                chats: chats
            });
            console.log('chat' + chatKeys[i])
            console.log('ich: ' + userId)
        };

        
    }

    render(){
        return (
            <React.Fragment>
                <HeaderText text="NACHRICHTEN"/>
                <div className="chats-container">
                {this.state.chats.map(chat => {
                        const path = '/chat/' + chat.id;
                        if(chat === null){
                            <p> Keine Chats vorhanden </p>
                        }
                        return (
                            //React braucht bei Iteratoren eindeutige Keys deswegen key=
                            <Link to={path} key={chat.id}>
                                <Chats
                                    text={chat.toUserName}
                                />
                            </Link>
                        );
                    })}
                </div>
                <Navigation />
            </React.Fragment>
        );
    }
}