-- 20241101120000_add_business_name_to_transactions.sql

-- Add businessName column to transactions table
ALTER TABLE transactions ADD COLUMN businessName TEXT;
