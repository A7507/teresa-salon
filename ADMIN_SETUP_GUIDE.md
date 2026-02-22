# Admin User Setup Guide

## Problem Fixed
The admin authentication system was using localStorage instead of proper Supabase authentication, which allowed anyone to access admin routes by simply setting localStorage values.

## Solution Implemented
1. **Updated Admin Layout** (`app/admin/layout.tsx`):
   - Replaced localStorage authentication with proper Supabase session checking
   - Now verifies both Supabase session AND admin_users table membership
   - Properly redirects unauthorized users to login

2. **Updated Login Page** (`app/auth/login/page.tsx`):
   - Replaced hardcoded credentials with Supabase authentication
   - Now properly signs in users and verifies admin status
   - Handles error states and redirects appropriately

## Required Setup Steps

### Step 1: Create Admin User in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Add user"**
4. Enter the following details:
   - **Email**: `admin@teresasalon.com`
   - **Password**: Choose a strong password (minimum 12 characters)
   - **Auto confirm**: ✅ Check this box
5. Click **"Save"**

### Step 2: Add User to Admin Users Table

1. In Supabase dashboard, go to **Table Editor**
2. Select the `admin_users` table
3. Click **"Insert row"**
4. Enter:
   - **id**: Copy the user ID from the Authentication users table
   - **email**: `admin@teresasalon.com`
5. Click **"Save"**

### Alternative: Use SQL Editor

You can also run this SQL in the Supabase SQL Editor:

```sql
-- Replace 'YOUR_USER_ID_HERE' with the actual user ID from auth.users
INSERT INTO public.admin_users (id, email) 
VALUES (
  'YOUR_USER_ID_HERE', -- Get this from auth.users table
  'admin@teresasalon.com'
) ON CONFLICT (email) DO NOTHING;
```

## Testing the Fix

1. **Before login**: Try to access `/admin` - should redirect to login
2. **Login**: Use the credentials you created
3. **After login**: Should access admin dashboard normally
4. **Logout**: Should properly sign out and require login again

## Security Improvements

- ✅ No more localStorage-based authentication
- ✅ Proper Supabase session management
- ✅ Admin role verification in database
- ✅ Automatic session expiration handling
- ✅ Secure logout functionality

## Troubleshooting

### "You are not authorized to access the admin area"
- Means the user exists in auth but not in admin_users table
- Run the SQL above to add them to admin_users

### "Incorrect email or password"
- Check the credentials in Supabase Authentication
- Make sure the user is confirmed (auto-confirm should be checked)

### Still can access admin without login
- Clear browser localStorage completely
- The middleware now properly protects all admin routes
- Try accessing in an incognito window

## Files Modified

1. `app/admin/layout.tsx` - Fixed authentication logic
2. `app/auth/login/page.tsx` - Fixed login process
3. `create-admin-user.js` - Helper script (optional)

The authentication system is now secure and properly integrated with Supabase!
