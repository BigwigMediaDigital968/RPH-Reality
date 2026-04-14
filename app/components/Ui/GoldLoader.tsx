import { Loader2 } from 'lucide-react';

export const GoldLoader = () => {
    return (
        <div className="flex items-center justify-center">
            <Loader2
                className="w-10 h-10 text-yellow-500 animate-spin"
                style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))' }}
            />
        </div>
    );
};