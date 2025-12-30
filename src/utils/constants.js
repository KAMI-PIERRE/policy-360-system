// src/utils/constants.js
export const SECTORS = [
  {
    id: 'education',
    name: 'Education',
    icon: '🏫',
    color: '#4CAF50',
    description: 'Educational policies, curriculum development, learning outcomes',
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🏥',
    color: '#F44336',
    description: 'Healthcare policies, public health, medical services',
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: '🌾',
    color: '#FF9800',
    description: 'Agricultural policies, food security, rural development',
  },
  {
    id: 'urbanization',
    name: 'Urbanization',
    icon: '🏙️',
    color: '#2196F3',
    description: 'Urban planning, housing policies, infrastructure',
  },
  {
    id: 'technology',
    name: 'ICT & Technology',
    icon: '💻',
    color: '#9C27B0',
    description: 'Tech policies, digital transformation, innovation',
  },
];

export const POLICY_STAGES = [
  { id: 'ideation', name: 'Ideation', icon: '💡', color: '#FF9800' },
  { id: 'analysis', name: 'Analysis', icon: '📊', color: '#2196F3' },
  { id: 'implementation', name: 'Implementation', icon: '🚀', color: '#4CAF50' },
  { id: 'monitoring', name: 'Monitoring', icon: '📈', color: '#9C27B0' },
  { id: 'evaluation', name: 'Evaluation', icon: '📝', color: '#F44336' },
  { id: 'success', name: 'Success', icon: '🏆', color: '#FFC107' },
];

export const DATA_SOURCES = [
  { id: 'document', name: 'Document Upload', icon: '📄', formats: ['PDF', 'Excel', 'CSV', 'Word'] },
  { id: 'manual', name: 'Manual Entry', icon: '✏️', formats: ['Forms', 'Text Input', 'Data Tables'] },
  { id: 'scraping', name: 'Web Scraping', icon: '🌐', formats: ['Websites', 'APIs', 'Databases'] },
];