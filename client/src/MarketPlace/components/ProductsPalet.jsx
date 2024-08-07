import React, { useEffect, useState } from 'react';
import Heading from './heading';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function ProductsPalet() {
  const [productsdata, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getServices`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center'>
        <Heading heading={'WE OFFERS'} mainHeading={'THE BEST SERVICES'} />
        <div className='w-full px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-5
        gap-x-5 md:gap-x-10
        items-center justify-center' 
        data-aos="fade-in"
        data-aos-offset="-100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="false"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        >
          {productsdata.slice(0,8).map(products =>{
              return(<>
                  <ProductCard productsdata={products}/>
              </>)
          })}
        </div>
          <a href='/services' className='rounded-lg my-6 py-1 px-10 hover:bg-purple-500 bg-purple-600 text-white'>VIEW MORE</a>

      </div>
    </>
  );
}
