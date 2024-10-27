// frontend/src/utils/types.ts
import { ReactNode } from 'react';

declare module '@/components/ui/*' {
    export interface CardProps {
        children: ReactNode;
        className?: string;
    }

    export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: 'default' | 'primary' | 'secondary';
    }

    export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
        error?: string;
    }

    // export const Card: React.FC<CardProps>;
    // export const Button: React.FC<ButtonProps>;
    // export const Input: React.FC<InputProps>;

    export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;

}
