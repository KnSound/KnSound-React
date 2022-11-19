import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user)

  if (!userInfo) {
    return <Navigate to="/login" replace={true} />
  }

  return <Outlet />
}

export default ProtectedRoute
