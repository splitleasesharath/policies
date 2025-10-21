/**
 * Signup view component
 * Handles new user registration
 */

import React, { useState } from 'react';
import { AuthInput, AuthButton, ErrorMessage } from './shared';
import { useValidation } from '../hooks/useValidation';
import * as S from './SignupView.styles';

export interface SignupViewProps {
  defaultEmail?: string;
  referral?: {
    cashbackPoints: number;
    cesScore: number;
    referrantName?: string;
  } | null;
  onSuccess?: (user: any) => void;
  onSwitchToLogin: () => void;
  onGoBack: () => void;
  onSignup: (data: SignupFormData) => Promise<any>;
  loading?: boolean;
  error?: string | null;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  referralCode?: string;
}

export const SignupView: React.FC<SignupViewProps> = ({
  defaultEmail = '',
  referral,
  onSuccess,
  onSwitchToLogin,
  onGoBack,
  onSignup,
  loading = false,
  error: externalError = null,
}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: defaultEmail,
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    referralCode: '',
  });

  const { errors, validate, clearError, validatePasswordStrength } = useValidation();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const updateField = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const isValid = validate({
      email: {
        value: formData.email,
        rules: { required: true, email: true },
      },
      password: {
        value: formData.password,
        rules: {
          required: true,
          minLength: 8,
          custom: validatePasswordStrength,
        },
      },
      confirmPassword: {
        value: formData.confirmPassword,
        rules: {
          required: true,
          match: formData.password,
        },
      },
      firstName: {
        value: formData.firstName,
        rules: { required: true },
      },
      lastName: {
        value: formData.lastName,
        rules: { required: true },
      },
    });

    if (!isValid) return;

    if (!acceptedTerms) {
      alert('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    // Call signup function
    const user = await onSignup(formData);
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
        <S.Title>Create Your Account</S.Title>
        <S.Subtitle>Join Split Lease and find your perfect home</S.Subtitle>
      </S.Header>

      {referral && (
        <S.ReferralInfo>
          <S.ReferralIcon>🎁</S.ReferralIcon>
          <S.ReferralText>
            You'll receive <strong>${referral.cashbackPoints}</strong> in cashback points!
          </S.ReferralText>
        </S.ReferralInfo>
      )}

      <S.Form onSubmit={handleSubmit}>
        {externalError && (
          <ErrorMessage message={externalError} variant="error" />
        )}

        <S.NameRow>
          <AuthInput
            type="text"
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={(value) => updateField('firstName', value)}
            error={errors.firstName}
            autoComplete="given-name"
            name="firstName"
          />
          <AuthInput
            type="text"
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(value) => updateField('lastName', value)}
            error={errors.lastName}
            autoComplete="family-name"
            name="lastName"
          />
        </S.NameRow>

        <AuthInput
          type="email"
          label="Email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          error={errors.email}
          autoFocus
          autoComplete="email"
          name="email"
        />

        <AuthInput
          type="password"
          label="Password"
          placeholder="Create a password (min 8 characters)"
          value={formData.password}
          onChange={(value) => updateField('password', value)}
          error={errors.password}
          showPasswordToggle
          autoComplete="new-password"
          name="password"
        />

        <AuthInput
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={(value) => updateField('confirmPassword', value)}
          error={errors.confirmPassword}
          showPasswordToggle
          autoComplete="new-password"
          name="confirmPassword"
        />

        {referral && (
          <AuthInput
            type="text"
            label="Referral Code (Optional)"
            placeholder="Enter referral code"
            value={formData.referralCode}
            onChange={(value) => updateField('referralCode', value)}
            name="referralCode"
          />
        )}

        <S.CheckboxContainer>
          <S.Checkbox
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <S.CheckboxLabel htmlFor="terms">
            I agree to the{' '}
            <S.TermsLink href="/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </S.TermsLink>{' '}
            and{' '}
            <S.TermsLink href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </S.TermsLink>
          </S.CheckboxLabel>
        </S.CheckboxContainer>

        <AuthButton type="submit" loading={loading} fullWidth>
          Create Account
        </AuthButton>

        <S.BottomSection>
          <S.Text>Already have an account?</S.Text>
          <S.Link onClick={onSwitchToLogin} type="button">
            Log In Here
          </S.Link>
        </S.BottomSection>
      </S.Form>
    </S.Container>
  );
};
