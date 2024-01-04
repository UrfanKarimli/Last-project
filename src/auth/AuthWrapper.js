import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { RenderRoutes, } from "../components/structure/RenderNavigation";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const BASE_URL = process.env.REACT_APP_BASE_URL

const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const [token, setToken] = useState("")
  const navigate = useNavigate()


  const refreshAccessToken = async (userName) => {
    try {
      const response = await axios.post(`${BASE_URL}/refresh`, token);
      // console.log("response", response.data.data.type)
      if (response.data.data.type) {
        let type = response.data.data.type
        // setUser({ name: userName, isAuthenticated: type });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: error.message,
      });
    }
  };

  useEffect(() => {
    refreshAccessToken();
  }, [token]);


  // let abbb = async () => {
  //   const res = await axios.post("https://tracker.msolution.az/refresh" )
  //   console.log("res", res)
  // }

  // abbb()

  const login = async (userName, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        userName,
        password,
      });

      if (response.status === 200) {
        setUser({ name: userName, isAuthenticated: true });
        // console.log("response", userName)
        setToken(response.data.data.refreshToken)
        refreshAccessToken(userName);
        Swal.fire({
          icon: 'success',
          title: 'Uğurlu Giriş',
          text: 'İstifadəçi uğurla giriş etdi!',
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/hesab");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: 'Giriş zamanı bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
      });
    }
  };

  const logout =  () => {
    try {
       setUser({ ...user, isAuthenticated: false });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: 'Çıxış zamanı bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
      });
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
