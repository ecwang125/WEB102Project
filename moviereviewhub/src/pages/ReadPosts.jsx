import { useEffect, useState } from 'react'
import { supabase } from '../client'
import Card from '../components/Card'

const ReadPosts = ({ searchInput = '' }) => {
    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState('newest')

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select()

            setPosts(data || [])
        }

        fetchPosts()
    }, [])

    const query = searchInput.trim().toLowerCase()

    const sortedPosts = [...posts]
        .filter((post) => {
            if (!query) return true

            const titleText = (post.title || '').toLowerCase()
            const descriptionText = (post.description || '').toLowerCase()

            return titleText.includes(query) || descriptionText.includes(query)
        })
        .sort((a, b) => {
            if (sortBy === 'popular') {
                return (b.upvoteCount || 0) - (a.upvoteCount || 0)
            }

            return new Date(b.created_at) - new Date(a.created_at)
        })

    return (
        <div className="ReadPosts">
            <div className="Ordering">
                <p>Order by: </p>
                <button onClick={() => setSortBy('newest')}>Newest</button>
                <button onClick={() => setSortBy('popular')}>Most Popular</button>
            </div>
            {sortedPosts.length > 0 ? (
                sortedPosts.map((post) => (
                    <Card
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        description={post.description}
                        imgURL={post.imgURL}
                        created_at={post.created_at}
                        upvoteCount={post.upvoteCount}
                    />
                ))
            ) : (
                <h3>{query ? 'No matching posts found.' : 'Be the first to post!'}</h3>
            )}
        </div>
    )
}

export default ReadPosts