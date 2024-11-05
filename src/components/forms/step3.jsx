import React from 'react';

const Step3 = ({ bestTimeToCall, setBestTimeToCall, deadlineDate, setDeadlineDate, extraInfo, setExtraInfo, currency, setCurrency, budget, handleBudgetChange, isDarkMode }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 3: Preferences</h2>
    <label className="block mb-2">
      Best Time to Call You:
      <input
        type="text"
        value={bestTimeToCall}
        onChange={(e) => setBestTimeToCall(e.target.value)}
        className={`mt-1 block w-full border rounded px-2 py-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
        }`}
        placeholder="Enter the best time to call"
      />
    </label>
    <label className="block mb-2">
      Deadline Date:
      <input
        type="date"
        value={deadlineDate}
        onChange={(e) => setDeadlineDate(e.target.value)}
        className={`mt-1 block w-full border rounded px-2 py-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
        }`}
      />
    </label>
    <label className="block mb-2">
      Extra Info:
      <textarea
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
        className={`mt-1 block w-full border rounded px-2 py-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
        }`}
        rows="4"
        placeholder="Enter any additional information"
      />
    </label>
    <label className="block mb-2">
      Currency:
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className={`mt-1 block w-full border rounded px-2 py-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
        }`}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
      </select>
    </label>
    <label className="block mb-2">
      Budget:
      <div className="flex items-center">
        <input
          type="number"
          value={budget}
          onChange={(e) => handleBudgetChange(e.target.value)}
          className={`mr-2 w-20 border rounded px-2 py-1 ${
            isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
          }`}
          min="0"
          placeholder="Enter budget"
        />
        <input
          type="range"
          min="0"
          max="10000"
          step="5"
          value={budget}
          onChange={(e) => handleBudgetChange(e.target.value)}
          className="flex-grow"
        />
      </div>
    </label>
  </div>
);

export default Step3;
