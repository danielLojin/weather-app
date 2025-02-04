import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <main className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-xl flex flex-col items-center gap-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;
