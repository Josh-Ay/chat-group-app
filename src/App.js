import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import PeerCallPage from './features/Calling/pages/PeerCallPage';
import GroupCallPage from './features/Calling/pages/GroupCallPage';
import { socket } from './features/Calling/utils/socketInstance';
import { useStreamContext } from './contexts/StreamContext';
import { STREAM_REDUCER_ACTIONS } from './reducers/StreamReducer';

function App() {
  
  const { dispatchToStreamState } = useStreamContext()
  
  useEffect(() => {

    socket.on("connect", () => {
      dispatchToStreamState({ type:  STREAM_REDUCER_ACTIONS.UPDATE_SOCKET_ID, payload: { value: socket.id }});
    })

  }, [])

  return <Routes>
    <Route path='/' element={<MainPage />} />
    <Route path='/profile/:id' element={<ProfilePage />} />
    <Route path='/settings' element={<SettingsPage />} />
    <Route path='/peer-call' element={<PeerCallPage />} />
    <Route path='/group-call' element={<GroupCallPage />} />
    <Route path='*' element={<PageNotFound />} />
  </Routes>
}

export default App;
