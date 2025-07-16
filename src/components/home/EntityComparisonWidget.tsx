import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';

const EntityComparisonWidget = () => {
  const [selectedEntities, setSelectedEntities] = useState<string[]>(['llc', 'c-corp']);
  
  const entityTypes = [
    { value: 'llc', label: 'LLC' },
    { value: 'c-corp', label: 'C Corporation' },
    { value: 's-corp', label: 'S Corporation' },
    { value: 'sole-prop', label: 'Sole Proprietorship' }
  ];
  
  const handleEntityToggle = (value: string) => {
    if (selectedEntities.includes(value)) {
      if (selectedEntities.length > 1) {
        setSelectedEntities(selectedEntities.filter(entity => entity !== value));
      }
    } else {
      if (selectedEntities.length < 3) {
        setSelectedEntities([...selectedEntities, value]);
      }
    }
  };
  
  const comparisonData = [
    {
      feature: 'Limited Liability Protection',
      llc: true,
      'c-corp': true,
      's-corp': true,
      'sole-prop': false
    },
    {
      feature: 'Double Taxation',
      llc: false,
      'c-corp': true,
      's-corp': false,
      'sole-prop': false
    },
    {
      feature: 'Self-Employment Tax',
      llc: true,
      'c-corp': false,
      's-corp': false,
      'sole-prop': true
    },
    {
      feature: 'Ownership Restrictions',
      llc: false,
      'c-corp': false,
      's-corp': true,
      'sole-prop': false
    },
    {
      feature: 'Ability to Raise Capital',
      llc: 'Medium',
      'c-corp': 'High',
      's-corp': 'Medium',
      'sole-prop': 'Low'
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Compare Business Entities</h3>
        <div className="flex flex-wrap gap-2">
          {entityTypes.map((entity) => (
            <button
              key={entity.value}
              onClick={() => handleEntityToggle(entity.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedEntities.includes(entity.value)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {entity.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 bg-gray-50">Features</th>
              {selectedEntities.map((entity) => (
                <th key={entity} className="text-center p-4 bg-gray-50 min-w-[150px]">
                  {entityTypes.find(e => e.value === entity)?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4 font-medium text-gray-700">{row.feature}</td>
                {selectedEntities.map((entity) => (
                  <td key={entity} className="p-4 text-center">
                    {typeof row[entity as keyof typeof row] === 'boolean' ? (
                      row[entity as keyof typeof row] ? (
                        <Check size={20} className="text-green-500 mx-auto" />
                      ) : (
                        <X size={20} className="text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{row[entity as keyof typeof row]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="text-gray-600">Need help deciding?</span>
          <Link to="/entity-quiz" className="ml-2 text-orange-500 hover:text-orange-600">
            Take our quick entity quiz
          </Link>
        </div>
        <Link 
          to="/compare-entities" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
        >
          <span>See full comparison</span>
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default EntityComparisonWidget;