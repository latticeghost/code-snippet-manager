---
title: 'Throttle Function'
language: 'JavaScript'
description: 'A higher-order function that limits the rate at which another function can execute.'
category: 'javascript'
slug: 'throttle-function'
---

Throttling ensures that a function is executed at most once per a defined time window. This is perfect for continuous events like scrolling, mouse movement, or window resizing to prevent the browser from becoming overwhelmed.

```javascript
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    
    // If we are NOT currently throttling, execute the function
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true; // Block further calls
      
      // Clear the block after the limit has passed
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Example usage in a browser environment:
// function handleScroll() {
//   console.log('Scroll handled at:', Date.now());
// }

// window.addEventListener('scroll', throttle(handleScroll, 200));

// --- How to use it: ---
// 1. Define the event handler function you want to limit.
// function logMousePosition(event) {
//   console.log(`X: ${event.clientX}`);
// }
//
// // 2. Attach the throttled function to a continuous event.
// window.addEventListener('mousemove', throttle(logMousePosition, 250)); 
// // The function will fire at most 4 times per second (1000ms / 250ms).