---
title: 'Custom useInterval Hook'
language: 'React'
description: 'A custom hook to reliably run a function at a fixed time interval without dealing with stale closures.'
category: 'react'
slug: 'custom-useinterval-hook'
---

The `useInterval` hook ensures that your interval callback function always sees the latest state and props, solving the common "stale closure" problem associated with `setInterval` inside `useEffect`.

```jsx
import { useEffect, useRef } from 'react';

/**
 * Custom hook to manage setInterval logic in a React-friendly way.
 * @param {function} callback - The function to call on each interval tick.
 * @param {number|null} delay - The delay in milliseconds, or null to stop the interval.
 */
export function useInterval(callback, delay) {
  // Use a ref to hold the function and keep it up-to-date
  const savedCallback = useRef(callback); 

  // 1. Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 2. Set up the interval itself.
  useEffect(() => {
    function tick() {
      // Call the function from the ref (which is always the latest)
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      // Clean up the interval when the component unmounts or delay changes
      return () => clearInterval(id); 
    }
  }, [delay]); // Re-run only if the delay changes
}

// --- How to use it: ---
// import { useState } from 'react';
// import { useInterval } from './hooks/useInterval';
//
// function Counter() {
//   const [count, setCount] = useState(0);
//
//   // The logic to run every second:
//   const increment = () => setCount(prevCount => prevCount + 1);
//
//   // 🔑 Call the hook to start the timer
//   useInterval(increment, 1000); 
//
//   return <h1>Count: {count}</h1>;
// }