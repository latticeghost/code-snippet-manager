---
title: 'Standard Data Normalization (Scikit-learn)'
language: 'Python'
description: 'Standardizes features by removing the mean and scaling to unit variance using StandardScaler, a crucial step for most ML algorithms.'
category: 'python'
slug: 'standard-data-normalization'
---

Most machine learning models perform better when numerical input features are scaled to a standard range. **StandardScaler** transforms data such that its distribution has a mean of 0 and a standard deviation of 1.

```python
import numpy as np
from sklearn.preprocessing import StandardScaler

# Example dataset: Rows are samples, columns are features (e.g., Age, Income)
data = np.array([
    [10, 50000],
    [20, 80000],
    [30, 120000],
    [5, 45000]
])

# 1. Initialize the scaler
scaler = StandardScaler()

# 2. Fit the scaler to the training data (calculates mean and std dev)
# NOTE: Fit ONLY on training data to avoid data leakage.
scaler.fit(data)

# 3. Transform the data (applies the scaling)
scaled_data = scaler.transform(data)

print("Original Data:\n", data)
print("\nScaled Data (Mean ≈ 0, Std Dev ≈ 1):\n", scaled_data)

# --- How to use it: ---
# # 1. Prepare your numpy array or pandas DataFrame (features only, no target column).
# # 2. Split your data into X_train and X_test.
# # 3. scaler = StandardScaler()
# # 4. X_train_scaled = scaler.fit_transform(X_train)
# # 5. X_test_scaled = scaler.transform(X_test) # Do NOT re-fit on test data!
# # 6. Pass X_train_scaled and X_test_scaled to your model.