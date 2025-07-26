import sqlite3
import hashlib
import secrets
import base64

# Connect to SQLite database
db_path = 'server/db.sqlite3'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Find the user
email = 'homepro1@test.com'
new_password = 'testpass123'

try:
    # Get user info from users table
    cursor.execute("SELECT id, username, user_type FROM users WHERE email = ?", (email,))
    user_result = cursor.fetchone()
    
    if user_result:
        user_id, username, user_type = user_result
        print(f"Found user: {username} (ID: {user_id})")
        print(f"User type: {user_type}")
        
        # Create a Django-compatible PBKDF2 hash
        salt = base64.b64encode(secrets.token_bytes(12)).decode('ascii')
        iterations = 1000000
        hash_obj = hashlib.pbkdf2_hmac('sha256', new_password.encode('utf-8'), salt.encode('ascii'), iterations)
        hash_b64 = base64.b64encode(hash_obj).decode('ascii')
        hashed_password = f'pbkdf2_sha256${iterations}${salt}${hash_b64}'
        
        # Update the password
        cursor.execute("UPDATE users SET password = ? WHERE id = ?", (hashed_password, user_id))
        conn.commit()
        
        print(f"✅ Password updated for {email}")
        print(f"New password: {new_password}")
            
    else:
        print(f"❌ User {email} not found")
        # Let's see what users we have
        cursor.execute("SELECT email, username, user_type FROM users WHERE email LIKE '%homepro%' LIMIT 5")
        available_users = cursor.fetchall()
        if available_users:
            print("Available homepro users:")
            for user in available_users:
                print(f"  - {user[0]} ({user[1]}) - {user[2]}")
        
except Exception as e:
    print(f"❌ Error: {e}")
finally:
    conn.close()