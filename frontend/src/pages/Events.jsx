import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { Calendar, Ticket as TicketIcon } from 'lucide-react';

const Events = () => {
  const queryClient = useQueryClient();
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => client.get('/events/').then(r => r.data)
  });

  const buyMutation = useMutation({
    mutationFn: (eventId) => client.post(`/events/${eventId}/buy/`),
    onSuccess: () => {
      alert('Ticket purchased successfully!');
      queryClient.invalidateQueries(['events']);
    },
    onError: (err) => {
      alert(err.response?.data?.detail || 'Purchase failed');
    }
  });

  if (isLoading) return <div>Loading events...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Micro-Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(events ?? []).map(event => (
          <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-48 bg-slate-200 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-slate-400" />
            </div>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-slate-900">{event.title}</h3>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                  ${event.price}
                </span>
              </div>
              <p className="text-slate-600 mb-4">{event.description}</p>
              <div className="flex items-center text-sm text-slate-500 mb-6">
                <span className="mr-4">Artist: <span className="font-bold">{event.artist_name}</span></span>
                <span>Starts: {new Date(event.start_time).toLocaleString()}</span>
              </div>
              <button
                onClick={() => buyMutation.mutate(event.id)}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-indigo-700 transition-shadow"
              >
                <TicketIcon className="w-5 h-5 mr-2" />
                Get Ticket
              </button>
            </div>
          </div>
        ))}
        {(events ?? []).length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500">No upcoming concerts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;