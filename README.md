# OpenClaw Project 01

A full-stack application combining a Python backend with a modern React/TypeScript frontend for todo management.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

OpenClaw Project 01 is a full-stack web application that demonstrates modern development practices with:

- **Backend**: Python-based API with testing frameworks
- **Frontend**: React/TypeScript todo application with Tailwind CSS styling
- **Testing**: Comprehensive test suites for both Python and React components
- **State Management**: Local storage persistence for todo items
- **Styling**: Tailwind CSS for responsive design

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│          React Frontend                  │
│  (TypeScript + Vite + Tailwind CSS)      │
├─────────────────────────────────────────┤
│                                          │
│  TodoApp Component                       │
│  - Add/Edit/Delete/Toggle todos          │
│  - Filter management (all/active/done)   │
│  - Local storage persistence             │
│                                          │
└─────────────────────────────────────────┘
         ↓ (Future integration)
┌─────────────────────────────────────────┐
│       Python Backend API                 │
│  (Flask/FastAPI ready)                   │
├─────────────────────────────────────────┤
│  - greet() utility function              │
│  - Extensible API structure              │
│  - Unit test coverage                    │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
openclawprj01/
├── app.py                          # Python backend entry point
├── tests/
│   └── test_app.py                # Python unit tests
├── todo-react/                     # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoApp.tsx          # Main todo application component
│   │   │   └── TodoApp.test.tsx     # TodoApp component tests
│   │   ├── App.tsx                  # Main React component
│   │   ├── App.css                  # Application styles
│   │   ├── index.css                # Global styles
│   │   ├── main.tsx                 # React entry point
│   │   ├── setupTests.ts            # Test configuration
│   │   └── assets/                  # Static assets
│   ├── public/                      # Static files
│   ├── package.json                 # Node.js dependencies
│   ├── vite.config.ts               # Vite configuration
│   ├── vitest.config.ts             # Vitest configuration
│   ├── tailwind.config.cjs           # Tailwind CSS config
│   ├── tsconfig.json                # TypeScript configuration
│   └── index.html                   # HTML template
├── .vscode/                         # VS Code settings
│   ├── settings.json
│   ├── launch.json
│   ├── tasks.json
│   └── extensions.json
├── LICENSE                          # Project license
└── README.md                        # This file
```

## 📦 Prerequisites

### Backend Requirements
- Python 3.8 or higher
- pip (Python package manager)

### Frontend Requirements
- Node.js 16.0 or higher
- npm or yarn

### System Requirements
- Git (for version control)
- 512MB RAM (minimum)
- 200MB disk space (minimum)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mrbinodbot/openclawprj01.git
cd openclawprj01
```

### 2. Backend Setup (Python)

Create a virtual environment and install dependencies:

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install black ruff pytest
```

### 3. Frontend Setup (React)

Install Node.js dependencies:

```bash
cd todo-react
npm install
cd ..
```

## 💻 Development

### Running the Frontend

Start the development server for the React application:

```bash
cd todo-react
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Running the Backend

Run the Python application:

```bash
# Make sure your virtual environment is activated
python app.py
```

Current output: `Hello, world!`

### VS Code Tasks

The project includes VS Code tasks for streamlined development. Access them via:
- **Command Palette**: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
- **Select**: "Tasks: Run Task"

Available tasks:
- **Create venv**: Initialize Python virtual environment
- **Install dev dependencies**: Install Python dev tools (black, ruff, pytest)
- **Run tests**: Execute Python tests
- **Format (black)**: Format Python code with Black

## 🧪 Testing

### Python Backend Tests

Run Python unit tests:

```bash
# Activate virtual environment first
source venv/bin/activate

# Run tests
pytest -q

# Or use the VS Code task:
# Tasks: Run Task > Run tests
```

Test file: [tests/test_app.py](tests/test_app.py)

### React Frontend Tests

Run React component tests:

```bash
cd todo-react

# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch
```

Test files:
- [todo-react/src/components/TodoApp.test.tsx](todo-react/src/components/TodoApp.test.tsx)

## 🏗️ Building for Production

### Frontend Build

Create an optimized production build:

```bash
cd todo-react
npm run build
```

The built files will be in `todo-react/dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
cd todo-react
npm run preview
```

## 📝 Code Formatting & Linting

### Format Python Code

```bash
# Activate virtual environment
source venv/bin/activate

# Format with Black
black .

# Or use VS Code task:
# Tasks: Run Task > Format (black)
```

### Check Python Style

```bash
# Lint with ruff
ruff check .

# Format check with black
black --check .
```

### Format TypeScript/React Code

The project includes ESLint configuration. You can set up automatic formatting:

```bash
cd todo-react
npm install  # ESLint config is in package.json
```

## 📚 API Documentation

### Backend Functions

#### `greet(name: str) -> str`

Simple greeting function.

**Parameters:**
- `name` (str): The name to greet

**Returns:**
- str: Greeting message in format "Hello, {name}!"

**Example:**
```python
from app import greet

result = greet("Alice")
print(result)  # Output: Hello, Alice!
```

### Frontend Components

#### `TodoApp` Component

Main todo management interface.

**Features:**
- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Edit existing todos
- Filter todos (all, active, completed)
- Local storage persistence

**State:**
- `items`: Array of Todo objects
- `text`: Current input text
- `filter`: Current filter mode

**Storage:**
- Uses browser localStorage with key: `'todo-react.items'`
- Automatically persists todos across sessions

**Types:**
```typescript
type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
```

## 🛠️ Technology Stack

### Backend
- **Language**: Python 3.8+
- **Testing**: pytest
- **Linting**: ruff
- **Formatting**: black

### Frontend
- **Framework**: React 18.2.0
- **Language**: TypeScript 5.4.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 4.1.18
- **Testing**: Vitest 1.0
- **Testing Library**: @testing-library/react 14.0.0
- **E2E Testing**: Playwright 1.58.1 (optional)

## 📖 Environment Variables

Currently, the project does not require environment variables. Configuration is minimal and can be extended as needed.

Future additions may include:
- API endpoint URLs
- Feature flags
- Analytics configuration

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Write or update tests** to cover your changes
5. **Format your code**:
   - Python: Run `black .`
   - TypeScript: Use your editor's formatter
6. **Commit your changes**: `git commit -m "Add description of changes"`
7. **Push to your branch**: `git push origin feature/your-feature-name`
8. **Create a Pull Request** with detailed description

### Code Style

- **Python**: Follow PEP 8, enforced by Black and ruff
- **TypeScript/React**: Follow ESLint configuration
- **Naming**: Use camelCase for functions/variables, PascalCase for components/classes

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🐛 Troubleshooting

### Python Virtual Environment Issues

**Problem**: `python3: command not found`
- **Solution**: Ensure Python 3 is installed. On macOS, use `brew install python3`

**Problem**: Virtual environment not activating
- **Solution**: Use the full path: `source /Users/ghost/dev/venv/bin/activate`

### Node.js/npm Issues

**Problem**: `npm: command not found`
- **Solution**: Install Node.js from https://nodejs.org/

**Problem**: Port 5173 already in use
- **Solution**: Kill the process using the port or specify a different port:
  ```bash
  npm run dev -- --port 5174
  ```

### Git Issues

**Problem**: `fatal: not a git repository`
- **Solution**: Initialize git in the root directory:
  ```bash
  git init
  git remote add origin https://github.com/mrbinodbot/openclawprj01.git
  ```

## 📞 Support

For issues, questions, or suggestions:
1. Check existing issues on GitHub
2. Create a new GitHub Issue with detailed information
3. Include error messages, steps to reproduce, and your environment details

## 🔄 Version History

### Version 0.0.0 (Initial Release)
- Basic Python backend with greet function
- React Todo application with local storage
- Full test coverage for backend
- Tailwind CSS styling for frontend
- Development environment setup with VS Code integration

---

**Last Updated**: February 14, 2026

**Repository**: https://github.com/mrbinodbot/openclawprj01
