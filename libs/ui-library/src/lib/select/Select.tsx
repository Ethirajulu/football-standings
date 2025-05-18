import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type Option = {
  id: string;
  name: string;
  logo?: string;
};

type Props = {
  label?: string;
  options: Option[];
  value: string | undefined;
  onChange: (value: string) => void;
  showEmpty?: boolean;
};

export const Select = ({
  label,
  options,
  value,
  onChange,
  showEmpty = false,
}: Props) => {
  const [open, setOpen] = useState(false);

  const optionsWithEmpty = showEmpty
    ? [{ name: 'None', id: '', logo: undefined }, ...options]
    : options;

  const selectedOption = optionsWithEmpty?.find((o) => o.id === value) ?? {
    name: 'Select',
    id: '',
  };

  return (
    <div className="w-full max-w-sm relative text-left">
      {label && (
        <label className="block mb-1 text-xs font-bold uppercase text-gray-600">
          {label}
        </label>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          w-full flex items-center justify-between
          px-4 py-3 bg-white border border-gray-300 text-gray-900 font-medium
          rounded-md shadow-sm
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          transition
        `}
      >
        <span className="flex items-center space-x-2">
          {selectedOption.logo && (
            <img
              src={selectedOption.logo}
              alt=""
              className="w-5 h-5 object-cover"
            />
          )}
          <span className="text-lg">{selectedOption.name}</span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute z-20 mt-2 w-full bg-white
              border border-gray-300 rounded-md
              shadow-lg overflow-hidden max-h-60 overflow-y-auto
            `}
          >
            {optionsWithEmpty?.map((option) => (
              <motion.li
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                className={`
                  flex items-center px-4 py-2 text-md
                  cursor-pointer transition-colors
                  ${
                    value === option.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }
                `}
              >
                {option.logo && (
                  <img
                    src={option.logo}
                    alt=""
                    className="w-5 h-5 mr-2 object-cover"
                  />
                )}
                {option.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
