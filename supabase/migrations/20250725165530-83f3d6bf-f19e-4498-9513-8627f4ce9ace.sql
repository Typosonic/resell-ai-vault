-- First, let's see what values are allowed for subscription_status
SELECT conname, contype, pg_get_constraintdef(c.oid) as constraint_definition
FROM pg_constraint c
JOIN pg_class t ON c.conrelid = t.oid
JOIN pg_namespace n ON t.relnamespace = n.oid
WHERE t.relname = 'profiles' 
AND n.nspname = 'public' 
AND contype = 'c';

-- Update the constraint to allow 'admin' value
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_subscription_status_check;

-- Add new constraint with admin included
ALTER TABLE profiles ADD CONSTRAINT profiles_subscription_status_check 
CHECK (subscription_status IN ('free', 'premium', 'admin'));

-- Now update your profile to admin
UPDATE profiles 
SET subscription_status = 'admin' 
WHERE id = 'f17c216d-e033-4dfb-9fa9-593b4206e7c1';