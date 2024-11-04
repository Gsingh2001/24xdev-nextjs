import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'; // Import the icons

const FAQ = ({ currentTheme }) => {

  return (
    <section
      id="faq"
      className="py-10"
      style={{ backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text }}
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        {/* FAQ Section Header */}
        <header className="text-center mb-8">
          <h3
            id="faq-heading"
            className="text-3xl font-bold"
            style={{ color: currentTheme.colors.primary }}
          >
            Frequently Asked Questions
          </h3>
          <p className="mt-2" style={{ color: currentTheme.colors.secondary }}>
            Your questions about website design, development, hosting, deployment, and more—answered!
          </p>
        </header>

        {/* FAQ List */}
        <ul className="space-y-4" role="list">
          {faqItems.map((item, index) => (
            <FAQItem key={index} {...item} currentTheme={currentTheme} />
          ))}
        </ul>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li
      className="border-b"
      style={{ borderColor: currentTheme.colors.border }}
      role="listitem"
    >
      {/* Question */}
      <button
        onClick={toggleCollapse}
        className="flex justify-between items-center w-full py-3 text-left focus:outline-none"
        style={{ color: currentTheme.colors.text }}
        aria-expanded={isOpen}
        aria-controls={`answer-${question}`}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </button>

      {/* Answer with CSS transition */}
      <div
        id={`answer-${question}`}
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: currentTheme.colors.card1.background, color: currentTheme.colors.card1.text }}
      >
        {isOpen && (
          <div className="p-4">
            <p>{answer}</p>
          </div>
        )}
      </div>
    </li>
  );
};

// FAQ Data Array
const faqItems = [
  {
    question: "What services are included in your all-in-one website solution?",
    answer: "Our all-in-one solution covers everything from custom website design and development to hosting, deployment, and ongoing maintenance. We also offer SEO optimization, responsive layouts, and 24/7 support. Whether you're in India, the UK, or Canada, we provide a comprehensive package tailored to your business needs."
  },
  {
    question: "Do you offer customized design and development services?",
    answer: "Yes, we provide fully customized design and development services. Our team works with you to create a website that aligns with your brand, including unique features and functionality to meet your business goals. We serve clients in India, the UK, and Canada with tailored solutions."
  },
  {
    question: "What kind of hosting and deployment options do you offer?",
    answer: "We provide secure, reliable hosting options and handle the full deployment process. Our services include shared hosting, VPS, or dedicated cloud hosting, depending on your requirements. We ensure your website is deployed seamlessly and runs efficiently across regions like India, the UK, and Canada."
  },
  {
    question: "How do you handle website maintenance and support?",
    answer: "Our team provides ongoing maintenance, including regular updates, security patches, and performance optimizations. We also offer 24/7 support, ensuring that your website remains up and running smoothly, no matter where you are located—be it India, the UK, or Canada."
  },
  {
    question: "How long does it take to build and launch a website?",
    answer: "The timeline depends on the complexity of the project. A simple website may take 2-4 weeks, while more complex sites with custom features can take 6-8 weeks or longer. We work closely with you to ensure timely delivery, whether you are in India, the UK, or Canada."
  },
  {
    question: "What payment options do you accept?",
    answer: "We accept a variety of payment methods, including credit/debit cards, bank transfers, and online payment services. Our pricing is flexible to accommodate clients from India, the UK, and Canada, ensuring smooth and secure transactions."
  }
];

export default FAQ;
