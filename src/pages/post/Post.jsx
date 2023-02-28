import style from "./Post.module.css"

//hooks
import {useLocation, useParams} from "react-router-dom";

const Post = () => {
    const {id} = useParams();

    const location = useLocation();

    const post = location.state?.data;

  return (
    <div className={style.post_container}>
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} />
        <p>{post.body}</p>
        <h3>Este post trata sobre:</h3>
        <div className={style.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}>
                    <span>#</span>
                    {tag}
                </p>
            ))}
        </div>
    </div>
  )
}

export default Post