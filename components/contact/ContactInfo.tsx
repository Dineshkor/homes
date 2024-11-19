import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <div className="relative z-10">
      <h2 className="text-3xl font-semibold mb-8">Contact Information</h2>
      
      <div className="space-y-8">
        <div className="flex items-start space-x-4 group">
          <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition duration-300">
            <FaPhone className="text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Phone</h3>
            <p className="opacity-90 hover:opacity-100 transition">+1 (555) 123-4567</p>
            <p className="opacity-90 hover:opacity-100 transition">+1 (555) 765-4321</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 group">
          <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition duration-300">
            <FaEnvelope className="text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Email</h3>
            <p className="opacity-90 hover:opacity-100 transition">info@yourestate.com</p>
            <p className="opacity-90 hover:opacity-100 transition">support@yourestate.com</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 group">
          <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition duration-300">
            <FaMapMarkerAlt className="text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Office Address</h3>
            <p className="opacity-90 hover:opacity-100 transition leading-relaxed">
              123 Real Estate Boulevard<br />
              Suite 456<br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 group">
          <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition duration-300">
            <FaClock className="text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Business Hours</h3>
            <p className="opacity-90 hover:opacity-100 transition">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="opacity-90 hover:opacity-100 transition">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="opacity-90 hover:opacity-100 transition">Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-12 border-t border-white/20">
        <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          {/* Add your social media icons/links here */}
        </div>
      </div>
    </div>
  );
} 