interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export function Alert({ type = 'info', message }: AlertProps) {
  const styles = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className={`p-4 rounded-lg text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}