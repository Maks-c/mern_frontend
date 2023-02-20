import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { registerUser } from '../redux/features/auth/authSlice';


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');


  const dispatch = useDispatch();



  const handleChange = ({ target: { name, value } }) => {
    switch (name){
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstname':
        setFirstname(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'username':
        setUsername(value);
        break;
      default:
        return;
    }
  };


  const handleSubmit = () => {
    try{

      dispatch(registerUser({ email, password, username, firstname, lastname }));
      setEmail('');
      setFirstname('');
      setUsername('');
      setLastname('');
      setPassword('');
    } catch (e){
      console.log(e);
    }


  };


  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40' autoComplete='off'>
      <h1 className='text-lg text-white text-center'>Registration</h1>
      <label className='text-xs text-gray-400'>
        Username:
        <input
          name='username'
          type='text'
          value={username}
          onChange={handleChange}
          placeholder='Username'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-xs text-gray-400'>
        Firstname:
        <input
          name='firstname'
          type='text'
          value={firstname}
          onChange={handleChange}
          placeholder='Firstname'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-xs text-gray-400'>
        Lastname:
        <input
          type='text'
          name='lastname'
          value={lastname}
          onChange={handleChange}
          placeholder='Lastname'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-xs text-gray-400'>
        Email:
        <input
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          placeholder='Email'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-xs text-gray-400'>
        Password:
        <input
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>
      <div className='flex gap-8 justify-center mt-4'>
        <button type='submit'
                variant='contained'
                onClick={handleSubmit}
                className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'>
          Confirm
        </button>
        <Link to='/login' className='flex justify-center items-center text-xs text-white'>
          Have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
