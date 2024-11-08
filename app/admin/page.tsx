"use client";
import AdminRecentActivity from "@/components/admin/AdminRecentActivity";
import AdminStats from "@/components/admin/AdminStats";
import AdminUserList from "@/components/admin/AdminUserList";
import { useState } from "react";
import { FaBuilding, FaUsers, FaChartLine, FaEnvelope } from "react-icons/fa";

// Temporary data - will be replaced with API calls
const stats = [
  {
    name: "Total Properties",
    value: "156",
    change: "+12%",
    icon: FaBuilding,
    color: "bg-blue-500",
  },
  {
    name: "Active Users",
    value: "2,345",
    change: "+8%",
    icon: FaUsers,
    color: "bg-green-500",
  },
  {
    name: "Monthly Revenue",
    value: "₹45L",
    change: "+23%",
    icon: FaChartLine,
    color: "bg-purple-500",
  },
  {
    name: "New Inquiries",
    value: "43",
    change: "+5%",
    icon: FaEnvelope,
    color: "bg-yellow-500",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your real estate platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <AdminStats />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <AdminRecentActivity />
          </div>
          <div className="p-6">{/* Add PropertyList component here */}</div>
        </div>

        {/* Recent Users */}
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
          </div>
          <div className="p-6">
            <AdminUserList />
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Inquiries
            </h2>
          </div>
          <div className="p-6">{/* Add InquiryList component here */}</div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Revenue Analytics
            </h2>
          </div>
          <div className="p-6">{/* Add AnalyticsChart component here */}</div>
        </div>
      </div>
    </div>
  );
}
