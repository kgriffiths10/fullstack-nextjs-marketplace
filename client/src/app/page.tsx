// This is the main content of the page. In this structure, it's mapped to the root / route. 
// If you had additional folders within app/, they would represent other routes in your app.

import Dashboard from "@/app/dashboard/page";

export default function Home() {
  return (
    <Dashboard />
  );
}
