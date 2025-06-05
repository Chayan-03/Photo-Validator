# Passport Photo Validator

A modern web application that validates passport photos against official country guidelines using Google's Gemini AI for image analysis and MongoDB for storing country specifications.

## Features

- Upload and preview passport photos
- Select a country to validate against their specific requirements
- AI-powered analysis of photos using Google's Gemini API
- Real-time validation against official country guidelines
- Detailed feedback on issues with the uploaded photo

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI**: Google Gemini API for image analysis

  
## 🌐 Backend Deployment

This backend is deployed on **Render** and can be accessed at:

🔗 [https://photo-validator.onrender.com](https://photo-validator.onrender.com)

> 🕐 Note: Since Render uses free-tier containers, the server might take **5–10 seconds to respond on the first request** (cold start).

---

## 🧪 API Testing

Here are a few endpoints you can test:

### ➤ Get all countries
```bash
GET https://photo-validator.onrender.com/countries
```
### ➤ Get specific country Data/Guidelines
```bash
GET https://photo-validator.onrender.com/specs/:country
```


## 🌐 Frontend Deployment
This frontend is deployed on **Vercel** and can be accessed at:
🔗 [https://photo-validator-nine.vercel.app/](https://photo-validator-nine.vercel.app/)


## Setup Instructions

### Prerequisites

1. Node.js and npm installed
2. MongoDB account (Atlas or local MongoDB server)
3. Google Gemini API key

### Environment Setup

1. Create a `.env` file based on the `.env.example` template
2. Add your Gemini API key to the `.env` file
3. Add your MongoDB connection string to the `.env` file

### MongoDB Setup

1. Create a MongoDB database called `passport_validator`
2. Create a collection called `countryspec`
3. Import the sample data from `server/sample-data.js` into the collection

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# In a separate terminal, start the backend server
npm run server
```

## API Routes

- `GET /countries` - Returns a list of all available countries
- `GET /specs/:country` - Returns the specific requirements for a given country

## Sample Data

The application comes with sample data for several countries including:
- United States
- United Kingdom
- Canada
- Australia
- European Union
- India
- Japan
- China
- UAE
- QATAR
- BHUTAN
- NEPAL
- NEW ZEALAND

You can add more countries by following the same data structure in the MongoDB collection.






