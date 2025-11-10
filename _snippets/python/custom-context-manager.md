---
title: 'Custom Context Manager (The "with" Statement)'
language: 'Python'
description: 'How to create a custom context manager using __enter__ and __exit__ for clean resource management.'
category: 'python'
slug: 'custom-context-manager'
---

A context manager guarantees that a specific setup (`__enter__`) and teardown (`__exit__`) procedure runs around a block of code, typically for managing resources like database connections or file locks.

```python
class IndentManager:
    """A simple context manager to control print indentation."""
    def __init__(self, level):
        self.level = level
        self.old_indent = '    ' * 0 # Initial indent
        
    def __enter__(self):
        # Setup: runs when 'with' block is entered
        self.old_indent = IndentManager.current_indent # Save previous
        IndentManager.current_indent += '    ' * self.level
        print(f"Entering block, indent level: {len(IndentManager.current_indent)/4}")
        return self # Value returned by 'as' keyword
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Teardown: runs when 'with' block is exited (even on error)
        IndentManager.current_indent = self.old_indent
        print(f"Exiting block, indent level: {len(IndentManager.current_indent)/4}")
        # Returning False (default) allows errors to propagate.

# Class variable to hold current indentation
IndentManager.current_indent = ''

# Example Usage
print("Top level.")
with IndentManager(1) as mgr:
    print(IndentManager.current_indent + "Inside first block.")
    with IndentManager(2):
        print(IndentManager.current_indent + "Inside nested block.")
    print(IndentManager.current_indent + "Back in first block.")
print("Top level again.")

# --- How to use it: ---
# # 1. Replace IndentManager with your resource class (e.g., DatabaseConnection).
# # 2. The __enter__ method's return value is assigned to the 'db' variable.
# with IndentManager(1) as mgr:
#     # SETUP runs here (e.g., connection opened)
#     print(IndentManager.current_indent + "Resource is open and ready.")
# # TEARDOWN runs automatically here (e.g., connection closed), even if an error occurred inside the 'with' block.