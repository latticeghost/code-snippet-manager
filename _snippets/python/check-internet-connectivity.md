---
title: 'Check Internet Connectivity'
language: 'Python'
description: 'When running automated scripts or backend services, it is critical to confirm network access before attempting API calls or downloads'
category: 'python'
slug: 'check-internet-connectivity'
---

When running automated scripts or backend services, it is critical to confirm network access before attempting API calls or downloads. This function uses the `socket` library to make a low-level, fast check without relying on the `requests` library.

```python
import socket
from contextlib import closing

def check_internet_connectivity(host="8.8.8.8", port=53, timeout=3):
    """
    Checks if a connection can be established to a given host and port.
    
    Args:
        host (str): The host to check (e.g., Google DNS: 8.8.8.8).
        port (int): The port to check (e.g., DNS port: 53).
        timeout (int): Seconds to wait before giving up.
        
    Returns:
        bool: True if connection is successful, False otherwise.
    """
    try:
        # Use contextlib.closing to ensure the socket is properly closed
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            sock.settimeout(timeout)
            # Attempt to connect to the host and port
            if sock.connect_ex((host, port)) == 0:
                return True
            else:
                return False
    except socket.error as e:
        print(f"Socket error during check: {e}")
        return False

# --- How to use it: ---
# # Check using the default stable host (Google's public DNS)
# is_connected = check_internet_connectivity()
#
# if is_connected:
#     print("Internet connection is active.")
#     # proceed with API calls or downloads
# else:
#     print("No internet connection detected.")
#     # log error or retry later