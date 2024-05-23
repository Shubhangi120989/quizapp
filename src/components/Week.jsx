import React from 'react';

export default function Week({ updateSelected }) {
  const handleClick = (weekNumber) => {
    updateSelected(weekNumber);
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 min-h-screen flex flex-col justify-center items-center text-white font-serif">
      <h1 className="text-5xl font-bold mb-8">NPTEL</h1>
      <div className="flex flex-col space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(weekNumber => (
          <WeekItem
            key={weekNumber}
            weekNumber={weekNumber}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

function WeekItem({ weekNumber, onClick }) {
  return (
    <div
      className="cursor-pointer px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-lg hover:bg-opacity-30 transition duration-300 ease-in-out"
      onClick={() => onClick(weekNumber)}
    >
      <span className="text-2xl">Week {weekNumber}</span>
    </div>
  );
}

