 
import React, { createContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase/firebaseConfig";
import api from "../api/api"
import { useNavigate } from "react-router-dom";
 
//step1: create the authcontext
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const navigate = useNavigate(); // ✅ inside component

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
//step2:2.1 for google user profile data
  const toGoogleProfile = (fbUser) => ({
    id: fbUser.uid,
    name: fbUser.displayName || "",
    email: fbUser.email || "",
    provider: fbUser.providerData?.[0]?.providerId || "google",
      photoURL: fbUser.photoURL || "", 
  });
//step2:2.2 for nomal auth profile data
  const toBackendProfile = (backendUser) => ({
    id: backendUser._id || backendUser.id,
    name: backendUser.name || "",
    email: backendUser.email,
    provider: "local",
  });
//step3: Fetching user from your backend
  const fetchBackendUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await api.get("auth/me", {
        headers: { "access-token-key": token },
      });

      return toBackendProfile(res.data.user);
    } catch (err) {
      console.error("Error fetching backend user:", err);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);

    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // Google login
        const profile = toGoogleProfile(fbUser);
        setUser(profile);

        await setDoc(
          doc(db, "users", fbUser.uid),
          { ...profile, lastLoginAt: serverTimestamp() },
          { merge: true }
        );
        setLoading(false);
      } else {
        // Backend login
        const backendUser = await fetchBackendUser();
        setUser(backendUser);
        setLoading(false);
      }
    });

    return unsub;
  }, []);
//step4: google login function
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Google login error:", e);
      alert("Google login failed");
    }
  };
//step5: backend login normal auth
  const loginWithBackend = async (email, password) => {
    try {
      const res = await api.post("auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(toBackendProfile(res.data.user)); // instant update for Profile/Navbar
      return true;
    } catch (err) {
      console.error("Backend login error:", err);
      alert(err.response?.data?.message || "Login failed");
      return false;
    }
  };
//step6: logout clear token
  const logout = async () => {
    localStorage.removeItem("token");
    await signOut(auth).catch(() => {}); // ignore Firebase logout if not Google
    setUser(null);
    navigate("/")
  };

  const value = useMemo(
    () => ({ user, loading, loginWithGoogle, loginWithBackend, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
