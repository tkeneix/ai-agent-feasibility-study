// src/components/ui/card.tsx
import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};