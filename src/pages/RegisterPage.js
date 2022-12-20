import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import { registerUser } from '../redux/user/userActions'
import message from "../redux/user/userActions";
import styled from 'styled-components'
import { Button } from './LoginPage'

const RegisterPage = () => {
  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch');
      return
    }




    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));

  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
<div class ='register'>

  <h1 class= "welcome"> Registration</h1> 

        <div className='form'>
        <input
            type='text'
            className='form-input'
            {...register('username')}
            required
          />
          <label htmlFor='username' class="label-name" >
            <span class="content-name">
                First Name
                </span></label>

         
        </div>

        <div className='form'>
        <input
            type='email'
            className='form-input'
            {...register('email')}
            required
          />
          <label htmlFor='email' class="label-name" >
            <span class="content-name">
                Email
                </span>
          </label>
          
        </div>
        
        <div className='form'>
        <input
            type='password'
            className='form-input'
            {...register('password')}
            required
          />
          <label htmlFor='password' class="label-name" >
            <span class="content-name">
                Password
                </span></label>
          
        </div>

        <div className='form'>
        <input
            type='password'
            className='form-input'
            {...register('confirmPassword')}
            required
          />
          <label htmlFor='email' class="label-name" ><span class="content-name">
                Confirm Password
                </span></label>
         
        </div>

        <Button type='submit' className='button' disabled={loading}>
          Register
        </Button>

      </div>



    </form>

  )
}

export default RegisterPage
