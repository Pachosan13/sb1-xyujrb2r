import { QUICK_ANSWERS } from '../../data/quickAnswers';

export default function QuickAnswers() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Respuestas Rápidas
      </h3>
      
      <div className="space-y-4">
        {QUICK_ANSWERS.map((item) => (
          <details key={item.id} className="group">
            <summary className="list-none cursor-pointer">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                <span className="font-medium text-gray-900">{item.question}</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </div>
            </summary>
            <div className="mt-2 px-4 text-gray-600">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}