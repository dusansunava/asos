import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="w-full py-4 flex items-center justify-center">
      <Loader2 className="h-7 w-7 animate-spin" />
    </div>
  );
};

export { Loader }
