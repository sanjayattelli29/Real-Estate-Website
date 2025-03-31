import { Outlet } from 'react-router-dom';
import { SideContactButton } from '../common/page-componets';
import { Header } from '../common/header';
import { Footer } from '../common';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SideContactButton />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 