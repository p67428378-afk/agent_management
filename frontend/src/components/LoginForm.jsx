import React from 'react';

const LoginForm = () => {
  return (
    <main className='flex-grow px-6 pt-12 pb-24 max-w-md mx-auto w-full'>
      {/* Hero Branding Section */}
      <div className='mb-12'>
        <h2 className='font-headline text-on-surface text-3xl font-extrabold tracking-tight mb-2'>Welcome back</h2>
        <p className='text-on-surface-variant font-body text-body-md'>Sign in to your secure workspace.</p>
      </div>
      {/* Login Form Container */}
      <div className='space-y-8'>
        {/* Work Email Field */}
        <div className='space-y-2'>
          <label className='font-label text-xs font-semibold text-on-surface uppercase tracking-wider' htmlFor='email'>Work Email</label>
          <div className='relative'>
            <input className='w-full bg-surface-container-highest border-none rounded-xl px-4 py-4 text-on-surface focus:ring-1 focus:ring-surface-tint transition-all font-body' id='email' placeholder='username@firm.com' type='email' defaultValue='executive.user@firm.com' />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center'>
              <span className='material-symbols-outlined text-on-primary-container' style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
            </div>
          </div>
          <p className='text-[10px] text-on-primary-container font-medium pl-1'>Email verified for corporate domain</p>
        </div>
        {/* Security Password Field */}
        <div className='space-y-2'>
          <div className='flex justify-between items-end'>
            <label className='font-label text-xs font-semibold text-on-surface uppercase tracking-wider' htmlFor='password'>Security Password</label>
            <a className='text-[11px] font-semibold text-surface-tint hover:underline' href='#'>Forgot Password?</a>
          </div>
          <div className='relative'>
            <input className='w-full bg-error-container border-none rounded-xl px-4 py-4 text-on-surface focus:ring-1 focus:ring-error transition-all font-body' id='password' placeholder='••••••••' type='password' />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center'>
              <span className='material-symbols-outlined text-error'>visibility_off</span>
            </div>
          </div>
          {/* Strength Meter & Error */}
          <div className='pt-1 px-1'>
            <div className='flex gap-1 h-1 w-full mb-2'>
              <div className='h-full flex-1 bg-error rounded-full'></div>
              <div className='h-full flex-1 bg-outline-variant/30 rounded-full'></div>
              <div className='h-full flex-1 bg-outline-variant/30 rounded-full'></div>
              <div className='h-full flex-1 bg-outline-variant/30 rounded-full'></div>
            </div>
            <p className='text-[10px] text-error font-medium'>Password too short (minimum 12 characters)</p>
          </div>
        </div>
        {/* Submit Action */}
        <div className='pt-6'>
          <button className='w-full signature-gradient text-on-primary font-manrope font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2'>
            <span>Authenticate Profile</span>
            <span className='material-symbols-outlined text-sm'>lock_open</span>
          </button>
        </div>
        {/* Alternative Login */}
        <div className='pt-4 text-center'>
          <p className='text-on-surface-variant text-xs mb-6 font-medium'>Or authenticate with</p>
          <div className='flex gap-4'>
            <button className='flex-1 bg-surface-container-low py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors active:scale-95'>
              <img alt='' className='w-5 h-5 grayscale opacity-70' data-alt='minimalist google logo icon for authentication' src='https://lh3.googleusercontent.com/aida-public/AB6AXuBKpoVcoStu6LURJw12KHptuQ4lI4vav_dOkirUnFPNaFy9sWy_Tf02YJVhvxT2UdkQL7GZ-Mymuof1cXJbaKN4cXna-0joXot2rK4ocK5h-MHtHEtOu4BnHXCSPLMb6fLsGJgPsc6zrbt_bE5Djz8FcERAA3l4dg9wg0W_JWDKisFZin_RAY6qdsKzleoPjioloMakD__hucu3DYzgWWmXH5XMgxi0nb_eioW5YoeLlXi94_Z2e9osD3R5FAIIc6P5s0euqkFRkg9l' />
              <span className='font-label text-xs font-bold text-on-surface-variant'>SSO</span>
            </button>
            <button className='flex-1 bg-surface-container-low py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors active:scale-95'>
              <span className='material-symbols-outlined text-on-surface-variant text-xl'>fingerprint</span>
              <span className='font-label text-xs font-bold text-on-surface-variant'>Biometric</span>
            </button>
          </div>
        </div>
      </div>
      {/* Trust Badge */}
      <div className='mt-16 flex flex-col items-center gap-4'>
        <div className='h-px w-12 bg-outline-variant/30'></div>
        <div className='flex items-center gap-2 opacity-40'>
          <span className='material-symbols-outlined text-sm'>encrypted</span>
          <span className='text-[10px] uppercase font-bold tracking-widest'>256-bit AES Encryption Active</span>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
