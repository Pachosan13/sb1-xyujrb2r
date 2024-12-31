import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getActivityLog } from '../../services/auth.service';
import { formatDate } from '../../utils/date';

interface ActivityEvent {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  location: string;
  device: string;
}

export default function ActivityLog() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivityLog();
  }, []);

  const loadActivityLog = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const data = await getActivityLog(currentUser.uid);
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Historial de Actividad
      </h3>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {event.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(event.timestamp)} • {event.device} • {event.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}