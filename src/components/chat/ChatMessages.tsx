import { Message } from '../../types/chat';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export default function ChatMessages({ messages, loading, error }: ChatMessagesProps) {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex flex-col h-[500px] overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <div className="font-medium text-sm mb-1">
              {message.role === 'user' ? 'Usuario:' : 'Asistente Financiero:'}
            </div>
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            <div className="text-xs opacity-75 mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  );
}