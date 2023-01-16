import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import PeerCallPage from './features/Calling/pages/PeerCallPage';
import GroupCallPage from './features/Calling/pages/GroupCallPage';
import useListenForIncomingCalls from './hooks/useListenForIncomingCalls';
import useConnectToSocketIoServer from './hooks/useConnectToSocketIoServer';
import useListenForPeerMediaChange from './hooks/useListenForPeerMediaChange';

function App() {
  
  useConnectToSocketIoServer();
  useListenForIncomingCalls();
  useListenForPeerMediaChange();

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
