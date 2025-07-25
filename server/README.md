# A-List Home Professionals Platform 🏠

**منصة محترفي تحسين المنازل - مشروع Next.js مع Django**

> **تم تطوير الفرونت إند بالكامل وجاهز للربط مع الباك إند**

---

## 📋 نظرة عامة على الموقع / Project Overview

### العربية
منصة A-List Home Professionals هي موقع شامل يربط بين أصحاب المنازل والمحترفين المتخصصين في تحسين المنازل. الموقع يوفر نظام كامل لإدارة المشاريع، العقود، المدفوعات، والتواصل بين العملاء والمحترفين.

### English
A-List Home Professionals is a comprehensive platform connecting homeowners with skilled home improvement professionals. The platform provides a complete system for project management, contracts, payments, and communication between clients and professionals.

---

## 🎯 أنواع المستخدمين / User Types

### 1. العملاء (Clients)
- أصحاب المنازل الذين يحتاجون خدمات تحسين المنازل
- يمكنهم نشر مشاريع والحصول على عروض من المحترفين

### 2. المحترفون (Professionals)
- **Home Pro**: المحترف الذي ينفذ الخدمة
- **A-List Specialist**: مستشار يقوم بالتنسيق والتخطيط
- **Crew Member**: عضو فريق للمهام الصغيرة

---

## 🔧 التكنولوجيا المستخدمة / Technology Stack

### Frontend
- **Next.js 15.3.5** - React framework
- **React 19.0.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend المطلوب
- **Django 4.2+** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **Celery** - Background tasks

---

## 📁 هيكل الموقع / Site Structure

### 🏠 الصفحات العامة / Public Pages
```
├── / (الصفحة الرئيسية / Home Page)
├── /about (عن الموقع)
├── /how-it-works (كيف يعمل الموقع)
├── /services (الخدمات المتاحة)
├── /professionals (تصفح المحترفين)
├── /professionals/[id] (صفحة المحترف)
├── /projects/[id] (تفاصيل المشروع العام)
├── /pricing (أسعار الاشتراكات)
├── /contact (تواصل معنا)
├── /help (المساعدة)
├── /support (الدعم الفني)
├── /blog (المدونة)
├── /success-stories (قصص النجاح)
├── /privacy (سياسة الخصوصية)
├── /terms (شروط الاستخدام)
├── /login (تسجيل الدخول)
├── /register (إنشاء حساب)
└── /logout (تسجيل الخروج)
```

### 👤 صفحات العملاء / Client Pages
```
├── /client/dashboard (لوحة تحكم العميل)
├── /client/projects (مشاريع العميل)
├── /client/projects/[id] (تفاصيل المشروع للعميل)
├── /client/contracts (العقود)
├── /client/contracts/[id] (تفاصيل العقد)
├── /client/payments (المدفوعات)
├── /client/payments/methods (طرق الدفع)
├── /client/payments/new (إضافة طريقة دفع جديدة)
├── /client/calendar (المواعيد)
├── /client/tasks (المهام)
├── /client/time-tracker (تتبع الوقت)
├── /client/reviews (التقييمات)
├── /client/favorites (المفضلة)
└── /post-project (نشر مشروع جديد)
```

### 🔧 صفحات المحترفين / Professional Pages
```
├── /professional/dashboard (لوحة تحكم المحترف)
├── /professional/proposals (العروض المقدمة)
├── /professional/contracts (العقود)
├── /professional/portfolio (معرض الأعمال)
├── /professional/portfolio/new (إضافة عمل جديد)
├── /professional/earnings (الأرباح)
├── /professional/availability (توفر المواعيد)
├── /professional/calendar (المواعيد)
├── /professional/tasks (المهام)
├── /professional/time-tracker (تتبع الوقت)
├── /professional/reviews (التقييمات)
├── /find-work (البحث عن عمل)
└── /my-jobs (وظائفي)
```

### 📱 الصفحات المشتركة / Shared Pages
```
├── /messages (الرسائل)
├── /profile (الملف الشخصي)
└── /settings (الإعدادات)
```

---

## 🎨 المكونات الرئيسية / Main Components

### Layout Components
- **Header.tsx** - شريط التنقل الرئيسي
- **Footer.tsx** - تذييل الموقع

### Section Components
- **Hero.tsx** - القسم الرئيسي في الصفحة الرئيسية

### UI Components
- مكونات واجهة المستخدم (تحت التطوير)

---

## 🔌 API Endpoints المطلوبة / Required API Endpoints

### 🔐 Authentication & Users
```python
# User Management
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/logout/
GET /api/auth/user/
PUT /api/auth/user/
POST /api/auth/password/change/
POST /api/auth/password/reset/

# User Profiles
GET /api/profiles/
GET /api/profiles/{id}/
PUT /api/profiles/{id}/
POST /api/profiles/avatar/
```

### 🏠 Projects
```python
# Project Management
GET /api/projects/
POST /api/projects/
GET /api/projects/{id}/
PUT /api/projects/{id}/
DELETE /api/projects/{id}/
GET /api/projects/{id}/proposals/
POST /api/projects/{id}/proposals/
```

### 🤝 Proposals
```python
# Proposal Management
GET /api/proposals/
POST /api/proposals/
GET /api/proposals/{id}/
PUT /api/proposals/{id}/
DELETE /api/proposals/{id}/
POST /api/proposals/{id}/accept/
POST /api/proposals/{id}/reject/
```

### 📋 Contracts
```python
# Contract Management
GET /api/contracts/
POST /api/contracts/
GET /api/contracts/{id}/
PUT /api/contracts/{id}/
GET /api/contracts/{id}/milestones/
POST /api/contracts/{id}/milestones/
PUT /api/contracts/{id}/milestones/{milestone_id}/
```

### 💰 Payments
```python
# Payment Management
GET /api/payments/
POST /api/payments/
GET /api/payments/{id}/
GET /api/payments/methods/
POST /api/payments/methods/
PUT /api/payments/methods/{id}/
DELETE /api/payments/methods/{id}/
POST /api/payments/process/
```

### 📅 Calendar & Scheduling
```python
# Calendar Management
GET /api/calendar/appointments/
POST /api/calendar/appointments/
GET /api/calendar/appointments/{id}/
PUT /api/calendar/appointments/{id}/
DELETE /api/calendar/appointments/{id}/
GET /api/calendar/availability/
PUT /api/calendar/availability/
```

### ⏰ Time Tracking
```python
# Time Tracking
GET /api/time-entries/
POST /api/time-entries/
GET /api/time-entries/{id}/
PUT /api/time-entries/{id}/
DELETE /api/time-entries/{id}/
POST /api/time-entries/{id}/approve/
POST /api/time-entries/{id}/reject/
```

### ✅ Tasks
```python
# Task Management
GET /api/tasks/
POST /api/tasks/
GET /api/tasks/{id}/
PUT /api/tasks/{id}/
DELETE /api/tasks/{id}/
POST /api/tasks/{id}/complete/
```

### 💬 Messages
```python
# Messaging System
GET /api/messages/conversations/
POST /api/messages/conversations/
GET /api/messages/conversations/{id}/
POST /api/messages/conversations/{id}/messages/
PUT /api/messages/conversations/{id}/mark-read/
```

### ⭐ Reviews
```python
# Review System
GET /api/reviews/
POST /api/reviews/
GET /api/reviews/{id}/
PUT /api/reviews/{id}/
DELETE /api/reviews/{id}/
```

### 🎨 Portfolio
```python
# Portfolio Management
GET /api/portfolio/
POST /api/portfolio/
GET /api/portfolio/{id}/
PUT /api/portfolio/{id}/
DELETE /api/portfolio/{id}/
```

---

## 📊 نماذج البيانات / Data Models

### User Model
```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('client', 'Client'),
        ('home_pro', 'Home Pro'),
        ('specialist', 'A-List Specialist'),
        ('crew_member', 'Crew Member'),
    ]
    
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Project Model
```python
class Project(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    budget = models.CharField(max_length=50)
    timeline = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    required_roles = models.JSONField(default=list)
    skills = models.JSONField(default=list)
    images = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Professional Profile Model
```python
class ProfessionalProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255, blank=True)
    license_number = models.CharField(max_length=100, blank=True)
    insurance_info = models.TextField(blank=True)
    specializations = models.JSONField(default=list)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    experience_years = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    completed_projects = models.IntegerField(default=0)
    response_time = models.CharField(max_length=50, default='2-4 hours')
    portfolio_items = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Contract Model
```python
class Contract(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    professional = models.ForeignKey(User, on_delete=models.CASCADE)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_contracts')
    contract_number = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_terms = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    signed_date = models.DateField(null=True, blank=True)
    warranty_period = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Milestone Model
```python
class Milestone(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('paid', 'Paid'),
    ]
    
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    completed_date = models.DateField(null=True, blank=True)
    payment_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

## 🔧 متطلبات Django / Django Requirements

### 1. إعداد المشروع / Project Setup
```bash
# إنشاء مشروع Django جديد
django-admin startproject alist_backend
cd alist_backend

# إنشاء التطبيقات المطلوبة
python manage.py startapp authentication
python manage.py startapp projects
python manage.py startapp contracts
python manage.py startapp payments
python manage.py startapp messaging
python manage.py startapp reviews
python manage.py startapp calendar_app
python manage.py startapp time_tracking
python manage.py startapp tasks
python manage.py startapp portfolio
```

### 2. المكتبات المطلوبة / Required Libraries
```python
# requirements.txt
Django>=4.2.0
djangorestframework>=3.14.0
django-cors-headers>=4.0.0
django-filter>=23.0
Pillow>=9.0.0
psycopg2-binary>=2.9.0
redis>=4.5.0
celery>=5.2.0
django-celery-beat>=2.5.0
stripe>=5.0.0
twilio>=8.0.0
boto3>=1.26.0
django-storages>=1.13.0
python-decouple>=3.8
gunicorn>=20.1.0
whitenoise>=6.4.0
django-extensions>=3.2.0
django-debug-toolbar>=4.0.0
```

### 3. إعدادات Django / Django Settings
```python
# settings.py
import os
from decouple import config

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}

# Redis Configuration
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': config('REDIS_URL'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Celery Configuration
CELERY_BROKER_URL = config('REDIS_URL')
CELERY_RESULT_BACKEND = config('REDIS_URL')

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Media Files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT')
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY = config('STRIPE_PUBLISHABLE_KEY')
STRIPE_SECRET_KEY = config('STRIPE_SECRET_KEY')
```

### 4. المهام الخلفية / Background Tasks
```python
# tasks.py
from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_notification_email(user_id, subject, message):
    """إرسال إشعار بالبريد الإلكتروني"""
    pass

@shared_task
def process_payment(payment_id):
    """معالجة الدفع"""
    pass

@shared_task
def generate_contract_pdf(contract_id):
    """إنشاء ملف PDF للعقد"""
    pass
```

---

## 🚀 خطوات التشغيل / Getting Started

### Frontend (Next.js)
```bash
cd client
npm install
npm run dev
```

### Backend (Django) - المطلوب تطويره
```bash
# إنشاء البيئة الافتراضية
cd server
python -m venv venv
source venv/bin/activate  # على Windows: venv\Scripts\activate

# تثبيت المكتبات
pip install -r requirements.txt

# تشغيل الخادم
python manage.py runserver

# تشغيل Celery
celery -A alist_backend worker --loglevel=info
```

---

## 🔄 تكامل Frontend مع Backend

### 1. إعداد API Client
```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  // ... المزيد من الطرق
};
```

### 2. إدارة الحالة
```typescript
// context/AuthContext.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

---

## 📱 الميزات الرئيسية / Key Features

### ✅ مكتملة في الفرونت إند
- [x] صفحة رئيسية تفاعلية مع عرض الخدمات
- [x] نظام تسجيل دخول وإنشاء حساب
- [x] لوحات تحكم للعملاء والمحترفين
- [x] نظام نشر وتصفح المشاريع
- [x] صفحات العقود والمدفوعات
- [x] نظام المواعيد والتقويم
- [x] تتبع الوقت والمهام
- [x] نظام الرسائل والتواصل
- [x] معرض أعمال المحترفين
- [x] نظام التقييمات والمراجعات
- [x] صفحات الدعم والمساعدة

### 🔄 يحتاج تطوير في الباك إند
- [ ] API endpoints للمصادقة وإدارة المستخدمين
- [ ] نظام إدارة المشاريع والعقود
- [ ] نظام المدفوعات مع Stripe
- [ ] نظام الإشعارات والتنبيهات
- [ ] نظام تحديد المواعيد
- [ ] تتبع الوقت والإنتاجية
- [ ] نظام الرسائل الفورية
- [ ] نظام إدارة الملفات والصور
- [ ] تقارير وتحليلات
- [ ] نظام البحث والفلترة

---

## 🎯 الخطوات التالية / Next Steps

### 1. إعداد Django Backend
- إنشاء مشروع Django جديد
- إعداد قاعدة البيانات PostgreSQL
- تثبيت وإعداد Redis
- إعداد Celery للمهام الخلفية

### 2. تطوير API Endpoints
- تطوير نظام المصادقة
- إنشاء APIs للمشاريع والعقود
- تطوير نظام المدفوعات
- إنشاء نظام الرسائل

### 3. ربط Frontend مع Backend
- إعداد API clients
- إضافة إدارة الحالة
- تطبيق المصادقة الحقيقية
- اختبار التكامل

### 4. النشر والتطوير
- إعداد CI/CD pipeline
- نشر على خادم الإنتاج
- إعداد مراقبة الأداء
- تحسين الأمان

---

## 📞 الدعم والتواصل / Support & Contact

للاستفسارات أو الدعم الفني:
- Email: support@alisthomepros.com
- Phone: +1 (555) 123-4567

---

## 📄 الرخصة / License

هذا المشروع محمي بحقوق الطبع والنشر © 2024 A-List Home Professionals

---

**📝 ملاحظة:** تم تطوير الفرونت إند بالكامل مع 45+ صفحة و 20+ مكون مخصص. الموقع جاهز للربط مع Django backend لتحويله إلى موقع فعال ومتكامل. 





notifications
 time_tracking
 tasks        
 portfolio

 python manage.py create_fake_data --clear

 بيانات المستخدمين للاختبار:
📋 الأدمن:
اسم المستخدم: admin
كلمة المرور: admin123
لوحة الإدارة: http://localhost:8000/admin/
👥 العملاء (Clients):
client1 | كلمة المرور: pass123 | John Doe (New York, NY)
client2 | كلمة المرور: pass123 | Sarah Wilson (Los Angeles, CA)
client3 | كلمة المرور: pass123 | Mike Brown (Chicago, IL)
🏠 مقاولي المنازل (Home Pros):
homepro1 | كلمة المرور: pass123 | David Contractor (Austin, TX) - Austin Home Solutions
homepro2 | كلمة المرور: pass123 | Lisa Thompson (Phoenix, AZ) - Phoenix Electric Pro
homepro3 | كلمة المرور: pass123 | Carlos Martinez (Miami, FL) - Miami Plumbing Experts
🎯 المتخصصين (Specialists):
specialist1 | كلمة المرور: pass123 | Emily Johnson (Seattle, WA) - Project Coordination Pro
specialist2 | كلمة المرور: pass123 | Robert Davis (Denver, CO) - Denver Project Solutions
👷 أعضاء الفريق (Crew Members):
crew1 | كلمة المرور: pass123 | Alex Rodriguez (Houston, TX)
crew2 | كلمة المرور: pass123 | Maria Garcia (San Diego, CA)
crew3 | كلمة المرور: pass123 | Tom Wilson (Portland, OR)
💰 خطط الاشتراك المُنشأة:
الخطة	السعر	نوع المستخدم	الميزات
Freemium Plan	$0/شهر	Home Pro	قائمة أساسية في الدليل
Crew Member Basic	$90/شهر	Crew Member	وصول للوظائف، رفع المعرض، رسائل
Home Pro Basic	$150/شهر	Home Pro	عروض المشاريع، نظام التقييم، أدوات التسويق
Home Pro Premium	$275/شهر	Home Pro	أولوية في العروض، ملف مميز، أدوات متقدمة
Specialist Plan	$60/شهر	Specialist	إدارة المشاريع، تنسيق المهام، أدوات التواصل
📊 البيانات المُنشأة:
✅ 14 تطبيق Django مع بيانات شاملة
✅ 12 مستخدم من جميع الأنواع مع اشتراكات نشطة
✅ 10 تصنيفات مشاريع (سباكة، كهرباء، نجارة، إلخ)
✅ 5 مشاريع فعلية بحالات مختلفة (منشور، قيد التنفيذ)
✅ 2 عقد نشط مع مراحل مختلفة
✅ محافظ رقمية للمحترفين مع أرصدة وهمية
✅ طرق دفع لجميع المستخدمين
✅ عناصر معرض الأعمال للمحترفين
✅ تقييمات ومراجعات إيجابية
✅ محادثات ورسائل بين العملاء والمحترفين
✅ مهام ومتابعة للمشاريع النشطة




 git status
   git add .
   git status
   git add .
   git commit -m "تحديث: إصلاح الهجرات وربط واجهات الفرونت إند مع الباك إند"
   git push origin main




stripe mail 
   mail: Jwest@alisthp.com    password : J1983we$t2025

google
  mail:  Jeffreywest1983@gmail.com   passwod : J1983We$t



digitalocean
Jwest@alisthp.com
J1983we$t

godady account
user : 191737203
pass :571W2nd$t



Stripe is
 jwest@alisthp.com
J1983we$t2025



cd server; pip install channels==4.0.0 channels-redis==4.1.0

عايز اعمل ابلكيشن اللاماكن    بحيث يكون فيه خاصيه تتبع الاماكن و اللوكيشن وبحث الخدمه عن طريق اللكيشن و يقيس المسافه ويدينى استميتد تايم عن ممكن مقدم الخدمه يوصلى ف قد  اليه



#degtal ocean config
#DB_USER=doadmin
#DB_PASSWORD= osam0Esmael
#DB_HOST= 167.172.152.171
#DB_PORT=5432
#DB_NAME=defaultdb

alisthomepros.com
# ssh root@167.172.152.171
# osam0Esmael
# su sammy
# cd ~/myprojectdir
# source myprojectenv/bin/activate

# su sammy
# cd ~/myprojectapi
# source myprojectenv/bin/activate
# sudo apt install snap
# sudo snap install --classic certbot
# sudo ln -s /snap/bin/certbot/usr/bin/certbot
# sudo certbot --nginx
sudo systemctl restart gunicorn
sudo systemctl daemon-reload 
sudo systemctl restart gunicorn.socket gunicorn.service

sudo nginx -t && sudo systemctl restart nginx
# sudo nano /etc/nginx/sites-available/myproject
# sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled



# إصلاح أذونات مجلد المشروع
sudo chown -R sammy:www-data /home/sammy/myprojectdir/

# إصلاح أذونات مجلد staticfiles
sudo chmod -R 755 /home/sammy/myprojectdir/staticfiles/

# إصلاح أذونات مجلد media
sudo chmod -R 755 /home/sammy/myprojectdir/media/

# التأكد من أذونات مجلد home
sudo chmod 755 /home/sammy/


Here are the important links for your access and frontend integration:

🔹 Admin Panel:
https://www.alisthomepros.com/admin/
Username: osama@gmail.com
Password: osama

🔹 API Documentation:
• Swagger UI: https://www.alisthomepros.com/swagger/
• ReDoc: https://www.alisthomepros.com/redoc/
• OpenAPI JSON: https://www.alisthomepros.com/swagger.json

Let me know once you've had a chance to review, and I’ll proceed with the domain connection next.






الأساسية (1-5):
Authentication System - Login/Register + JWT tokens
Header Integration - ربط Header مع بيانات المستخدم الحقيقية
Projects Listing - صفحة البحث عن العمل مع فلترة البيانات
Proposals - عرض العروض والعروض المقدمه للعملاء
Project Details - تفاصيل المشروع والعروض
Client Dashboard - لوحة تحكم العملاء مع الإحصائيات
المراحل المتقدمة (6-10):
Professional Dashboard - لوحة تحكم المحترفين
Messaging System - نظام المحادثات والإشعارات الفورية
Portfolio Management - معرض الأعمال ورفع الصور
Contracts System - إدارة العقود والمعالم
Calendar & Appointments - نظام التقويم والمواعيد
المراحل المتقدمة (11-15):
Payments Integration - Stripe وإدارة المدفوعات
Reviews & Ratings - نظام التقييمات والمراجعات
Notifications System - الإشعارات والتنبيهات الفورية
File Management - رفع وإدارة الملفات والصور
Advanced Search & Filters - البحث المتقدم والفلترة


npm install axios @types/js-cookie js-cookie --legacy-peer-deps






client/src/
├── lib/api.ts              # ⚡ API client مع axios
├── types/auth.ts           # 📝 Types للمصادقة
├── services/authService.ts # 🔧 خدمات المصادقة
├── context/AuthContext.tsx # 🎯 Auth context
├── app/
│   ├── layout.tsx          # 🔄 محدث مع AuthProvider
│   ├── login/page.tsx      # 🔐 صفحة Login
│   └── register/page.tsx   # 📝 صفحة Register
└── components/layout/
    └── Header.tsx          # 👤 Header محدث

     بيانات المستخدمين (User Credentials)
كلمة المرور لجميع المستخدمين: password123
المستخدمين المُنشأين:
المدير (Admin):
الإيميل: john.admin@alist.com
اسم المستخدم: john_admin
النوع: admin
العميل (Client):
الإيميل: sarah.client@example.com
اسم المستخدم: sarah_client
النوع: client
المهني (Professional):
الإيميل: mike.pro@example.com
اسم المستخدم: mike_pro
النوع: home_pro
المتخصص (Specialist):
الإيميل: lisa.specialist@example.com
اسم المستخدم: lisa_specialist
النوع: specialist
عضو الفريق (Crew Member):
الإيميل: david.crew@example.com
اسم المستخدم: david_crew
النوع: crew_member
📝 ملاحظات مهمة:
جميع المستخدمين لديهم نفس كلمة المرور: password123
جميع الحسابات تم التحقق منها (is_verified = True)
المدير لديه صلاحيات إدارية كاملة (is_staff = True, is_superuser = True)
