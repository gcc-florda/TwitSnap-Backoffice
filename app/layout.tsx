'use client';


import Navbar from "@/src/modules/common/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <div style={{ display: "flex" }}>
            {!isLoginPage && <Navbar />}
            <div style={{ marginLeft: isLoginPage ? 0 : "250px", padding: "20px", flex: 1 }}>
              {children}
            </div>
          </div>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
