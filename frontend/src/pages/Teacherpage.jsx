import React from 'react'
import Sidebar from '../components/sidebar'
import { Outlet } from 'react-router-dom'

function Teacherpage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Outlet/>

    </div>
  )
}

export default Teacherpage