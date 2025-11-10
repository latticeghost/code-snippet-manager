---
title: 'Reading Command Line Flags (CLI Arguments)'
language: 'Go'
description: 'The standard `flag` package makes it easy to accept and validate command-line arguments'
category: 'go'
slug: 'reading-command-line-flags-cli-arguments'
---

The standard `flag` package makes it easy to accept and validate command-line arguments. This is essential for creating professional tools where users need to specify settings like file names, ports, or modes.

```go
package main

import (
	"flag"
	"fmt"
)

func main() {
	// 1. Define a string flag:
	// flag.String(name, default_value, description)
	namePtr := flag.String("name", "World", "A string argument to greet.")
	
	// 2. Define an integer flag:
	// flag.Int(name, default_value, description)
	portPtr := flag.Int("port", 8080, "The port number for the server.")

	// 3. Define a boolean flag (e.g., a verbose flag):
	// flag.Bool(name, default_value, description)
	verbosePtr := flag.Bool("verbose", false, "Enable verbose logging.")

	// 4. Parse the flags: This reads the command line arguments
	flag.Parse()

	// 5. Dereference the pointers to get the actual values
	// These values will be the defaults if the user didn't provide a flag.
	fmt.Printf("Hello, %s!\n", *namePtr)
	fmt.Printf("Server Port set to: %d\n", *portPtr)
	fmt.Printf("Verbose Mode: %t\n", *verbosePtr)

	// You can also access any non-flag arguments (positional arguments)
	fmt.Printf("Positional arguments: %v\n", flag.Args())
}

// --- How to use it: ---
// // 1. Save the code as 'cli.go'.
// // 2. To run with default values:
// //    go run cli.go
// // 3. To run with flags (can use single or double dash):
// //    go run cli.go --name=Gemini -port 9000
// // 4. To run with the boolean flag and a positional argument:
// //    go run cli.go --verbose=true file_to_process.txt
// // 5. To see the help message (generated automatically):
// //    go run cli.go --help