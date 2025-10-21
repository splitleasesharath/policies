/**
 * Styles for LoginView component
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: #7C3AED;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  text-align: right;
  align-self: flex-end;
  margin-top: -8px;

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

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 4px 0;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #E5E7EB;
`;

export const DividerText = styled.span`
  font-size: 14px;
  color: #9CA3AF;
  font-weight: 500;
`;

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
