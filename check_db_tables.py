import sqlite3

# Connect to SQLite database
db_path = 'server/db.sqlite3'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    print("All tables:")
    for table in tables:
        print(f"  - {table[0]}")
    
    print("\nUser-related tables:")
    for table in tables:
        if 'user' in table[0].lower():
            print(f"  - {table[0]}")
            
    # Check if we have auth_user table
    user_tables = [t[0] for t in tables if 'user' in t[0].lower()]
    if user_tables:
        # Try to find users with email containing 'homepro'
        for table_name in user_tables:
            try:
                cursor.execute(f"PRAGMA table_info({table_name})")
                columns = cursor.fetchall()
                column_names = [col[1] for col in columns]
                print(f"\nColumns in {table_name}: {column_names}")
                
                if 'email' in column_names:
                    cursor.execute(f"SELECT * FROM {table_name} WHERE email LIKE '%homepro%' LIMIT 3")
                    users = cursor.fetchall()
                    if users:
                        print(f"\nUsers in {table_name} with 'homepro' in email:")
                        for user in users:
                            print(f"  {user}")
            except Exception as e:
                print(f"Error checking table {table_name}: {e}")
                
except Exception as e:
    print(f"❌ Error: {e}")
finally:
    conn.close()