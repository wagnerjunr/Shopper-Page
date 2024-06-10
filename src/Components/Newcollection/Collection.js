import React, { useEffect, useState } from 'react'
import Item from '../Item/product';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './collection.css'


const Collection = () => {

  const [newcolletion,setNewColletion] = useState([]);

  useEffect(()=>{
    fetch('https://api-register-product-user-rho.vercel.app/newcolletion')
    .then((res)=>res.json())
    .then((data)=>setNewColletion(data));
  },[]);
  
  return (
    <div className='collection'>
      <h1>NOVA COLEÇÃO</h1>
      <hr/>
      <div className='grid-collection'>
        {newcolletion && newcolletion.length > 0 ? (
          newcolletion.map((product) => (
            <div className='product-collection' key={product.id}>
              <Item product={product} />
            </div>
          ))
        ) : (
          [...Array(8)].map((_, index) => (
            <div key={index} className='product-collection'>
                        <Skeleton height={300} width="100%" />
                        </div>
          ))
        )}
      </div>
      <Link to={'/feminino'}><button onClick={()=>window.scrollTo(0,0)} className='btn-explore'>Explore Mais</button> </Link>
    </div>
  )
}
export default Collection;