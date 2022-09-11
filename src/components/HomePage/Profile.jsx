import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useSelector } from 'react-redux';

const Profile = ({ handleBack }) => {
 const { auth } = useSelector((store) => store);
  return (
    <div className=' w-full h-full'>
    
    <div className=" flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
              <BsArrowLeft onClick={handleBack} className='cursor-pointer text-2xl font-bold'/>
              <p className='text-xl font-semibold'>Profile</p>
    </div>
    
    <div className='flex flex-col justify-center items-center my-12'>
     <img className='rounded-full w-[15vw] h-[15vw]' src={auth.reqUser.profilePic} alt="" />
    </div>

    <div className='bg-white px-3 '>
     <p className='py-3'>Your Name</p>
     <p className='py-3'>{ auth.reqUser?.username}</p>

    </div>

    <div className='px-3 my-5'>
     <p className='py-10'>this is not your username, this name will be visible to your whatapp contects.</p>

    </div>
    </div>
  )
}

export default Profile
