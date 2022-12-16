import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './features/ProtectedRoute'
import SettingsPage from "./pages/SettingsPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import {PageContainer} from "./styled/styles";
import AudioPlayer from "./components/player/AudioPlayer";

import './App.css'
import {useSelector} from "react-redux";


function App() {
    const activePlayList = useSelector((state) => state.playlist)

    return (
        <Router>
            <Header/>
            <PageContainer>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path='/user-profile' element={<ProfilePage/>}/>
                    </Route>
                    <Route path='/settings' element={<SettingsPage/>}/>
                    <Route path='/playlists' element={<PlaylistsPage/>}/>
                </Routes>
            </PageContainer>
            {activePlayList?.id && <AudioPlayer/>}
        </Router>
    )
}

export default App
