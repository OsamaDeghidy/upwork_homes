# A-List Home Professionals - Cursor Rules 🏠

## 📋 Project Overview

**A-List Home Professionals** is a comprehensive platform connecting homeowners with skilled home improvement professionals. Think of it as Upwork specifically designed for home services.

### 🎯 Project Type
- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS
- **Backend**: Django 4.2 with Django REST Framework
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Client**: American market (English language required)

### 🏗️ Architecture
```
Frontend (client/) ←→ Backend APIs (server/) ←→ Database
Next.js 15             Django DRF              SQLite/PostgreSQL
```

---

## 📁 Project Structure

### 🎨 Frontend Structure
```
client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── client/            # Client dashboard pages
│   │   ├── professional/     # Professional dashboard pages
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   ├── projects/         # Project-related components
│   │   ├── proposals/        # Proposal components
│   │   └── ui/               # Base UI components
│   ├── services/             # API service layer
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript interfaces
│   ├── context/              # React context providers
│   └── lib/                  # Utilities and configurations
├── public/                   # Static assets
└── package.json             # Dependencies
```

### 🐍 Backend Structure
```
server/
├── alist_backend/           # Main Django project
│   ├── settings.py         # Django settings
│   ├── urls.py            # Main URL routing
│   └── wsgi.py            # WSGI configuration
├── authentication/         # User management system
├── projects/              # Project management
├── contracts/             # Contract system
├── payments/              # Payment processing
├── messaging/             # Chat system
├── reviews/               # Rating system
├── calendar_app/          # Scheduling
├── time_tracking/         # Time tracking
├── tasks/                 # Task management
├── portfolio/             # Professional portfolios
├── notifications/         # Notification system
├── requirements.txt       # Python dependencies
└── manage.py             # Django management
```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication APIs
```python
POST   /api/auth/register/              # User registration
POST   /api/auth/login/                 # User login
POST   /api/auth/logout/                # User logout
GET    /api/auth/user/                  # Get current user
PUT    /api/auth/user/update/           # Update user profile
GET    /api/auth/users/                 # List users (admin)
GET    /api/auth/professionals/         # List professionals
POST   /api/auth/user/toggle-availability/  # Toggle professional availability
```

### 🏠 Projects APIs
```python
GET    /api/projects/                   # List projects with filters
POST   /api/projects/                   # Create new project
GET    /api/projects/{id}/              # Get project details
PUT    /api/projects/{id}/              # Update project
DELETE /api/projects/{id}/              # Delete project
GET    /api/projects/categories/        # Get project categories
GET    /api/projects/my/                # Get user's projects
POST   /api/projects/{id}/favorite/     # Toggle project favorite
GET    /api/projects/{id}/images/       # Get project images
POST   /api/projects/{id}/images/       # Upload project images
GET    /api/projects/{id}/proposals/    # Get project proposals
POST   /api/projects/{id}/proposals/    # Submit proposal
```

### 📋 Contracts APIs
```python
GET    /api/contracts/                  # List contracts
POST   /api/contracts/                  # Create contract
GET    /api/contracts/{id}/             # Get contract details
PUT    /api/contracts/{id}/             # Update contract
GET    /api/contracts/{id}/milestones/  # Get contract milestones
POST   /api/contracts/{id}/milestones/  # Create milestone
PUT    /api/contracts/milestones/{id}/  # Update milestone
```

### 💰 Payments APIs
```python
GET    /api/payments/                   # List payments
POST   /api/payments/                   # Process payment
GET    /api/payments/methods/           # Get payment methods
POST   /api/payments/methods/           # Add payment method
DELETE /api/payments/methods/{id}/      # Remove payment method
```

---

## 🎨 Frontend Patterns

### 🔧 Component Structure
```tsx
// Standard component pattern
interface Props {
  // Define props with TypeScript
}

export default function ComponentName({ prop1, prop2 }: Props) {
  // Component logic
  return (
    <div className="container">
      {/* JSX content */}
    </div>
  );
}
```

### 🎣 API Integration Pattern
```tsx
// Using custom hooks for API calls
const { data, loading, error, refetch } = useProjects(filters);

// Service layer pattern
import { projectService } from '@/services/projectService';

const handleCreateProject = async (projectData) => {
  try {
    const result = await projectService.createProject(projectData);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### 🎨 Styling Patterns
```tsx
// Tailwind CSS classes
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

---

## 🐍 Backend Patterns

### 📊 Model Pattern
```python
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
```

### 📝 Serializer Pattern
```python
from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.get_full_name', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'client', 'client_name', 'created_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
```

### 🔧 ViewSet Pattern
```python
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Project.objects.filter(client=self.request.user)
    
    @action(detail=True, methods=['post'])
    def favorite(self, request, pk=None):
        # Custom action implementation
        return Response({'status': 'favorite toggled'})
```

---

## 🎯 User Types & Permissions

### 👥 User Roles
```python
USER_TYPES = {
    'client': 'Client',           # Homeowners posting projects
    'home_pro': 'Home Pro',       # Service professionals
    'specialist': 'A-List Specialist',  # Coordinators/consultants
    'crew_member': 'Crew Member'  # Team members for tasks
}
```

### 🔐 Permission Patterns
```python
# Django permission checks
if request.user.user_type == 'client':
    # Client-specific logic
elif request.user.user_type in ['home_pro', 'specialist']:
    # Professional logic
```

```tsx
// Frontend role-based rendering
{userType === 'client' && (
  <ClientDashboard />
)}
{['home_pro', 'specialist'].includes(userType) && (
  <ProfessionalDashboard />
)}
```

---

## 🚀 Development Workflow

### 🔄 Phase-Based Development
```
Phase 1: Authentication System
Phase 2: Projects Listing
Phase 3: Proposals System
Phase 4: Dashboard Systems
Phase 5: Advanced Features
```

### 📋 Task Protocol
When working on any feature:
1. **Analyze existing code** - Check for reusable components/services
2. **Review backend APIs** - Ensure endpoints exist and understand data structure
3. **Plan integration** - Map frontend pages to backend endpoints
4. **Implement systematically** - Frontend → API integration → Testing
5. **Test thoroughly** - All user types, edge cases, error states

---

## 🎨 UI/UX Standards

### 🎨 Design System
```css
/* Primary Colors */
--primary-50: #e6fafe;
--primary-500: #00bfff;  /* Main brand color */
--primary-900: #002633;

/* Typography */
font-family: 'Inter', sans-serif;  /* Body text */
font-family: 'Poppins', sans-serif;  /* Headings */
```

### 📱 Responsive Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### 🔧 Component Standards
- All text in **English** (American client)
- Use Lucide React icons consistently
- Loading states for all async operations
- Error handling with user-friendly messages
- Mobile-first responsive design

---

## 🔍 Common Patterns

### 🎣 Data Fetching
```tsx
// Custom hook pattern
const useProjects = (filters: ProjectFilters) => {
  const [data, setData] = useState<ProjectListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchProjects();
  }, [filters]);
  
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getProjects(filters);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return { data, loading, error, refetch: fetchProjects };
};
```

### 🔄 State Management
```tsx
// Context pattern for global state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 🎨 Form Handling
```tsx
// React Hook Form pattern
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {}
});

const onSubmit = async (data: FormData) => {
  try {
    await apiCall(data);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

---

## ⚡ Performance Guidelines

### 🔧 Frontend Optimization
- Use Next.js Image component for images
- Implement lazy loading for large lists
- Debounce search inputs (300ms)
- Cache API responses when appropriate
- Minimize re-renders with useMemo/useCallback

### 🐍 Backend Optimization
- Use select_related/prefetch_related for queries
- Implement pagination for large datasets
- Add database indexes for frequent queries
- Use caching for expensive operations

---

## 🚨 Critical Rules

### ❌ Never Do
1. **Create files unnecessarily** - Always check for existing components/services
2. **Ignore backend structure** - Always review APIs before frontend implementation
3. **Use Arabic text** - All UI text must be in English
4. **Skip error handling** - Every API call needs proper error handling
5. **Forget mobile responsiveness** - Test on mobile devices

### ✅ Always Do
1. **Follow existing patterns** - Match the coding style and structure
2. **Use TypeScript properly** - Define interfaces for all data structures
3. **Test API integration** - Verify backend endpoints work before frontend
4. **Handle loading states** - Show loading indicators for async operations
5. **Ask before new libraries** - Confirm before adding new dependencies

---

## 🔧 Development Commands

### Frontend Commands
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

### Backend Commands
```bash
cd server
python run_server.py          # Start Django server with auto-setup
python manage.py shell        # Django shell
python manage.py makemigrations  # Create migrations
python manage.py migrate      # Apply migrations
```

### Access URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs/
- **Admin Panel**: http://localhost:8000/admin/

---

## 🎯 Quick Reference

### 📂 Key Files to Check
- `client/src/types/` - All TypeScript interfaces
- `client/src/services/` - API service functions
- `client/src/components/` - Reusable components
- `server/*/models.py` - Database models
- `server/*/serializers.py` - API serializers
- `server/*/urls.py` - API endpoints

### 🔍 When Starting New Feature
1. Check `client/src/lib/routes.ts` for existing pages
2. Review `server/alist_backend/urls.py` for available APIs
3. Look at similar existing components for patterns
4. Verify user type permissions needed
5. Plan mobile responsiveness from start

---

## 🏆 Success Patterns

### 🎯 Efficient Development
1. **Reuse existing code** - 80% of components already exist
2. **Follow established patterns** - Don't reinvent the wheel
3. **Test early and often** - Check API responses immediately
4. **Mobile-first design** - Start with mobile layout
5. **Error handling first** - Plan for API failures

### 🔄 Integration Best Practices
1. **Backend first** - Ensure APIs work before frontend
2. **TypeScript interfaces** - Define data types clearly
3. **Loading states** - Always show loading indicators
4. **Error messages** - User-friendly error handling
5. **Testing workflow** - Test all user types and scenarios

Remember: This is a professional platform for American clients - maintain high quality standards and English-only content throughout. 