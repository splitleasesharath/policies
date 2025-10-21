/**
 * Login view component
 * Handles user authentication with email and password
 */

import React, { useState } from 'react';
import { AuthInput, AuthButton, ErrorMessage } from './shared';
import { useValidation } from '../hooks/useValidation';
import * as S from './LoginView.styles';

export interface LoginViewProps {
  defaultEmail?: string;
  onSuccess?: (user: any) => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
  onPasswordless?: () => void;
  onGoBack: () => void;
  onLogin: (email: string, password: string) => Promise<any>;
  loading?: boolean;
  error?: string | null;
}

export const LoginView: React.FC<LoginViewProps> = ({
  defaultEmail = '',
  onSuccess,
  onSwitchToSignup,
  onForgotPassword,
  onPasswordless,
  onGoBack,
  onLogin,
  loading = false,
  error: externalError = null,
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const { errors, validate, clearError } = useValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const isValid = validate({
      email: {
        value: email,
        rules: { required: true, email: true },
      },
      password: {
        value: password,
        rules: { required: true },
      },
    });

    if (!isValid) return;

    // Call login function
    const user = await onLogin(email, password);
    if (user && onSuccess) {
      onSuccess(user);
    }
  };

  return (
    <S.Container>
      <S.BackButton onClick={onGoBack} type="button">
        <S.BackIcon>←</S.BackIcon>
      </S.BackButton>

      <S.Header>
        <S.Title>Welcome Back!</S.Title>
        <S.Subtitle>Log in to your Split Lease account</S.Subtitle>
      </S.Header>

      <S.Form onSubmit={handleSubmit}>
        {externalError && (
          <ErrorMessage message={externalError} variant="error" />
        )}

        <AuthInput
          type="email"
          label="Email"
          placeholder="example@example.com"
          value={email}
          onChange={(value) => {
            setEmail(value);
            clearError('email');
          }}
          error={errors.email}
          autoFocus
          autoComplete="email"
          name="email"
        />

        <AuthInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            clearError('password');
          }}
          error={errors.password}
          showPasswordToggle
          autoComplete="current-password"
          name="password"
        />

        <S.ForgotPasswordLink onClick={onForgotPassword} type="button">
          Forgot password?
        </S.ForgotPasswordLink>

        <AuthButton type="submit" loading={loading} fullWidth>
          Log In
        </AuthButton>

        {onPasswordless && (
          <S.Divider>
            <S.DividerLine />
            <S.DividerText>or</S.DividerText>
            <S.DividerLine />
          </S.Divider>
        )}

        {onPasswordless && (
          <AuthButton
            onClick={onPasswordless}
            variant="outline"
            fullWidth
            type="button"
          >
            Login Without Password
          </AuthButton>
        )}

        <S.SocialButtons>
          {/* Add social auth buttons here if needed */}
        </S.SocialButtons>

        <S.BottomSection>
          <S.Text>Don't have an account?</S.Text>
          <S.Link onClick={onSwitchToSignup} type="button">
            Sign Up Here
          </S.Link>
        </S.BottomSection>
      </S.Form>
    </S.Container>
  );
};
