
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) { // takes a children prop (of type React.ReactNode) which is where the specific page content will be rendered.
  return (
    <html lang="en">
      <body className={poppins.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}


/* Learning Notes

This file defines the root layout for your entire application or for specific parts of it. 
Layouts wrap around the content of each page, which allows for consistent elements like navigation bars, footers, or sidebars.

1. Next.js looks for the layout: It finds the layout.tsx file in the src/app directory.
2. Next.js finds the page: It then looks for the page component associated with the route. Ex, it finds src/app/products/page.tsx.
      - Next.js uses file-based routing system to determine which page component corresponds to a particular route.
      
      - Example:
            
            -src
              └── app
                ├── layout.tsx         // Root layout
                ├── page.tsx           // Corresponds to the root route "/"
                └── products
                    └── page.tsx       // Corresponds to the "/products" route
          
          - The page.tsx file in the src/app directory corresponds to the root route / of your application.
          - The page.tsx file inside the products directory corresponds to the /products route.

          - Next.js sees the path and checks the src/app folder for a corresponding route.
          - It finds the products/page.tsx file.
          - Next.js will first render the layout.tsx file.
          - It then looks for the specific page component for the /products route and finds the ProductsPage component in src/app/products/page.tsx.
          - Finally, it renders the RootLayout component with the ProductsPage content injected into the {children} prop.

3. Rendering the Layout:
      - Next.js will invoke the layout component and pass the ProductsPage component as its children prop.
      - This means when the layout is rendered, the {children} placeholder will be filled with the output of the ProductsPage component.

*/