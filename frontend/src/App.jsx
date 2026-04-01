import React from 'react';
import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import OTPVerificationForm from './components/OTPVerificationForm';

function App() {
  // For now, we'll just render the LoginForm. 
  // In a real application, you'd use react-router-dom for navigation.
  const [currentView, setCurrentView] = React.useState('login'); // 'login', 'forgotPassword', 'otpVerification'

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onForgotPassword={() => setCurrentView('forgotPassword')} />;
      case 'forgotPassword':
        return <ForgotPasswordForm onBackToLogin={() => setCurrentView('login')} onOTPSent={() => setCurrentView('otpVerification')} />;
      case 'otpVerification':
        return <OTPVerificationForm onBackToLogin={() => setCurrentView('login')} />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className='bg-surface font-body text-on-surface min-h-screen flex flex-col'>
      {/* TopAppBar */}
      <header className='w-full top-0 sticky bg-slate-50 dark:bg-slate-900 z-50'>
        <div className='flex items-center justify-between px-6 py-4 w-full'>
          <div className='flex items-center gap-4'>
            <span className='material-symbols-outlined text-slate-950 dark:text-slate-50 cursor-pointer active:scale-95 transition-transform' data-icon='arrow_back'>arrow_back</span>
            <h1 className='font-manrope font-bold text-lg tracking-tight text-slate-950 dark:text-slate-50'>Executive Suite</h1>
          </div>
          <div className='font-manrope font-extrabold text-slate-950 dark:text-slate-50'>
            <span className='material-symbols-outlined' data-icon='security'>security</span>
          </div>
        </div>
        <div className='bg-slate-100 dark:bg-slate-800 h-px'></div>
      </header>

      {renderView()}

      {/* Simple Bottom Bar for Support links as per the "BottomNavBar" JSON but adapted for the auth flow context */}
      <nav className='fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/20'>
        <div className='flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-3 py-1.5 transition-transform active:scale-90 cursor-pointer'>
          <span className='material-symbols-outlined mb-1' data-icon='lock'>lock</span>
          <span className='font-inter text-[10px] font-medium tracking-wide'>Secure</span>
        </div>
        <div className='flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-3 py-1.5 transition-transform active:scale-90 cursor-pointer'>
          <span className='material-symbols-outlined mb-1' data-icon='help_outline'>help_outline</span>
          <span className='font-inter text-[10px] font-medium tracking-wide'>Support</span>
        </div>
        <div className='flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-3 py-1.5 transition-transform active:scale-90 cursor-pointer'>
          <span className='material-symbols-outlined mb-1' data-icon='shield'>shield</span>
          <span className='font-inter text-[10px] font-medium tracking-wide'>Privacy</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
