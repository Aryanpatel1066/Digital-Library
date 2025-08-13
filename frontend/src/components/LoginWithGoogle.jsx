import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginWithGoogle() {
  const { loginWithGoogle, loading, user, logout } = useContext(AuthContext);

  if (loading) return <button disabled>Loading...</button>;

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
          src={user.photoURL || ""}
          alt={user.name || "User"}
          width={36}
          height={36}
          style={{ borderRadius: "50%" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong>{user.name || "No name"}</strong>
          <small>{user.email}</small>
        </div>
        <button onClick={logout} style={{ marginLeft: 12 }}>Logout</button>
      </div>
    );
  }

  return (
    <button onClick={loginWithGoogle}>
      Continue with Google
    </button>
  );
}
