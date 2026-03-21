import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../app/provider/AuthProvider';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-bottom px-4 py-3 d-flex align-items-center justify-content-between sticky-top" style={{ borderColor: '#eaeff1' }}>
      <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2" style={{ width: '400px' }}>
        <Search size={18} className="text-muted mr-2" />
        <input 
          type="text" 
          placeholder="Search news, categories..." 
          className="border-0 bg-transparent flex-grow-1 ml-2 outline-none"
          style={{ fontSize: '0.875rem', marginLeft: '8px', border: 'none', outline: 'none' }}
        />
      </div>

      <div className="d-flex align-items-center">
        <button className="btn btn-light rounded-circle p-2 mr-3 position-relative">
          <Bell size={20} className="text-muted" />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle"></span>
        </button>
        
        <div className="d-flex align-items-center border-left pl-3" style={{ borderLeft: '1px solid #eaeff1', paddingLeft: '16px' }}>
          <div className="text-right mr-3" style={{ marginRight: '12px' }}>
            <p className="mb-0 font-weight-bold" style={{ fontSize: '0.875rem' }}>{user?.fullName || 'Admin User'}</p>
            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>{user?.role || 'Staff'}</p>
          </div>
          <div className="bg-primary-container rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
             <User size={20} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
