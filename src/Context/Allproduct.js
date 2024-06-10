import React,{useState,createContext, useEffect} from "react";
import cartItem from "./itemClass";

export const ShopContexto = createContext();

const defaultCart = ()=>{
    let cart = [];
    for(let index = 0; index < 100 ; index++){
        cart[index] = new cartItem(index);
    }
    return cart

}

export function ShopProvider(props){

    const [allproduct,setallproduct] = useState([])
    const [cartItems,setCartItems] = useState(defaultCart())
    const [totalCount,setTotalCount] = useState(0);
    const [totalCart,setTotalCart] = useState(0);
    const [popular, setPopular] = useState([]);


    useEffect(()=>{
        fetch('https://api-register-product-user-rho.vercel.app/allproducts')
        .then((res)=>res.json())
        .then((data)=>setallproduct(data))

        if(localStorage.getItem('auth-token')){
            fetch('https://api-register-product-user-rho.vercel.app/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            })
            .then((res)=>res.json())
            .then((data)=>{
                const updatedCartItems = [...cartItems];
                for(let index = 0; index < 100 ; index++){
                    updatedCartItems[index].quant = data[index];
                }
                setCartItems(updatedCartItems);
            });
        }
    },[])


    useEffect(() => {
        fetch('https://api-register-product-user-rho.vercel.app/popular')
          .then((res) => res.json())
          .then((data) => setPopular(data));
      }, []);

    const addCart = (itemId,s) =>{

        const updatedCartItems = [...cartItems];

        updatedCartItems[itemId].quant += 1;
        updatedCartItems[itemId].size = [...updatedCartItems[itemId].size,s];

        setCartItems(updatedCartItems);
        
        if(localStorage.getItem('auth-token')){
            fetch('https://api-register-product-user-rho.vercel.app/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }
        
        }

    const removeCart = (itemId) =>{
        const updatedCartItems = [...cartItems];

        updatedCartItems[itemId].quant -= 1;
        updatedCartItems[itemId].size = updatedCartItems[itemId].size.slice(-1);

        setCartItems(updatedCartItems);

        if(localStorage.getItem('auth-token')){
            fetch('https://api-register-product-user-rho.vercel.app/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    }

    useEffect(()=>{
        let count = 0;
        let total = 0;
        for(let index = 0; index < 100; index++){
            count += cartItems[index].quant;
            if(cartItems[index].quant > 0){
                let product = allproduct.find((product)=>product.id === cartItems[index].id)
                if (product) {
                    total += (product.new_price * cartItems[index].quant);
                }
             }
        }
        setTotalCount(count);
        setTotalCart(total.toFixed(2));
    },[cartItems])
    
  

    return (
        <ShopContexto.Provider value={[allproduct,cartItems,addCart,removeCart,totalCount,totalCart,popular]}>
                {props.children}
        </ShopContexto.Provider>
    )
}
