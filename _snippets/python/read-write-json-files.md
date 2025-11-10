---
title: 'Python Read & Write JSON File'
language: 'Python'
description: 'Simple helper functions to load from and save to a JSON file.'
slug: 'read-write-json-files'
---
A fundamental task in Python. These two helper functions make it simple to save a dictionary to a `.json` file and load it back. Working with JSON files is a common need. These functions handle opening, reading, writing, and properly closing the file. Using `with open(...)` is best practice.

```python
import json

def write_to_json(data, filepath):
  """
  Writes a Python dictionary to a JSON file.

  Args:
    data (dict): The dictionary to save.
    filepath (str): The path to the file (e.g., 'data.json').
  """
  try:
    with open(filepath, 'w', encoding='utf-8') as f:
      json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Successfully saved data to {filepath}")
  except IOError as e:
    print(f"Error writing to file {filepath}: {e}")

def read_from_json(filepath):
  """
  Reads data from a JSON file into a Python dictionary.

  Args:
    filepath (str): The path to the file (e.g., 'data.json').
  
  Returns:
    dict: The loaded data, or None if an error occurred.
  """
  try:
    with open(filepath, 'r', encoding='utf-8') as f:
      data = json.load(f)
      return data
  except FileNotFoundError:
    print(f"Error: File not found at {filepath}")
    return None
  except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from {filepath}")
    return None
  except IOError as e:
    print(f"Error reading file {filepath}: {e}")
    return None

# --- How to use it: ---
# my_data = {'name': 'Gemini', 'level': 'moderate'}
# write_to_json(my_data, 'test.json')
# loaded_data = read_from_json('test.json')
# if loaded_data:
#   print(loaded_data['name'])
