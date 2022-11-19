import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getUserDetails, userLogout } from "../features/user/userActions";
import { logout } from '../features/user/userSlice'
import '../styles/header.css'

const Header = () => {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // automatically authenticate user if token is found
  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserDetails())
    }
  }, [])

  return (
    <header>
      <div className='header-status'>
        <span>
          { userInfo ? `Logged in as ${userInfo.email}` : "You're not logged in"}
        </span>
        <div className='cta'>
          {userInfo ? (
            <button className='button' onClick={() => dispatch(userLogout())}>
              Logout
            </button>
          ) : (
            <NavLink className='button' to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className='container navigation'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/user-profile'>Profile</NavLink>
      </nav>
    </header>
  )
}

export default Header
