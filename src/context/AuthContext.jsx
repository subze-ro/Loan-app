import { createContext, useState, useContext, useEffect } from "react";

//create context
export const AuthContext = createContext();
//give provider
export const AuthProvider = ({ children }) => {
  // data-> user, our functions login, logout, signup

  const [user, setUser] = useState(null);

  //check if the user is logged in (persistent session)
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //Register user
  const signup = (username, email, password) => {
    if (!username || !email || !password) return alert("Fill all fields");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.username === username)) {
      return alert("User already exists");
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful. Now login.");

    return true;
  };

  //Login user

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      return true;
    } else {
      alert("Invalid credentials");
    }
  };

  //Logout User

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
