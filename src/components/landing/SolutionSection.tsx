
export const SolutionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Introducing CTRL Tech: A smarter way to manage IT and automation</h2>
          <p className="text-gray-600">
            This isn't just another IT solution. CTRL Tech combines cutting-edge AI with expert IT support to bring efficiency, security, and growth to small businesses.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative p-8">
            <div className="absolute top-8 left-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
            <div className="pt-16">
              <h3 className="text-xl font-bold mb-3">Book a Consultation</h3>
              <p className="text-gray-600">Free consultation to assess your needs.</p>
            </div>
          </div>
          <div className="relative p-8">
            <div className="absolute top-8 left-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
            <div className="pt-16">
              <h3 className="text-xl font-bold mb-3">Get Your Plan</h3>
              <p className="text-gray-600">Tailored IT and automation plan.</p>
            </div>
          </div>
          <div className="relative p-8">
            <div className="absolute top-8 left-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
            <div className="pt-16">
              <h3 className="text-xl font-bold mb-3">Watch Growth</h3>
              <p className="text-gray-600">See your business thrive with streamlined operations.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <p className="text-xl font-medium text-blue-900 mb-4">
            "I started CTRL Tech to level the playing field for small businesses. Let us take care of IT, so you can take care of what matters most."
          </p>
          <p className="text-blue-600 font-medium">- Founder, CTRL Tech</p>
        </div>
      </div>
    </section>
  );
};
