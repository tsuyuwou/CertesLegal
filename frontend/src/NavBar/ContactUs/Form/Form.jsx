import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import './Form.css';

const Form = ({ tabIndex }) => {

  const [form, setForm] = useState({firstname: "", lastname: "", email: "", phone: "", message: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendButton = document.querySelector("#sendButton");
    sendButton.disabled = true;
    
    emailjs
      .send(
        import.meta.env.VITE_LAWAII_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_LAWAII_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.firstname + ' ' + form.lastname,
          to_name: "Certes Legal",
          from_email: form.email,
          to_email: "certeslegal@gmail.com",
          message: form.message + '\n\nE-mail Address: ' + form.email + '\nPhone Number: ' + form.phone,
        },
        import.meta.env.VITE_LAWAII_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message delivered.");
          setForm({firstname: "", lastname: "", email: "", phone:"", message: ""});
          sendButton.disabled = false;
        },
        (error) => {
          console.error(error);
          alert("Message could not be delivered.");
          sendButton.disabled = false;
        }
      );
  };

  const handleReset = () => {
    setForm({ firstname: "", lastname: "", email: "", phone: "", message: "" });
  };

  useEffect(() => {
    const formDiv = document.querySelector('#contactForm > div');
    const textArea = formDiv.getElementsByTagName('textarea')[0];
    const setFormStyles = () => {
      formDiv.style.width = `${window.innerWidth > 1200 ? 70 : -0.01429 * window.innerWidth + 87.14}%`;
      textArea.rows = window.innerWidth > 1200 ? Math.round(0.00625 * window.innerWidth - 3.5): 4;
    };
    setFormStyles();
    window.onresize = setFormStyles;

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });
    });
  }, []);

  return (
    <div id="contactForm">
      <div>
        <h1 style={{marginTop: 0, marginBottom: '10px', textAlign: 'center'}}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <button type='reset' id="clearButton" tabIndex={tabIndex} onClick={handleReset}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24.5" height="24.5" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            </button>
            <button type='submit' id="sendButton" tabIndex={tabIndex}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24.5" height="24.5" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
              </svg>
            </button>
            <input type='text' name='firstname' tabIndex={tabIndex} value={form.firstname} onChange={handleChange} placeholder=" First Name" required/>
            <input type='text' name='lastname' tabIndex={tabIndex} value={form.lastname} onChange={handleChange} placeholder=" Last Name" required/>
          </div>
          <div>
            <input type='email' name='email' tabIndex={tabIndex} value={form.email} onChange={handleChange}  placeholder=" E-mail Address" required/>
            <input type='tel' name='phone' tabIndex={tabIndex} value={form.phone} onChange={handleChange}  placeholder=" Phone Number" required/>
          </div>
          <div>
            <textarea name='message' tabIndex={tabIndex} value={form.message} onChange={handleChange} placeholder=" Message" required/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
