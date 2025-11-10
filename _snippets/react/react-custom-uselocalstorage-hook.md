---
title: 'React Custom useLocalStorage Hook'
language: 'React (JSX)'
description: 'A custom hook to easily persist React state to browser localStorage.'
---

This custom hook combines the power of `useState` with the persistence of `localStorage`. When you use `useLocalStorage`, it will first check if a value already exists in `localStorage` and use that as the initial state. Any time the state changes, it will automatically update `localStorage`.

```jsx
import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
  // Getting from local storage might fail if
  // 1. We're on the server (SSR)
  // 2. The user has localStorage disabled
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : defaultValue;
    return initial;
  } catch (e) {
    return defaultValue;
  }
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // Persist to local storage
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [key, value]);

  return [value, setValue];
};

// --- How to use it: ---
// import { useLocalStorage } from './useLocalStorage';
//
// function MyComponent() {
//   // Behaves just like useState, but 'name' is saved
//   const [name, setName] = useLocalStorage('username', 'Guest');
//
//   return (
//     <input 
//       value={name} 
//       onChange={(e) => setName(e.target.value)} 
//     />
//   );
// }