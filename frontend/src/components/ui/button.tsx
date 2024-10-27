// src/components/ui/button.tsx
import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return <button {...props}>{children}</button>;
};