import { useSelector } from 'react-redux'
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getUserDetails } from '../redux/user/userActions'

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.user)


  useEffect( () => {
    // dispatch(getUserDetails());
  })

  return (
    <div>
      <figure>{userInfo?.username}</figure>
      <span>
        Welcome <strong>{userInfo?.username}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  )
}

export default ProfilePage
