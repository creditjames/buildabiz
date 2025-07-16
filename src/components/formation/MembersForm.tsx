import React from 'react';
import { Plus, Trash2, Info } from 'lucide-react';

interface MembersFormProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const MembersForm: React.FC<MembersFormProps> = ({ formData, updateFormData }) => {
  const addMember = () => {
    const updatedMembers = [
      ...formData.members,
      { name: '', title: '', address: '', ownership: '' }
    ];
    updateFormData('members', updatedMembers);
  };
  
  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      const updatedMembers = formData.members.filter((_: any, i: number) => i !== index);
      updateFormData('members', updatedMembers);
    }
  };
  
  const updateMember = (index: number, field: string, value: string) => {
    const updatedMembers = formData.members.map((member: any, i: number) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    updateFormData('members', updatedMembers);
  };
  
  const memberTitle = formData.entityType === 'llc' ? 'Member/Manager' : 'Director/Officer';
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {formData.entityType === 'llc' ? 'Members & Managers' : 'Directors & Officers'}
      </h2>
      <p className="text-gray-600 mb-6">
        {formData.entityType === 'llc' 
          ? 'Add the members and/or managers who will own and operate your LLC.' 
          : 'Add the directors and officers who will govern your corporation.'}
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <Info size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">
              {formData.entityType === 'llc' ? 'LLC Management Structure' : 'Corporate Structure'}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              {formData.entityType === 'llc' 
                ? 'An LLC can be member-managed (all owners participate in management) or manager-managed (designated managers run the business).' 
                : 'A corporation has shareholders (owners), directors (governing board), and officers (day-to-day managers).'}
            </p>
          </div>
        </div>
      </div>
      
      {formData.members.map((member: any, index: number) => (
        <div key={index} className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {memberTitle} #{index + 1}
            </h3>
            {formData.members.length > 1 && (
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="text-red-500 hover:text-red-700 flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                <span>Remove</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id={`name-${index}`}
                value={member.name}
                onChange={(e) => updateMember(index, 'name', e.target.value)}
                placeholder="Full legal name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id={`title-${index}`}
                value={member.title}
                onChange={(e) => updateMember(index, 'title', e.target.value)}
                placeholder={formData.entityType === 'llc' ? 'e.g., Member, Manager' : 'e.g., Director, CEO, Secretary'}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor={`address-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id={`address-${index}`}
              value={member.address}
              onChange={(e) => updateMember(index, 'address', e.target.value)}
              placeholder="Full address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          
          <div className="mt-4 md:w-1/2">
            <label htmlFor={`ownership-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Ownership Percentage
            </label>
            <div className="relative">
              <input
                type="text"
                id={`ownership-${index}`}
                value={member.ownership}
                onChange={(e) => updateMember(index, 'ownership', e.target.value)}
                placeholder="e.g., 50"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addMember}
        className="flex items-center text-orange-500 hover:text-orange-600 font-medium"
      >
        <Plus size={16} className="mr-1" />
        <span>Add Another {memberTitle}</span>
      </button>
    </div>
  );
};

export default MembersForm;