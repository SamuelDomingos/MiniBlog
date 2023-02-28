import style from "./EditPost.module.css"

import { useEffect, useState } from "react"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {useAuthValue} from "../../context/AuthContext"
import {useUpdateDocument} from "../../hooks/useUpdateDocument"

const EditPost = () => {
  
  const {id} = useParams();

  const location = useLocation();

  const post = location.state?.data;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {

    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")

      setTags(textTags);
    }

  }, [post])

  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A image precisa ser uma URL")
    }

    //criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName 
    };

    updateDocument(id, data);

    //redirect to home page
    navigate("/dashboard");
  }

  return (
    <div className={style.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Atere os dados do post como voce desejar!</p>
          <form onSubmit={handleSubmit}>

          <label htmlFor="">
            <span>Título</span>
            <input 
              type="text"
              name="title"
              required 
              placeholder="Pense num bom titulo..."
              onChange={(e) => setTitle(e.target.value)}
              value={title} />
          </label>

          <label htmlFor="">
            <span>URL da imagem:</span>
            <input 
              type="text"
              name="image"
              required 
              placeholder="Pense num image que representa seu post..."
              onChange={(e) => setImage(e.target.value)}
              value={image} />
          </label>

          <p className={style.preview_title}>Preview da image atual:</p>
          <img className={style.img_preview} src={post.image} alt={post.title} />

          <label htmlFor="">
            <span>Conteudo:</span>
            <textarea 
            name="body" 
            required
            placeholder="Insira o conteudo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}></textarea>
          </label>

          <label htmlFor="">
            <span>Tags:</span>
            <input 
              type="text"
              name="tags"
              required 
              placeholder="Insira as tags separadas por virgula..."
              onChange={(e) => setTags(e.target.value)}
              value={tags} />
          </label>

          {!response.loading && <button className="btn">Editar</button>}
          {response.loading && (<button disabled className="btn">Aguarde...</button>)}
          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}

        </form>
        </>
      )}
    </div>
  )
}

export default EditPost