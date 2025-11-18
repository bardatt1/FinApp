-- Migration script to fix image_url column type
-- Run this script in your MySQL database if the column type update doesn't happen automatically

-- For MySQL 8.0+
ALTER TABLE product MODIFY COLUMN image_url LONGTEXT;

-- Verify the change
DESCRIBE product;

