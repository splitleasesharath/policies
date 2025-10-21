/**
 * Styled Components for Reservation Price Breakdown
 * Recreates the visual styling from Bubble.io element
 */

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #DFDFF6;
  border: 1px solid #68B6B;
  border-radius: 3px;
  padding: 20px;
  width: 100%;
  min-height: 100px;
  max-height: 750px;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

  /* Modern scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
`;

export const Header = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(104, 182, 107, 0.3);
`;

export const Section = styled.div`
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 16px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
  gap: 16px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transition: background-color 0.2s ease;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  flex: 1;
  text-align: left;

  small {
    font-size: 11px;
    font-style: italic;
    color: #718096;
    display: block;
    margin-top: 4px;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

export const Value = styled.div<{ clickable?: boolean; highlighted?: boolean }>`
  font-size: 14px;
  font-weight: ${props => props.highlighted ? '600' : '400'};
  color: ${props => props.highlighted ? '#2d3748' : '#2c5282'};
  text-align: right;
  flex: 1;

  ${props => props.clickable && `
    cursor: pointer;
    color: #3182ce;
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: #2c5282;
    }

    &:active {
      color: #1e3a5f;
    }
  `}

  ${props => props.highlighted && `
    font-size: 16px;
    color: #1a202c;
  `}

  /* Responsive adjustments */
  @media (max-width: 640px) {
    font-size: ${props => props.highlighted ? '15px' : '13px'};
    text-align: left;
  }
`;

export const FooterNote = styled.div`
  font-size: 11px;
  color: #718096;
  font-style: italic;
  text-align: center;
  padding: 12px 0 0 0;
  border-top: 1px solid rgba(104, 182, 107, 0.2);
  margin-top: 8px;

  /* Responsive adjustments */
  @media (max-width: 640px) {
    font-size: 10px;
    text-align: left;
  }
`;
