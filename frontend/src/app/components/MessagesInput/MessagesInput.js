import { useState } from 'react';
import './MessagesInput.css';

const MessagesInput = ({text, setText, placeholder}) => {
    return (
        <>
            <div className="message-input-wrapper">
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" className="message-input" placeholder={placeholder || 'Введите сообщение...'}/>
            </div>
        </>
    );
}

export default MessagesInput;