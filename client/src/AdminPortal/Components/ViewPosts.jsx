import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';

export default function ViewPosts() {
    const [editProduct, setEditProduct] = useState(null);
    const [notification, setNotification] = useState(null);
    const [postsData, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/post/getPosts`)
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditClick = (post) => {
        setEditProduct(post);
    };

    const handleCancelEdit = () => {
        setEditProduct(null);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        const updatedProductData = new FormData(event.target);
        const productId = updatedProductData.get('_id');

        axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/editProduct/${productId}`, updatedProductData)
            .then(res => {
                console.log(res.data);
                setNotification('Product updated');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (productID) => {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/deleteProduct/${productID}`)
            .then(res => {
                setNotification('Product Deleted');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className='w-full p-10'>
            {notification && (
                <div className='w-full flex justify-end'>
                    <div className="bg-green-500 w-1/5 rounded-lg text-white text-center my-2">
                        {notification}
                    </div>
                </div>
            )}
            {editProduct && (
                <>
                    <h2 className='w-1/5 mx-2 my-1 text-center font-semibold text-white rounded-r-lg px-2 text-2xl bg-purple-500'>
                        EDIT BLOGS
                    </h2>
                    <div className="w-full bg-white flex flex-col justify-center items-center p-4 rounded-b-lg shadow-lg mb-4">
                        <form className='w-full' onSubmit={handleEdit}>
                            <div className='grid grid-cols-2 gap-2'>
                                <label htmlFor="productName">Product ID</label>
                                <input type="text" name='_id' value={editProduct._id} className='rounded-lg border px-2 py-1' readOnly />
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" name='productName' value={editProduct.productName} className='rounded-lg border px-2 py-1' onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })} />
                                <label htmlFor="productPrice">Product Price</label>
                                <input type="number" name='productPrice' value={editProduct.productPrice} className='rounded-lg border px-2 py-1' onChange={(e) => setEditProduct({ ...editProduct, productPrice: e.target.value })} />
                                <label htmlFor="productCategory">Product Category</label>
                                <input type="text" name='productCategory' value={editProduct.productCategory} className='rounded-lg border px-2 py-1' onChange={(e) => setEditProduct({ ...editProduct, productCategory: e.target.value })} />
                                <label htmlFor="file">Product Image</label>
                                <div className='px-4 py-2 flex justify-end items-center'>
                                    <img src={`http://localhost:3001/Images/${editProduct.image}`} className='w-2/5 h-36 rounded-lg' alt={`Product`} />
                                </div>
                                <input type="file" name='file' />
                            </div>
                            <div className='w-full flex justify-end items-center'>
                                <button type='submit' className='mt-4  w-24 py-1 bg-gray-400 rounded-lg font-bold text-white'>UPDATE</button>
                                <button type="button" className='mt-4 ml-2 w-24 py-1 bg-gray-400 rounded-lg font-bold text-white' onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            <table className='table-auto w-full'>
                <thead>
                    <tr className='text-white'>
                        <th className='px-4 py-2 bg-gray-400 rounded-tl-lg'>Image</th>
                        <th className='px-4 py-2 bg-gray-400'>Heading</th>
                        <th className='px-4 py-2 bg-gray-400'>Auther</th>
                        <th className='px-4 py-2 bg-gray-400'>Content</th>
                        <th className='px-4 py-2 bg-gray-400'>Edit</th>
                        <th className='px-4 py-2 bg-gray-400 rounded-tr-lg'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {postsData.map((post, index) => (
                        <tr key={index} className='bg-white border-b border-gray-200'>
                            <td className='px-2 '>
                                <img src={`${post.image}`} className='w-4/5 h-60 rounded-lg' alt={`Post ${index}`} />
                            </td>
                            <td className='px-2 '>{post.heading}</td>
                            <td className='px-2 '>{post.auther}</td>
                            <td className='px-2  w-2/6'>{post.content}</td>
                            <td className='px-2  cursor-pointer'>
                                <Unicons.UilEditAlt width={25} height={25} className="text-green-600 mr-4 hover:text-green-500" onClick={() => handleEditClick(post)} />
                            </td>
                            <td className='px-2 cursor-pointer'>
                                <Unicons.UilTrashAlt width={25} height={25} className="text-red-500 mr-4 hover:text-red-600" onClick={() => handleDelete(post._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

