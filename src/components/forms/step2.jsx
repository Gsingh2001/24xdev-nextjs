import React from 'react';

const Step2 = ({ name, setName, email, setEmail, contactNumber, setContactNumber, isDarkMode }) => (
  <div>
    <label className="block mb-2">
      Name:
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`mt-1 block w-full border rounded px-2 py-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
        }`}
        placeholder="Enter your name"
      />
    </label>
    <label className="block mb-2">
      Email:
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`mt-1 block w-full border rounded px-2 py-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
        }`}
        placeholder="Enter your email"
      />
    </label>
    <label className="block mb-2">
      Contact Number:
      <input
        type="tel"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        className={`mt-1 block w-full border rounded px-2 py-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
        }`}
        placeholder="Enter your contact number"
      />
    </label>
  </div>
);

export default Step2;
