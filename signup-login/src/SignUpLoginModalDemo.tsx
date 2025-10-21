/**
 * Demo wrapper for SignUpLoginModal that uses mock API
 */

import React, { useEffect, useRef } from 'react';
import { CloseButton } from '../components/shared';
import { WelcomeView } from '../components/WelcomeView';
import { LoginView } from '../components/LoginView';
import { SignupView } from '../components/SignupView';
import { PasswordResetView } from '../components/PasswordResetView';
import { SuccessView } from '../components/SuccessView';
import { useAuthState } from '../hooks/useAuthState';
import { useAuthFlow } from '../hooks/useAuthFlow';
import { SignUpLoginModalProps } from '../types';
import * as S from '../SignUpLoginModal.styles';

export const SignUpLoginModal: React.FC<SignUpLoginModalProps> = ({
  isOpen,
  onClose,
  defaultEmail,
  fromPageType,
  houseManual,
  referral,
  disableClose = false,
  fromTrialHost = false,
  isNYU = false,
  onAuthSuccess,
}) => {
  const {
    state,
    resetState,
    updateState,
    showLogin,
    showSignup,
    showPasswordReset,
    showWelcome,
    showPasswordless,
    showSuccess,
  } = useAuthState({
    defaultEmail,
    fromPageType,
    houseManual,
    referral,
    disableClose,
    fromTrialHost,
    isNYU,
  });

  const {
    loading,
    error,
    login,
    signup,
    resetPassword,
    passwordlessLogin,
    clearError,
  } = useAuthFlow();

  // Use refs to avoid infinite loops
  const resetStateRef = useRef(resetState);
  const clearErrorRef = useRef(clearError);
  const onCloseRef = useRef(onClose);

  // Update refs when functions change
  useEffect(() => {
    resetStateRef.current = resetState;
    clearErrorRef.current = clearError;
    onCloseRef.current = onClose;
  }, [resetState, clearError, onClose]);

  const handleClose = () => {
    if (!state.disableClose) {
      resetStateRef.current();
      clearErrorRef.current();
      onCloseRef.current();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetStateRef.current();
      clearErrorRef.current();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !state.disableClose) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, state.disableClose]);

  const handleLogin = async (email: string, password: string) => {
    const user = await login({ email, password });
    if (user) {
      // Show success screen
      showSuccess(user);

      // Auto-close after 2 seconds
      setTimeout(() => {
        onAuthSuccess?.(user);
        handleClose();
      }, 2000);
    }
    return user;
  };

  const handleSignup = async (data: any) => {
    const user = await signup(data);
    if (user) {
      // Show success screen
      showSuccess(user);

      // Auto-close after 2 seconds
      setTimeout(() => {
        onAuthSuccess?.(user);
        handleClose();
      }, 2000);
    }
    return user;
  };

  const handlePasswordReset = async (email: string) => {
    return await resetPassword({ email });
  };

  const handlePasswordless = async (email: string) => {
    return await passwordlessLogin(email);
  };

  const renderContent = () => {
    switch (state.showingToggle) {
      case 'welcome':
        return (
          <WelcomeView
            onSelectLogin={showLogin}
            onSelectSignup={showSignup}
            onSelectMarketReport={() => {
              console.log('Market report requested');
            }}
            referral={state.referral}
          />
        );

      case 'login':
        return (
          <LoginView
            defaultEmail={state.currentEmail}
            onSuccess={onAuthSuccess}
            onSwitchToSignup={showSignup}
            onForgotPassword={showPasswordReset}
            onPasswordless={handlePasswordless}
            onGoBack={showWelcome}
            onLogin={handleLogin}
            onEmailChange={(email) => updateState('currentEmail', email)}
            loading={loading}
            error={error}
          />
        );

      case 'signup':
        return (
          <SignupView
            defaultEmail={state.currentEmail}
            referral={state.referral}
            onSuccess={onAuthSuccess}
            onSwitchToLogin={showLogin}
            onGoBack={showWelcome}
            onSignup={handleSignup}
            loading={loading}
            error={error}
          />
        );

      case 'reset':
        return (
          <PasswordResetView
            defaultEmail={state.currentEmail}
            onBack={showLogin}
            onSuccess={showLogin}
            onResetPassword={handlePasswordReset}
            loading={loading}
            error={error}
          />
        );

      case 'passwordless':
        return (
          <div>
            <h2>Passwordless Login</h2>
            <p>Coming soon...</p>
            <button onClick={showLogin}>Back to Login</button>
          </div>
        );

      case 'success':
        return (
          <SuccessView
            message="Account created successfully!"
            userName={state.successUser?.firstName}
          />
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Overlay onClick={handleClose} aria-hidden="true" />
      <S.ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {!state.disableClose && <CloseButton onClick={handleClose} />}
        <S.ContentWrapper>{renderContent()}</S.ContentWrapper>
      </S.ModalContainer>
    </>
  );
};

export default SignUpLoginModal;
