// app/dashboard/layout.js
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { AuthProvider } from "../_context/AuthContext";

export default async function Layout({ children }) {
  return (
    /* FIX 1: h-screen and overflow-hidden on the parent div 
      locks the entire dashboard so the main window never scrolls. 
    */
    <div className="h-screen w-full bg-gray-50 dark:bg-slate-950 flex overflow-hidden transition-colors duration-300">
      <AuthProvider>
        {/* Sidebar: SideNav component handles its own responsive 
           fixed/static logic internally. 
        */}
        <aside className="h-full z-50 flex-shrink-0">
          <SideNav />
        </aside>

        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* Header: Stays fixed at the top of the content area */}
          <Header />
          
          {/* FIX 2: flex-1 and overflow-y-auto on the main tag 
             creates the independent scroll area for your pages.
          */}
          <main className="flex-1 overflow-y-auto bg-transparent">
            {children}
          </main>
        </div>
      </AuthProvider>
    </div>
  );
}