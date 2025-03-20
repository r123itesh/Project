import React from 'react';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import List from './List';
import Mobiles from './Mobiles';

function Home({ userName, mobiles, filteredMobiles, filters, setFilters, list, handleDelete, addToList, isLoading }) {
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Mobile Specifications</h1>
          <h2 className="text-lg text-white">Welcome, {userName}!</h2>
          <button 
            onClick={() => navigate('/login')} 
            className="text-gray-300 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-1/4 flex-shrink-0">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl p-4">
              <Filters filters={filters} setFilters={setFilters} mobiles={mobiles} />
              <List list={list} handleDelete={handleDelete} />
            </div>
          </aside>
          
          <main className="flex-1 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl p-6">
            <Mobiles mobiles={filteredMobiles} isLoading={isLoading} addToList={addToList} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
