import React from 'react'

function List({ list, handleDelete }) {
  return (
    <div className="p-4 border-t border-gray-700">
      <h2 className="text-white text-lg font-bold mb-4">My List</h2>
      {list.length === 0 ? (
        <p className="text-gray-400 text-sm">No mobiles added to the list.</p>
      ) : (
        <ul className="space-y-3">
          {list.map((mobile) => (
            <li
              key={mobile.device_id}
              className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-gray-700/70 transition"
            >
              <img
                src={mobile.device_image || "http://shmector.com/_ph/1/2732272.png"}
                alt={mobile.device_name}
                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{mobile.device_name}</h3>
                <p className="text-gray-400 text-sm truncate">{mobile.brand_name}</p>
                <p className="text-gray-400 text-sm">₹{mobile.device_price}</p>
              </div>
              <button
                onClick={() => handleDelete(mobile.device_id)}
                className="p-2 text-gray-400 hover:text-red-400 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List