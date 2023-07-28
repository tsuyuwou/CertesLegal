import { useState, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import Input from './Input.jsx';
import './LogIn.css';

const LogIn = ({ user, setUser }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('Sign In');
  const navigate = useNavigate();

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const toggleVariant = useCallback(e => {
    if ('key' in e && e.key !== 'Enter') return;
    e.currentTarget.firstChild.blur();
    clearForm();
    setVariant((currentVariant) => currentVariant === 'Sign In' ? 'Sign Up' : 'Sign In');
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/account', { replace: true });
    }
  }, [user]);

  return (
    !user && (
      <div
        id="bg"
        className={`relative w-full bg-[url('/src/assets/gavel.png')] bg-cover`}
        style={{height: `${Math.max(window.innerHeight - 89.5, 881.5)}px`}}
      >
        <div id="bg-tint" className="w-full h-full">
          <div id="fg" className="px-16 py-16 rounded-md m-auto relative">
            <h2 className="text-white text-3xl mb-8 font-semibold select-none mt-0">
            {variant === 'Sign In' ? 'Sign In' : (
              <div>
                Ready to navigate the legal world?
                <br />
                <span className="text-sm">Enter your email to create your account.</span>
              </div>
            )}
            </h2>
            <form onSubmit={e => {
              e.preventDefault();
              UserService.authenticate({
                ...(firstName && {firstName}), ...(lastName && {lastName}), email, password
              }).then(res => {
                clearForm();
                setUser(res.data);
              }).catch(error => {
                console.error(error);
              });
            }}>
              <div className="flex flex-col gap-4 mb-8">
                {variant === 'Sign Up' && (
                  <>
                    <Input
                      id="firstName"
                      onChange={e => setFirstName(e.target.value)}
                      value={firstName}
                      placeholder=" First Name"
                      maxLength={20}
                      isRequired={true}
                    />
                    <Input
                      id="lastName"
                      onChange={e => setLastName(e.target.value)}
                      value={lastName}
                      placeholder=" Last Name"
                      maxLength={20}
                      isRequired={true}
                    />
                  </>
                )}
                <Input
                  id="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  placeholder=" Email"
                  type="email"
                  pattern="^[a-zA-Z0-9.]+@[a-z]+\.[a-z]{2,}$"
                  isRequired={true}
                />
                <Input
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  placeholder=" Password"
                  type="password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  isRequired={true}
                />
              </div>
              <div className="group rounded-md" onClick={e => {
                window.getSelection().removeAllRanges();
                e.currentTarget.firstChild.blur();
              }}>
                <button className="w-full bg-blue-600 py-3 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
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
            </form>
            <div className="flex mt-8 items-center">
              <p className="text-white select-none m-0">
                {variant === 'Sign In' ? 'New to our services?' : 'Already have an account?'} &nbsp;
              </p>
              <div className="group flex-grow rounded-md" onClick={toggleVariant}>
                <button className="bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-base w-full pb-1">
                  {variant === 'Sign In' ? (
                    <div className="flex justify-center items-center">
                      <b>Get Started</b> &nbsp;
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="ChevronRight">
                        <path 
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.29297 19.2928L14.5859 12L7.29297 4.70706L8.70718 3.29285L16.7072 11.2928C16.8947 11.4804 17.0001 11.7347 17.0001 12C17.0001 12.2652 16.8947 12.5195 16.7072 12.7071L8.70718 20.7071L7.29297 19.2928Z"
                          fill="currentColor">
                        </path>
                      </svg>
                    </div>
                  ) : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LogIn;
