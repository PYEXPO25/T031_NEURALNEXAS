import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Zap, Battery, Plug, Activity } from 'lucide-react';
import type { EnergyReading } from '../types';
import { mockDevices, mockReadings } from '../mockData';

export function Dashboard() {
  const [selectedDevice, setSelectedDevice] = useState(mockDevices[0].id);
  const readings = mockReadings[selectedDevice];
  const currentReading = readings[readings.length - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart Energy Monitor</h1>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {mockDevices.map(device => (
              <option key={device.id} value={device.id}>
                {device.name} - {device.location}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Power Consumption</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {currentReading?.power_consumption.toFixed(2)} kW
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Battery className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Voltage</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {currentReading?.voltage.toFixed(1)} V
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Plug className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Current</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {currentReading?.current.toFixed(2)} A
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Power Factor</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {currentReading?.power_factor.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Power Consumption History</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => format(new Date(timestamp), 'HH:mm')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(timestamp) => format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss')}
                />
                <Line
                  type="monotone"
                  dataKey="power_consumption"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}