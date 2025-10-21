/**
 * Success view component
 * Displays success message after authentication
 */

import React from 'react';
import * as S from './SuccessView.styles';

export interface SuccessViewProps {
  message?: string;
  userName?: string;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  message = 'Success!',
  userName,
}) => {
  return (
    <S.Container>
      <S.IconWrapper>
        <S.SuccessIcon>✓</S.SuccessIcon>
      </S.IconWrapper>

      <S.Title>{message}</S.Title>

      {userName && (
        <S.Subtitle>Welcome, {userName}!</S.Subtitle>
      )}

      <S.Message>
        Redirecting you now...
      </S.Message>
    </S.Container>
  );
};
