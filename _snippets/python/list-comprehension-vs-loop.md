---
title: 'List Comprehension vs. Loop'
language: 'Python'
description: 'A comparison of list comprehension and traditional loops for creating lists.'
category: 'python'
slug: 'list-comprehension-vs-loop'
---

List comprehensions offer a concise way to create lists. They are generally considered more "Pythonic" and are often faster than using a traditional `for` loop with the `append()` method.

```python
# Traditional Loop Method
squares_loop = []
for x in range(10):
    squares_loop.append(x**2)
    
print(squares_loop)
# Output: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]


# List Comprehension Method (Preferred)
squares_comp = [x**2 for x in range(10)]

print(squares_comp)
# Output: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# List Comprehension with Conditional Filtering
even_squares = [x**2 for x in range(10) if x % 2 == 0]

print(even_squares)
# Output: [0, 4, 16, 36, 64]