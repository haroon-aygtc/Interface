import React from 'react';

// Define a simple placeholder component
const SimpleResponseFormatterTab: React.FC = () => {
  return (
    <div className="p-6 border rounded-md">
      <h2 className="text-xl font-semibold mb-4">Response Formatter</h2>
      <p className="text-gray-600 mb-4">
        This component allows you to create and manage response formats for AI-generated content.
      </p>
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
        <p className="text-yellow-800">
          <strong>Note:</strong> The drag-and-drop functionality is currently unavailable. 
          Please install the required dependencies to enable this feature.
        </p>
        <p className="text-yellow-800 mt-2">
          Run: <code className="bg-yellow-100 px-2 py-1 rounded">npm install @hello-pangea/dnd</code>
        </p>
      </div>
    </div>
  );
};

export default SimpleResponseFormatterTab;
