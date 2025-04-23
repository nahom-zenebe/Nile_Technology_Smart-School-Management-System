import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import {  useSelector } from "react-redux";
import image from "../images/user.png";
import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
function TopNavbar() {
  




  return (
   
    <div className=' bg-base-100 '>
      <nav className='bg-gray-100 shadow-md w-full h-16 flex items-center justify-between px-6'>
    
        <h1 className='text-xl font-semibold text-gray-800'>Welcome,Semera</h1>

        <div className='flex items-center space-x-4'>

          <div className='flex items-center space-x-4'>
          <IoMdNotificationsOutline  className='text-2xl font-bold'/>
       <Link to=''>  
       <img
                className="border-4  border-blue-500 h-10 w-10 rounded-full object-cover shadow-lg"
                src={ image}
                alt="Profile"
              /></Link> 
            <div className='text-left'>
              <h1 className='text-gray-800 font-medium'>Semera abebe</h1>
              <p className='text-gray-500 text-sm'>Teacher</p>
        
            </div>
            <RiArrowDropDownLine className='text-2xl font-bold'/>
          </div>
        
         
        </div>
      </nav>
      <hr className='border-gray-200' />
    </div>

  );
}

export default TopNavbar;