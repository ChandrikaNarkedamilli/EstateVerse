import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';

function Register() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/register', {
        username,
        email,
        password,
      });
      // console.log(res)
      navigate('/login')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <a>Do you have an account?</a>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;