---
title: 'Function Timing Decorator'
language: 'Python'
description: 'A reusable decorator to measure and print the execution time of any function.'
category: 'python'
slug: 'function-timing-decorator'
---

Decorators allow you to modify or enhance a function or method. This example uses `time.perf_counter()` to accurately measure how long a decorated function takes to run.

```python
import time
from functools import wraps

def timing_decorator(func):
    """A decorator that prints the time a function takes to execute."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        t1 = time.perf_counter()
        result = func(*args, **kwargs)
        t2 = time.perf_counter()
        print(f'Function "{func.__name__}" executed in: {t2 - t1:.4f}s')
        return result
    return wrapper

@timing_decorator
def calculate_complex_sum(n):
    """Example function to time."""
    total = 0
    for i in range(n):
        total += i
    return total

# The timing is applied automatically when the function is called
result = calculate_complex_sum(1000000)
# Example Output: Function "calculate_complex_sum" executed in: 0.0357s

# --- How to use it: ---
# # 1. Define the decorator utility once.
#
# @timing_decorator
# def my_api_call(user_id):
#     # This entire function's execution time will be measured.
#     time.sleep(0.5)
#     return f"Data for {user_id}"
#
# result = my_api_call(123) 
# # The time taken will be printed to the console before 'result' is returned.