import 'antd/dist/reset.css'; // Ant Design styles
import './globals.css'; // Your global styles

const Layout = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DEAL</title>
    </head>
    <body>
      {/* Your layout components, e.g., header, footer */}
      {children}
    </body>
  </html>
);

export default Layout;
