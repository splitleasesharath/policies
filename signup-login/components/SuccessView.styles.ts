/**
 * Styles for SuccessView component
 */

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const checkmark = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
`;

export const SuccessIcon = styled.div`
  font-size: 48px;
  color: white;
  font-weight: bold;
  animation: ${checkmark} 0.5s ease-out;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #10B981;
  margin: 0 0 16px 0;
`;

export const Message = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;
