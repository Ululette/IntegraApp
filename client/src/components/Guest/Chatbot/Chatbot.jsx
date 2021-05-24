import React from 'react';
import Chatbot from 'react-chatbot-kit'
/* import './Chatbot.css';
 */import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import Config from './Config';

export default function Bot() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot config={Config} actionProvider={ActionProvider} messageParser={MessageParser} />
      </header>
    </div>
  );
}