import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Componenets/Header";
import Sidebar from "./Componenets/Sidebar";
import Dashboard from "./Pages/Dashboard";

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <Dashboard />
            </div>
          </div>
        </section>
      ),
    },
  ]);

  const values = { isSidebarOpen, setIsSidebarOpen };

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
