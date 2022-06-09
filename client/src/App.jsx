import React, {useState} from 'react';
import Login from './pages/Login';
import Index from './pages/Index'
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserContext from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const [value, setValue] = useState(null);

  return (
    <Router>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <UserContext.Provider value={{value, setValue}}>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/" exact element={<Index />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </Router>

  );
}

export default App;
