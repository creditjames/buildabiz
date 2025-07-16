import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HexColorPicker } from 'react-colorful';
import toast from 'react-hot-toast';
import {
  User,
  Building,
  Mail,
  Phone,
  Clock,
  Image,
  Bell,
  Shield,
  Trash2,
  Save,
  Upload,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  tagline: string;
  industry: string;
  businessHours: string;
  timezone: string;
  brandColor: string;
  emailNotifications: boolean;
  newsletter: boolean;
  preferredContact: 'email' | 'phone';
  twoFactorEnabled: boolean;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string>('');
  const [previewLogo, setPreviewLogo] = useState<string>('');
  const [hasBusinessRecord, setHasBusinessRecord] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    tagline: '',
    industry: '',
    businessHours: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    brandColor: '#FF5A1F',
    emailNotifications: true,
    newsletter: true,
    preferredContact: 'email',
    twoFactorEnabled: false
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  useEffect(() => {
    loadProfile();
    
    // Handle clicking outside of color picker
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        navigate('/login');
        return;
      }

      // Use maybeSingle() to handle cases where no business record exists
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setHasBusinessRecord(true);
        
        // Get brand color from business_plan object or use default
        const existingBrandColor = data.business_plan?.brand_color || '#FF5A1F';
        
        // Safely extract address from business_address JSONB field
        let addressString = '';
        if (data.business_address) {
          if (typeof data.business_address === 'string') {
            addressString = data.business_address;
          } else if (data.business_address.street) {
            addressString = data.business_address.street;
          } else if (data.business_address.address) {
            addressString = data.business_address.address;
          }
        }
        
        setProfile({
          fullName: data.owner_name || '',
          businessName: data.business_name || '',
          email: user.email || '',
          phone: data.phone || '',
          address: addressString,
          tagline: data.tagline || '',
          industry: data.industry || '',
          businessHours: data.business_hours || '',
          timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          brandColor: existingBrandColor,
          emailNotifications: data.email_notifications !== false,
          newsletter: data.newsletter !== false,
          preferredContact: data.preferred_contact || 'email',
          twoFactorEnabled: data.two_factor_enabled || false
        });

        if (data.profile_image_url) {
          setPreviewProfile(data.profile_image_url);
        }
        if (data.logo_url) {
          setPreviewLogo(data.logo_url);
        }
      } else {
        // No business record exists, use defaults with user email
        setHasBusinessRecord(false);
        setProfile(prev => ({
          ...prev,
          email: user.email || ''
        }));
      }

      setLoading(false);
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile settings');
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'logo') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'profile') {
        setProfileImage(file);
        setPreviewProfile(reader.result as string);
      } else {
        setLogoImage(file);
        setPreviewLogo(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('public')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSave = async (section?: string) => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      let updates: any = {};

      if (!section || section === 'profile' || section === 'business') {
        if (profileImage) {
          const profileUrl = await uploadImage(profileImage, 'profile-images');
          updates.profile_image_url = profileUrl;
        }
        if (logoImage) {
          const logoUrl = await uploadImage(logoImage, 'business-logos');
          updates.logo_url = logoUrl;
        }

        // Get existing business_plan data to preserve other properties
        let existingBusinessPlan = {};
        if (hasBusinessRecord) {
          const { data: existingData } = await supabase
            .from('businesses')
            .select('business_plan')
            .eq('user_id', user.id)
            .maybeSingle();
          
          existingBusinessPlan = existingData?.business_plan || {};
        }

        updates = {
          ...updates,
          user_id: user.id,
          business_name: profile.businessName,
          entity_type: 'LLC', // Default entity type
          state: 'CA', // Default state
          business_address: { street: profile.address },
          registered_agent: {}, // Default empty object
          members: [], // Default empty array
          business_purpose: profile.tagline || 'General business purposes',
          selected_package: 'basic', // Default package
          business_plan: {
            ...existingBusinessPlan,
            brand_color: profile.brandColor
          }
        };

        // Add optional fields that might not exist in the schema
        const optionalFields = {
          owner_name: profile.fullName,
          phone: profile.phone,
          tagline: profile.tagline,
          industry: profile.industry,
          business_hours: profile.businessHours,
          timezone: profile.timezone,
          email_notifications: profile.emailNotifications,
          newsletter: profile.newsletter,
          preferred_contact: profile.preferredContact,
          two_factor_enabled: profile.twoFactorEnabled
        };

        // Only add optional fields if they have values
        Object.entries(optionalFields).forEach(([key, value]) => {
          if (value !== '' && value !== null && value !== undefined) {
            updates[key] = value;
          }
        });
      }

      if (!section || section === 'password') {
        if (passwords.new) {
          const { error: passwordError } = await supabase.auth.updateUser({
            password: passwords.new
          });
          if (passwordError) throw passwordError;
          setPasswords({ current: '', new: '', confirm: '' });
        }
      }

      // Use upsert to handle both insert and update cases
      if (hasBusinessRecord) {
        const { error: updateError } = await supabase
          .from('businesses')
          .update(updates)
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('businesses')
          .insert(updates);

        if (insertError) throw insertError;
        setHasBusinessRecord(true);
      }

      toast.success('Settings updated successfully');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmed) {
      try {
        setSaving(true);
        await supabase.auth.signOut();
        navigate('/');
        toast.success('Account deleted successfully');
      } catch (error: any) {
        console.error('Error deleting account:', error);
        toast.error('Failed to delete account');
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and business preferences</p>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            <button
              onClick={() => handleSave('profile')}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save size={18} className="mr-2" />
              )}
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                      {previewProfile ? (
                        <img
                          src={previewProfile}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-4 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-600 transition-colors">
                      <Upload size={14} className="text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'profile')}
                      />
                    </label>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">
                      Upload a professional photo (max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden">
                      {previewLogo ? (
                        <img
                          src={previewLogo}
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Building className="w-full h-full p-4 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-600 transition-colors">
                      <Upload size={14} className="text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'logo')}
                      />
                    </label>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">
                      Upload your company logo (max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Business Details</h2>
            <button
              onClick={() => handleSave('business')}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save size={18} className="mr-2" />
              )}
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address
                </label>
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Hours
                </label>
                <input
                  type="text"
                  value={profile.businessHours}
                  onChange={(e) => setProfile({ ...profile, businessHours: e.target.value })}
                  placeholder="e.g., Mon-Fri: 9AM-5PM"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {Intl.supportedValuesOf('timeZone').map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Tagline
                </label>
                <textarea
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  rows={2}
                  placeholder="A brief description of your business"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={profile.industry}
                  onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Color
                </label>
                <div className="relative">
                  <div
                    className="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                    style={{ backgroundColor: profile.brandColor }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  {showColorPicker && (
                    <div
                      ref={colorPickerRef}
                      className="absolute z-10 mt-2"
                      style={{ top: '100%' }}
                    >
                      <HexColorPicker
                        color={profile.brandColor}
                        onChange={(color) => setProfile({ ...profile, brandColor: color })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
            <button
              onClick={() => handleSave('security')}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save size={18} className="mr-2" />
              )}
              Save Changes
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {profile.twoFactorEnabled
                      ? 'Two-factor authentication is enabled'
                      : 'Two-factor authentication is disabled'}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setProfile({
                      ...profile,
                      twoFactorEnabled: !profile.twoFactorEnabled,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    profile.twoFactorEnabled ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      profile.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Communication Preferences</h2>
            <button
              onClick={() => handleSave('communications')}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save size={18} className="mr-2" />
              )}
              Save Changes
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">
                  Receive updates about your business formation progress
                </p>
              </div>
              <button
                onClick={() =>
                  setProfile({
                    ...profile,
                    emailNotifications: !profile.emailNotifications,
                  })
                }
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  profile.emailNotifications ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    profile.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Newsletter Subscription</h3>
                <p className="text-sm text-gray-500">
                  Receive tips and updates about running your business
                </p>
              </div>
              <button
                onClick={() =>
                  setProfile({
                    ...profile,
                    newsletter: !profile.newsletter,
                  })
                }
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  profile.newsletter ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    profile.newsletter ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Preferred Contact Method
              </h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={profile.preferredContact === 'email'}
                    onChange={() =>
                      setProfile({ ...profile, preferredContact: 'email' })
                    }
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-700">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={profile.preferredContact === 'phone'}
                    onChange={() =>
                      setProfile({ ...profile, preferredContact: 'phone' })
                    }
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-700">Phone</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>
          <p className="text-red-700 mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <Trash2 size={18} className="mr-2" />
            )}
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;