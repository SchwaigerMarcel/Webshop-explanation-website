import React, { useState } from 'react';

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://messerschmiede-schwaiger.at/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token); // Hier wird der Schlüssel gespeichert!
      onLogin();
    } else {
      alert("Zugriff verweigert!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="p-8 bg-neutral-900 border border-amber-600 rounded shadow-2xl">
        <h2 className="text-2xl mb-4 text-amber-500 font-bold">SCHMIEDE LOGIN</h2>
        <input className="block w-full p-2 mb-2 bg-neutral-800 border border-neutral-700" 
               type="text" placeholder="Nutzer" onChange={e => setUser(e.target.value)} />
        <input className="block w-full p-2 mb-4 bg-neutral-800 border border-neutral-700" 
               type="password" placeholder="Passwort" onChange={e => setPass(e.target.value)} />
        <button className="w-full bg-amber-600 p-2 font-bold hover:bg-amber-500 transition-colors">EINLOGGEN</button>
      </form>
    </div>
  );
};