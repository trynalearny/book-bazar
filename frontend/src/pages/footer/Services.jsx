import React from 'react';
import backgroundImg from '../../assets/background.jpg';

const Services = () => {
  return (
    <section className="services" style={{ 
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1.5rem',
          color: '#333'
        }}>Our Services</h2>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          color: '#666'
        }}>
          At Book Bazaar, we offer a variety of services to enhance your reading experience. From book recommendations to signing up for newsletters, we cater to all your literary needs.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <div style={{
            flex: '1 1 30%',
            padding: '1rem',
            margin: '1rem',
            background: '#f8d7da',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#721c24' }}>Variety of Books</h3>
            <p style={{ fontSize: '1rem', color: '#721c24' }}>
              Discover a wide range of books across various genres. Whether you're into fiction, non-fiction, mystery, romance, or sci-fi, we have something for everyone.
            </p>
          </div>
          <div style={{
            flex: '1 1 30%',
            padding: '1rem',
            margin: '1rem',
            background: '#d4edda',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#155724' }}>Newsletter Signup</h3>
            <p style={{ fontSize: '1rem', color: '#155724' }}>
              Stay updated with the latest book releases, author events, and special offers. Sign up for our newsletter and never miss out on exciting news from Book Bazaar.
            </p>
          </div>
          <div style={{
            flex: '1 1 30%',
            padding: '1rem',
            margin: '1rem',
            background: '#d1ecf1',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0c5460' }}>Personalized Recommendations</h3>
            <p style={{ fontSize: '1rem', color: '#0c5460' }}>
              Receive personalized book recommendations based on your reading preferences and interests. Our experts curate a list of must-read books just for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
