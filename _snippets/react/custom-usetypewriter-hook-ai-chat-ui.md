---
title: 'Custom useTypewriter Hook (AI Chat UI)'
language: 'React'
description: 'A custom hook to display text character-by-character, simulating a live, streaming response from an AI model.'
category: 'react'
slug: 'custom-use-typewriter-hook'
---

In modern AI chat applications, responses often stream in. This effect enhances the user experience by mimicking that streaming behavior, making the application feel more responsive. This hook relies on `setTimeout` and `useEffect` for clean interval management.

```jsx
import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate typing out a final string.
 * @param {string} text - The full string to be displayed.
 * @param {number} delay - The delay (in ms) between each character.
 */
export function useTypewriter(text, delay = 50) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If we haven't finished typing the full text
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        // Add the next character
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout); // Cleanup the timeout on re-render/unmount
    }
  }, [currentIndex, delay, text]); // Dependencies ensure the effect runs only when needed

  return currentText;
}

// --- How to use it: ---
// import { useTypewriter } from './hooks/useTypewriter';
//
// function ChatResponse({ finalResponse }) {
//   // The text will slowly appear on screen (e.g., 30ms per character)
//   const displayedText = useTypewriter(finalResponse, 30); 
//
//   return (
//     <p className="ai-response">
//       {displayedText}
//     </p>
//   );
// }

// // Example Parent Component Usage:
// // <ChatResponse finalResponse="Hello! I am an AI language model designed to help you with code snippets." />