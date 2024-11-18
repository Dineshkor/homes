"use client";
import { useState } from "react";
import {
  FaUpload,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaParking,
  FaCouch,
  FaBuilding,
  FaSwimmingPool,
  FaWifi,
  FaTree,
  FaVideo,
  FaLock,
  FaFan,
  FaFireExtinguisher,
  FaRegClock,
  FaDumbbell,
  FaUtensils,
  FaPowerOff,
  FaCheck,
} from "react-icons/fa";

import { Property } from "@/types";

interface PropertyFormProps {
  onSubmit: (data: Partial<Property>) => void;
  isLoading?: boolean;
  initialData?: Partial<Property>;
}

// Add this after the PropertyFormProps interface
const amenityIcons: { [key: string]: any } = {
  "Swimming Pool": FaSwimmingPool,
  WiFi: FaWifi,
  Garden: FaTree,
  CCTV: FaVideo,
  Security: FaLock,
  "Air Conditioning": FaFan,
  "Fire Safety": FaFireExtinguisher,
  "24/7 Access": FaRegClock,
  Gym: FaDumbbell,
  "Modular Kitchen": FaUtensils,
  "Power Backup": FaPowerOff,
};

export default function PropertyForm({
  onSubmit,
  isLoading,
  initialData,
}: PropertyFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    type: initialData?.type || "",
    status: initialData?.status || "active",
    location:
      typeof initialData?.location === "string"
        ? {
            address: initialData?.location || "",
            city: "",
            state: "Uttarakhand",
          }
        : {
            address: initialData?.location?.address || "",
            city: initialData?.location?.city || "",
            state: "Uttarakhand",
          },
    features: {
      bedrooms: initialData?.features?.bedrooms || 0,
      bathrooms: initialData?.features?.bathrooms || 0,
      area: initialData?.features?.area || 0,
      parking: initialData?.features?.parking || 0,
      furnished: initialData?.features?.furnished || "",
      floor: initialData?.features?.floor || "",
    },
    amenities: initialData?.amenities || [],
    images: initialData?.images || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Partial<Property>);
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
      {/* Basic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Property Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              required
            >
              <option value="">Select type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.location.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, address: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.location.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, city: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <div className="relative">
              <FaBed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="bedrooms"
                value={formData.features.bedrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    features: {
                      ...formData.features,
                      bedrooms: Number(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full pl-10 rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <div className="relative">
              <FaBath className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="bathrooms"
                value={formData.features.bathrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    features: {
                      ...formData.features,
                      bathrooms: Number(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full pl-10 rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Area (sq.ft)
            </label>
            <div className="relative">
              <FaRulerCombined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="area"
                value={formData.features.area}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    features: {
                      ...formData.features,
                      area: Number(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full pl-10 rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(amenityIcons).map(([amenity, Icon]) => (
            <button
              key={amenity}
              type="button"
              onClick={() => handleAmenityToggle(amenity)}
              className={`flex items-center space-x-2 p-3 rounded-lg border ${
                formData.amenities.includes(amenity)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{amenity}</span>
              {formData.amenities.includes(amenity) && (
                <FaCheck className="h-4 w-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Property'}
        </button>
      </div>
    </form>
  );
}
