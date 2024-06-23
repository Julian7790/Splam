
import React, { useState } from 'react';
import { logo, musicLogo, search } from '../assets';
import Hamburger from 'hamburger-react';
import './TopSection.css'; 



const TopSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='px-4 py-10 w-full relative'>
      <div className='flex flex-col'>
        <div className='mb-4 flex justify-between items-center'>
          <img 
            src={musicLogo} 
            alt="logo"
            width={60} 
            height={60}
          />
          <h1 className='text-3xl font-montserrat font-bold text-blue-500 welcome-text' data-text="Welcome to Splam">
            Welcome to Splam
          </h1>
          <div className="z-50">
            <Hamburger
              toggled={isOpen}
              toggle={toggleNavbar}
              size={30} 
            />
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black opacity-50"></div>
        )}
        <nav className={`fixed inset-y-0 right-0 bg-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
          <div className="flex flex-col justify-center items-center h-full">
            <a href="#" className="text-xl font-montserrat font-semibold text-blue-500 py-2">Discover</a>
            <a href="#" className="text-xl font-montserrat font-semibold text-blue-500 py-2">Top Artists</a>
            <a href="#" className="text-xl font-montserrat font-semibold text-blue-500 py-2">Top Tracks</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopSection;


