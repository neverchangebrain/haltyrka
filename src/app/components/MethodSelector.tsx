import React, { useState, useRef, useEffect } from "react";
import { TransactionData } from "../localization/types";
import { MethodDropMenuIcon } from "./icons/DropMenus";

interface Props {
  method: string;
  setMethod: (method: string) => void;
  t: TransactionData;
  onDropdownToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MethodSelector({ method, setMethod, t }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: "", label: t.choose_method_option, disabled: true },
    { value: "caesar", label: t.caesar },
    { value: "atbash", label: t.atbash },
    { value: "vigenere", label: t.vigenere },
    { value: "xor", label: t.xor },
  ];

  const handleSelect = (value: string) => {
    if (value) {
      setMethod(value);
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-4 relative">
      <label className="block mb-1 text-[#e0c172] text-sm font-medium">
        {t.method_label}
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          className="w-full py-1.5 px-2 rounded-lg bg-[#121212] border border-[#d4af37] text-[#e0c172] 
            cursor-pointer flex justify-between items-center text-sm focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>
            {method
              ? options.find((opt) => opt.value === method)?.label
              : t.choose_method_option}
          </span>
          {MethodDropMenuIcon({ open: isOpen })}
        </button>

        <div
          className={`absolute w-full mt-1 rounded-lg bg-[#1a1a1a] border border-[#d4af37] shadow-lg z-50 
            transition-all duration-200 overflow-hidden
            ${
              isOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            maxHeight: isOpen ? "150px" : "0",
            overflow: "auto",
          }}
          role="listbox"
        >
          <ul className="py-1 text-sm">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  className={`w-full text-left px-3 py-1.5 
                    ${
                      option.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#252525] cursor-pointer"
                    } 
                    ${
                      method === option.value
                        ? "bg-[#252525] text-white font-semibold"
                        : "text-[#e0c172]"
                    }`}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  role="option"
                  aria-selected={method === option.value}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="sr-only"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
