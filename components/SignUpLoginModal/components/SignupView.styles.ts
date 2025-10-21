/**
 * Styles for SignupView component
 */

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  top: -8px;
  left: -8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 14px;
  padding: 8px;
  border-radius: 6px;
  transition: all 150ms ease;

  &:hover {
    color: #374151;
    background: #F3F4F6;
  }

  &:focus-visible {
    outline: 2px solid #7C3AED;
    outline-offset: 2px;
  }
`;

export const BackIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

export const Header = styled.div`
  text-align: center;
  margin-top: 24px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

export const ReferralInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
  border: 1px solid #86EFAC;
  border-radius: 8px;
`;

export const ReferralIcon = styled.span`
  font-size: 20px;
`;

export const ReferralText = styled.span`
  font-size: 14px;
  color: #166534;

  strong {
    font-weight: 600;
    color: #15803D;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NameRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #7C3AED;
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid #7C3AED;
    outline-offset: 2px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.5;
  cursor: pointer;
`;

export const TermsLink = styled.a`
  color: #7C3AED;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const BottomSection = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 8px;
  border-top: 1px solid #E5E7EB;
`;

export const Text = styled.span`
  color: #6B7280;
  font-size: 14px;
`;

export const Link = styled.button`
  background: none;
  border: none;
  color: #7C3AED;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  padding: 0;

  &:hover {
    color: #6D28D9;
  }

  &:focus-visible {
    outline: 2px solid #7C3AED;
    outline-offset: 2px;
    border-radius: 4px;
    padding: 2px 4px;
  }
`;
