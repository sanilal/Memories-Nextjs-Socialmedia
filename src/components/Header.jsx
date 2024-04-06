"use client"
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

// import { TiHomeOutline } from "react-icons/ti";
// import { BsCameraReels } from "react-icons/bs";
// import { RiTimeLine } from "react-icons/ri";
// import { IoPersonSharp } from "react-icons/io5";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { useState } from "react";


export default function Header() {
    const {data: session} = useSession();
    const [isOpen, setIsOpen] = useState(false)
   // console.log(session);
  return (
    <div className="sticky top-0 w-full bg-transparent sm:bg-purple-600 py-5 shadow-sm z-30 border-b sm:border-b-0">
        <div className="max-w-[90%] flex mx-auto items-center justify-between">
            {/* logo */}
            <div className="logo flex items-center">
            <Link href='/' className="hidden sm:inline-flex" >
               <Image src="/logo-h-w.svg"
               width={200}
               height={96}
               alt="Memories logo"
               />
            </Link>
            <Link href='/' className="sm:hidden inline-flex w-14 h-auto" >
               <Image src="/icon.svg"
               width={40}
               height={40}
               alt="Memories logo"
               />
            </Link>
            

            </div>

          <div className="flex items-center">
             {/* search */}
             <div className="relative flex items-center w-[250px] mr-3">
                <input type="text" className="rounded-xl pl-2 hover:outline-none focus:outline-none h-10 text-sm w-full max-w-[250px] border border-purple-500 border-opacity-30" placeholder="Search here..."  />
                <IoSearchOutline className="absolute right-2 bg-purple-500 bg-opacity-50 text-white w-[27px] h-[27px] rounded-full p-1" />
            </div>
             {/* menu */}
             {session ? (
                <>
                <IoMdAddCircleOutline className="text-2xl text-white cursor-pointer transform hover:scale-125 transition-transform mr-2 duration-300 hover:text-violet-300" onClick={()=> setIsOpen(true)}/>
                <Image
                src={session.user.image} alt=""
                width={50}
                height={50}
                className="rounded-full border border-lime-100 cursor-pointer"
                onClick={signOut}
                />  
                </>
                
              
             ) : (
                <button className="flex gap-4 ml-auto text-purple-500 sm:text-white  items-center" onClick={signIn}>Login</button>
             )}
               
             
            
          </div>
        </div>
        {isOpen && (
            <Modal isOpen={isOpen} className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md" onReuestClose={()=>setIsOpen(false)}>
                <div>
                    <h1>Modal</h1>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
            </Modal>
        )}
    </div>
  )
}
