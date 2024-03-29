import classes from './HomeLayout.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import HomeBlogList from './HomeBlogList';
import Card from '../../components/UI/Card'
import { Link } from 'react-router-dom';

const Homelayout = () => {
  const [userblogs,setUserBlogs] = useState([])
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
  const fetchBlogs = async()=>{

      await axios.get('http://localhost:4000/api/blogs')
      .then((response)=>{
          setUserBlogs(response.data)
          setIsLoading(false)
      })
      .catch(()=>{console.log("Error")})
  }
  fetchBlogs();
},[])

  const blogList = userblogs.map(blog=>
      <HomeBlogList
      user_ID={blog.user}
      ID={blog._id}
      title={blog.title}
      date={blog.date}
      content= {blog.content}
      />
      )
    return (
        <>
        <section className={classes.border}>
          <div className={classes.background}>
            <h1>Welcome To The Hub of Content</h1>
            <div className='d-flex justify-content-center p-2'>  
                <Link to={'/add-blog'}> <button>Add A Blog</button> </Link>
          </div>
          </div>
          {isLoading && <p className={classes.load}>Loading...</p>}
          <Card>
              <ul>
                {blogList}
              </ul>
          </Card>
        </section>
        </>
      );
}

export default Homelayout;
