import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, Award, MapPin, Mail } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-md p-1">
              <div className="w-full h-full bg-slate-200 rounded-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-slate-400">{user?.username?.[0].toUpperCase()}</span>
              </div>
            </div>
            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200">
              Edit Profile
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">{user?.username}</h1>
            <p className="text-slate-500 flex items-center mt-1">
              <Mail className="w-4 h-4 mr-1" /> {user?.email}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Reputation</p>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-xl font-bold">{user?.reputation}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Member Since</p>
              <p className="text-lg font-bold">March 2024</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Badges</p>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-indigo-500 mr-2" />
                <span className="text-xl font-bold">3 Earned</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-slate-600 leading-relaxed">
              {user?.bio || "This musician hasn't added a bio yet. They're probably too busy making great music!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;