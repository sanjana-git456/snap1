import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { Music, Plus, Mic2 } from 'lucide-react';

const JamRooms = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [newJam, setNewJam] = useState({ title: '', genre: '' });

  const { data: jams, isLoading } = useQuery({
    queryKey: ['jams'],
    queryFn: () => client.get('/jams/').then(r => r.data)
  });

  const mutation = useMutation({
    mutationFn: (data) => client.post('/jams/', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['jams']);
      setShowForm(false);
      setNewJam({ title: '', genre: '' });
    }
  });

  if (isLoading) return <div>Loading jams...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Jam Rooms</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Host a Jam
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 mb-8">
          <h2 className="text-lg font-bold mb-4">Start a New Session</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Jam Title (e.g. Midnight Jazz)"
              className="p-3 border rounded-lg"
              value={newJam.title}
              onChange={e => setNewJam({...newJam, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="Genre"
              className="p-3 border rounded-lg"
              value={newJam.genre}
              onChange={e => setNewJam({...newJam, genre: e.target.value})}
            />
          </div>
          <button
            onClick={() => mutation.mutate(newJam)}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Go Live
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(jams ?? []).map(jam => (
          <div key={jam.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <Mic2 className="text-white w-6 h-6" />
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">LIVE</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{jam.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{jam.genre} • Hosted by {jam.host_name}</p>
              <button className="w-full border-2 border-indigo-600 text-indigo-600 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                Enter Room
              </button>
            </div>
          </div>
        ))}
        {(jams ?? []).length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Music className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No active jams. Be the first to start one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JamRooms;