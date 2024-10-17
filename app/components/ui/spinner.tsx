// add a modern spinner component
import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
    size?: number;
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, className }) => {
    return (
        <svg
            className={cn('animate-spin', className)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8"
            />
        </svg>
    );
};

Spinner.displayName = 'Spinner';

export { Spinner };