import styles from "./Home.module.css";

// hooks
import {useNavigate, Link} from "react-router-dom"
import { useState } from "react";

// components
import {useFetchDocuments} from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Home = () => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {documents: posts, loading} = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

     if (query) {
      return navigate(`/search?q=${query}`)
     }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div>
        {loading && <p>Carregando...</p>}
        
        {posts && posts.map((post, i) => <PostDetail key={i} post={post}/>)}

        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrado posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro post</Link>
          </div>
        )}
      </div>

    </div>
  )
}

export default Home