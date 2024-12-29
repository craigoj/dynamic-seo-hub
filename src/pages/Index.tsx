const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
          <p className="text-xl text-gray-600">Start building your amazing project here!</p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <a 
            href="/admin-login" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Admin Login
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;