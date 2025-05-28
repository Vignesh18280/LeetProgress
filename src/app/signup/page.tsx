"use client"
import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import httpAxios from '../utils/httpAxios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
const Page = () => {
  const router = useRouter();
  const [data, setData] = useState({  
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    profileUrl:"https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
  })

  const doSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // console.log(data);
      const result = await httpAxios.post("/api/users", data).then((response) => response.data)
      // console.log(result);

      if(result.success){
        router.push('/login');
        toast.success(result.message);

      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || err.message || "Signup failed");
    }
  }
  return (
    <div>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <div className='w-[600px] border p-4 rounded-[5px] border-gray-200 my-10 flex flex-col'>
          <h1 className='flex justify-center items-center font-bold text-2xl mb-5'>Sign Up</h1>
          <div className='my-2 flex flex-col gap-2 text-l '>
            <label className="font-bold">Full Name:</label>
            <input type="text" placeholder='Enter your Name' className='border border-black p-2 rounded-[5px]' name="name" onChange={(e) => setData({...data, name:e.target.value})} />
          </div>
          <div className='my-2 flex flex-col gap-2 text-l '>
            <label className="font-bold">Email:</label>
            <input type="email" placeholder='Enter your email' className='border border-black p-2 rounded-[5px]' name="email" onChange={(e) => setData({...data, email:e.target.value})} />
          </div>
          <div className='my-2 flex flex-col gap-2 text-l'>
            <label className="font-bold">Password:</label>
            <input type="password" placeholder='Enter your password' className='border border-black p-2 rounded-[5px]' name="password" onChange={(e) => setData({...data, password:e.target.value})} />
          </div>
          <div className='my-2 flex flex-col gap-2 text-l'>
            <label className="font-bold">Confirm Password:</label>
            <input type="password" placeholder='Enter to confirm password' className='border border-black p-2 rounded-[5px]' name="confirmPassword" onChange={(e) => setData({...data, confirmPassword:e.target.value})} />
          </div>
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/secret" });
            }}
            className="cursor-pointer px-4 py-2 bg-gray-200  rounded-md hover:bg-gray-300 transition-all mt-3 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"/></svg>
            Sign up with Google
          </button>
          <button className="cursor-pointer border px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-all mt-3" onClick={doSignUp}>Sign up</button>
          <span className='text-sm text-l mt-3'>Already have an account? <a className="text-blue-600 " href="/login">Login</a></span>
        </div>
       
      </div>
    </div>
  )
}

export default Page