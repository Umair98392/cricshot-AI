# Cricket PoseNet : AI Shot Assistant

[![Image](FRONTEND/src/assets/pics/demo1.png)](https://cricshot-ai.netlify.app)

Click on This to See the site - https://cricshot-ai.netlify.app

## Overview

Cricket PoseNet : AI Shot Assistant is a project designed to provide analysis on cricket shots by processing images and videos uploaded by users. The project leverages Deep Learning techniques to deliver real-time cricket shot classification and insights.

It is an AI integrated, Microservices architecture based Full Stack Project.

## Features

- **Frontend**: Use React to create attractive user friendly interfaces.
- **FastAPI**: Integration of FastAPI for machine learning model access and secure user authentication and authorization.
- **Database**: Data management and storage with MongoDB Atlas.
- **ML Models**: Deep Learning Models(Yolov8,ANN, CNN,LSTM)


## Installation and Setup Instructions

### Prerequisites

- Python 3.10
- Ffmpeg 6.1
- ReactJS 18.2.0

### Installation


1. Clone the repository:

    ```bash
    git clone https://github.com/umair98392/cricshot-AI.git
    cd cricshot-AI
    ```

2. Create and activate a virtual environment:
   
    ```bash
    cd Backend
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required dependencies:
   
    ```bash
    pip install -r requirements.txt
    ```
    
4. Connect to MongoDB Atlas:

   - Set up your MongoDB Atlas instance and retrieve the connection URI.
   

5. Environment Variables Configuration
	
   - Create a `.env` file in the Backend directory with the following content:
   
     ```bash
     MongoDB_Secret_Key = your-mongodb-uri-string
     JWT_Secret_Key = your-secret-jwt-key
     ```
 
6. Run the FastAPI application:
   
    ```bash
    uvicorn api.app:app --reload
    ```

    - Visit the FastAPI docs at http://127.0.0.1:8000/docs to interact with the APIs.


7. Environment Variables Configuration for Frontend
	
   - Create another `.env` file in the Frontend directory with the following content:
   
     ```bash
     VITE_Backend_Secret_Api_Url = "http://127.0.0.1:8000"
     ```

8. Navigate to Frontend Directory
     
     ```bash
      cd Frontend
     ```
     
9. Install Dependencies
     
     ```bash
     npm install
     ```
    
10. Run the Development Server
     
     ```bash
     npm run dev
     ```
     
   - Access the Frontend at `http://localhost:5173` to interact with the APIs.

     
### Deployment

  - Deploy Backend API
    
    - Choose a hosting platform and deploy the FastAPI server.
    - Update the backend URL in `.env` file in the frontend application to match the deployed endpoint.
  
  - Deploy Frontend Application
    
    - Use a static site hosting service or deploy the frontend code to a platform of your choice.

## Files

  - [View the PDF](RELATED_DOCS/Cricshot_Final_Report.pdf) : Detailed project report.
  - [presentation.ppt](RELATED_DOCS/Presentation.pptx): Project presentation slides.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

Contact us at `umair98392@gmail.com`
