import React from 'react';

const Step1 = ({ services, handleOptionChange, otherService, handleOtherInputChange, isDarkMode }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 1: Select Services</h2>
    {['web development', 'web design', 'backend', 'hosting', 'domain', 'other'].map((service) => (
      <label
        key={service}
        className={`flex items-center mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}
      >
        <input
          type="checkbox"
          value={service}
          checked={services.includes(service)}
          onChange={handleOptionChange}
          className={`mr-2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
        />
        {service}
      </label>
    ))}

    {services.includes('other') && (
      <input
        type="text"
        value={otherService}
        onChange={handleOtherInputChange}
        placeholder="Please specify"
        className={`border rounded p-2 mt-2 w-full ${
          isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
        }`}
      />
    )}
  </div>
);

export default Step1;
