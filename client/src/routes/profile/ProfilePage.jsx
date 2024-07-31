import { Await, Link, useLoaderData, useNavigate } from "react-router-dom"
import List from "../../components/list/List"
import apiRequest from "../../lib/apiRequest"
import './ProfilePage.scss'
import { Suspense, useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"

function ProfilePage() {
  const data = useLoaderData();
  const {updateUser ,currentUser}= useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(()=>{
    if(!currentUser){
      navigate('/login')
    }
  },[currentUser,navigate])

  const handleLogout= async()=>{
    try {
      await apiRequest.post('/auth/logout')
      localStorage.removeItem('user')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    currentUser && (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Manage your Account</h1>
            <Link to='/profile/update'><button>Update Profile</button></Link>  
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || '/noavatar.jpg'} alt="" />
            </span>
            <span>Username : <b>{currentUser.username}</b></span>
            <span>Email : <b>{currentUser.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="twolists">
            <div className="mylist">
              <div className="wrapperbuttons">
              <h2>My List</h2>
              <Link to='/add'><button>Create New Post</button></Link>
              </div>
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => <List posts = {postResponse.data.userPosts} /> }
                </Await>
              </Suspense>
            </div>         
            
            <div className="mylist">
              <h2>Saved List</h2>
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => <List posts = {postResponse.data.savedPosts} /> }
                </Await>
              </Suspense>
            </div>
          </div>         
        </div>
      </div>
      <div className="upgradeContainer">
        <div className="wrapper"></div>
      </div>
    </div>
    )
  )
}

export default ProfilePage
