import axios from 'axios';
import Cookies from 'js-cookie';

// إعداد الـ API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// إنشاء instance من axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة interceptor للـ requests لإرفاق الـ token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// إضافة interceptor للـ responses للتعامل مع انتهاء صلاحية الـ token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          Cookies.set('access_token', access, { expires: 1 }); // expires in 1 day

          // إعادة المحاولة مع الـ token الجديد
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // فشل في تجديد الـ token، إزالة الـ tokens وإعادة التوجيه للـ login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// تصدير الـ base URL للاستخدام في أماكن أخرى
export { API_BASE_URL };