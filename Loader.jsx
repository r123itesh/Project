import React from 'react';

function Loader({ fullScreen = false }) {
  const loaderClasses = fullScreen 
    ? "fixed inset-0 bg-slate-950 flex items-center justify-center z-50" 
    : "flex items-center justify-center";

  return (
    <div className={loaderClasses}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}

export default Loader;