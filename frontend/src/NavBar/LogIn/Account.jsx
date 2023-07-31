import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import Input from './Input.jsx';
import './LogIn.css';

const Account = ({ user, setUser, setAppliedJobs }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(Array(4).fill(false));
  const [see, setSee] = useState(false);
  const navigate = useNavigate();
  const fontStyle = { fontFamily: 'Space Mono' };

  useEffect(() => {
    if (!user) {
      navigate('/log-in', { replace: true });
    }
  }, [user]);

  return (
    user && (
      <div id="bg" className={`relative w-full bg-[url('/src/assets/gavel.png')] bg-cover`} style={{height: `${Math.max(window.innerHeight - 89.5, 875.5)}px`}}>
        <div id="bg-tint" className="w-full h-full">
          <div id="fg" className="px-16 py-16 rounded-md m-auto relative">
            <div className='flex gap-6'>
              <h2 className="text-white text-4xl mb-8 font-semibold select-none mt-0" onClick={() => window.getSelection().removeAllRanges()}>
                My Account
              </h2>
              <div className="group rounded-md h-[44px] -translate-y-[2px] flex-grow" onClick={e => {
                e.currentTarget.firstChild.blur();
                setTimeout(() => {
                  setUser(null);
                  setAppliedJobs([]);
                }, 200);
              }}>
                <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                  Log Out
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              {edit[0] ? (
                <form onSubmit={e => {
                  e.preventDefault();
                  if ((firstName === '') || (firstName === user.firstName)) {
                    setEdit(Array(4).fill(false));
                  }
                  else {
                    UserService.updateUser(user.id, { firstName }).then(res => {
                      setUser({ ...res.data, password: user.password });
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }}>
                  <div className='flex gap-4'>
                    <Input value={firstName} placeholder=" First Name" maxLength={20} autoFocus={true} onChange={e => setFirstName(e.target.value)} />
                    <div className="group rounded-md" onClick={e => {
                      window.getSelection().removeAllRanges();
                      e.currentTarget.firstChild.blur();
                    }}>
                      <button className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                        <div className="flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className='flex gap-4'>
                  <input type="text" value="First Name" style={fontStyle} readOnly
                    className="block rounded-md px-3 py-3 w-[85px] text-md text-white bg-black border-none outline-none"
                  />
                  <input type="text" value={user.firstName} style={fontStyle} readOnly
                    className="block rounded-md px-3 py-3 w-[163px] text-md text-white bg-black border-none outline-none"
                  />
                  <div className="group rounded-md" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setFirstName(user.firstName);
                    setEdit([true, false, false, false]);
                  }}>
                    <button className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                      <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              )}
              {edit[1] ? (
                <form onSubmit={e => {
                  e.preventDefault();
                  if ((lastName === '') || (lastName === user.lastName)) {
                    setEdit(Array(4).fill(false));
                  }
                  else {
                    UserService.updateUser(user.id, { lastName }).then(res => {
                      setUser({ ...res.data, password: user.password });
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }}>
                  <div className='flex gap-4'>
                    <Input value={lastName} placeholder=" Last Name" maxLength={20} autoFocus={true} onChange={e => setLastName(e.target.value)} />
                    <div className="group rounded-md" onClick={e => {
                      window.getSelection().removeAllRanges();
                      e.currentTarget.firstChild.blur();
                    }}>
                      <button className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                        <div className="flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className='flex gap-4'>
                  <input type="text" value="Last Name" style={fontStyle} readOnly
                    className="block rounded-md px-3 py-3 w-[85px] text-md text-white bg-black border-none outline-none"
                  />
                  <input type="text" value={user.lastName} style={fontStyle} readOnly
                    className="block rounded-md px-3 py-3 w-[163px] text-md text-white bg-black border-none outline-none"
                  />
                  <div className="group rounded-md" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setLastName(user.lastName);
                    setEdit([false, true, false, false]);
                  }}>
                    <button className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                      <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              )}
              {edit[2] ? (
                <form onSubmit={e => {
                  e.preventDefault();
                  if ((email === '') || (email === user.email)) {
                    setEdit(Array(4).fill(false));
                  }
                  else {
                    UserService.updateUser(user.id, { email }).then(res => {
                      setUser({ ...res.data, password: user.password });
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }}>
                  <div className='flex gap-4'>
                    <Input type="email" value={email} placeholder=" Email" autoFocus={true}
                      pattern="^[a-zA-Z0-9.]+@[a-z]+\.[a-z]{2,}$" onChange={e => setEmail(e.target.value)}
                    />
                    <div className="group rounded-md" onClick={e => {
                      window.getSelection().removeAllRanges();
                      e.currentTarget.firstChild.blur();
                    }}>
                      <button className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                        <div className="flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className='flex gap-4'>
                  <input type="text" value="Email" style={fontStyle} readOnly
                    className="block rounded-md px-3 py-3 w-[85px] text-md text-white bg-black border-none outline-none"
                  />
                  <input type="text" value={user.email} style={fontStyle} readOnly
                    className="block rounded-md px-3 py-3 w-[163px] text-md text-white bg-black border-none outline-none"
                  />
                  <div className="group rounded-md" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setEmail(user.email);
                    setEdit([false, false, true, false]);
                  }}>
                    <button className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                      <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              )}
              <form onSubmit={e => {
                e.preventDefault();
                if (edit[3]) {
                  if ((password === '') || (password === user.password)) {
                    setEdit(Array(4).fill(false));
                  }
                  else {
                    UserService.updateUser(user.id, { password }).then(res => {
                      setUser({ ...res.data, password });
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }
                else {
                  setPassword(user.password);
                  setEdit([false, false, false, true]);
                }
              }}>
                <div className='flex gap-4'>
                  {edit[3] ? (
                    <Input value={password} placeholder=" Password" type={see ? "text" : "password"} autoFocus={true}
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={e => setPassword(e.target.value)} />
                  ) : (
                    <>
                      <input type="text" value="Password" style={fontStyle} readOnly
                        className="block rounded-md px-3 py-3 w-[85px] text-md text-white bg-black border-none outline-none"
                      />
                      <input type={see ? "text" : "password"} value={user.password} style={fontStyle} readOnly
                        className="block rounded-md px-3 py-3 w-[103px] text-md text-white bg-black border-none outline-none"
                      />
                    </>
                  )}
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
                  <div className="group rounded-md" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                  }}>
                    <button className="w-[44px] h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                      <div className="flex justify-center">
                        {edit[3] ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="group rounded-md" onClick={e => {
              e.currentTarget.firstChild.blur();
              setTimeout(() => {
                UserService.deleteUser(user.id).then(() => {
                  setUser(null);
                  setAppliedJobs([]);
                }).catch(error => {
                  console.error(error);
                });
              }, 200);
            }}>
              <button className="w-full bg-blue-600 py-3 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Account;
