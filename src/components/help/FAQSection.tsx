import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { faqData } from '../../data/faqData';

export default function FAQSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Preguntas Comunes
      </h2>
      <div className="space-y-4">
        {faqData.map((faq) => (
          <Disclosure key={faq.id}>
            {({ open }) => (
              <div className="bg-white rounded-lg shadow">
                <Disclosure.Button className="w-full px-4 py-3 text-left flex justify-between items-center">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronUpIcon
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 py-3 text-gray-600 border-t">
                  {faq.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
}