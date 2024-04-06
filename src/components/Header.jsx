import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { BsCameraReels } from "react-icons/bs";
import { RiTimeLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";






export default function Header() {
  return (
    <div className="sticky top-0 w-full bg-transparent sm:bg-purple-500 py-5 shadow-sm z-30 border-b sm:border-b-0">
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
             {/* menu */}
             {/* <div className="flex gap-4 ml-10 sm:text-white text-purple-500 mr-3">
                <Link href='/'>
                <TiHomeOutline className="text-2xl" />
                </Link>
                <Link href='/reels'>
                <BsCameraReels className="text-2xl" />
                </Link>
                <Link href='/wall'>
                <RiTimeLine className="text-2xl" />
                </Link>
            </div> */}

            </div>

          <div className="flex items-center">
             {/* search */}
             <div className="relative flex items-center w-[250px] mr-3">
                <input type="text" className="rounded-xl pl-2 hover:outline-none focus:outline-none h-10 text-sm w-full max-w-[250px] border border-purple-500 border-opacity-30" placeholder="Search here..."  />
                <IoSearchOutline className="absolute right-2 bg-purple-500 bg-opacity-50 text-white w-[27px] h-[27px] rounded-full p-1" />
            </div>
             {/* menu */}
               <button className="flex gap-4 ml-auto text-purple-500 sm:text-white  items-center">Login</button>
             
            
          </div>

            



        </div>
    </div>
  )
}
