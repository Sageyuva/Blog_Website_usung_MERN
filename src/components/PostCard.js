import { Link } from "react-router-dom";
import "../styles/cardstyle.css"
const PostCard = (props) => {


  const caption = props.caption;
  const heading = props.heading
  const postid = props.Postid

  const trimmedCaption =caption.length > 150
  ? caption.substring(0, 150) + "..."
  : caption;
  

  const trimmedHeading = heading.length > 15 ? heading.substring(0,15)   + "...": heading ;

  return (
    <div className='card-container'>
    
    <p className='user-name'>{props.user}</p>
    <img src="https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2022/06/How_To_Start_A_Blog_-_article_image.jpg" className="w-[100%] object-cover rounded-md h-[150px]" alt="" />
    <p className='text-2xl font-semibold text-[#6636C2]'>{trimmedHeading}</p>
    <p>{trimmedCaption} <Link to={`/post/${postid}`}><button className="text-[#6636C2]">Read More</button></Link></p>
    <div className='flex items-center justify-between'> <p className='px-3 py-1 bg-red-600 rounded-full text-white'>{props.email}</p></div>
    </div>
  )
}
 
export default PostCard