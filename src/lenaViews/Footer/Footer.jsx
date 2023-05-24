import './Footer.css';
import React, {useEffect, useState} from 'react';
import * as api from "../../lenaHelpers/APIRequests.js";
import * as storage from '../../lenaHelpers/LocalStorage.js';
import { GrInstagram } from 'react-icons/gr';
import { ImFacebook2 } from 'react-icons/im';
import { AiFillContacts } from 'react-icons/ai';

export default function Footer() {
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [contacts, setContacts] = useState('');

    useEffect(()=>{
        api.config('contacts').then((conf)=>{
            const inContacts = storage.getContacts();

            if(conf && conf.config && !conf.code){
                setContacts(conf.config);
                storage.setContacts(conf.config);
            }else if(inContacts){
                setContacts(inContacts);
            }
        });
      
        api.config('facebook').then((conf)=>{
            const inFacebook = storage.getFacebook();

            if(conf && conf.config && !conf.code){
                setFacebook(conf.config);
                storage.setFacebook(conf.config);
            }else if(inFacebook){
                setFacebook(inFacebook);
            }
        });

        api.config('instagram').then((conf)=>{
            const inInstagram = storage.getInstagram();

            if(conf && conf.config && !conf.code){
                setInstagram(conf.config);
                storage.setInstagram(conf.config);
            }else if(inInstagram){
                setInstagram(inInstagram);
            }
        });
    }, []);

    return (
        <>
            <footer className='main-f'>
                <div className='contacts-f'>
                    <h4>
                        <AiFillContacts/>
                        Contactos:
                    </h4>
                    <p className='contacts-text-f'>
                        {contacts}
                    </p>
                </div>
                <div className='social-f'>
                    <a href={instagram.includes('https://')? instagram : 'https://' + instagram} target="_blank">
                        <GrInstagram className='instagram-f'/>
                    </a>
                    <a href={facebook.includes('https://')? facebook : 'https://' + facebook} target="_blank">
                        <ImFacebook2 className='facebook-f' style={{ stroke: "url(#blue-gradient)" }}/>
                    </a>
                </div>
            </footer>
            
        </>
    )
}
