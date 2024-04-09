import { HiOutlineDotsVertical } from "react-icons/hi"
import LikeSection from "./LikeSection"
import CommentSection from "./CommentSection"
export default function Post({post}) {
  return (
    <div className="bg-white my-7 border rounded-md">
        <div className="flex items-center p-5 border-5 border-gray-100">
            <img src={post.profileImg} alt={post.usernsme} className="h-12 rounded-full object-cover border p-1 mr-3" />
            <p className="flex-1 font-bold">{post.usernsme}</p>
            <HiOutlineDotsVertical className="h-5 cursor-pointer" />
        </div>
            <img src={post.image} alt={post.caption} className="object-cover w-full" />
           <LikeSection id={post.id} />
            <p className="p-5 truncate lex flex-col"><span className="flex font-bold">{post.usernsme}</span>
            {post.caption}</p>
        
        <CommentSection id={post.id} />
        
    </div>
  )
}
