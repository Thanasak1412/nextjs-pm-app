import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      dashboard layout
      {children}
    </>
  );
};

export default Layout;
