import { useChat } from '../../hooks/useChat';
import ChatMessages from '../chat/ChatMessages';
import ChatInput from '../chat/ChatInput';
import ChatAttachments from './ChatAttachments';

export default function ChatSection() {
  const { messages, loading, error, sendMessage } = useChat();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Chat en Vivo</h2>
      </div>

      <ChatMessages messages={messages} loading={loading} error={error} />
      
      <div className="border-t border-gray-200">
        <ChatAttachments />
        <div className="p-4">
          <ChatInput onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
}