import { useState, useCallback } from "react";
import Input from './Input.jsx';
import './LogIn.css';

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('Sign In');

  const toggleVariant = useCallback(e => {
    if ('key' in e && e.key !== 'Enter') return;
    window.getSelection().removeAllRanges();
    e.target.blur();
    setEmail('');
    setUsername('');
    setPassword('');
    setVariant((currentVariant) => currentVariant === 'Sign In' ? 'Sign Up' : 'Sign In');
  }, []);

  return (
    <div
      className={`relative w-full bg-[url('/src/assets/gavel.png')] bg-no-repeat bg-center bg-fixed bg-cover`}
      style={{height: `${Math.max(window.innerHeight - 89.5, 881.5)}px`}}
    >
      <div className="w-full h-full" style={{background: 'linear-gradient(to bottom, black, rgba(0, 0, 0, 0.5), black)'}}>
        <div
          className="bg-black/70 px-16 py-16 self-center lg:w-2/5 lg:max-w-md rounded-md m-auto relative top-1/2 selection:text-blue-600"
          style={{transform: 'translateY(-50%)', fontFamily: 'Space Mono'}}
        >
          <h2 className="text-white text-4xl mb-8 font-semibold">
          {variant === 'Sign In' ? 'Sign In' : (
            <div>
              Ready to navigate the legal world? <br />
              <span className="text-sm">Enter your email to create your account.</span>
            </div>
          )}
          </h2>
          <div className="flex flex-col gap-4 mb-10">
            {variant === 'Sign Up' && (
              <Input
                id="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                label="Email"
                type="email"
              />
            )}
            <Input
              id="username"
              onChange={e => setUsername(e.target.value)}
              value={username}
              label="Username"
            />
            <Input
              id="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              label="Password"
              type="password"
            />
          </div>
          <div className="group" onClick={e => {
            window.getSelection().removeAllRanges();
            e.currentTarget.firstChild.blur();
          }}>
            <button
              className="w-full bg-blue-600 py-3 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl"
              style={{fontFamily: 'Space Mono'}}
            >
              {variant === 'Sign In' ? 'Sign In' : (
                <div className="flex justify-center items-center">
                  <b>Get Started</b> &nbsp;
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="ChevronRight">
                    <path 
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.29297 19.2928L14.5859 12L7.29297 4.70706L8.70718 3.29285L16.7072 11.2928C16.8947 11.4804 17.0001 11.7347 17.0001 12C17.0001 12.2652 16.8947 12.5195 16.7072 12.7071L8.70718 20.7071L7.29297 19.2928Z"
                      fill="currentColor">
                    </path>
                  </svg>
                </div>
              )}
            </button>
          </div>
          <p className="text-neutral-500 mt-12">
            {variant === 'Sign In' ? 'New to our services? ' : 'Already have an account? '}
            <span tabIndex={0} onClick={toggleVariant} onKeyDown={toggleVariant} className="text-white ml-1 hover:underline focus:underline outline-none cursor-pointer">
              {variant === 'Sign In' ? 'Sign up now' : 'Sign in'}
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
