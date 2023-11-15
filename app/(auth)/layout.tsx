import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      auth layout
      {children}
    </>
  );
};

export default Layout;
