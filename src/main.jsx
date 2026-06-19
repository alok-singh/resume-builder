import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/protected-routes';
import store from './features/store.js';
import BuildResumePage from './pages/build-resume';
import DocumentsPage from './pages/documents';
import ForgotPasswordPage from './pages/forgot-password';
import HomePage from './pages/home';
import LoginPage from './pages/login';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            <Route path="/build" element={<BuildResumePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)