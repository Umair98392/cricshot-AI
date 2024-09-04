import React, { useState } from 'react';

const Accordion = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const accordionItems = [
    {
      heading: 'What types of shots can CricShotAI predict?',
      content: 'CricShotAI can predict a wide range of cricket shots including but not limited to cover drives, pull shots, straight drives, square cuts, and lofted shots.',
    },
    {
      heading: 'How accurate is CricShotAI in predicting cricket shots?',
      content: ' CricShotAI boasts high accuracy in predicting cricket shots, thanks to its advanced AI algorithms and extensive training data. Our system continually learns and improves to provide the most precise predictions possible.',
    },
    {
      heading: 'How does CricShotAI analyze shots from images or videos?',
      content: 'CricShotAI utilizes sophisticated image and video analysis techniques, combined with AI algorithms, to detect and analyze cricket shots. It breaks down each frame, identifies relevant features, and applies pattern recognition to predict and analyze shots accurately.',
    },
    {
        heading: "How can I access CricShotAI's predictive and analytical capabilities?",
        content: "You can access CricShotAI's predictive and analytical features through our user-friendly online platform or mobile application. Simply upload images or videos of cricket shots, and CricShotAI will do the rest, providing accurate predictions and insightful analysis in seconds.",
      },
      {
        heading: 'Can CricShotAI be used for coaching purposes?',
        content: "Absolutely! CricShotAI is an invaluable tool for coaches and players alike. Coaches can use it to assess players' shot-making abilities, identify areas for improvement, and tailor training programs accordingly. Players can also use it for self-analysis and skill enhancement.",
      },
      {
        heading: ' Is CricShotAI accessible to cricket enthusiasts and professionals worldwide?',
        content: "Absolutely! CricShotAI is accessible to cricket enthusiasts and professionals worldwide through its user-friendly online platform and mobile application. Whether you're a coach, player, commentator, or fan, you can leverage its predictive and analytical capabilities to enhance your cricketing experience.",
      },
      
  ];

  return (
    <div className='bg-gray-100 dark:bg-[#1C2222]'>
    <div className="sm:max-w-5xl mx-auto px-4 ">
       <h2 className="mb-4 text-3xl md:text-4xl font-semibold text-center tracking-tight text-gray-800 dark:text-white p-3">Queries Corner</h2>
      <h2 className="text-2xl font-medium text-gray-600  text-center dark:text-white mb-4 p-2">Questions You May Have</h2>
      <div id="accordion-flush" className="divide-y divide-gray-200 dark:divide-gray-700">
        {accordionItems.map((item, index) => (
          <AccordionItem
            key={index}
            index={index}
            heading={item.heading}
            content={item.content}
            isActive={activeAccordion === index}
            toggleAccordion={toggleAccordion}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

const AccordionItem = ({ index, heading, content, isActive, toggleAccordion }) => {
  return (
    <div>
      <h2
        id={`accordion-flush-heading-${index}`}
        className="flex items-center justify-between w-full py-4 font-small text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-[#1C2222] gap-3 cursor-pointer hover:bg-green-200 dark:hover:bg-gray-800 transition-colors text-lg lg:text-md"
        onClick={() => toggleAccordion(index)}
        aria-expanded={isActive ? 'true' : 'false'}
        aria-controls={`accordion-flush-body-${index}`}
      >
        <span>{heading}</span>
        <svg
          className={`w-6 h-6 ${isActive ? 'transform rotate-180' : ''} transition-transform`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
        </svg>
      </h2>
      {isActive && (
        <div id={`accordion-flush-body-${index}`} className="py-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 font-normal dark:text-gray-300">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
