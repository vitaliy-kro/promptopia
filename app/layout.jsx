import { ToastContainer } from 'react-toastify';
import '@styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
