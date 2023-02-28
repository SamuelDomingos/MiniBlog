import style from "./Dashboard.module.css"

import {Link} from 'react-router-dom';

//hooks
import {useAuthValue} from "../../context/AuthContext"
import {useFetchDocuments} from "../../hooks/useFetchDocuments"
import {useDeleteDocument} from "../../hooks/useDeleteDocument";

const Dashboard = () => {

  const {user} = useAuthValue();
  const uid = user.uid

  // posts do usuario
  const {documents:posts, loading} = useFetchDocuments("posts", null, uid);

  const {deleteDocument} = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={style.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={style.noposts}>
          <p>Não foram encontrando posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>

        <div className={style.post_header}>
          <span>Título</span>
          <span>Ações</span>
        </div>

        {posts && posts.map((post) => 
          <div key={post.id} className={style.post_row}>
            <p>{post.title}</p>
            <div>
              <Link state={{ data: post }} className="btn btn-outline" to={`/posts/${post.id}`}>Ver</Link>

              <Link state={{ data: post }} className="btn btn-outline" to={`/posts/edit/${post.id}`}>Editar</Link>

              <button className="btn btn-outline btn-danger" onClick={() => deleteDocument(post.id)}>Excluir</button>

            </div>
          </div>
        )}
        </>
      )}

    </div>
  )
}

export default Dashboard