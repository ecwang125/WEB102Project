import { useState } from 'react'
import { supabase } from '../client'
import './CreatePost.css'

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", description: "", imgURL: "" })

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault()

        await supabase
        .from('Posts')
        .insert({title: post.title, description: post.description, imgURL: post.imgURL})
        .select();

        window.location="/";
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <br/>
                <input type="text" id="title" name="title" placeholder="Title" value={post.title} onChange={handleChange} required/><br />
                <br />

                <textarea rows="5" cols="50" id="description" name="description" placeholder=" Text Description (optional)" value={post.description} onChange={handleChange}></textarea>
                <br />

                <input type="text" id="imgURL" name="imgURL" placeholder="Image URL (optional)" value={post.imgURL} onChange={handleChange} />
                <br />
                <input type="submit" value="Create Post" />
            </form>
        </div>
    )
}

export default CreatePost