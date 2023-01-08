import './NoService.css';
import React, {useState, useEffect} from 'react';
import * as storage from '../../lenaHelpers/LocalStorage.js';

export default function NoService() {
    const [message, setMessage] = useState('Lamentamos sem serviço!');

    useEffect(()=>{
        const newMessage = storage.getNoService();

        if(newMessage){
            setMessage(newMessage);
        }
    }, [])
  return (
    <div className='container-ns'>
        <strong className='message-ns'>
            {message}
        </strong>
    </div>
  )
}
