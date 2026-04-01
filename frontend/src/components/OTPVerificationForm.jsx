import React from 'react';

const OTPVerificationForm = () => {
  return (
    <main className='min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden'>
      {/* Abstract Background Textures */}
      <div className='absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-secondary-fixed/30 blur-[120px]'></div>
      <div className='absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-primary-fixed/20 blur-[120px]'></div>
      <div className='w-full max-w-md relative z-10'>
        {/* Header Section */}
        <header className='mb-12 text-left'>
          <h1 className='font-headline font-extrabold text-4xl tracking-tight text-on-surface mb-4'>Verify Identity</h1>
          <p className='font-body text-on-surface-variant text-lg leading-relaxed max-w-sm'>A 6-digit code has been sent to your registered email.</p>
        </header>
        {/* Card UI: Asymmetric Layering */}
        <div className='relative'>
          {/* Decorative Layer */}
          <div className='absolute -inset-2 bg-surface-container-low rounded-full blur-2xl opacity-50 -z-10'></div>
          <section className='bg-surface-container-lowest p-8 md:p-10 rounded-full shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]'>
            <form className='space-y-8'>
              {/* OTP Input Group */}
              <div className='space-y-3'>
                <label className='block font-label font-semibold text-xs uppercase tracking-widest text-outline' htmlFor='otp-code'>OTP Code</label>
                <div className='flex justify-between gap-2'>
                  <input className='w-1/6 h-14 bg-surface-container-highest border-none rounded-xl text-on-surface text-center text-2xl font-bold focus:ring-1 focus:ring-surface-tint transition-all font-body' maxLength='1' type='text' />
                  <input className='w-1/6 h-14 bg-surface-container-highest border-none rounded-xl text-on-surface text-center text-2xl font-bold focus:ring-1 focus:ring-surface-tint transition-all font-body' maxLength='1' type='text' />
                  <input className='w-1/6 h-14 bg-surface-container-highest border-none rounded-xl text-on-surface text-center text-2xl font-bold focus:ring-1 focus:ring-surface-tint transition-all font-body' maxLength='1' type='text' />
                  <input className='w-1/6 h-14 bg-surface-container-highest border-none rounded-xl text-on-surface text-center text-2xl font-bold focus:ring-1 focus:ring-surface-tint transition-all font-body' maxLength='1' type='text' />
                  <input className='w-1/6 h-14 bg-surface-container-highest border-none rounded-xl text-on-surface text-center text-2xl font-bold focus:ring-1 focus:ring-surface-tint transition-all font-body' maxLength='1' type='text' />
                  <input className='w-1/6 h-14 bg-surface-container-highest border-none rounded-xl text-on-surface text-center text-2xl font-bold focus:ring-1 focus:ring-surface-tint transition-all font-body' maxLength='1' type='text' />
                </div>
                <p className='text-[10px] text-error font-medium pl-1'>Invalid code</p>
              </div>
              {/* Action Button */}
              <button className='w-full h-14 bg-primary text-on-primary font-headline font-bold text-base rounded-xl transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 group shadow-xl' type='submit'>
                Verify Code
                <span className='material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1'>check_circle</span>
              </button>
              <div className='pt-4 text-center'>
                <a className='text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-2' href='#'>
                  <span className='material-symbols-outlined text-[18px]'>refresh</span>
                  Resend Code
                </a>
                <p className='text-xs text-outline/50 italic font-body mt-2'>Code expires in 5:00</p>
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

export default OTPVerificationForm;
