/**
 * Styles for AuthInput component
 */

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 2px;
`;

export const InputWrapper = styled.div<{ $hasError: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid ${props => props.$hasError ? '#EF4444' : '#E5E7EB'};
  border-radius: 8px;
  transition: border-color 200ms ease;
  background: white;

  &:focus-within {
    border-color: ${props => props.$hasError ? '#EF4444' : '#7C3AED'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(124, 58, 237, 0.1)'};
  }
`;

export const Input = styled.input<{ $hasError: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #1F2937;
  outline: none;
  width: 100%;
  font-family: inherit;

  &::placeholder {
    color: #9CA3AF;
  }

  &:disabled {
    background-color: #F3F4F6;
    cursor: not-allowed;
    color: #6B7280;
  }

  /* Remove autofill yellow background */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const IconButton = styled.button`
  padding: 8px 12px;
  margin-right: 4px;
  background: transparent;
  border: none;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 150ms ease;
  border-radius: 4px;

  &:hover {
    color: #374151;
    background-color: #F3F4F6;
  }

  &:focus-visible {
    outline: 2px solid #7C3AED;
    outline-offset: 2px;
  }
`;

export const Error = styled.span`
  font-size: 13px;
  color: #EF4444;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Simple SVG icons (instead of using lucide-react to minimize dependencies)
export const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);
