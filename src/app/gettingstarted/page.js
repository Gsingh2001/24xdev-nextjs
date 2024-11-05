"use client";
import React, { useState, useEffect } from 'react';

import { useTheme } from '@/app/assets/ThemeContext';
import Step1 from '@/components/forms/Step1';
import Step2 from '@/components/forms/Step2';
import Step3 from '@/components/forms/Step3';
import Step4 from '@/components/forms/Step4';
import ThankYouStep from '@/components/forms/ThankYouStep';

const StepIndicator = ({ currentStep, onStepChange }) => {
  const steps = ['1', '2', '3', '4'];

  return (
    <div className="flex justify-center space-x-4 mb-4">
      {steps.map((step, index) => (
        <button
          key={index}
          onClick={() => onStepChange(index + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition duration-200 ${
            currentStep === index + 1
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-200 text-gray-600 border-gray-300 hover:bg-blue-100'
          }`}
        >
          {step}
        </button>
      ))}
    </div>
  );
};

const GettingStarted = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      services: [],
      otherService: '',
      name: '',
      email: '',
      contactNumber: '',
      bestTimeToCall: '',
      deadlineDate: '',
      extraInfo: '',
      currency: 'USD',
      budget: 0,
    });
  
    const { isDarkMode } = useTheme();
  
    useEffect(() => {
      const storedData = sessionStorage.getItem('formData');
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
    }, []);
  
    useEffect(() => {
      sessionStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);
  
    const handleOptionChange = (e) => {
      const value = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        services: prevData.services.includes(value)
          ? prevData.services.filter((service) => service !== value)
          : [...prevData.services, value],
      }));
    };
  
    const handleInputChange = (key, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };
  
    const handleNext = () => {
      if (currentStep === 4) {
        handleSubmit();
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    };
  
    const handleBack = () => {
      setCurrentStep((prevStep) => prevStep - 1);
    };
  
    const handleStepChange = (step) => {
      setCurrentStep(step);
    };
  
    const handleSubmit = async () => {
      try {
        const response = await fetch('https://two4xdevbackend.onrender.com/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        alert('Form submitted successfully!');
        setCurrentStep(5);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again.');
      }
    };
  
    return (
      <div className={`p-6 max-w-2xl mx-auto rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Getting Started</h2>
        
        {/* Step Indicators */}
        <StepIndicator currentStep={currentStep} onStepChange={handleStepChange} />
  
        {currentStep === 1 && (
          <Step1
            services={formData.services}
            handleOptionChange={handleOptionChange}
            otherService={formData.otherService}
            handleOtherInputChange={(e) => handleInputChange('otherService', e.target.value)}
            isDarkMode={isDarkMode}
          />
        )}
        {currentStep === 2 && (
          <Step2
            name={formData.name}
            setName={(name) => handleInputChange('name', name)}
            email={formData.email}
            setEmail={(email) => handleInputChange('email', email)}
            contactNumber={formData.contactNumber}
            setContactNumber={(number) => handleInputChange('contactNumber', number)}
            isDarkMode={isDarkMode}
          />
        )}
        {currentStep === 3 && (
          <Step3
            bestTimeToCall={formData.bestTimeToCall}
            setBestTimeToCall={(time) => handleInputChange('bestTimeToCall', time)}
            deadlineDate={formData.deadlineDate}
            setDeadlineDate={(date) => handleInputChange('deadlineDate', date)}
            extraInfo={formData.extraInfo}
            setExtraInfo={(info) => handleInputChange('extraInfo', info)}
            currency={formData.currency}
            setCurrency={(currency) => handleInputChange('currency', currency)}
            budget={formData.budget}
            handleBudgetChange={(budget) => handleInputChange('budget', budget)}
            isDarkMode={isDarkMode}
          />
        )}
        {currentStep === 4 && (
          <Step4
            userData={formData}
            isDarkMode={isDarkMode}
          />
        )}
        {currentStep === 5 && <ThankYouStep />}
  
        {/* Button Container aligned to the right */}
        <div className="mt-6 flex justify-end space-x-2">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
            >
              Back
            </button>
          )}
          {currentStep < 4 && (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  };
  

export default GettingStarted;
