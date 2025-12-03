# Reusable Components Usage Guide

## Toast Component

A reusable notification component for displaying success, error, warning, and info messages.

### Import
```javascript
import Toast from '../components/Toast/Toast';
```

### Usage
```javascript
// Add state
const [toast, setToast] = useState(null);

// Show toast
setToast({
  type: 'success', // 'success', 'error', 'warning', 'info'
  title: 'Success!',
  message: 'Operation completed successfully'
});

// Render in JSX
{toast && (
  <Toast
    type={toast.type}
    title={toast.title}
    message={toast.message}
    onClose={() => setToast(null)}
    duration={3000} // Optional, defaults to 3000ms
  />
)}
```

### Examples
```javascript
// Success
setToast({
  type: 'success',
  title: 'Exported Successful',
  message: 'Your data has been exported'
});

// Error
setToast({
  type: 'error',
  title: 'Export Failed',
  message: 'Something went wrong'
});

// Warning
setToast({
  type: 'warning',
  title: 'Warning',
  message: 'Please check your input'
});

// Info
setToast({
  type: 'info',
  title: 'Information',
  message: 'Form has been cleared'
});
```

---

## ConfirmDialog Component

A reusable confirmation dialog for user actions like delete, cancel, etc.

### Import
```javascript
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
```

### Usage
```javascript
// Add state
const [confirmDialog, setConfirmDialog] = useState(null);

// Show confirm dialog
setConfirmDialog({
  type: 'warning', // 'warning', 'info', 'question'
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmText: 'Yes, Proceed',
  cancelText: 'Cancel',
  onConfirm: () => {
    // Handle confirm action
    console.log('Confirmed!');
    setConfirmDialog(null);
  },
  onCancel: () => setConfirmDialog(null)
});

// Render in JSX
{confirmDialog && (
  <ConfirmDialog
    type={confirmDialog.type}
    title={confirmDialog.title}
    message={confirmDialog.message}
    confirmText={confirmDialog.confirmText}
    cancelText={confirmDialog.cancelText}
    onConfirm={confirmDialog.onConfirm}
    onCancel={confirmDialog.onCancel}
  />
)}
```

### Examples
```javascript
// Delete confirmation
setConfirmDialog({
  type: 'warning',
  title: 'Delete Item',
  message: 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText: 'Yes, Delete',
  cancelText: 'Cancel',
  onConfirm: () => {
    // Delete logic here
    setConfirmDialog(null);
  },
  onCancel: () => setConfirmDialog(null)
});

// Cancel form confirmation
setConfirmDialog({
  type: 'warning',
  title: 'Cancel Form',
  message: 'All unsaved changes will be lost. Continue?',
  confirmText: 'Yes, Cancel',
  cancelText: 'No, Keep Editing',
  onConfirm: () => {
    // Clear form logic
    setConfirmDialog(null);
  },
  onCancel: () => setConfirmDialog(null)
});

// Info dialog
setConfirmDialog({
  type: 'info',
  title: 'Information',
  message: 'This is an informational message.',
  confirmText: 'OK',
  cancelText: 'Close',
  onConfirm: () => setConfirmDialog(null),
  onCancel: () => setConfirmDialog(null)
});
```

---

## Complete Component Setup

```javascript
import React, { useState } from 'react';
import Toast from '../components/Toast/Toast';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';

const MyComponent = () => {
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const handleDelete = () => {
    setConfirmDialog({
      type: 'warning',
      title: 'Delete Item',
      message: 'Are you sure?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        // Perform delete
        setConfirmDialog(null);
        setToast({
          type: 'success',
          title: 'Deleted',
          message: 'Item deleted successfully'
        });
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          type={confirmDialog.type}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </div>
  );
};

export default MyComponent;
```
