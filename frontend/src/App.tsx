import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallBackPage from "./pages/auth_callback/AuthCallBackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/sso-callback"
         element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} 
        />
        
        <Route element={<MainLayout/>}>
           <Route path="/" element={<HomePage />}/>
           <Route path="/chat" element={<ChatPage />}/>
        </Route>

        <Route path="/auth-callback" element={<AuthCallBackPage />}/>
      </Routes>
    </>
  )
}

export default App;
