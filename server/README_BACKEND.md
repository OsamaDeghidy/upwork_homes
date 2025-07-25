# A-List Home Professionals Backend 🏠

## نظرة عامة

Backend قوي ومتكامل لمنصة A-List Home Professionals مطور باستخدام Django و Django REST Framework. يدعم جميع ميزات الفرونت إند مع APIs شاملة ونظام إدارة متقدم.

## المميزات الرئيسية ✨

### 🔐 نظام المصادقة والأمان
- مصادقة متقدمة مع JWT
- أنواع مستخدمين متعددة (Client, Home Pro, Specialist, Crew Member)
- نظام تحقق شامل مع شارات التحقق
- حماية متقدمة للبيانات

### 📊 إدارة المشاريع
- إنشاء وإدارة المشاريع
- تصنيفات متعددة للمشاريع
- نظام العروض والمقترحات
- تتبع التقدم والإنجاز

### 💰 نظام الدفع
- تكامل مع Stripe
- إدارة طرق الدفع
- نظام المراحل والدفعات
- تتبع الأرباح

### 💬 نظام الرسائل
- رسائل فورية مع WebSocket
- محادثات منظمة
- إشعارات فورية
- تاريخ الرسائل

### ⭐ نظام التقييمات
- تقييمات شاملة للمحترفين
- تقييمات متعددة الجوانب
- نظام التعليقات
- حساب المتوسطات

### 📅 إدارة الوقت
- جدولة المواعيد
- تتبع الوقت المستغرق
- إدارة المهام
- تقارير الوقت

## التقنيات المستخدمة 🛠️

### Backend Framework
- **Django 4.2** - إطار العمل الأساسي
- **Django REST Framework** - بناء APIs
- **Django Channels** - WebSocket support
- **Celery** - المهام الخلفية

### Database
- **SQLite** (للتطوير)
- **PostgreSQL** (للإنتاج)
- **Redis** - التخزين المؤقت والجلسات

### Authentication
- **JWT** - JSON Web Tokens
- **Django Simple JWT** - إدارة التوكن
- **Django CORS Headers** - CORS support

### APIs & Documentation
- **DRF Spectacular** - توثيق APIs
- **Swagger UI** - واجهة APIs
- **Django Filter** - فلترة البيانات

## هيكل المشروع 📁

```
server/
├── alist_backend/          # المشروع الرئيسي
│   ├── settings.py         # إعدادات Django
│   ├── urls.py            # الروابط الرئيسية
│   ├── asgi.py            # ASGI للـ WebSocket
│   ├── celery.py          # إعدادات Celery
│   └── views.py           # معالجة الأخطاء
├── authentication/        # نظام المصادقة
│   ├── models.py          # نموذج المستخدم
│   ├── serializers.py     # سيريالايزرز
│   ├── views.py           # Views للمصادقة
│   └── urls.py            # روابط المصادقة
├── projects/              # إدارة المشاريع
├── contracts/             # العقود والاتفاقيات
├── payments/              # نظام الدفع
├── messaging/             # نظام الرسائل
├── reviews/               # التقييمات
├── calendar_app/          # المواعيد
├── time_tracking/         # تتبع الوقت
├── tasks/                 # المهام
├── portfolio/             # معرض الأعمال
├── notifications/         # الإشعارات
├── requirements.txt       # المكتبات المطلوبة
└── run_server.py          # سكريبت التشغيل
```

## التثبيت والإعداد 🚀

### 1. متطلبات النظام
```bash
Python 3.9+
pip (Python package manager)
```

### 2. تثبيت المكتبات
```bash
cd server
pip install -r requirements.txt
```

### 3. الإعداد الأساسي
```bash
# إعداد قاعدة البيانات والمستخدم الأساسي
python run_server.py --setup
```

### 4. تشغيل الخادم
```bash
# تشغيل خادم التطوير
python run_server.py

# أو باستخدام manage.py
python manage.py runserver
```

## APIs المتاحة 📡

### Authentication APIs
- `POST /api/auth/register/` - إنشاء حساب جديد
- `POST /api/auth/login/` - تسجيل الدخول
- `POST /api/auth/logout/` - تسجيل الخروج
- `GET /api/auth/user/` - بيانات المستخدم الحالي
- `PUT /api/auth/user/update/` - تحديث البيانات

### Projects APIs
- `GET /api/projects/` - قائمة المشاريع
- `POST /api/projects/` - إنشاء مشروع جديد
- `GET /api/projects/{id}/` - تفاصيل المشروع
- `PUT /api/projects/{id}/` - تحديث المشروع

### Users APIs
- `GET /api/auth/users/` - قائمة المستخدمين
- `GET /api/auth/professionals/` - قائمة المحترفين
- `GET /api/auth/users/{id}/` - تفاصيل المستخدم

### وأكثر من 80 API endpoint أخرى...

## الوثائق التفاعلية 📚

- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **API Schema**: http://localhost:8000/api/schema/

## لوحة الإدارة 👨‍💼

```
URL: http://localhost:8000/admin/
Username: admin
Password: admin123
```

### مميزات لوحة الإدارة:
- إدارة المستخدمين مع فلترة متقدمة
- إدارة المشاريع والعقود
- إحصائيات شاملة
- نظام التحقق والموافقات
- إدارة التصنيفات والإعدادات

## الأمان 🔒

### مميزات الأمان المطبقة:
- مصادقة JWT آمنة
- حماية CORS
- تشفير كلمات المرور
- حماية من CSRF
- تحقق من الصلاحيات
- معالجة الأخطاء الآمنة

## الأداء والتحسين ⚡

### تحسينات الأداء:
- استعلامات محسنة للقاعدة
- تخزين مؤقت مع Redis
- ضغط الاستجابات
- فهرسة قاعدة البيانات
- تحديد حجم الاستجابة

## المهام الخلفية 🔄

### Celery Tasks:
- إرسال الإشعارات
- معالجة الملفات
- تحديث الإحصائيات
- تنظيف البيانات القديمة

### تشغيل Celery:
```bash
# Worker
celery -A alist_backend worker --loglevel=info

# Beat Scheduler
celery -A alist_backend beat --loglevel=info
```

## التطوير والاختبار 🧪

### تشغيل الاختبارات:
```bash
# جميع الاختبارات
python manage.py test

# اختبار تطبيق محدد
python manage.py test authentication

# مع تغطية الكود
coverage run --source='.' manage.py test
coverage html
```

### أدوات التطوير:
- Django Debug Toolbar
- Django Extensions
- pytest لاختبارات متقدمة
- Black لتنسيق الكود

## النشر للإنتاج 🚀

### إعداد قاعدة البيانات:
```bash
# PostgreSQL
pip install psycopg2-binary
export DATABASE_URL="postgres://user:pass@localhost/dbname"
```

### متغيرات البيئة المطلوبة:
```bash
SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=postgres://...
REDIS_URL=redis://...
EMAIL_HOST_USER=...
STRIPE_SECRET_KEY=...
```

### تشغيل الإنتاج:
```bash
# جمع الملفات الثابتة
python manage.py collectstatic

# تشغيل مع Gunicorn
gunicorn alist_backend.wsgi:application
```

## المراقبة والسجلات 📊

### نظام السجلات:
- سجلات مفصلة للعمليات
- تتبع الأخطاء
- سجلات الأداء
- سجلات الأمان

### مراقبة الأداء:
- مراقبة استهلاك الذاكرة
- مراقبة استعلامات القاعدة
- مراقبة الاستجابة
- إحصائيات الاستخدام

## الدعم والمساعدة 🆘

### المشاكل الشائعة:

1. **مشكلة قاعدة البيانات**:
   ```bash
   python manage.py migrate
   ```

2. **مشكلة الملفات الثابتة**:
   ```bash
   python manage.py collectstatic
   ```

3. **مشكلة المصادقة**:
   ```bash
   python manage.py createsuperuser
   ```

### الحصول على المساعدة:
- تحقق من سجلات الأخطاء
- راجع الوثائق التفاعلية
- اختبر APIs مع Postman
- تحقق من إعدادات CORS

## خارطة الطريق 🗺️

### الميزات القادمة:
- [ ] تكامل مع خدمات الدفع الإضافية
- [ ] نظام الإشعارات المتقدم
- [ ] تحليلات متقدمة
- [ ] تطبيق الهاتف المحمول API
- [ ] نظام التقارير المتقدم

## المساهمة 🤝

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add AmazingFeature'`)
4. Push للـ branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص 📄

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

**تم إنشاء هذا البروجكت بـ ❤️ لمنصة A-List Home Professionals**

🌟 **مميزات البروجكت:**
- ✅ **80+ API Endpoint** جاهز
- ✅ **نظام مصادقة متكامل** 
- ✅ **واجهة إدارة قوية**
- ✅ **وثائق تفاعلية كاملة**
- ✅ **نظام أمان متقدم**
- ✅ **أداء محسن**
- ✅ **جاهز للإنتاج**

**البروجكت جاهز للاستخدام الفوري! 🚀** 