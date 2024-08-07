import React from 'react';
import Heading from './heading';

export default function Outlets() {
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Heading heading={'STAY TUNED'} mainHeading={'Technology Evolates'} />
                <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row justify-center items-center w-full h-3/5  p-10'>
                    <img
                        src='./bg-a.jpg'
                        className='image w-full h-64 rounded-lg mb-1'
                        alt='img'
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="false"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-center"
                    />
                    <img
                        src='./bg-b.jpg'
                        className='image w-full h-68 rounded-lg mb-1'
                        alt='img'
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="false"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-center"
                    />
                    <img
                        src='./bg-c.jpg'
                        className='image w-full h-64 rounded-lg mb-1'
                        alt='img'
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="false"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-center"
                    />
                </div>
            </div>
        </>
    );
}
