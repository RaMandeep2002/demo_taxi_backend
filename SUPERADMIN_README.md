# Super Admin Implementation

This document describes the super admin role implementation in the Salmon Arm Taxi backend system.

## Overview

The super admin role has been implemented to provide full backend access and administrative control over the entire system. Super admins can manage all other admins, access all admin functionalities, and have additional system-wide privileges.

## Role Hierarchy

1. **Super Admin** (`super-admin`) - Highest level access
2. **Admin** (`admin`) - Standard admin access
3. **Driver** (`driver`) - Driver access
4. **Customer** (`customer`) - Customer access

## Features

### Super Admin Capabilities

1. **Full Admin Access**: Super admins can access all admin endpoints and functionalities
2. **Admin Management**: Create, update, delete, and manage other admin accounts
3. **System Statistics**: View comprehensive system statistics
4. **Account Control**: Enable/disable admin accounts
5. **Security**: Cannot be modified or deleted by other admins

### Admin Management Functions

- **Create Admin**: Create new admin accounts (cannot create super admin accounts)
- **Update Admin**: Modify admin information (cannot modify super admin accounts)
- **Delete Admin**: Remove admin accounts (cannot delete super admin accounts)
- **Toggle Status**: Enable/disable admin accounts
- **View All Admins**: List all admin and super admin accounts

## API Endpoints

### Super Admin Routes (`/superadmin`)

All super admin routes require authentication and super admin role authorization.

#### Authentication Required
- `GET /superadmin/info` - Get super admin information
- `GET /superadmin/stats` - Get system statistics

#### Admin Management
- `GET /superadmin/admins` - Get all admins
- `POST /superadmin/admins` - Create new admin
- `PUT /superadmin/admins/:id` - Update admin
- `DELETE /superadmin/admins/:id` - Delete admin
- `PUT /superadmin/admins/:id/status` - Toggle admin status

### Admin Routes (`/admin`)

All admin routes now support both admin and super admin access.

#### Driver Management
- `GET /admin/driver-details` - Get driver details
- `POST /admin/add-driver` - Add new driver
- `PUT /admin/update-driver/:driverId` - Update driver
- `DELETE /admin/delete-driver/:driverId` - Delete driver
- `PUT /admin/disable-Driver/:driverId` - Disable driver
- `PUT /admin/activate-Driver/:driverId` - Activate driver

#### Vehicle Management
- `POST /admin/register-vehicle` - Register vehicle
- `PUT /admin/update-vehicle/:registrationNumber` - Update vehicle
- `DELETE /admin/remove-vehicle/:registrationNumber` - Remove vehicle

#### Booking Management
- `GET /admin/bookings` - Get booking details
- `DELETE /admin/delete-all-bookings` - Delete all bookings

#### System Management
- `POST /admin/settings` - Update settings
- `PUT /admin/settings` - Update settings
- `GET /admin/settings` - Get settings

### Authentication Routes (`/api/auth`)

- `POST /api/auth/login-admin` - Login for admin/super admin
- `POST /api/auth/create-first-superadmin` - Create first super admin (temporary)

## Setup Instructions

### 1. Create First Super Admin

#### Option A: Using NPM Script
```bash
npm run create-superadmin
```

#### Option B: Using API Endpoint
```bash
POST /api/auth/create-first-superadmin
```

#### Option C: Manual Database Creation
```javascript
// Create super admin directly in database
const superAdmin = new User({
  name: "Super Administrator",
  email: "superadmin@salmonarmtaxi.com",
  password: "hashedPassword", // Use bcrypt to hash
  role: "super-admin",
  status: true
});
```

### 2. Login as Super Admin

```bash
POST /api/auth/login-admin
Content-Type: application/json

{
  "email": "superadmin@salmonarmtaxi.com",
  "password": "SuperAdmin@2024"
}
```

### 3. Use Super Admin Token

Include the JWT token in the Authorization header for all super admin requests:

```bash
Authorization: Bearer <your-jwt-token>
```

## Security Considerations

### 1. Super Admin Protection
- Super admin accounts cannot be modified or deleted by other admins
- Super admin accounts cannot be disabled by other admins
- Only super admins can create, modify, or delete other admin accounts

### 2. Role Validation
- All endpoints validate user roles before allowing access
- Super admin role is checked in authentication middleware
- Role-based access control is enforced at the router level

### 3. Password Security
- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Account status is checked during login

## Example Usage

### Create New Admin
```bash
POST /superadmin/admins
Authorization: Bearer <super-admin-token>
Content-Type: application/json

{
  "name": "New Admin",
  "email": "newadmin@salmonarmtaxi.com",
  "password": "SecurePassword123",
  "role": "admin"
}
```

### Get System Statistics
```bash
GET /superadmin/stats
Authorization: Bearer <super-admin-token>
```

### Disable Admin Account
```bash
PUT /superadmin/admins/:adminId/status
Authorization: Bearer <super-admin-token>
Content-Type: application/json

{
  "status": false
}
```

## Error Handling

The system includes comprehensive error handling:

- **401 Unauthorized**: Invalid or missing authentication token
- **403 Forbidden**: Insufficient permissions for the requested action
- **404 Not Found**: Resource not found
- **400 Bad Request**: Invalid request data
- **500 Internal Server Error**: Server-side errors

## Maintenance

### Regular Tasks
1. Monitor super admin account security
2. Review admin account permissions
3. Update super admin password regularly
4. Audit admin account activities

### Security Updates
1. Remove the temporary `/api/auth/create-first-superadmin` route after first super admin is created
2. Regularly update JWT secret
3. Monitor for suspicious admin activities
4. Implement rate limiting for admin endpoints

## Troubleshooting

### Common Issues

1. **"Access denied" errors**: Check if user has correct role and valid token
2. **"Cannot modify super admin" errors**: Super admin accounts are protected
3. **"User not found" errors**: Verify user exists and account is active
4. **"Invalid token" errors**: Check JWT token validity and expiration

### Debug Steps

1. Verify user role in database
2. Check JWT token payload
3. Confirm endpoint authorization requirements
4. Validate request headers and body

## Support

For issues related to super admin functionality, check:
1. Authentication middleware logs
2. Role middleware validation
3. Database user records
4. JWT token configuration
