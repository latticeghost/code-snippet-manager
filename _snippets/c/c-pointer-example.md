---
title: 'C Pointer Example'
language: 'C'
description: 'A simple example of how pointers work in C programming.'
slug: 'c-pointer-example'
---

Pointers in C are variables that store the memory address of another variable. They are powerful but must be handled with care.

Here is a basic example of declaring a pointer, assigning an address to it, and dereferencing it to get the value.

```c
#include <stdio.h>

int main() {
    int myAge = 43;      // An integer variable
    int* ptr = &myAge;   // A pointer variable, storing the address of myAge

    // Print the value of myAge (43)
    printf("%d\n", myAge);

    // Print the memory address of myAge
    printf("%p\n", &myAge);

    // Print the value stored in the pointer (the same memory address)
    printf("%p\n", ptr);

    // Access the value at the address stored in ptr ("dereferencing")
    printf("%d\n", *ptr);

    return 0;
}