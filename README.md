# SnapStage

A browser-first platform for emerging musicians to host collaborative jam sessions and micro-concerts.

## Tech Stack
- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React (Vite), Tailwind CSS, React Query
- **Auth:** JWT (SimpleJWT)

## Setup

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. Create a `.env` file based on `.env.example`.
4. `python manage.py migrate`
5. `python manage.py runserver`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on http://localhost:5173)

## Features
- **Jam Rooms:** Live collaborative spaces for musicians.
- **Micro-Events:** Virtual concert ticketing system.
- **Fan Support:** Direct donations and reputation tracking.
- **Badges:** Earnable rewards for community engagement.