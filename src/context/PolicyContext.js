// src/context/PolicyContext.js
// Add this import at the top of src/context/PolicyContext.js
import toast from 'react-hot-toast';
import React, { createContext, useState, useContext } from 'react';
import { mockPolicies } from '../utils/mockData';

const PolicyContext = createContext({});

export const usePolicy = () => useContext(PolicyContext);

export const PolicyProvider = ({ children }) => {
  const [policies, setPolicies] = useState(mockPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const createPolicy = (policyData) => {
    const newPolicy = {
      id: 'policy_' + Date.now(),
      ...policyData,
      createdAt: new Date().toISOString(),
      status: 'draft',
      progress: 0,
      stage: 'ideation',
      stakeholders: 0,
    };
    
    setPolicies(prev => [newPolicy, ...prev]);
    setSelectedPolicy(newPolicy);
    return newPolicy;
  };

  const updatePolicy = (policyId, updates) => {
    setPolicies(prev =>
      prev.map(policy =>
        policy.id === policyId ? { ...policy, ...updates } : policy
      )
    );
    
    if (selectedPolicy && selectedPolicy.id === policyId) {
      setSelectedPolicy(prev => ({ ...prev, ...updates }));
    }
  };

  const deletePolicy = (policyId) => {
    setPolicies(prev => prev.filter(policy => policy.id !== policyId));
    if (selectedPolicy && selectedPolicy.id === policyId) {
      setSelectedPolicy(null);
    }
  };

  const importData = (policyId, data, type) => {
    // Simulate data import
    const policy = policies.find(p => p.id === policyId);
    if (policy) {
      toast.success(`Data imported successfully via ${type}!`);
      updatePolicy(policyId, {
        lastDataImport: new Date().toISOString(),
        dataSources: [...(policy.dataSources || []), { type, timestamp: new Date(), count: data.length }],
      });
    }
  };

  return (
    <PolicyContext.Provider
      value={{
        policies,
        selectedPolicy,
        setSelectedPolicy,
        createPolicy,
        updatePolicy,
        deletePolicy,
        importData,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};