import React from 'react';

const Step4 = ({ userData, isDarkMode }) => (
  <div>
    <h2 className={`text-2xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
      Step 4: Review and Submit
    </h2>
    <div className="mb-6">
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Review Your Information
      </h3>
      <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
        <p className="mb-1"><strong>Selected Services:</strong> {userData.services?.length > 0 ? userData.services.join(', ') : 'None'}</p>
        <p className="mb-1"><strong>Name:</strong> {userData.name || 'N/A'}</p>
        <p className="mb-1"><strong>Email:</strong> {userData.email || 'N/A'}</p>
        <p className="mb-1"><strong>Contact Number:</strong> {userData.contactNumber || 'N/A'}</p>
        <p className="mb-1"><strong>Best Time to Call:</strong> {userData.bestTimeToCall || 'N/A'}</p>
        <p className="mb-1"><strong>Deadline Date:</strong> {userData.deadlineDate || 'N/A'}</p>
        <p className="mb-1"><strong>Extra Info:</strong> {userData.extraInfo || 'N/A'}</p>
        <p className="mb-1"><strong>Budget:</strong> {userData.budget ? `${userData.budget} ${userData.currency}` : 'N/A'}</p>
      </div>
    </div>
  </div>
);

export default Step4;
