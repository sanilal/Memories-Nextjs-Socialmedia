"use client"
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
// import { TiHomeOutline } from "react-icons/ti";
// import { BsCameraReels } from "react-icons/bs";
// import { RiTimeLine } from "react-icons/ri";
// import { IoPersonSharp } from "react-icons/io5";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { useEffect, useRef, useState } from "react";
import { app } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {addDoc, collection, getFirestore, serverTimestamp} from 'firebase/firestore'


export default function Header() {
    const {data: session} = useSession();
    console.log(session);
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const [postUploading, setPostUploading] = useState(false)
    const [caption, setCaption] = useState('')
    const filePickerRef = useRef(null)
    const db = getFirestore(app)
    function addImageToPost(e) {
        const file = e.target.files[0]
        if(file){
            setSelectedFile(file)
            setImageFileUrl(URL.createObjectURL(file))
          //  console.log(imageFileUrl);
        }
    }
    useEffect(()=>{
        if(selectedFile) {
            uploadImageToStorage()
        }
    },[selectedFile])

    async function uploadImageToStorage(){
        setImageFileUploading(true)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + '_' + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('upload is' + progress + '% done');
            }, 
            (error) => {
                console.error(error);
                setImageFileUploading(false);
                setImageFileUrl(null);
                setSelectedFile(null)
            }, 
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then
                ((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                    setImageFileUploading(false)
                })
            }
        )

    }
    async function handleSubmit(){
        setPostUploading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            usernsme: session.user.username,
            caption,
            profileImg: session.user,image,
            image: imageFileUrl,
            timestamp: serverTimestamp()
        });
        setPostUploading(false);
        setIsOpen(false);
    }
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
                <input 
                    type="text" 
                    className="rounded-xl pl-2 hover:outline-none focus:outline-none h-10 text-sm w-full max-w-[250px] border border-purple-500 border-opacity-30" 
                    placeholder="Search here..."
                    onChange={(e)=>setCaption(e.target.value)}
                />
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
                <button 
                    className="flex gap-4 ml-auto text-purple-500 sm:text-white  items-center" 
                    onClick={signIn}
                >
                        Login</button>
             )}
               
             
            
          </div>
        </div>
        {isOpen && (
            <Modal 
            isOpen={isOpen} 
            className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md" 
            onRequestClose={()=>setIsOpen(false)}
            ariaHideApp={false}
            >
                <div className="flex flex-col items-center justify-center h-[100%]">
                    {selectedFile ? (
                        <img 
                        src={imageFileUrl} 
                        alt="Selected file" 
                        className={`w-full max-h-[250px] object-cover cursor-pointer ${imageFileUploading ? 'animate-pulse' : ''}`} 
                        onClick={()=>setSelectedFile(null)} />
                    ) : (
                        <HiCamera className="text-5xl text-gray-500 cursor-pointer hover:text-purple-500" onClick={()=>filePickerRef.current.click()} />
                    )}
                   
                   <input type="file" accept="image/*" onChange={addImageToPost} className="hidden" ref={filePickerRef} />
                </div>
                <input 
                    type="text "
                    placeholder="Please enter your caption..."
                    className="m-4 border-none text-center w-full focus:ring-0 outline-none"
                    />
                    <button 
                        onClick={handleSubmit} 
                        disabled = {
                            !selectedFile || caption.trim() === '' || postUploading || imageFileUploading
                        }
                        className="w-full bg-purple-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                    >
                        Upload Post
                    </button>
                    <AiOutlineClose 
                        className="cursor-pointer absolute top-2 right-2 hover:text-purple-600 transition duration-300" 
                        onClick={()=>setIsOpen(false)} />
            </Modal>
        )}
    </div>
  )
}
