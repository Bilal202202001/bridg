import React, { useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';


export default function AddCategory() {
    const [showForm, setShowForm] = useState(false);
    const [notification, setNotification] = useState(null);
    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleUpload = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/uploadCategory`, data)
            .then(res => {
                event.target.reset();
                setNotification('Category Added');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
                console.log(res)
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className='w-3/5 mt-4'>
                {notification && (
                    <div className='w-full flex justify-end'>
                        <div className="bg-green-500 w-1/5 rounded-lg text-white text-center my-2">
                            {notification}
                        </div>
                    </div>
                )}

                <h2 className='w-2/5 mx-2 my-1 text-center font-semibold text-white rounded-r-lg px-2 text-2xl bg-purple-500'>
                    ADD CATEGORY
                </h2>



                <div className='w-full bg-white flex flex-col justify-center items-center p-4 rounded-b-lg shadow-lg'>
                    <form className='w-full' onSubmit={handleUpload}>
                        <div className='grid grid-cols-2 gap-2'>
                            <label htmlFor="categoryName">Category Name</label>
                            <input type="text" name='categoryName' className='rounded-lg border px-2 py-1' />
                        </div>
                        <div className='w-full flex justify-end items-center'>
                            <button type='submit' className='mt-4  w-24 py-1 bg-gray-400 rounded-lg font-bold text-white'>ADD CATEGORY
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}
