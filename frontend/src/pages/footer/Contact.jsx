import React from 'react';
import Swal from 'sweetalert2';
import backgroundImg from '../../assets/background.jpg';

const Contact = () => {
  
    const onSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
  
      formData.append("access_key", "d8b680f3-b0aa-4a30-8489-5263cc5b8d11");
  
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());
  
      if (res.success) {
        Swal.fire({
          title: "Sucess!",
          text: "Message sent successfully!",
          icon: "success"
        });
      }
    };
  
  return (
    <section className="contact" style={{ backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: 'center',
      display: 'flex',      justifyContent: 'center',      alignItems: 'center',      padding: '2rem',      backgroundSize: 'cover'
    }}>
      <form onSubmit={onSubmit} style={{
        background: 'white',padding: '2rem',    borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '500px',   width: '100%'
      }}>
        <h2 style={{
          textAlign: 'center',          marginBottom: '1.5rem',          fontSize: '1.5rem',          color: '#333'
        }}>CONTACT FORM</h2>
        <div className="input-box" style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',   marginBottom: '0.5rem',  fontWeight: 'bold',  color: '#333'
          }}>Full name</label>
          <input type="text" className="field" placeholder="Enter your name" name='name' required style={{
            width: '100%', padding: '0.75rem', border: '1px solid #ccc',  borderRadius: '4px',  fontSize: '1rem',   color: '#333'
          }} />
        </div>
        <div className="input-box" style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',     marginBottom: '0.5rem',     fontWeight: 'bold',   color: '#333'
          }}>Email address</label>
          <input type="email" className="field" placeholder="Enter your email" name="email" required style={{
            width: '100%',    padding: '0.75rem',   border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem',  color: '#333'
          }} />
        </div>
        <div className="input-box" style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block', marginBottom: '0.5rem',   fontWeight: 'bold',color: '#333'
          }}>Message</label>
          <textarea name="message" className="field message" placeholder="Enter your message" required style={{
            width: '100%',  padding: '0.75rem',   border: '1px solid #ccc',  borderRadius: '4px',  fontSize: '1rem', color: '#333',
            height: '150px',
            resize: 'none'
          }}></textarea>
        </div>
        <button type="submit" style={{
          display: 'block',
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}>Send message</button>
      </form>
    </section>
  );
};

export default Contact;
