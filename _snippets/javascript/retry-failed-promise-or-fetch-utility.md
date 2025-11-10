---
title: 'Retry Failed Promise or Fetch Utility'
language: 'JavaScript'
description: 'Network requests can fail temporarily due to transient issues (e'
category: 'javascript'
slug: 'retry-failed-promise-or-fetch-utility'
---

Network requests can fail temporarily due to transient issues (e.g., rate limits, brief server timeouts). This higher-order function takes any asynchronous function and wraps it with a robust **retry loop** using **exponential backoff**, which is the industry standard for handling such failures gracefully.

```javascript
/**
 * Retries a promise-returning function up to maxRetries times.
 * @param {Function} fn - The asynchronous function (or fetch call) to execute.
 * @param {number} maxRetries - The maximum number of times to retry the function.
 * @returns {Promise<any>} The result of the successful function call.
 */
async function retry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // 🔑 Execute the function provided (e.g., fetch, API call)
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        // If this was the final attempt, re-throw the error
        console.error(`Final attempt failed after ${maxRetries} retries.`);
        throw error;
      }
      
      // Calculate exponential backoff delay (2^attempt * 1000ms)
      const delay = Math.pow(2, attempt) * 1000;
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay / 1000}s...`);
      
      // Wait for the calculated delay
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// --- How to use it: ---
// // 1. Define the asynchronous function you want to retry.
// const flakyFetch = () => fetch('https://flaky-api.example.com/data');
//
// // 2. Wrap the function call with the retry utility.
// retry(flakyFetch, 5)
//   .then(response => response.json())
//   .then(data => console.log('Successfully fetched data:', data))
//   .catch(err => console.error('Failed to fetch after all retries:', err));
//
// // This will try the fetch up to 5 times.