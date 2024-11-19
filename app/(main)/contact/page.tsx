import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-50">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Get in <span className="text-blue-600">Touch</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Have questions about a property or need assistance? Our team of real estate experts 
          is here to help you find your perfect home.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white">
          <div className="absolute inset-0 bg-blue-600 opacity-10 pattern-grid-lg"></div>
          <ContactInfo />
        </div>
        <div className="p-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
