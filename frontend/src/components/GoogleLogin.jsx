 import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase";
import React from "react";

export default function GoogleLogin({ onLogin, onLogout, user }) {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        provider: "google",
        lastLogin: new Date(),
      }, { merge: true });

      onLogin({ name: user.displayName, email: user.email });
    } catch (err) {
      alert("Google login failed");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <>
      {!user ? (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </>
  );
}
