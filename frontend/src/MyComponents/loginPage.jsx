import React from 'react';
import { fetchApi } from './api';
import { useState,useEffect } from 'react';

export default function LoginPage(){

    const [img,setImg]=useState(null);
    
    useEffect(()=>{
        fetchApi().then(url=>setImg(url));
    },[]);

    return(
        <div className='h-screen w-screen grid place-items-center bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-300'>
            <div className='h-[90%] w-[90%] bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 gap-6 flex'>
                <div className='w-[50%] h-full border border-gray-200 rounded-2xl'>
                    <img 
                        src={img} 
                        alt='new-img'
                        className='h-full w-full object-cover rounded-2xl'
                    />
                </div>
                <div className='w-[50%] border border-gray-200 rounded-2xl bg-gray-300'>

                </div>
            </div>
        </div>
    );
}