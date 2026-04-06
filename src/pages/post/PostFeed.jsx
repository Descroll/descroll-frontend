import React, { Component, useState, useEffect } from 'react' 

function FeedContent() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => { 
    if (!hasMore) return; 

    fetch(`http://localhost:5000/feed?page=${page}&limit=5`) 
    .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false) 
        } else {
          setPosts((prev) => [...prev, ...data])
        }
      })
      .catch(err => console.error(err))

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        if (hasMore) setPage(p => p + 1)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, hasMore])

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <PostForm />
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default class Feed extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      console.log('Checking for new posts...')
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <FeedContent />
  }
}