import { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/login', {
        username,
        password,
      });
      console.log('Login Response:', res.data);
      updateUser(res.data)

      navigate('/')
    } catch (error) {
      console.log(error)
      // setError(error.response.data.message);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          console.error('Network error: The request was made but no response was received');
          setError('Network error: Please check your connection or the server status.');
        } else {
          console.error('Error:', error.message);
          setError('Unexpected error: ' + error.message);
        }
      } else {
        setError('Unexpected error: ' + error.message);
      }
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" required minLength={4} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} have an account?, register now!</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login
