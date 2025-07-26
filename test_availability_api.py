#!/usr/bin/env python3
"""
Script لاختبار API الـ availability
"""

import requests
import json

# إعدادات الاختبار
BASE_URL = "http://localhost:8000/api"
LOGIN_URL = f"{BASE_URL}/auth/login/"
AVAILABILITY_GET_URL = f"{BASE_URL}/calendar/availability/"
AVAILABILITY_SAVE_URL = f"{BASE_URL}/calendar/availability/save/"

def test_availability_api():
    print("🔍 اختبار API الـ availability...")
    
    # 1. تسجيل الدخول
    print("\n1️⃣ تسجيل الدخول...")
    
    # Use the updated password
    login_data = {
        'email': 'homepro1@test.com',
        'password': 'testpass123'
    }
    
    print(f"Trying login with: {login_data['email']}")
    try:
        login_response = requests.post(LOGIN_URL, json=login_data)
        print(f"Status Code: {login_response.status_code}")
        
        if login_response.status_code == 200:
            login_result = login_response.json()
            print(f"Login Response: {login_result}")
            tokens = login_result.get('tokens', {})
            access_token = tokens.get('access') or login_result.get('access') or login_result.get('access_token')
            print(f"✅ تم تسجيل الدخول بنجاح")
            if access_token:
                print(f"Token: {access_token[:20]}...")
            else:
                print("❌ لم يتم العثور على access token في الاستجابة")
                return
        else:
            print(f"❌ فشل تسجيل الدخول: {login_response.text}")
            return
    except Exception as e:
        print(f"❌ خطأ في تسجيل الدخول: {e}")
        return
    
    # إعداد headers للطلبات التالية
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    # 2. جلب البيانات الحالية
    print("\n2️⃣ جلب بيانات الـ availability الحالية...")
    try:
        get_response = requests.get(AVAILABILITY_GET_URL, headers=headers)
        print(f"Status Code: {get_response.status_code}")
        
        if get_response.status_code == 200:
            current_data = get_response.json()
            print(f"✅ تم جلب البيانات بنجاح")
            print(f"Weekly Schedule: {json.dumps(current_data.get('weekly_schedule', {}), indent=2)}")
        else:
            print(f"❌ فشل جلب البيانات: {get_response.text}")
            return
    except Exception as e:
        print(f"❌ خطأ في جلب البيانات: {e}")
        return
    
    # 3. حفظ بيانات جديدة
    print("\n3️⃣ حفظ بيانات جديدة...")
    test_schedule = {
        "weekly_schedule": {
            "monday": [
                {
                    "start_time": "09:00",
                    "end_time": "17:00",
                    "type": "available"
                }
            ],
            "tuesday": [
                {
                    "start_time": "10:00",
                    "end_time": "16:00",
                    "type": "available"
                }
            ],
            "wednesday": [],
            "thursday": [],
            "friday": [],
            "saturday": [],
            "sunday": []
        },
        "timezone": "UTC",
        "buffer_time": 15,
        "max_advance_booking": 30
    }
    
    try:
        save_response = requests.post(AVAILABILITY_SAVE_URL, json=test_schedule, headers=headers)
        print(f"Status Code: {save_response.status_code}")
        
        if save_response.status_code == 200:
            save_result = save_response.json()
            print(f"✅ تم حفظ البيانات بنجاح")
            print(f"Message: {save_result.get('message')}")
            print(f"Created Records: {save_result.get('created_records')}")
        else:
            print(f"❌ فشل حفظ البيانات: {save_response.text}")
    except Exception as e:
        print(f"❌ خطأ في حفظ البيانات: {e}")
    
    # 4. التحقق من البيانات المحفوظة
    print("\n4️⃣ التحقق من البيانات المحفوظة...")
    try:
        verify_response = requests.get(AVAILABILITY_GET_URL, headers=headers)
        print(f"Status Code: {verify_response.status_code}")
        
        if verify_response.status_code == 200:
            verify_data = verify_response.json()
            print(f"✅ تم التحقق من البيانات")
            print(f"Updated Weekly Schedule: {json.dumps(verify_data.get('weekly_schedule', {}), indent=2)}")
        else:
            print(f"❌ فشل التحقق من البيانات: {verify_response.text}")
    except Exception as e:
        print(f"❌ خطأ في التحقق من البيانات: {e}")

if __name__ == "__main__":
    test_availability_api()