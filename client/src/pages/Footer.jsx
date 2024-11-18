import React from 'react';
import './footer.css';
import cliniqueLogo from "../assets/images/Main Logos/Clinique Logo.png";
import diorLogo from '../assets/images/Main Logos/Dior Logo.png';
import macLogo from '../assets/images/Main Logos/MAC Logo.png';
import narsLogo from '../assets/images/Main Logos/NARS Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <p style={{ textShadow: '.5px 1px 2px #ff00cc' }}>&copy; {new Date().getFullYear()} The Beauty Shop. All rights reserved.</p>
      <nav>
        <ul>
          <li>
            <a href="https://www.clinique.com">
            <img src={cliniqueLogo} alt="Clinique" style={{ width: '100px', height: 'auto' }} />
            </a>
          </li>
          <li>
            <a href="https://www.dior.com/en_us">
              <img src={diorLogo} alt="Dior" style={{ width: '100px', height: 'auto' }}/>
            </a>
          </li>
          <li>
            <a href="https://www.maccosmetics.com">
              <img src={macLogo} alt="MAC" style={{ width: '100px', height: 'auto' }}  />
            </a>
          </li>
          <li>
            <a href="https://www.narscosmetics.com">
              <img src={narsLogo} alt="NARS" style={{ width: '100px', height: 'auto' }} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer; 
