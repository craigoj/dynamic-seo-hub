import { Card, CardContent } from "@/components/ui/card";

export const SolutionSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Introducing CTRL Tech: AI That Works for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This isn't just about automating tasks; it's about empowering your business. CTRL Tech integrates AI into your workflows, optimizing operations so your team can focus on what they do best.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            "Step 1: Schedule a free consultation to understand your needs.",
            "Step 2: Get a customized AI integration plan tailored to your business.",
            "Step 3: Watch your business achieve more with less effort."
          ].map((step, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{step}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <p className="text-xl font-medium text-blue-900 mb-4">
            "Small businesses are the backbone of innovation, and our mission is to equip you with the tools to stay ahead. Let's build the future of your business together."
          </p>
          <p className="text-blue-600 font-medium">- Founder, CTRL Tech</p>
        </div>
      </div>
    </section>
  );
};