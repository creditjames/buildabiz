import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, TrendingUp, DollarSign, FileText, Clock, Check, X, ArrowRight, Star } from 'lucide-react';

interface EntityFeature {
  feature: string;
  llc: boolean | string;
  corp: boolean | string;
  nonprofit: boolean | string;
  description?: string;
}

const EntityComparison: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const features: EntityFeature[] = [
    {
      feature: "Liability Protection",
      llc: true,
      corp: true,
      nonprofit: true,
      description: "Personal assets protected from business debts and lawsuits"
    },
    {
      feature: "Tax Structure",
      llc: "Pass-through",
      corp: "Double taxation",
      nonprofit: "Tax-exempt",
      description: "How the entity is taxed at federal and state levels"
    },
    {
      feature: "Formation Cost",
      llc: "$100-500",
      corp: "$200-800",
      nonprofit: "$50-400",
      description: "Typical state filing fees and legal costs"
    },
    {
      feature: "Formation Time",
      llc: "1-2 weeks",
      corp: "2-4 weeks",
      nonprofit: "2-6 weeks",
      description: "Time to complete formation process"
    },
    {
      feature: "Ongoing Compliance",
      llc: "Minimal",
      corp: "Moderate",
      nonprofit: "Moderate",
      description: "Annual reporting and maintenance requirements"
    },
    {
      feature: "Ownership Transfer",
      llc: "Restricted",
      corp: "Easy",
      nonprofit: "Restricted",
      description: "How easily ownership can be transferred"
    },
    {
      feature: "Investor Attraction",
      llc: "Limited",
      corp: "Excellent",
      nonprofit: "Limited",
      description: "Ability to attract outside investors"
    },
    {
      feature: "Management Structure",
      llc: "Flexible",
      corp: "Formal",
      nonprofit: "Board required",
      description: "Required management and governance structure"
    },
    {
      feature: "Profit Distribution",
      llc: "Flexible",
      corp: "By shares",
      nonprofit: "Reinvested",
      description: "How profits can be distributed to owners"
    },
    {
      feature: "Lifespan",
      llc: "Perpetual",
      corp: "Perpetual",
      nonprofit: "Perpetual",
      description: "Entity continues after owner changes"
    }
  ];

  const getFeatureIcon = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      );
    }
    return <span className="text-sm font-medium text-gray-700">{value}</span>;
  };

  const getFeatureColor = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? 'text-green-600' : 'text-red-600';
    }
    return 'text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">Business Entity</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Compare LLCs, Corporations, and Nonprofits to find the perfect structure for your business goals
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-gray-600">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                <span>Liability Protection</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                <span>Tax Benefits</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2 text-purple-500" />
                <span>Flexible Structure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Comparison Cards */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Quick Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* LLC Card */}
          <div 
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedEntity === 'llc' ? 'ring-4 ring-orange-500/50' : ''
            }`}
            onClick={() => setSelectedEntity(selectedEntity === 'llc' ? null : 'llc')}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">LLC</h3>
                <p className="text-gray-600">Limited Liability Company</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Pass-through taxation</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Flexible management</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Minimal compliance</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-orange-600">$100-500</span>
                <p className="text-sm text-gray-500">Formation cost</p>
              </div>
            </div>
          </div>

          {/* Corporation Card */}
          <div 
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedEntity === 'corp' ? 'ring-4 ring-blue-500/50' : ''
            }`}
            onClick={() => setSelectedEntity(selectedEntity === 'corp' ? null : 'corp')}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Corporation</h3>
                <p className="text-gray-600">C Corporation</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Stock issuance</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Investor friendly</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Perpetual existence</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">$200-800</span>
                <p className="text-sm text-gray-500">Formation cost</p>
              </div>
            </div>
          </div>

          {/* Nonprofit Card */}
          <div 
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedEntity === 'nonprofit' ? 'ring-4 ring-purple-500/50' : ''
            }`}
            onClick={() => setSelectedEntity(selectedEntity === 'nonprofit' ? null : 'nonprofit')}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nonprofit</h3>
                <p className="text-gray-600">501(c)(3) Organization</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Tax-exempt status</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Donation tax benefits</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Public purpose</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-purple-600">$50-400</span>
                <p className="text-sm text-gray-500">Formation cost</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compare Buttons */}
        {selectedEntity && (
          <div className="text-center mb-12">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to form your {selectedEntity === 'llc' ? 'LLC' : selectedEntity === 'corp' ? 'Corporation' : 'Nonprofit'}?
              </h3>
              <p className="text-gray-600 mb-6">
                Get started with our streamlined formation process
              </p>
              <Link
                to="/formation"
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Formation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        )}

        {/* Detailed Comparison Table */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Detailed Comparison
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Compare all features side by side
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-orange-600">LLC</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Corporation</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">Nonprofit</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{feature.feature}</div>
                        {feature.description && (
                          <div className="text-sm text-gray-500 mt-1">{feature.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {getFeatureIcon(feature.llc)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {getFeatureIcon(feature.corp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {getFeatureIcon(feature.nonprofit)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Still Not Sure Which Entity to Choose?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our business formation experts can help you make the right decision
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Expert Advice
              </Link>
              <Link
                to="/formation"
                className="bg-orange-600/20 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600/30 transition-colors"
              >
                Start Formation Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityComparison;