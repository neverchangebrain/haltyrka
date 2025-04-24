import React from "react";

interface Props {
  open: boolean;
}

export const LanguageDropMenuIcon = ({ open }: Props) => {
  return (
    <svg
      className={`w-3 h-3 ml-1 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M6 8l4 4 4-4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MethodDropMenuIcon = ({ open }: Props) => {
  return (
    <svg
      className={`w-3 h-3 ml-1 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#d4af37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
