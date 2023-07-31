import { useState, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import Input from './Input.jsx';
import './LogIn.css';

const LogIn = ({ user, setUser, setAppliedJobs }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('Sign In');
  const [see, setSee] = useState(false);
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
    setTimeout(() => {
      clearForm();
      setSee(false);
      setVariant(curr => curr === 'Sign In' ? 'Sign Up' : 'Sign In');
    }, 200);
  }, []);

  useEffect(() => {
    const popUp = document.getElementById('pop-up');
    if (window.getComputedStyle(popUp).zIndex == 10) {
      popUp.style.zIndex = -1;
      popUp.firstChild.style.visibility = 'hidden';
      document.getElementById('content').style.userSelect = 'auto';
      document.body.style.overflowY = 'scroll';
    }
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
        style={{height: `${Math.max(window.innerHeight - 89.5, 875.5)}px`}}
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
              setTimeout(() => {
                UserService.authenticate({
                  ...(firstName && {firstName}), ...(lastName && {lastName}), email, password
                }).then(({ data }) => {
                  clearForm();
                  delete data.user.jobs;
                  setUser(data.user);
                  setAppliedJobs(data.appliedJobs);
                }).catch(error => {
                  console.error(error);
                });
              }, 200);
            }}>
              <div className="flex flex-col gap-4 mb-8">
                {variant === 'Sign Up' && (
                  <div className="flex gap-4">
                    <Input
                      onChange={e => setFirstName(e.target.value)}
                      value={firstName}
                      placeholder=" First Name"
                      maxLength={20}
                      isRequired={true}
                    />
                    <Input
                      onChange={e => setLastName(e.target.value)}
                      value={lastName}
                      placeholder=" Last Name"
                      maxLength={20}
                      isRequired={true}
                    />
                  </div>
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
                <div className="flex gap-4">
                  <Input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder=" Password"
                    type={see ? "text" : "password"}
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    isRequired={true}
                  />
                  <div className="group rounded-md" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setSee(!see);
                  }}>
                    <button type="button" className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                      <div className="flex justify-center">
                        {see ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
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
