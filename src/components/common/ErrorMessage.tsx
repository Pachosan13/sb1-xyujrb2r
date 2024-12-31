interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`bg-red-100 text-red-700 p-4 rounded-lg ${className}`}>
      {message}
    </div>
  );
}