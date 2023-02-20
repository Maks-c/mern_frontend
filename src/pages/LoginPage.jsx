import React, {  useState } from 'react';
import { Link} from 'react-router-dom';
import { loginUser} from '../redux/features/auth/authSlice';
import { useDispatch} from 'react-redux';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();



  const handleChange = ({ target: { name, value } }) => {
    switch (name){
      case 'password':
        setPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = () => {
    try{
      dispatch(loginUser({ password, email }));
      setEmail('')
      setPassword('')
    } catch (e){
      console.log(e);
    }
  };


  return (<form onSubmit={e => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
    <h1 className='text-lg text-white text-center'>Authorization</h1>
    <label className='text-xs text-gray-400'>
      Email:
      <input
        name='email'
        value={email}
        onChange={handleChange}
        type='email'
        placeholder='Email'
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
    </label>
    <label className='text-xs text-gray-400'>
      Password:
      <input
        value={password}
        name='password'
        onChange={handleChange}
        type='password'
        placeholder='Password'
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
    </label>
    <div className='flex gap-8 justify-center mt-4'>
      <button onClick={handleSubmit} type='submit'
              className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'>
        Sign in
      </button>
      <Link to='/register' className='flex justify-center items-center text-xs text-white'>
        Not account?
      </Link>
    </div>
  </form>);
};

export default LoginPage;
