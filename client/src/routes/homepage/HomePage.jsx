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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores totam itaque ratione suscipit quam, architecto facere soluta nesciunt aut iste deserunt aliquam doloremque optio, mollitia perspiciatis? Inventore ratione quaerat rem?</p>
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



