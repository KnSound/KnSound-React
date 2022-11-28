import { useSelector } from 'react-redux'
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getUserDetails } from '../redux/user/userActions'

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getUserDetails());
  }, [])

  return (
    <div>
      <h2>{userInfo?.username}</h2>
      <p>
        Welcome <strong>{userInfo?.username}!</strong> You can view this page
        because you're logged in
      </p>
    </div>
  )
}

export default ProfilePage
