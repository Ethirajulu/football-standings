import React from 'react';

export type CardProps = {
  title?: string;
  imageSrc?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export const Card = ({
  title,
  imageSrc,
  children,
  footer,
  className,
}: CardProps) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden ${
        className ?? ''
      }`}
    >
      {imageSrc && (
        <img
          className="w-full h-48 object-cover"
          src={imageSrc}
          alt={title || 'Card image'}
        />
      )}
      {(title || children) && (
        <div className="p-4">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {title}
            </h2>
          )}
          {children && <div className="text-gray-600 text-sm">{children}</div>}
        </div>
      )}
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
