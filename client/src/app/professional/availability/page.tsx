'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Clock,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Settings,
  Globe,
  MapPin,
  Bell,
  RefreshCw,
  Copy,
  Share2,
  Eye,
  EyeOff,
  Toggle,
  Zap,
  Moon,
  Sun,
  Coffee,
  Home,
  Car,
  Briefcase,
  Phone,
  Video,
  Users,
  DollarSign,
  Timer,
  Star,
  Filter,
  Search,
  Download,
  Upload
} from 'lucide-react';

export default function AvailabilityPage() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showAddTimeSlot, setShowAddTimeSlot] = useState(false);
  const [editingSlot, setEditingSlot] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('schedule');

  // Sample availability data
  const [availability, setAvailability] = useState({
    timezone: 'America/Los_Angeles',
    bufferTime: 15, // minutes between appointments
    maxAdvanceBooking: 30, // days
    minAdvanceBooking: 24, // hours
    autoConfirm: true,
    allowRescheduling: true,
    rescheduleDeadline: 24, // hours
    allowCancellation: true,
    cancellationDeadline: 24, // hours
    weeklySchedule: {
      monday: {
        isAvailable: true,
        slots: [
          { start: '09:00', end: '12:00', type: 'consultations' },
          { start: '14:00', end: '18:00', type: 'project_work' }
        ]
      },
      tuesday: {
        isAvailable: true,
        slots: [
          { start: '09:00', end: '12:00', type: 'consultations' },
          { start: '14:00', end: '18:00', type: 'project_work' }
        ]
      },
      wednesday: {
        isAvailable: true,
        slots: [
          { start: '09:00', end: '12:00', type: 'consultations' },
          { start: '14:00', end: '18:00', type: 'project_work' }
        ]
      },
      thursday: {
        isAvailable: true,
        slots: [
          { start: '09:00', end: '12:00', type: 'consultations' },
          { start: '14:00', end: '18:00', type: 'project_work' }
        ]
      },
      friday: {
        isAvailable: true,
        slots: [
          { start: '09:00', end: '12:00', type: 'consultations' },
          { start: '14:00', end: '17:00', type: 'project_work' }
        ]
      },
      saturday: {
        isAvailable: true,
        slots: [
          { start: '10:00', end: '14:00', type: 'emergency_only' }
        ]
      },
      sunday: {
        isAvailable: false,
        slots: []
      }
    },
    specialDates: [
      {
        date: '2024-01-25',
        type: 'unavailable',
        reason: 'Personal Day',
        note: 'Family commitment'
      },
      {
        date: '2024-02-14',
        type: 'limited',
        reason: 'Half Day',
        slots: [{ start: '09:00', end: '13:00', type: 'consultations' }]
      }
    ]
  });

  const [bookingPreferences, setBookingPreferences] = useState({
    serviceTypes: [
      { name: 'Consultation', duration: 60, price: 150, buffer: 15, enabled: true },
      { name: 'Project Assessment', duration: 120, price: 300, buffer: 30, enabled: true },
      { name: 'Progress Review', duration: 90, price: 200, buffer: 15, enabled: true },
      { name: 'Final Walkthrough', duration: 60, price: 150, buffer: 15, enabled: true },
      { name: 'Emergency Service', duration: 30, price: 100, buffer: 0, enabled: true }
    ],
    paymentRequired: true,
    depositRequired: true,
    depositPercentage: 25,
    cancellationPolicy: 'flexible',
    requireClientInfo: true,
    requireProjectDetails: true,
    allowInstantBooking: false,
    requireApproval: true
  });

  const days = [
    { key: 'monday', label: 'Monday', short: 'Mon' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { key: 'thursday', label: 'Thursday', short: 'Thu' },
    { key: 'friday', label: 'Friday', short: 'Fri' },
    { key: 'saturday', label: 'Saturday', short: 'Sat' },
    { key: 'sunday', label: 'Sunday', short: 'Sun' }
  ];

  const timeSlotTypes = [
    { value: 'consultations', label: 'Consultations', color: 'bg-blue-100 text-blue-800' },
    { value: 'project_work', label: 'Project Work', color: 'bg-green-100 text-green-800' },
    { value: 'emergency_only', label: 'Emergency Only', color: 'bg-red-100 text-red-800' },
    { value: 'meetings', label: 'Meetings', color: 'bg-purple-100 text-purple-800' }
  ];

  const tabs = [
    { id: 'schedule', label: 'Weekly Schedule', icon: Calendar },
    { id: 'preferences', label: 'Booking Preferences', icon: Settings },
    { id: 'special', label: 'Special Dates', icon: Star },
    { id: 'booking', label: 'Booking Link', icon: Share2 }
  ];

  const getAvailabilityStats = () => {
    const totalSlots = Object.values(availability.weeklySchedule).reduce((sum, day) => sum + day.slots.length, 0);
    const availableDays = Object.values(availability.weeklySchedule).filter(day => day.isAvailable).length;
    const totalHours = Object.values(availability.weeklySchedule).reduce((sum, day) => {
      return sum + day.slots.reduce((slotSum, slot) => {
        const start = new Date(`2024-01-01T${slot.start}`);
        const end = new Date(`2024-01-01T${slot.end}`);
        return slotSum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }, 0);
    }, 0);

    return {
      totalSlots,
      availableDays,
      totalHours: Math.round(totalHours * 10) / 10
    };
  };

  const stats = getAvailabilityStats();

  const handleDayToggle = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: {
          ...prev.weeklySchedule[day],
          isAvailable: !prev.weeklySchedule[day].isAvailable
        }
      }
    }));
  };

  const addTimeSlot = (day: string, slot: { start: string; end: string; type: string }) => {
    setAvailability(prev => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: {
          ...prev.weeklySchedule[day],
          slots: [...prev.weeklySchedule[day].slots, slot]
        }
      }
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability(prev => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: {
          ...prev.weeklySchedule[day],
          slots: prev.weeklySchedule[day].slots.filter((_, i) => i !== index)
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl text-dark-900">
                Availability Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your working hours and booking preferences
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
                <Copy className="h-5 w-5" />
                <span>Copy Booking Link</span>
              </button>
              <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-900">{stats.availableDays}</p>
                <p className="text-sm text-gray-600">Available Days</p>
              </div>
            </div>
            <p className="text-gray-700 font-medium">Days per Week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-900">{stats.totalHours}</p>
                <p className="text-sm text-gray-600">Total Hours</p>
              </div>
            </div>
            <p className="text-gray-700 font-medium">Hours per Week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Timer className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-900">{stats.totalSlots}</p>
                <p className="text-sm text-gray-600">Time Slots</p>
              </div>
            </div>
            <p className="text-gray-700 font-medium">Available Slots</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <h2 className="font-heading font-semibold text-xl text-dark-900 mb-6">
              Weekly Schedule
            </h2>
            
            {/* General Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select 
                  value={availability.timezone}
                  onChange={(e) => setAvailability(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/New_York">Eastern Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer Time (minutes)
                </label>
                <select 
                  value={availability.bufferTime}
                  onChange={(e) => setAvailability(prev => ({ ...prev, bufferTime: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={0}>No Buffer</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Advance Booking (days)
                </label>
                <select 
                  value={availability.maxAdvanceBooking}
                  onChange={(e) => setAvailability(prev => ({ ...prev, maxAdvanceBooking: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={7}>1 week</option>
                  <option value={14}>2 weeks</option>
                  <option value={30}>1 month</option>
                  <option value={60}>2 months</option>
                  <option value={90}>3 months</option>
                </select>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="space-y-4">
              {days.map(day => (
                <div key={day.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleDayToggle(day.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          availability.weeklySchedule[day.key].isAvailable 
                            ? 'bg-primary-500' 
                            : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            availability.weeklySchedule[day.key].isAvailable 
                              ? 'translate-x-6' 
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <h3 className="font-semibold text-lg text-dark-900">
                        {day.label}
                      </h3>
                      {!availability.weeklySchedule[day.key].isAvailable && (
                        <span className="text-sm text-gray-500">Unavailable</span>
                      )}
                    </div>
                    {availability.weeklySchedule[day.key].isAvailable && (
                      <button
                        onClick={() => setSelectedDay(day.key)}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Time Slot</span>
                      </button>
                    )}
                  </div>
                  
                  {availability.weeklySchedule[day.key].isAvailable && (
                    <div className="space-y-2">
                      {availability.weeklySchedule[day.key].slots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <span className="font-medium text-dark-900">
                              {slot.start} - {slot.end}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              timeSlotTypes.find(t => t.value === slot.type)?.color || 'bg-gray-100 text-gray-800'
                            }`}>
                              {timeSlotTypes.find(t => t.value === slot.type)?.label || slot.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingSlot({ day: day.key, index, slot })}
                              className="p-1 text-gray-400 hover:text-primary-500 transition-colors duration-200"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeTimeSlot(day.key, index)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {availability.weeklySchedule[day.key].slots.length === 0 && (
                        <p className="text-gray-500 text-sm italic">
                          No time slots set for this day
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <h2 className="font-heading font-semibold text-xl text-dark-900 mb-6">
              Booking Preferences
            </h2>
            
            <div className="space-y-8">
              {/* Service Types */}
              <div>
                <h3 className="font-semibold text-lg text-dark-900 mb-4">Service Types</h3>
                <div className="space-y-3">
                  {bookingPreferences.serviceTypes.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            const newServices = [...bookingPreferences.serviceTypes];
                            newServices[index].enabled = !newServices[index].enabled;
                            setBookingPreferences(prev => ({ ...prev, serviceTypes: newServices }));
                          }}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                            service.enabled ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                              service.enabled ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <div>
                          <h4 className="font-medium text-dark-900">{service.name}</h4>
                          <p className="text-sm text-gray-600">
                            {service.duration} minutes • ${service.price} • {service.buffer}min buffer
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Settings */}
              <div>
                <h3 className="font-semibold text-lg text-dark-900 mb-4">Booking Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-dark-900">Auto-confirm bookings</h4>
                        <p className="text-sm text-gray-600">Automatically confirm all bookings</p>
                      </div>
                      <button
                        onClick={() => setAvailability(prev => ({ ...prev, autoConfirm: !prev.autoConfirm }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          availability.autoConfirm ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            availability.autoConfirm ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-dark-900">Allow rescheduling</h4>
                        <p className="text-sm text-gray-600">Let clients reschedule appointments</p>
                      </div>
                      <button
                        onClick={() => setAvailability(prev => ({ ...prev, allowRescheduling: !prev.allowRescheduling }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          availability.allowRescheduling ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            availability.allowRescheduling ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-dark-900">Payment required</h4>
                        <p className="text-sm text-gray-600">Require payment at booking</p>
                      </div>
                      <button
                        onClick={() => setBookingPreferences(prev => ({ ...prev, paymentRequired: !prev.paymentRequired }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          bookingPreferences.paymentRequired ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            bookingPreferences.paymentRequired ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-dark-900">Deposit required</h4>
                        <p className="text-sm text-gray-600">Require deposit at booking</p>
                      </div>
                      <button
                        onClick={() => setBookingPreferences(prev => ({ ...prev, depositRequired: !prev.depositRequired }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          bookingPreferences.depositRequired ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            bookingPreferences.depositRequired ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-dark-900">Instant booking</h4>
                        <p className="text-sm text-gray-600">Allow instant booking without approval</p>
                      </div>
                      <button
                        onClick={() => setBookingPreferences(prev => ({ ...prev, allowInstantBooking: !prev.allowInstantBooking }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          bookingPreferences.allowInstantBooking ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            bookingPreferences.allowInstantBooking ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-dark-900">Require approval</h4>
                        <p className="text-sm text-gray-600">Manually approve each booking</p>
                      </div>
                      <button
                        onClick={() => setBookingPreferences(prev => ({ ...prev, requireApproval: !prev.requireApproval }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          bookingPreferences.requireApproval ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            bookingPreferences.requireApproval ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'special' && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-xl text-dark-900">
                Special Dates
              </h2>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Special Date</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {availability.specialDates.map((specialDate, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-dark-900">{specialDate.date}</h4>
                      <p className="text-sm text-gray-600">
                        {specialDate.reason} • {specialDate.type}
                      </p>
                      {specialDate.note && (
                        <p className="text-sm text-gray-500 mt-1">{specialDate.note}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors duration-200">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <h2 className="font-heading font-semibold text-xl text-dark-900 mb-6">
              Booking Link
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-dark-900 mb-2">Your Booking Link</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value="https://alisthomepros.com/book/sarah-mitchell"
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-700"
                  />
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2">
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-dark-900">Share Options</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-700">Email Link</span>
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-700">QR Code</span>
                      <Download className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-700">Embed Widget</span>
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-dark-900">Link Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Public visibility</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-primary-500 transition-colors duration-200">
                        <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 translate-x-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Require login</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200 transition-colors duration-200">
                        <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 translate-x-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Send notifications</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-primary-500 transition-colors duration-200">
                        <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 translate-x-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 