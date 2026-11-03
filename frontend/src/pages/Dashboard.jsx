import React from 'react';
import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Music, Users, Star, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: jams } = useQuery({ queryKey: ['jams'], queryFn: () => client.get('/jams/').then(r => r.data) });
  const { data: events } = useQuery({ queryKey: ['events'], queryFn: () => client.get('/events/').then(r => r.data) });

  const stats = [
    { label: 'Reputation', value: user?.reputation || 0, icon: Star, color: 'text-yellow-500' },
    { label: 'Live Jams', value: (jams ?? []).length, icon: Music, color: 'text-indigo-500' },
    { label: 'Upcoming Events', value: (events ?? []).length, icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Followers', value: '1.2k', icon: Users, color: 'text-rose-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.username}!</h1>
        <p className="text-slate-600">Here's what's happening on SnapStage today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4">Active Jam Rooms</h2>
          <div className="space-y-4">
            {(jams ?? []).slice(0, 3).map(jam => (
              <div key={jam.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-bold text-slate-800">{jam.title}</p>
                  <p className="text-xs text-slate-500">{jam.genre} • Hosted by {jam.host_name}</p>
                </div>
                <button className="text-indigo-600 font-bold text-sm">Join</button>
              </div>
            ))}
            {(!jams || jams.length === 0) && <p className="text-slate-500 text-sm">No active jams right now.</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4">Upcoming Micro-Events</h2>
          <div className="space-y-4">
            {(events ?? []).slice(0, 3).map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-bold text-slate-800">{event.title}</p>
                  <p className="text-xs text-slate-500">{new Date(event.start_time).toLocaleDateString()} • ${event.price}</p>
                </div>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">Tickets</button>
              </div>
            ))}
            {(!events || events.length === 0) && <p className="text-slate-500 text-sm">No upcoming events.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;