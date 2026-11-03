import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Mic2, Heart, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-4 flex justify-between items-center border-b">
        <div className="text-2xl font-bold text-indigo-600">SnapStage</div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Log in</Link>
          <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">Get started</Link>
        </div>
      </header>
      <main>
        <section className="py-20 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
            The Stage is Yours, <span className="text-indigo-600">Anywhere.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            SnapStage is the browser-first platform for emerging musicians to host collaborative jam sessions, stream mini-concerts, and grow a loyal fanbase.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 shadow-lg">Start Your First Jam</Link>
            <Link to="/login" className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-200">Explore Events</Link>
          </div>
        </section>

        <section className="py-20 bg-slate-50 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Music className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Live Jam Rooms</h3>
              <p className="text-slate-600">One-click audio mixing rooms where you can collaborate with other musicians in real-time.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-emerald-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Micro-Events</h3>
              <p className="text-slate-600">Host pop-up virtual concerts with ticketed access and instant payouts.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6">
                <Heart className="text-rose-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Fan Support</h3>
              <p className="text-slate-600">Receive direct donations and sell merch through your integrated artist profile.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;