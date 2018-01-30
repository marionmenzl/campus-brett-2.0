import React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import './Chats.css';

export default class Chats extends Component {
    render() {
        return (
            <div className="chat-text">
                {/* <svg width="70" height="70">
                    <rect x="5" y="5" width="70" height="70" style="fill:blue;fill-opacity:0.1" />
                </svg> */}
                <p>{this.props.text}</p>
            </div>
        );
    }
}