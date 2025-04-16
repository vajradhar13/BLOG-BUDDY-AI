# BLOG BUDDY AI

Blog Buddy AI is a web-based application designed to help users effortlessly create high-quality, engaging blog posts using AI. This tool is ideal for content creators, marketers, and anyone looking to quickly generate blogs with minimal effort. The application leverages advanced AI language models to produce coherent and contextually relevant blogs based on user-provided inputs.

## Problem Statement

Creating engaging blog content can be time-consuming and challenging, especially for individuals or businesses with limited resources. Writers often face difficulties such as:
- Generating ideas for blog posts.
- Structuring content within specific word limits.
- Incorporating relevant keywords effectively.

These challenges can hinder productivity and creativity, leading to missed opportunities for businesses and individuals to reach their target audiences.

## Solution

Blog Buddy AI addresses these challenges by providing a simple, user-friendly platform that allows users to generate blogs with the following key features:
- Customizable blog titles and keywords to fit the user's needs.
- Adjustable word limits for precise content length.
- AI-powered blog generation, ensuring high-quality and engaging content.

By streamlining the blog creation process, Blog Buddy AI saves time, boosts creativity, and empowers users to focus on other critical tasks.

---

## Features

- **Customizable Inputs**: Users can specify a blog title, keywords, and desired word count.
- **AI-Powered Content Creation**: Generates high-quality blog posts tailored to user inputs.
- **Responsive Design**: The web application is optimized for desktop and mobile devices.
- **Deployed Services**: 
  - Frontend: Hosted on [Vercel](https://blog-buddy-ai.vercel.app/)
  - Backend: Hosted on [Render](https://blog-buddy-ai.onrender.com)

---

## Workflow

Here is a high-level overview of the workflow for Blog Buddy AI:

1. **User Input**:
   - Users provide a blog title, relevant keywords, and a word limit.
2. **API Request**:
   - The frontend sends a POST request to the backend with the user's inputs.
3. **AI Blog Generation**:
   - The backend processes the request and interacts with the AI API to generate the blog content.
4. **Response to Frontend**:
   - The backend returns the generated blog content as a response.
5. **Content Display**:
   - The frontend displays the generated blog in a clean, readable format.
  
![image](https://github.com/user-attachments/assets/7fd77027-d122-4785-b391-5da46abd17bc)

---

## Sequence Diagram
![Image](https://github.com/user-attachments/assets/f9dbd662-21df-41e8-8b56-4aa394529b39)

---

## Directory Structure

```
└── katakampranav-blog-buddy-ai/
    ├── README.md
    ├── client/
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── tailwind.config.js
    │   ├── vite.config.js
    │   ├── .gitignore
    │   ├── public/
    │   └── src/
    │       ├── App.jsx
    │       ├── index.css
    │       ├── main.jsx
    │       ├── assets/
    │       │   └── lottie/
    │       │       └── blogAnimation.json
    │       └── pages/
    │           └── HomePage.jsx
    └── server/
        ├── app.py
        ├── requirements.txt
        └── .gitignore

```
---

## Client

1. **React Components**: 
   - Created a `HomePage` React component to handle the main UI for blog generation, including input fields for the blog title, keywords, and word limit.
   - Managed user interactions with forms, buttons, and feedback messages using React hooks like `useState`.

2. **API Integration**: 
   - Used `axios` to make a POST request to the backend API (`https://blog-buddy-ai.onrender.com`) to generate blog content.
   - Handled API response data to display the blog content dynamically.

3. **Dynamic Form Handling**: 
   - Allowed users to input the blog title, keywords, and word count through controlled components (`title`, `keywords`, and `wordlimit`).
   - Dynamically updated the word limit slider with labels for min and max values.

4. **Loading and Error States**: 
   - Added `isLoading` to show a loading indicator when the API request is in progress.
   - Displayed error messages when required fields were left empty or if the API request failed.

5. **Blog Display and Interactivity**: 
   - Rendered the generated blog content using the `ReactMarkdown` component to format the text as markdown.
   - Included options to download the blog content as a `.txt` file and copy the content to the clipboard.

6. **Animations and Design**: 
   - Integrated Lottie animations (`blogAnimation.json`) to enhance the UI and provide a visual indication of the blog generation process.
   - Styled the application with TailwindCSS for responsive design, gradients, and transitions.

7. **Feedback and Regeneration**: 
   - Provided features such as copying the blog content to the clipboard and downloading the blog content into txt file.
   - Added functionality to regenerate the blog by resetting the form inputs and clearing the existing content.

![Image](https://github.com/user-attachments/assets/d3f48622-fc08-4888-a528-3e2522ab0a2d)

![Image](https://github.com/user-attachments/assets/d57cee2d-5b2d-43c3-b3af-7d765fc4d107)

---

## Server

1. **Backend Framework and API Setup**:  
   - Built the backend using **Flask** to create a RESTful API for blog generation.
   - Set up a main API endpoint (`POST /`) to handle incoming requests for blog content generation.

2. **Request Validation**:  
   - Implemented validation for incoming requests to ensure required fields (`title`, `keywords`, and `wordlimit`) were present in the request body.  
   - Sent appropriate error responses (`400 Bad Request`) if any required fields were missing.

3. **Integration with Gemini API**:  
   - Used the Gemini API to generate blog content based on the user's input (blog title, keywords, and word limit).  
   - Passed user-provided data to the GPT model in the form of a prompt that guided the content generation.  

4. **Environment Configuration**:  
   - Secured sensitive information, such as the Gemini API key, using environment variables managed with **dotenv**.

5. **Response Handling**:  
   - Formatted and sent the generated blog content back to the client in JSON format.  
   - Handled errors gracefully, such as issues with the OpenAI API or internal server errors, and sent meaningful responses (`500 Internal Server Error`).

6. **Error Logging and Debugging**:  
   - Included robust error handling to catch and log errors in the console for debugging during development.  
   - Provided informative error messages to help identify issues when requests failed.

7. **CORS Configuration**:  
   - Configured **CORS** to allow cross-origin requests from the client hosted on a different domain, enabling seamless communication between the frontend and backend.

8. **Deployment**:  
   - Deployed the backend on **Render**, making the API accessible at `https://blog-buddy-ai.onrender.com`.  
   - Ensured the deployment process was smooth by setting up appropriate scripts and dependencies in the `package.json`.

9. **Optimization**:  
   - Streamlined the code by separating configuration, routes, and server setup for better maintainability.  
   - Ensured the server could scale effectively by structuring the code for potential future additions.  

![Image](https://github.com/user-attachments/assets/f2d3124b-f97d-4e9f-a7c0-2daa37d48f6a)

---

## Installation and Usage

To run this project locally, follow these steps:

### Prerequisites
- Node.js (for frontend development)
- Python (for backend development)
- npm or yarn (for package management)
- Environment variable setup for API keys

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/katakampranav/BLOG-BUDDY-AI.git
   cd BLOG-BUDDY-AI/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ../server
   ```
2. Create a `.env` file with the following:
   ```env
   gemini_api_key=<YOUR_API_KEY>
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the backend server:
   ```bash
   python app.py
   ```

### Deployment
- Frontend is deployed on Vercel: [Blog Buddy AI](https://blog-buddy-ai.vercel.app/)
- Backend is deployed on Render.

---

## Technologies Used

- **Frontend**: React.js, Vercel
- **Backend**: Flask, Render
- **API**: Gemini API for AI blog generation

---

## Future Enhancements

- **Multilingual Blog Generation**: Support for blogs in multiple languages.
- **Advanced Formatting**: Allow users to choose blog templates and styles.
- **Image Integration**: Incorporate AI-generated images for blogs.
- **SEO Optimization**: Automatically suggest meta tags and descriptions.

---

## Author

This Blog Buddy AI application was developed by :
-	[@katakampranav](https://github.com/katakampranav)
-	Repository : https://github.com/katakampranav/BLOG-BUDDY-AI

---

## Feedback

For any feedback or queries, please reach out to me at katakampranavshankar@gmail.com.

--- 
