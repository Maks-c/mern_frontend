import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {checkIsAuth,logout} from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch=useDispatch()
  const activeStyles = {
    color: 'white',
  };

  const logoutHandler=()=>{
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Sign Out')
  }


  return <div className='flex py-4 justify-between items-center'>
    <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>e</span>
    {isAuth && (<ul className='flex gap-8'>
      <li>
        <NavLink
          style={({ isActive }) => isActive ? activeStyles : undefined}
          to={'/'}
          className='text-xs text-gray-400 hover:text-white'
          href='/'>
          Main
        </NavLink>
      </li>
      <li>
        <NavLink style={({ isActive }) => isActive ? activeStyles : undefined} to={'/posts'}
                 className='text-xs text-gray-400 hover:text-white' href='/'>
          My Posts
        </NavLink>
      </li>
      <li>
        <NavLink style={({ isActive }) => isActive ? activeStyles : undefined} to={'/new'}
                 className='text-xs text-gray-400 hover:text-white' href='/'>
          Add post
        </NavLink>
      </li>
    </ul>)}
    {isAuth ? <h2>{}</h2> : ''}
    <div onClick={logoutHandler} className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
      {
        isAuth ? (<button>Sign in</button>) : <Link to={'/login'}>Sign out</Link>
      }
    </div>
  </div>;
};

export default Navbar;
