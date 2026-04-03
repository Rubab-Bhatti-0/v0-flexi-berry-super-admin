# FlexiBerry Super Admin Page Plan

Based on the analysis of `FlexiBerry_platform`, here are the features and data structures for the requested pages:

## 1. Admins Page
- **Features**: List all admins, add new admin, edit admin roles, deactivate admin.
- **Fields**: Name, Email, Role (Super Admin, Support, Manager), Status (Active, Inactive), Last Login.
- **Actions**: Add Admin (Modal), Edit, Delete, Toggle Status.

## 2. KYC Verification Page
- **Features**: Review vendor registration documents.
- **Fields**: Vendor Name, Shop Name, Business Type (Individual/Business), Documents (CNIC, Shop License), Status (Pending, Approved, Rejected), Submission Date.
- **Actions**: View Documents, Approve, Reject (with reason), Request More Info.

## 3. Products Page
- **Features**: Global product management across all shops.
- **Fields**: Product Name, Shop/Vendor, Category, Price, Down Payment, Stock, Status (Active, Draft, Out of Stock), SKU.
- **Actions**: Add Product, Edit, Delete, Feature/Unfeature, View on Site.

## 4. Categories Page
- **Features**: Manage the platform's category tree.
- **Fields**: Category Name, Icon/Image, Subcategories, Product Count, Status.
- **Actions**: Add Category, Edit, Delete, Reorder, Manage Subcategories.

## 5. Installments Page
- **Features**: Monitor and manage installment plans and payments.
- **Fields**: Order ID, Customer, Total Amount, Monthly Amount, Duration (Months), Paid Installments, Next Due Date, Status (Active, Overdue, Completed).
- **Actions**: View Payment History, Mark as Paid, Send Reminder, Adjust Plan.

## 6. Recovery Page
- **Features**: Handle password reset and account recovery requests.
- **Fields**: User Email, Recovery Method (Email/Phone), Request Date, Status (Pending, Verified, Expired).
- **Actions**: Send Recovery Link, Verify Identity Manually, Close Request.

## 7. Settings Page
- **Features**: Platform-wide configuration.
- **Sections**:
  - **General**: Platform Name, Support Email, Contact Number.
  - **Commerce**: Default Commission Rate, Tax Settings, Currency.
  - **Security**: Password Policy, Two-Factor Auth Toggle.
  - **Maintenance**: Maintenance Mode Toggle, Clear Cache.
