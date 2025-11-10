---
title: 'JavaScript Debounce Function'
language: 'JavaScript'
description: 'Prevents a function from firing too rapidly (e.g., on search input).'
---

A debounce function ensures that your code only runs once per user input session. For example, if a user is typing in a search bar, you don't want to send a new API request for every letter. This function will wait until the user has *stopped* typing for a set amount of time (e.g., 300ms) before firing.

```js
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    // The "this" context and arguments
    const context = this;

    // The function to run after the delay
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };

    // Clear the existing timer
    clearTimeout(timeout);
    
    // Set a new timer
    timeout = setTimeout(later, wait);
  };
}

// --- How to use it: ---
// const mySearchFunction = () => { ... }
// const debouncedSearch = debounce(mySearchFunction, 300);
// mySearchInput.addEventListener('keyup', debouncedSearch);