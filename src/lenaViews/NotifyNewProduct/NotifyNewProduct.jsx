import React, {useEffect} from 'react';
import './NotifyNewProduct.css';

export default function NotifyNewProduct(props) {
  useEffect(()=>{
    setTimeout(() => {
      props.setIsShowing(false);
    }, 1400);
  },[]);

  return (
    <>
        <div className='container-nnp'>
           {props.count}
        </div>
        <div className='block-nnp'> 
        </div>
    </>
  )
}
