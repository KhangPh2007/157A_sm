import './App.css';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import * as React from "react";

const AuthContext = React.createContext({user: null});
export function useAuth() {
  return React.useContext(AuthContext);
}
function App() {

//   type AuthContextType {
//   user: any;
//   signin: (user: any) => void;
//   signout: () => void;
// }
// For authentication

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (user) => {
    setUser(user)
  }

   let signout = () => {
    setUser(null)
  }


  let value = { user, signin, signout }
  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)

}

function RequireAuth({ children }) {
  let auth = useAuth();
  console.log("auth when check", auth)
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}


  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
