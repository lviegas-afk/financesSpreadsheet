
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { redirect } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = 'ponele que fuimos a conseguir el token'
    const cookies = new Cookies();
    cookies.set("user-token", token, { path: "/" });
    return redirect("/home");
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        //className="containter flex flex-col w-full p-10 grid grid-cols-3 gap-4 overflow-hidden"
      >
        <label htmlFor='username'>Username:</label>
        <input
          type="text"
          id='username'
          autoComplete='off'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor='password'>Password:</label>
        <input
          type="password"
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </section>
  );
};

export default Login;