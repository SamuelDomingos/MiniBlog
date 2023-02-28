import style from "./Search.module.css"

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import {useQuery} from "../../hooks/useQuery"

import PostDetail from "../../components/PostDetail"
import { Link } from "react-router-dom"

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const {documents: posts} = useFetchDocuments("posts", search);

  return (
    <div className={style.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={style.nopost}>
          <p>Não foram encontrados posts a partir da sua busca...</p>
          <Link to="/" className="btn btn-dark">Voltar</Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetail post={post} key={post.id}/>
        ))}
      </div>
    </div>
  )
}

export default Search