# Book Finder Application

A full-stack application for searching and managing your favorite books, built with React (Frontend) and FastAPI (Backend).

## Prerequisites

- Docker and Docker Compose
- Node.js (v16 or higher)
- Python (3.8 or higher)
- PostgreSQL

## Project Structure 

## Getting Started

### Clone the Repository 

### Environment Setup

1. Create a `.env` file in the backend directory:

```bash:README.md
# backend/.env
DATABASE_URL=postgresql://postgres:postgres@db:5432/bookfinder
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

2. Create a `.env` file in the frontend directory:

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:8000/api
```

### Running with Docker

1. Build and start all services:

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Running Locally (Development)

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Features

- User Authentication (Register/Login)
- Book Search using Google Books API
- Save Favorite Books
- Dark/Light Theme
- Responsive Design

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Books
- GET `/api/books/search/{query}` - Search books
- GET `/api/books/{book_id}` - Get book details

### Favorites
- GET `/api/favorites` - Get user's favorite books
- POST `/api/favorites` - Add book to favorites
- DELETE `/api/favorites/{book_id}` - Remove book from favorites

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router
- React Hot Toast

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

## Development

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Code Formatting
```bash
# Backend
black app/
flake8 app/

# Frontend
npm run lint
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 