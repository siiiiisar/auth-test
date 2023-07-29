import './App.css';
import { SignUp } from './pages/SignUpPage';
import { SignIn } from './pages/SignInPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import { Home } from './pages/Home';
import { CommonLayout } from './components/Common/CommonLayout';

export const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <BrowserRouter>
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp/>}/>     
            <Route path="/signin" element={<SignIn/>}/>     
            <Route path="/" element={<Home/>}/>                             
          </Routes>        
        </CommonLayout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
