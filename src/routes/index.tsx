import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import CountrySelect from '../pages/CountrySelect';
import Home from '../pages/Home';
import Reports from '../pages/Reports';
import Chat from '../pages/Chat';
import Support from '../pages/Support';
import Settings from '../pages/Settings';
import PrivateRoute from '../components/PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/select-country" element={
        <PrivateRoute>
          <CountrySelect />
        </PrivateRoute>
      } />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/reports" element={
        <PrivateRoute>
          <Reports />
        </PrivateRoute>
      } />
      <Route path="/chat" element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      } />
      <Route path="/support" element={
        <PrivateRoute>
          <Support />
        </PrivateRoute>
      } />
      <Route path="/settings" element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      } />
    </Routes>
  );
}