# قواعد التطوير - A-List Home Professionals

## قواعد محددة لتجنب الأخطاء الشائعة

### 1. التعامل مع Django RelatedManager
**المشكلة**: `TypeError: 'RelatedManager' object is not iterable`
**الحلول الوقائية**:
- استخدام `prefetch_related()` عند الحاجة لعلاقات متعددة
- إضافة `source='field.all'` في Serializers للعلاقات
- تجنب الوصول المباشر للعلاقات بدون prefetch

```python
# ✅ صحيح
queryset = Model.objects.prefetch_related('related_field')
class MySerializer(serializers.ModelSerializer):
    related_items = RelatedSerializer(many=True, source='related_field.all')

# ❌ خطأ
queryset = Model.objects.all()  # بدون prefetch
class MySerializer(serializers.ModelSerializer):
    related_items = RelatedSerializer(many=True)  # بدون source
```

### 2. التمرير التلقائي في الواجهات
**المبادئ**:
- عدم إجبار المستخدم على التمرير التلقائي
- إضافة آليات للتحكم في التمرير
- مراعاة تفاعل المستخدم مع الصفحة

```typescript
// ✅ صحيح - تمرير ذكي
const [userScrolledUp, setUserScrolledUp] = useState(false);
const [autoScroll, setAutoScroll] = useState(true);

useEffect(() => {
  if (autoScroll && !userScrolledUp && messages.length > 0) {
    scrollToBottom();
  }
}, [messages.length, autoScroll, userScrolledUp]);

// ❌ خطأ - تمرير إجباري
useEffect(() => {
  scrollToBottom(); // يحدث دائماً
}, [messages]);
```

### 3. إدارة الأخطاء في الواجهة الأمامية
**المبادئ**:
- التعامل مع جميع حالات الخطأ المحتملة
- عرض رسائل خطأ واضحة للمستخدم
- تسجيل الأخطاء للمطورين

```typescript
// ✅ صحيح
try {
  const response = await api.call();
  // معالجة النجاح
} catch (error) {
  console.error('Error details:', error);
  if (error.response?.status === 401) {
    showError('غير مصرح لك بهذا الإجراء');
  } else if (error.response?.status === 500) {
    showError('خطأ في الخادم، يرجى المحاولة لاحقاً');
  } else {
    showError('حدث خطأ غير متوقع');
  }
}
```

### 4. WebSocket والرسائل الفورية
**المبادئ**:
- تجنب الإرسال المكرر للرسائل
- التعامل مع انقطاع الاتصال
- تحديث الواجهة بشكل متزامن

```typescript
// ✅ صحيح
const setupWebSocket = () => {
  const ws = new WebSocket(url);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'new_message') {
      // تحديث الرسائل بدون تكرار
      setMessages(prev => {
        const exists = prev.find(m => m.id === data.message.id);
        if (exists) return prev;
        return [...prev, data.message];
      });
    }
  };
};
```

### 5. تحسين الأداء
**المبادئ**:
- استخدام lazy loading للمكونات الكبيرة
- تحسين استعلامات قاعدة البيانات
- استخدام التخزين المؤقت بذكاء

```python
# ✅ صحيح - استعلام محسن
queryset = Message.objects.select_related('sender', 'conversation')\
                         .prefetch_related('attachments', 'reactions')\
                         .filter(conversation_id=conversation_id)

# ❌ خطأ - استعلامات متعددة
for message in messages:
    sender = message.sender  # N+1 query problem
    attachments = message.attachments.all()  # N+1 query problem
```

### 6. إدارة الحالة (State Management)
**المبادئ**:
- استخدام useState للحالات البسيطة
- استخدام useReducer للحالات المعقدة
- تجنب الحالات المكررة

```typescript
// ✅ صحيح
const [messages, setMessages] = useState<Message[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// ❌ خطأ - حالات مكررة
const [messages, setMessages] = useState<Message[]>([]);
const [messagesList, setMessagesList] = useState<Message[]>([]);
const [allMessages, setAllMessages] = useState<Message[]>([]);
```

## 🎯 منهجية العمل الأساسية

### 📋 خطوات العمل لكل صفحة/جزء:

1. **تحليل الصفحة/الجزء المطلوب**
   - قراءة الكود الموجود
   - فهم المكونات المستخدمة
   - تحديد الوظائف المطلوبة

2. **تحليل الأجزاء الفرعية**
   - تحديد جميع الأجزاء المكونة للصفحة
   - فهم العلاقات بين الأجزاء
   - تحديد البيانات المطلوبة لكل جزء

3. **فحص الباك إند والـ APIs**
   - مراجعة `server/*/urls.py` للـ endpoints المتاحة
   - فحص `server/*/models.py` لفهم هيكل البيانات
   - مراجعة `server/*/serializers.py` لفهم البيانات المرسلة
   - تحديد الـ APIs المطلوبة لكل جزء

4. **ربط الفرونت إند بالباك إند**
   - إنشاء/تحديث الـ services في `client/src/services/`
   - ربط المكونات بالـ APIs المناسبة
   - إضافة معالجة الأخطاء والتحميل

5. **اختبار الربط**
   - التأكد من عمل الـ APIs
   - اختبار جميع الحالات (نجاح، خطأ، تحميل)
   - التأكد من عدم وجود أخطاء في `npm run build`

## 🔧 قواعد التطوير الإلزامية

### ✅ يجب اتباعها دائماً:

1. **فحص الكود الموجود أولاً**
   - البحث عن المكونات الموجودة قبل إنشاء جديدة
   - استخدام الأنماط الموجودة في المشروع
   - عدم إعادة اختراع العجلة

2. **اتباع التصميم الموجود**
   - استخدام نفس الألوان والأنماط
   - الحفاظ على نفس هيكل المكونات
   - عدم إضافة صفحات جديدة بدون إذن

3. **معالجة الأخطاء**
   - إضافة loading states لجميع العمليات غير المتزامنة
   - معالجة أخطاء الـ API بشكل مناسب
   - عرض رسائل خطأ واضحة للمستخدم

4. **التحقق من البناء**
   - التأكد من عدم وجود أخطاء في `npm run build`
   - حل جميع أخطاء TypeScript
   - التأكد من صحة جميع الـ imports

5. **الاستئذان للتعديلات**
   - طلب إذن قبل تعديل الباك إند
   - طلب إذن قبل إضافة صفحات جديدة
   - طلب إذن قبل إضافة مكتبات جديدة

### ❌ ممنوع تماماً:

1. **إضافة صفحات جديدة بدون إذن**
2. **تعديل الباك إند بدون إذن**
3. **إضافة مكتبات جديدة بدون إذن**
4. **استخدام اللغة العربية في الواجهة**
5. **ترك أخطاء في `npm run build`**

## 🎨 معايير الكود

### TypeScript:
```typescript
// تعريف الواجهات لكل البيانات
interface ProjectData {
  id: number;
  title: string;
  description: string;
  // ... باقي الحقول
}

// استخدام useCallback للدوال
const handleSubmit = useCallback(async (data: FormData) => {
  try {
    setLoading(true);
    const result = await apiCall(data);
    // معالجة النجاح
  } catch (error) {
    // معالجة الخطأ
  } finally {
    setLoading(false);
  }
}, []);
```

### React Components:
```tsx
// نمط المكونات القياسي
interface ComponentProps {
  data: DataType;
  onAction?: (id: number) => void;
}

export default function ComponentName({ data, onAction }: ComponentProps) {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* المحتوى */}
    </div>
  );
}
```

### API Integration:
```typescript
// نمط الخدمات
export const projectService = {
  async getProjects(filters: ProjectFilters): Promise<ProjectListResponse> {
    const response = await api.get('/api/projects/', { params: filters });
    return response.data;
  },
  
  async createProject(data: CreateProjectData): Promise<Project> {
    const response = await api.post('/api/projects/', data);
    return response.data;
  }
};
```

## 🔍 عملية التحليل

### عند استلام صفحة/جزء جديد:

1. **قراءة الكود الموجود**
   ```bash
   # فحص الملف المطلوب
   read_file target_file
   
   # البحث عن المكونات المرتبطة
   codebase_search "related components"
   ```

2. **فحص الباك إند**
   ```bash
   # فحص الـ URLs
   read_file server/*/urls.py
   
   # فحص الـ Models
   read_file server/*/models.py
   
   # فحص الـ Serializers
   read_file server/*/serializers.py
   ```

3. **تحديد الـ APIs المطلوبة**
   - قائمة بجميع الـ endpoints المطلوبة
   - فهم هيكل البيانات لكل API
   - تحديد الـ permissions المطلوبة

4. **تخطيط الربط**
   - تحديد الـ services المطلوبة
   - تخطيط معالجة الأخطاء
   - تخطيط حالات التحميل

## 🚨 معالجة الأخطاء

### أخطاء شائعة يجب تجنبها:

1. **أخطاء TypeScript**
   - تعريف جميع الـ interfaces
   - التأكد من صحة الـ types
   - حل جميع أخطاء الـ imports

2. **أخطاء الـ API**
   - معالجة أخطاء الشبكة
   - معالجة أخطاء الخادم
   - عرض رسائل خطأ مناسبة

3. **أخطاء الأداء**
   - استخدام useCallback و useMemo
   - تجنب إعادة الرسم غير الضرورية
   - تحسين استعلامات قاعدة البيانات

## 📋 قائمة التحقق لكل مهمة

- [ ] قراءة الكود الموجود
- [ ] فهم المتطلبات
- [ ] فحص الباك إند
- [ ] تحديد الـ APIs المطلوبة
- [ ] إنشاء/تحديث الـ services
- [ ] ربط المكونات بالـ APIs
- [ ] إضافة معالجة الأخطاء
- [ ] إضافة حالات التحميل
- [ ] اختبار `npm run build`
- [ ] اختبار جميع الحالات
- [ ] طلب إذن للتعديلات إذا لزم الأمر
- [ ] **تحديث ملف DEVELOPMENT_PLAN.md وتوثيق التعديلات والأخطاء التي تم حلها بعد كل جزء**

## 🎯 الهدف النهائي

إكمال المشروع في 24 ساعة مع:
- ✅ لا أخطاء في `npm run build`
- ✅ جميع الصفحات مرتبطة بالباك إند
- ✅ معالجة شاملة للأخطاء
- ✅ تصميم متجاوب ومتسق
- ✅ أداء محسن
- ✅ كود نظيف ومنظم 

## قاعدة جديدة: معالجة أخطاء تسجيل الدخول

### عند وجود خطأ في تسجيل الدخول (400 Bad Request):
1. **إنشاء مستخدمين تجريبيين:** يجب إنشاء script لإنشاء مستخدمين تجريبيين للتجربة
2. **اختبار الـ backend:** التأكد من عمل الـ backend بشكل صحيح
3. **توثيق البيانات:** توثيق بيانات تسجيل الدخول في ملف الأخطاء
4. **اختبار شامل:** اختبار جميع وظائف تسجيل الدخول والتسجيل

### بيانات المستخدمين التجريبيين:
- **مستخدم عميل:** test@example.com / testpass123
- **مستخدم محترف:** pro@example.com / testpass123

### عند وجود خطأ يمنع عمل النظام:
- يتم حله فوراً حتى لو تطلب تعديل القواعد
- يتم توثيق الحل في ملفات منفصلة
- يتم اختبار الحل للتأكد من عدم تكرار الخطأ