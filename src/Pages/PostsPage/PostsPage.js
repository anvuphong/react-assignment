import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchText, setSearchText] = useState('');
    const [sortByTitle, setSortByTitle] = useState('NONE');

    useEffect(() => {
        let isCancel = false;
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts`,
        }).then(response => {
            if (!isCancel) {
                setPosts(response.data);
                setIsLoading(false);
            }
        }).catch((error) => {
            if (!isCancel) {
                setIsLoading(false);
                setError('Something wrong');
            }
        });
        return () => {
            isCancel = true;
        }
    }, []);

    const postFilter = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));
    const getPostsSorted = () => {
        switch (sortByTitle) {
            case 'NONE': return postFilter;
            case 'ASC': return postFilter.sort((post1, post2) => {
                if (post1.title.toLowerCase() < post2.title.toLowerCase()) return -1;
                if (post1.title.toLowerCase() > post2.title.toLowerCase()) return 1;
            })
            case 'DES': return postFilter.sort((post1, post2) => {
                if (post1.title.toLowerCase() > post2.title.toLowerCase()) return -1;
                if (post1.title.toLowerCase() < post2.title.toLowerCase()) return 1;
            })
        }
    }
    const postsSorted = getPostsSorted();

    const handleChangeSortByTitle = () => {
        if (sortByTitle === 'NONE') {
            setSortByTitle('ASC');
            return;
        }
        if (sortByTitle === 'ASC') {
            setSortByTitle('DES');
            return;
        }
        if (sortByTitle === 'DES') {
            setSortByTitle('NONE');
            return;
        }
    }

    if (isLoading) return (
        <div>Loading</div>
    )
    if (error) return (
        <div style={{ color: 'red' }}>{error}</div>
    )

    return (
        <div>
            <input className="search-by-title"
                placeholder="Search by title"
                value={searchText}
                onChange={(evt) => setSearchText(evt.target.value)} />
            <table className="posts-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th onClick={handleChangeSortByTitle}>Title -- Sort ({sortByTitle})</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {postsSorted.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                <Link to={`/posts/${post.id}`}>View Detail</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default PostsPage;