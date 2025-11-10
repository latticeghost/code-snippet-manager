---
title: 'Concurrency with Goroutines and Channels'
language: 'Go'
description: 'Demonstrates Go’s core concurrency model: using goroutines to run tasks in parallel and a channel to safely return the result.'
category: 'go'
slug: 'goroutines-and-channels'
---

A **goroutine** is a lightweight thread managed by the Go runtime. A **channel** is the pipe used to send and receive values between goroutines, ensuring thread-safe data transfer. This example calculates a value concurrently and waits for the result via the channel.

```go
package main

import (
	"fmt"
	"time"
)

// This function will run concurrently in its own goroutine
func calculateSum(n int, result chan int) {
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
		time.Sleep(10 * time.Millisecond) // Simulate heavy work
	}
	
	// Send the final result back into the channel
	result <- sum 
}

func main() {
	// Create an unbuffered channel to communicate integer results
	ch := make(chan int) 

	// Start the concurrent task as a goroutine
	// The 'go' keyword detaches the function call from the main thread
	go calculateSum(10, ch) 

	fmt.Println("Waiting for concurrent calculation...")

	// Block and wait for the result to be sent back through the channel
	finalSum := <-ch 
	
	fmt.Printf("Calculation finished. The final sum is: %d\n", finalSum)
	
	// Once the result is received, the channel can be closed if needed, 
	// though it is not mandatory here.
	close(ch)
}
