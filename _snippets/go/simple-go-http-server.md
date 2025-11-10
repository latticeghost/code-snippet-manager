---
title: 'Simple Go HTTP Server'
language: 'Go'
description: 'Creates a basic web server in Go using the standard net/http package that responds to requests on port 8080.'
category: 'go'
slug: 'simple-go-http-server'
---

Go's standard library is incredibly powerful. This example creates a simple HTTP server with a single handler function (`handler`) for the root path (`/`). Go is known for its speed and concurrency, which makes its built-in server highly performant.

```go
package main

import (
	"fmt"
	"net/http"
	"log"
)

// A simple handler function that writes a response to the client
func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Go Web Server! You requested: %s", r.URL.Path)
}

func main() {
	// Register the handler function for the root path
	http.HandleFunc("/", handler) 

	port := ":8080"
	fmt.Printf("Starting server on port %s\n", port)
	
	// Start the server and block until it's closed (or an error occurs)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal("ListenAndServe Error:", err)
	}
}

// --- How to use it: ---
// // 1. Save the code as 'server.go'.
// // 2. Run the file from your terminal: go run server.go
// // 3. Open your browser or use curl: http://localhost:8080/
// // 4. To stop the server, press Ctrl+C in the terminal.