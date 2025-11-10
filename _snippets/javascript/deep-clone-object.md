---
title: 'Deep Clone Object'
language: 'JavaScript'
description: 'A function to create a true, deep copy of a complex JavaScript object.'
category: 'javascript'
slug: 'deep-clone-object'
---

The simplest and often fastest way to deep clone an object that contains no functions, dates, or complex classes is by leveraging the built-in JSON methods. For general-purpose cloning, the native `structuredClone` is the modern choice.

```javascript
// Method 1: The fastest and simplest method (Caution: loses functions, Dates, etc.)
const fastDeepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Method 2: The modern, native, and robust approach (Node.js 17+ or browser)
const robustDeepClone = (obj) => {
    // structuredClone is the preferred method for modern JS environments
    return structuredClone(obj);
};


const original = {
    id: 1,
    details: {
        value: 100,
        tags: ['a', 'b']
    }
};

const clone = robustDeepClone(original);

// Prove it is a deep clone: modifying the clone does not affect the original
clone.details.value = 999;
clone.details.tags.push('c');

console.log('Original Value:', original.details.value); // Output: 100
console.log('Clone Value:', clone.details.value);       // Output: 999
console.log('Clone Tags:', clone.details.tags.join(', '));

// --- How to use it: ---
// const originalData = { user: { id: 1, friends: [100, 200] } };
// const safeCopy = robustDeepClone(originalData);
//
// // 1. Mutate the nested object in the copy
// safeCopy.user.id = 2; 
// safeCopy.user.friends.push(300);
//
// console.log(originalData.user.id);       // Output: 1 (The original remains safe)
// console.log(originalData.user.friends.length); // Output: 2 (The array is also independent)