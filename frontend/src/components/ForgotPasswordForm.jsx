import React from 'react';

const ForgotPasswordForm = () => {
  return (
    <main className='min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden'>
      {/* Abstract Background Textures */}
      <div className='absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-secondary-fixed/30 blur-[120px]'></div>
      <div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-primary-fixed/20 blur-[120px]'></div>
      <div className='w-full max-w-md relative z-10'>
        {/* Header Section */}
        <header className='mb-12 text-left'>
          <h1 className='font-headline font-extrabold text-4xl tracking-tight text-on-surface mb-4'>Reset Password</h1>
          <p className='font-body text-on-surface-variant text-lg leading-relaxed max-w-sm'>Enter your work email to receive a secure verification code.</p>
        </header>
        {/* Card UI: Asymmetric Layering */}
        <div className='relative'>
          {/* Decorative Layer */}
          <div className='absolute -inset-2 bg-surface-container-low rounded-full blur-2xl opacity-50 -z-10'></div>
          <section className='bg-surface-container-lowest p-8 md:p-10 rounded-full shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]'>
            <form className='space-y-8'>
              {/* Input Group */}
              <div className='space-y-3'>
                <label className='block font-label font-semibold text-xs uppercase tracking-widest text-outline' htmlFor='work-email'>Work Email</label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-surface-tint transition-colors'>
                    <span className='material-symbols-outlined text-[20px]'>mail</span>
                  </div>
                  <input className='block w-full h-14 pl-12 pr-4 bg-surface-container-highest border-none rounded-xl text-on-surface placeholder:text-outline/60 focus:ring-1 focus:ring-surface-tint focus:bg-white transition-all duration-200 font-medium' id='work-email' name='work-email' placeholder='name@company.com' type='email' />
                </div>
              </div>
              {/* Success State Hint (Hidden by default, shown via logic in real app) */}
              <div className='hidden flex items-center gap-3 p-4 bg-secondary-container/50 rounded-xl'>
                <span className='material-symbols-outlined text-on-primary-container' style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
                <span className='text-sm font-medium text-on-primary-container'>Email sent successfully</span>
              </div>
              {/* Action Button */}
              <button className='w-full h-14 bg-primary text-on-primary font-headline font-bold text-base rounded-xl transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 group shadow-xl' type='submit'>
                Send OTP
                <span className='material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1'>arrow_forward</span>
              </button>
              <div className='pt-4 text-center'>
                <a className='text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-2' href='#'>
                  <span className='material-symbols-outlined text-[18px]'>arrow_back</span>
                  Back to Sign In
                </a>
              </div>
            </form>
          </section>
        </div>
        {/* Footer Meta */}
        <footer className='mt-16 text-center space-y-4'>
          <div className='flex justify-center gap-8 text-[10px] font-label font-medium uppercase tracking-[0.2em] text-outline'>
            <a className='hover:text-primary transition-colors' href='#'>Security Protocol</a>
            <a className='hover:text-primary transition-colors' href='#'>Enterprise Support</a>
          </div>
          <p className='text-xs text-outline/50 italic font-body'>Protected by AES-256 Bit Encryption</p>
        </footer>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;
