import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    const postId = useParams().postId;
    const [post, setPost] = useState({
        title: null,
        body: null
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCancel = false;
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`
        }).then(respone => {
            if (!isCancel) {
                console.log(respone);
                setPost({
                    title: respone.data.title,
                    body: respone.data.body
                });
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

    if (isLoading) return (
        <div>Loading</div>
    )
    if (error) return (
        <div style={{ color: 'red' }}>{error}</div>
    )

    return (
        <div>
            <p>ID: {postId}</p>
            <p>Title: {post.title}</p>
            <p>body: {post.body}</p>
        </div>
    )
}
export default DetailPage;