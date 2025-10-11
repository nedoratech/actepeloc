function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-md rounded-lg bg-white p-12 shadow-2xl">
        <h1 className="mb-4 text-center text-5xl font-bold text-gray-800">Hello World!</h1>
        <p className="text-center text-lg text-gray-600">
          Welcome to your Vite + React + TypeScript + Tailwind CSS app
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-600">
            Click Me
          </button>
          <button className="rounded-lg bg-purple-500 px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-purple-600">
            Or Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
