import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children, currentPage, navigate }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar currentPage={currentPage} navigate={navigate} />
      <div
        style={{
          marginLeft: 'var(--sidebar-width)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header currentPage={currentPage} navigate={navigate} />
        <main
          style={{
            marginTop: 'var(--header-height)',
            flex: 1,
            overflowY: 'auto',
            background: 'var(--bg-primary)',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;