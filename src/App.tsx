function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
          Hello World!
        </h1>
        <p className="text-gray-600 text-center text-lg">
          Welcome to your Vite + React + TypeScript + Tailwind CSS app
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            Click Me
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            Or Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
