import React, {useRef} from "react";
import emailjs from '@emailjs/browser'
import "./contactus.style.css";
const ContactUs = () => {
  const form = useRef()
  const sendEmail = (e) =>{
    e.preventDefault();
    emailjs.sendForm('service_54e8mtn', 'template_t3clcq6', form.current, '767wuq3MKo9vm3GPF')
    .then((result)=>{
console.log(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return <div className="contact-container">
    <form className="contact-us" ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  </div>;
};

export default ContactUs;
