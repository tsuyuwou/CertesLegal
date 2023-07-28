import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import Input from './Input.jsx';

const Account = ({ user, setUser }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(Array(4).fill(false));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/log-in', { replace: true });
    }
  }, [user]);

  return (
    user && (
      <div
        id="bg"
        className={`relative w-full bg-[url('/src/assets/gavel.png')] bg-cover`}
        style={{height: `${Math.max(window.innerHeight - 89.5, 881.5)}px`}}
      >
        <div id="bg-tint" className="w-full h-full">
          <div id="fg" className="px-16 py-16 rounded-md m-auto relative">
            <div className='flex gap-6'>
              <h2 className="text-white text-4xl mb-8 font-semibold select-none mt-0" onClick={() => window.getSelection().removeAllRanges()}>
                My Account
              </h2>
              <div className="group rounded-md h-[44px] -translate-y-[2px] flex-grow" onClick={e => {
                e.currentTarget.firstChild.blur();
                setUser(null);
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
                  if (firstName.length === 0) {
                    setEdit(Array(4).fill(false));
                  }
                  else if (firstName !== user.firstName) {
                    UserService.updateUser(user.id, {
                      firstName
                    }).then(res => {
                      setUser({ ...res.data, password: user.password });
                      setFirstName('');
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }}>
                  <div className='flex gap-4'>
                    <div className='flex-grow'>
                      <Input
                        id="firstName"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder=" First Name"
                        maxLength={20}
                        autoFocus={true}
                      />
                    </div>
                    <div className="group rounded-md w-[44px]" onClick={e => {
                      window.getSelection().removeAllRanges();
                      e.currentTarget.firstChild.blur();
                    }}>
                      <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
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
                  <div className='flex flex-grow gap-4'>
                    <input
                      type="text"
                      value={"First Name"}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-3
                        py-3
                        w-[82px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                    <input
                      type="text"
                      value={user.firstName}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-[13px]
                        py-3
                        w-[164px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                  </div>
                  <div className="group rounded-md w-[44px]" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setFirstName('');
                    setEdit([true, false, false, false]);
                  }}>
                    <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
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
                  if (lastName.length === 0) {
                    setEdit(Array(4).fill(false));
                  }
                  else if (lastName !== user.lastName) {
                    UserService.updateUser(user.id, {
                      lastName
                    }).then(res => {
                      setUser({ ...res.data, password: user.password });
                      setLastName('');
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }}>
                  <div className='flex gap-4'>
                    <div className='flex-grow'>
                      <Input
                        id="lastName"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        placeholder=" Last Name"
                        maxLength={20}
                        autoFocus={true}
                      />
                    </div>
                    <div className="group rounded-md w-[44px]" onClick={e => {
                      window.getSelection().removeAllRanges();
                      e.currentTarget.firstChild.blur();
                    }}>
                      <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
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
                  <div className='flex flex-grow gap-4'>
                    <input
                      type="text"
                      value={"Last Name"}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-3
                        py-3
                        w-[82px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                    <input
                      type="text"
                      value={user.lastName}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-[13px]
                        py-3
                        w-[164px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                  </div>
                  <div className="group rounded-md w-[44px]" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setLastName('');
                    setEdit([false, true, false, false]);
                  }}>
                    <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
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
                  if (email.length === 0) {
                    setEdit(Array(4).fill(false));
                  }
                  else if (email !== user.email) {
                    UserService.updateUser(user.id, {
                      email
                    }).then(res => {
                      setUser({ ...res.data, password: user.password });
                      setEmail('');
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }}>
                  <div className='flex gap-4'>
                    <div className='flex-grow'>
                      <Input
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder=" Email"
                        type="email"
                        pattern="^[a-zA-Z0-9.]+@[a-z]+\.[a-z]{2,}$"
                        autoFocus={true}
                      />
                    </div>
                    <div className="group rounded-md w-[44px]" onClick={e => {
                      window.getSelection().removeAllRanges();
                      e.currentTarget.firstChild.blur();
                    }}>
                      <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
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
                  <div className='flex flex-grow gap-4'>
                    <input
                      type="text"
                      value={"Email"}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-3
                        py-3
                        w-[82px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                    <input
                      type="text"
                      value={user.email}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-[13px]
                        py-3
                        w-[164px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                  </div>
                  <div className="group rounded-md w-[44px]" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setEmail('');
                    setEdit([false, false, true, false]);
                  }}>
                    <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                      <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              )}
              {edit[3] ? (
                <form onSubmit={e => {
                  e.preventDefault();
                  if (password.length === 0) {
                    setEdit(Array(4).fill(false));
                  }
                  else if (password !== user.password) {
                    UserService.updateUser(user.id, {
                      password
                    }).then(res => {
                      setUser({ ...res.data, password });
                      setPassword('');
                      setEdit(Array(4).fill(false));
                    }).catch(error => {
                      console.error(error);
                    });
                  }
                }}>
                  <div className='flex gap-4'>
                    <div className='flex-grow'>
                      <Input
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder=" Password"
                        type="password"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                        autoFocus={true}
                      />
                    </div>
                    <div className="group rounded-md w-[44px]" onClick={e => {
                      window.getSelection().removeAllRanges();
                      e.currentTarget.firstChild.blur();
                    }}>
                      <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
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
                  <div className='flex flex-grow gap-4'>
                    <input
                      type="text"
                      value={"Password"}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-3
                        py-3
                        w-[82px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                    <input
                      type="text"
                      value={user.password}
                      readOnly
                      className="
                        block
                        rounded-md
                        px-[13px]
                        py-3
                        w-[164px]
                        text-md
                        text-white
                        bg-black
                        border-none
                        outline-none
                      "
                      style={{fontFamily: 'Space Mono'}}
                    />
                  </div>
                  <div className="group rounded-md w-[44px]" onClick={e => {
                    window.getSelection().removeAllRanges();
                    e.currentTarget.firstChild.blur();
                    setPassword('');
                    setEdit([false, false, false, true]);
                  }}>
                    <button className="w-full h-full bg-blue-600 text-white rounded-md outline-none border-none group-hover:bg-blue-700 transition-transform focus:scale-90 select-none cursor-pointer text-2xl">
                      <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="group rounded-md" onClick={e => {
              e.currentTarget.firstChild.blur();
              UserService.deleteUser(user.id).then(res => {
                console.log(res);
                setUser(null);
              }).catch(error => {
                console.error(error);
              });
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
