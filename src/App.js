import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './features/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      
      <main className='container content'>
        
      <div class="background">
       <div class="cube"></div>
       <div class="cube"></div>
       <div class="cube"></div>
       <div class="cube"></div>
      <div class="cube"></div>
    </div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/user-profile' element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>

    </Router>
  )
}

export default App
