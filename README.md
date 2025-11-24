# Medical Chatbot Web Application

A beautiful and interactive medical chatbot that provides health information based on user symptoms and queries.

## Features

- **Backend**: Node.js/Express server without MongoDB dependency
- **Frontend**: Beautiful, responsive HTML/CSS/JavaScript interface
- **AI Integration**: Uses OpenAI API for medical responses (with fallback responses)
- **User Experience**: 
  - Interactive chat interface
  - Typing indicators
  - Suggested queries
  - Error handling
  - Mobile responsive design

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install express cors axios dotenv
   ```

3. Configure environment variables:
   - Edit the `.env` file in the backend directory
   - Add your OpenAI API key:
     ```
     PORT=5000
     OPENAI_API_KEY=your_actual_openai_api_key_here
     ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the project root:
   ```bash
   cd ..
   ```

2. Start the frontend server:
   ```bash
   node frontend-server.js
   ```
   The frontend will run on `http://localhost:3000`

### 3. Access the Application

Open your browser and go to `http://localhost:3000`

## Usage

1. **Start a conversation**: Type your medical symptoms or health questions in the input field
2. **Use suggestions**: Click on the pre-defined symptom chips for quick queries
3. **Get responses**: The AI will provide medical information including:
   - Possible causes
   - Recommended actions
   - When to see a doctor
   - General advice

## Important Notes

⚠️ **Medical Disclaimer**: This chatbot is for informational purposes only and is not a substitute for professional medical advice. Always consult with qualified healthcare providers for medical concerns.

## API Endpoints

### Backend API

- `POST /api/medical-query` - Process medical queries
- `GET /api/health` - Health check endpoint

### Example API Request

```json
POST /api/medical-query
{
  "query": "I have a headache and fever"
}
```

### Example API Response

```json
{
  "success": true,
  "query": "I have a headache and fever",
  "response": "Based on your symptoms...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## File Structure

```
med-windsurf/
├── backend/
│   ├── server.js          # Main backend server
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   └── index.html         # Frontend application
└── frontend-server.js     # Frontend static server
```

## Dependencies

### Backend
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `axios` - HTTP client for API calls
- `dotenv` - Environment variable management

### Frontend
- Pure HTML/CSS/JavaScript (no framework dependencies)
- Font Awesome for icons

## Troubleshooting

1. **Backend not starting**: Check if port 5000 is available
2. **Frontend not loading**: Check if port 3000 is available
3. **API errors**: Verify your OpenAI API key in the `.env` file
4. **CORS issues**: The backend includes CORS middleware, but check browser console for any errors

## Customization

- **AI Model**: Replace the OpenAI API call with any other medical AI service
- **UI Design**: Modify the CSS in `frontend/index.html` to change the appearance
- **Additional Features**: Add more endpoints to the backend for enhanced functionality

## License

This project is for educational and demonstration purposes.
