# CodeCraft - Online Compiler

A web-based code editor and compiler that supports multiple programming languages including C++, Java, Python, and C. Users can write, compile, and execute code directly in the browser with user authentication and code saving capabilities.

## Features

- **Multi-language support**: C++, Java, Python, C
- **Real-time code editing** with syntax highlighting (ACE Editor)
- **User authentication** (Register/Login/Logout)
- **Save and load code files** for registered users
- **Code compilation and execution** with custom input
- **Responsive design** with dark theme

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, ACE Editor
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Code Compilation**: External API integration

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   
```env
# MongoDB connection string
MONGODB_URL=""

# JWT secret key for authentication (change this to a strong, unique key)
SECRET_KEY=""

# External API for code compilation
COMPILE_API_URL="https://codex-api.fly.dev/"
```

4. **Start the server**
   ```bash
    node app.js
   ```

5. **Open your browser**
   Navigate to `http://localhost:7956`

## Usage

1. **Register/Login**: Create an account or log in to save your code
2. **Select Language**: Choose from C++, Java, Python, or C
3. **Write Code**: Use the built-in editor with syntax highlighting
4. **Add Input**: Provide input for your program if needed
5. **Run Code**: Click the "Run" button to compile and execute
6. **Save/Load**: Save your code files and load them later