import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client'
import './PostPage.css'

const PostPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [count, setCount] = useState(0)

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('Comments')
            .select('*')
            .eq('post_id', id)
            .order('created_at', { ascending: true })

        setComments(data || [])
    }

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single()

            if (data) {
                setPost(data)
                setCount(data.upvoteCount ?? 0)
            }
        }

        fetchPost()
        fetchComments()
    }, [id])

    if (!post) {
        return <h2>Loading post...</h2>
    }

    const deletePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id)

        window.location = "/"
    }

    const addComment = async (event) => {
        event.preventDefault()

        const trimmedComment = comment.trim()
        if (!trimmedComment) return

        const { data, error } = await supabase
            .from('Comments')
            .insert({ post_id: id, text: trimmedComment })
            .select() // needed to get more than one
        
        if (error) {
            console.error('Error adding comment:', error)
            return
        }

        if (data && data.length > 0) {
            setComments((prev) => [...prev, ...data])
        }

        setComment('')
    }

    const formatPostTime = (timestamp) => {
        if (!timestamp) return 'Unknown time'

        const date = new Date(timestamp)

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date)
    }

    const updateCount = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        await supabase
        .from('Posts')
        .update({ upvoteCount: count+1 })
        .eq('id', id)

        setCount((count) => count + 1)
    }

    return (
        <div>
            <h6>{`Posted on ${formatPostTime(post.created_at)}`}</h6>
            <h3>{post.title}</h3>
            {post.description ? <p>{post.description}</p> : null}
            {post.imgURL ? <img src={post.imgURL} width="200px" alt={"Image attached by user " + post.id} /> : null}
            <br />
            <div className="postActions">
                <button className="likeButton" onClick={updateCount}>{count < 2 ? (count + " upvote") : (count + " upvotes")}</button>
                <div className="EditPostBtn">
                    <Link to={'/edit/' + id}><button type="button">Edit</button></Link>
                    <button className="deleteButton" onClick={deletePost}>Delete</button>
                </div>
            </div>
            <br />

            <h6>Comments:</h6>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <p key={comment.id}>{"> " + comment.text}</p>
                ))
            ) : (
                <p>{"Be the first to comment!"}</p>
            )}

            <form onSubmit={addComment}>
                <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Add a comment"
                /><br />
                <br />
                <button type="submit">Post Comment</button>
            </form>
        </div>
    )
}

export default PostPage