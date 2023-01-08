export const addProductToBasket = (product) =>{
   // eslint-disable-next-line no-unused-vars
   let currentBasket = localStorage.getItem('basket');
   currentBasket = currentBasket ? JSON.parse(currentBasket) : [];

   currentBasket.push(product);

   localStorage.setItem('basket', JSON.stringify(currentBasket));

   return currentBasket;
}

export const removeProductFromBasket = (product) =>{
   // eslint-disable-next-line no-unused-vars
   let currentBasket = localStorage.getItem('basket');
   let hasFoundProduct = false;
   currentBasket = currentBasket ? JSON.parse(currentBasket) : [];

   currentBasket = currentBasket.filter((inProduct)=>{
      if(hasFoundProduct){
         return true;
      }else{
         hasFoundProduct = inProduct.id === product.id && inProduct.category === product.category;
         return !hasFoundProduct;
      }
   });

   localStorage.setItem('basket', JSON.stringify(currentBasket));

   return currentBasket;
}

export const getBasket = () =>{
   // eslint-disable-next-line no-unused-vars
   let currentBasket = localStorage.getItem('basket');
   currentBasket = currentBasket ? JSON.parse(currentBasket) : [];

   return currentBasket;
}

export const cleanBasket = () =>{
   localStorage.removeItem('basket');
}

export const insertPlacedOrderData = (id, total) =>{
   localStorage.setItem('order-done', JSON.stringify({id, total}));
}

export const getPlacedOrderData = () =>{
   const orderDone = localStorage.getItem('order-done');

   return orderDone ? JSON.parse(orderDone) : {id: '', total: 0}
}

export const setOrdersLimit = (limit) =>{
   localStorage.setItem('products-order-limit', limit);
}

export const getOrdersLimit = () =>{
   return localStorage.getItem('products-order-limit');
}

export const setNoService = (noService) =>{
   localStorage.setItem('no-service', noService);
}

export const getNoService = () =>{
   return localStorage.getItem('no-service');
}

export const setWelcome = (welcome) =>{
   localStorage.setItem('welcome', welcome);
}

export const getWelcome = () =>{
   return localStorage.getItem('welcome');
}

export const setStoreName = (noService) =>{
   localStorage.setItem('store-name', noService);
}

export const getStoreName = () =>{
   return localStorage.getItem('store-name');
}

export const setContacts = (contacts) =>{
   localStorage.setItem('contacts', contacts);
}

export const getContacts = () =>{
   return localStorage.getItem('contacts');
}
export const setFacebook = (facebook) =>{
   localStorage.setItem('facebook', facebook);
}

export const getFacebook = () =>{
   return localStorage.getItem('facebook');
}
export const setInstagram = (instagram) =>{
   localStorage.setItem('instagram', instagram);
}

export const getInstagram = () =>{
   return localStorage.getItem('instagram');
}

