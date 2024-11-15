#!/bin/bash
# A script to set up the MySQL database from a .sql file

# Variables
DB_NAME="project_db"
SQL_FILE="./db/project_db.sql"

# Instructions
echo "Setting up the database..."

# Drop and create the database, then import the SQL file
mysql -u your_username -p -e "DROP DATABASE IF EXISTS $DB_NAME; CREATE DATABASE $DB_NAME;"
mysql -u your_username -p $DB_NAME < $SQL_FILE

echo "Database $DB_NAME has been set up."
