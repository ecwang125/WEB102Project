import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import ReadPosts from './pages/ReadPosts'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import CreatePost from './pages/CreatePost'

function App() {
  const [searchInput, setSearchInput] = useState('')

  return (
    <div className="App">
      <div className="header">
        <h4>Movie Review Hub</h4>
        <input
          className="review-search"
          id="review-search"
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search"
        />
        <div className="headerButtons">
          <Link to="/"><button className="headerBtn">Home</button></Link>
          <Link to="/new"><button className="headerBtn">Create New Post</button></Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<ReadPosts searchInput={searchInput} />} />
        <Route path="/moviereviewhub/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/new" element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default App
