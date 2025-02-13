import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Starts = () => {
  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setStart(true);
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-gray-200">
      <div className="animate-fadeIn">
        <h1 className="text-5xl font-bold mb-4">Yukkuto</h1>
      </div>
      <div className="animate-fadeIn delay-200">
        <p className="text-xl mb-8 text-center">
          思い出の地や好きな場所の記録をサポートする、ユクット。
        </p>
      </div>
      <button
        onClick={handleStart}
        className="px-8 py-4 bg-indigo-600 text-xl font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95"
      >
        スタート
      </button>

      {start && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fadeOut">
          <h2 className="text-4xl text-white">アプリに移動中...</h2>
        </div>
      )}
    </div>
  );
};

export default Starts;
