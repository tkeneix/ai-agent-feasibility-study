import React from 'react';
import MovieBookingApp from './components/MovieBookingApp';
import TestApp from './components/TestApp'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MovieBookingApp />
      {/* <TestApp /> */}
    </div>
  );
};

export default App;
