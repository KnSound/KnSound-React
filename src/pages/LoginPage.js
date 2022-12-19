import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/user/userActions'
import { useEffect } from 'react'
import Error from '../components/Error'
import styled from 'styled-components'
import "../styled/login.css"

export const Button = styled.button`
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #5f0c36;
  color: white;
  border-radius: 5px;
  transition: 0.3s background-color ease-out;
  border-radius:  79px;
  transition: all 0.5s;
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
`;

function LoginPage() {
  const { loading, userInfo, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <form autocomplete="off" onSubmit={handleSubmit(submitForm)} >
      {error && <Error>{error}</Error>}
      <h1>  Welcome</h1>

      <div className='form'>
        <input  autocomplete="off"
          type='email'
                className='form-input'
                {...register('email')}
          required
        />
        <label for="text" class="label-name">
          <span class="content-name">
            Email
          </span>
        </label>
      </div>


      <div className='form'>
        <input autocomplete="off"
          type='password'
          {...register('password')}
          required
        />
        <label for="text" class="label-name" >
          <span class="content-name">
            Password
          </span>
        </label>
      </div>

      <Button>
        Login
      </Button>

    </form>
  )
}

export default LoginPage
