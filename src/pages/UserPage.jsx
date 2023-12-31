import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { API } from '../api'
import { Link } from 'react-router-dom'

const UserPage = () => {
    const [posts, setPosts] = useState([]);
    const [todos, setTodos] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [isPostsVisible, setIsPostsVisible] = useState(false);
    const [isTodosVisible, setIsTodosVisible] = useState(false);
    
    let url; 
    const userParam = searchParams.get('user');

    useEffect(() => {
        const getUser = async () => {
            const response = await API.get(`/users/${id}`);
            setUser(response.data);
        }    
        getUser();
      }, [id]);

    useEffect(() => {
        userParam ? url = `/posts/user/${userParam}` : url = '/posts/user/' + id;
        const getPosts = async () => {
            const response = await API.get(url);
            setPosts(response.data.posts)    
        }
        getPosts()         
    }, [id, searchParams])

    useEffect(() => {
        userParam ? url = `/todos/user/${userParam}` : url = '/todos/user/' + id;
        const getTodos = async () => {
                const response = await API.get(url);
                setTodos(response.data.todos)
        }   
       getTodos()         
    }, [id, searchParams])

  
    const togglePostsVisibility = () => {
        setIsPostsVisible(!isPostsVisible);
        setIsTodosVisible(false);
        setSearchParams({ user: id });
      };

    const toggleTodosVisibility = () => {
        setIsTodosVisible(!isTodosVisible);
        setIsPostsVisible(false);   
        setSearchParams({ user: id });
    };

  return (
    <div> 
        <div className='container-forOnePost'>
            <strong>{user.firstName} {user.lastName}</strong> 
            <span className='onePost-text'>Age: {user.age}</span> 
            <div className='container-forBtnUser'>
                <button style={{marginRight: '10px'}} onClick={togglePostsVisibility}>
                    Posts
                </button> 
                <button onClick={toggleTodosVisibility} >Todo list</button>
            </div> 
                <ul className={`list ${isPostsVisible ? '' : 'hidden'}`}>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <p className='content'>
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            </p>                              
                        </li>
                    ))}
                </ul>
                <ul className={`list ${isTodosVisible ? '' : 'hidden'}`}>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <p className='content'>
                                {todo.todo}
                            </p>                              
                        </li>
                    ))}
                </ul>
        </div>       
    </div>
  )
}

export default UserPage