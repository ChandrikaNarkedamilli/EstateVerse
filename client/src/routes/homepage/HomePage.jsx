import { useContext } from 'react'
import SearchBar from '../../components/searchbar/SearchBar'
import './HomePage.scss'
import { AuthContext } from '../../context/AuthContext'


function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='homePage' >
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>Find Your Space in the EstateVerse & Unlock the Door to Your New Future</h1>
          <p>Welcome to EstateVerse, where dreams meet reality. Discover the perfect property tailored to your unique needs and lifestyle. Join us on this journey and unlock endless possibilities for your future.</p>
          <SearchBar />
          <div className="boxes">
            <div className='box'>
              <h1>18+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className='box'>
              <h1>200</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className='box'>
              <h1>1400+</h1>
              <h2>Properties Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src='/bg.png' alt='' />
      </div>

    </div>
  )
}

export default HomePage



