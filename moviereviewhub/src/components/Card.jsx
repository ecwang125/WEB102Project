import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import './Card.css'

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

const Card = (props) => {
    const navigate = useNavigate()
    const [count, setCount] = useState(props.upvoteCount)

    const updateCount = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        await supabase
        .from('Posts')
        .update({ upvoteCount: count+1 })
        .eq('id', props.id)

        setCount((count) => count + 1)
    }

    return (
        <div className="Card" onClick={() => navigate(`/moviereviewhub/${props.id}`)} style={{ cursor: 'pointer' }}>
            <p>{`Posted on ${formatPostTime(props.created_at)}`}</p>
            <h4 className="title">{props.title}</h4>
            <button className="likeButtonCard" onClick={updateCount}>{count < 2 ? (count + " upvote") : (count + " upvotes")}</button>
        </div>
    )
}

export default Card
