import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'
import './EditPost.css'

const EditPost = () => {
    const {id} = useParams()
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault()

        await supabase
        .from('Posts')
        .update({title: post.title, description: post.description, imgURL: post.imgURL})
        .eq('id', id);

        window.location = "/";
    }

    return (
        <div>
            <form onSubmit={updatePost}>
                <input type="text" id="title" name="title" placeholder="Title" value={post.title} onChange={handleChange} required/><br />
                <br />

                <textarea rows="5" cols="50" id="description" name="description" placeholder=" Text Description (optional)" value={post.description} onChange={handleChange}></textarea>
                <br />

                <input type="text" id="imgURL" name="imgURL" placeholder="Image URL (optional)" value={post.imgURL} onChange={handleChange} />
                <br />

                <input type="submit" value="Update Post"/>
            </form>
        </div>
    )
}

export default EditPost