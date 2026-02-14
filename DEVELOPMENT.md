# Development Guide

Detailed guide for setting up and developing OpenClaw Project 01.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Database Setup (Future)](#database-setup-future)
- [Git Workflow](#git-workflow)
- [Debugging Tips](#debugging-tips)
- [Performance Optimization](#performance-optimization)
- [Common Issues and Solutions](#common-issues-and-solutions)

## Development Environment Setup

### macOS Setup

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python 3
brew install python3

# Install Node.js
brew install node

# Verify installations
python3 --version
node --version
npm --version
```

### Linux Setup (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update
sudo apt upgrade

# Install Python 3
sudo apt install python3 python3-venv python3-pip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Verify installations
python3 --version
node --version
npm --version
```

### Windows Setup

1. **Python**:
   - Download from https://www.python.org/downloads/
   - Run installer
   - Check "Add Python to PATH"

2. **Node.js**:
   - Download from https://nodejs.org/
   - Run installer
   - Follow prompts

3. **Git**:
   - Download from https://git-scm.com/
   - Run installer

4. **Verify**:
   ```cmd
   python --version
   node --version
   npm --version
   ```

### IDE/Editor Setup

#### VS Code Extensions (Recommended)

Install these extensions for optimal development:

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "ms-python.black-formatter",
    "charliermarsh.ruff",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "React-css-modules.css-modules-snippets",
    "GitHub.Copilot",
    "GitHub.Copilot-Chat",
    "eamodio.gitlens",
    "ms-vscode.makefile-tools"
  ]
}
```

#### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.ruffEnabled": true,
  "python.formatting.provider": "black",
  "python.formatting.blackArgs": [],
  "[python]": {
    "editor.defaultFormatter": "ms-python.python",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": "explicit"
    }
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## Backend Development

### Python Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install development dependencies
pip install black ruff pytest pytest-cov pytest-mock

# Verify installation
pytest --version
black --version
ruff --version
```

### Running Backend

```bash
# Make sure venv is activated
source venv/bin/activate

# Run the application
python app.py

# Expected output:
# Hello, world!
```

### Writing Tests

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run with coverage report
pytest --cov=. --cov-report=html

# Run specific test
pytest tests/test_app.py::test_greet -v

# Run tests in watch mode
pytest-watch tests/
```

### Test Structure

```python
# tests/test_app.py
from app import greet

def test_greet():
    """Test basic greeting functionality"""
    assert greet("Alice") == "Hello, Alice!"

def test_greet_empty_string():
    """Test greeting with empty string"""
    result = greet("")
    assert result == "Hello, !"

def test_greet_special_characters():
    """Test greeting with special characters"""
    assert greet("Bob!@#") == "Hello, Bob!@#!"
```

### Code Quality

```bash
# Format code with Black
black .

# Check formatting without changes
black --check .

# Lint with ruff
ruff check .

# Fix ruff issues (when possible)
ruff check --fix .

# Check for unused imports
ruff check --select F401 .
```

### Adding Dependencies

```bash
# Activate virtual environment
source venv/bin/activate

# Install a package
pip install package-name

# Update requirements.txt (create if not exists)
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt
```

## Frontend Development

### Node.js Setup

```bash
# Navigate to frontend directory
cd todo-react

# Install dependencies
npm install

# Verify installation
npm --version
```

### Development Server

```bash
cd todo-react

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Building

```bash
cd todo-react

# Create production build
npm run build

# Output directory: dist/

# Preview production build
npm run preview
```

### Testing

```bash
cd todo-react

# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Component Development

#### Creating a New Component

```typescript
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold">{title}</h2>
      {onAction && (
        <button 
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Action
        </button>
      )}
    </div>
  );
}
```

#### Testing a Component

```typescript
// src/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders title', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onAction when button clicked', async () => {
    const handleAction = vi.fn();
    render(
      <MyComponent title="Test" onAction={handleAction} />
    );
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleAction).toHaveBeenCalled();
  });
});
```

### Styling with Tailwind

The project uses Tailwind CSS for styling. Key files:

- `tailwind.config.cjs`: Tailwind configuration
- `postcss.config.cjs`: PostCSS configuration
- `src/index.css`: Global styles with Tailwind directives

Example class usage:

```jsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white rounded-lg shadow-md p-6 w-96">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">
      Welcome
    </h1>
    <p className="text-gray-600">
      This is a sample component with Tailwind styling.
    </p>
  </div>
</div>
```

### State Management

The TodoApp uses React hooks for state management:

```typescript
// useState for local state
const [items, setItems] = useState<Todo[]>([]);
const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

// useEffect for side effects (localStorage sync)
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}, [items]);

// useRef for DOM access
const inputRef = useRef<HTMLInputElement>(null);
```

## Git Workflow

### Daily Development Workflow

```bash
# 1. Start a new feature
git checkout -b feature/my-feature

# 2. Make changes
# ... edit files ...

# 3. Stage changes
git add .

# 4. Commit changes
git commit -m "feat: add my feature"

# 5. Push to remote
git push origin feature/my-feature

# 6. Create Pull Request on GitHub
```

### Keeping Branches Updated

```bash
# Fetch latest from upstream
git fetch upstream

# Rebase on latest main
git rebase upstream/main

# If conflicts occur, resolve them, then:
git add .
git rebase --continue

# Force push your branch (use with caution!)
git push origin feature/my-feature --force-with-lease
```

### Merging

```bash
# Update main branch
git checkout main
git pull upstream main

# Merge feature branch
git merge feature/my-feature

# Push to your fork
git push origin main

# Or delete the feature branch after merging
git branch -d feature/my-feature
git push origin :feature/my-feature
```

## Debugging Tips

### Python Debugging

#### Using print statements
```python
def process_data(data):
    print(f"Input data: {data}")
    result = data * 2
    print(f"Output result: {result}")
    return result
```

#### Using pdb (Python Debugger)
```python
import pdb

def process_data(data):
    pdb.set_trace()  # Execution pauses here
    return data * 2
```

Pdb commands:
- `n` - Next line
- `s` - Step into function
- `c` - Continue execution
- `l` - List code around current line
- `p variable` - Print variable value
- `q` - Quit debugger

#### VS Code Debugging

Launch configuration in `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Current File",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "justMyCode": true
    }
  ]
}
```

### React Debugging

#### React Developer Tools
- Install React Developer Tools Chrome extension
- Inspect components in browser DevTools
- View props and state in real-time

#### Console Logging
```typescript
useEffect(() => {
  console.log('TodoApp mounted or items changed:', items);
}, [items]);
```

#### Chrome DevTools Debugger
```typescript
function handleTodoClick(id: string) {
  debugger;  // Execution pauses here when DevTools open
  // ... rest of function
}
```

## Performance Optimization

### React Performance

#### Preventing unnecessary re-renders

```typescript
// Bad - creates new function on every render
<TodoItem onDelete={() => deleteTodo(item.id)} />

// Good - use useCallback
const handleDelete = useCallback((id: string) => {
  deleteTodo(id);
}, []);
<TodoItem onDelete={handleDelete} />
```

#### Memoizing components

```typescript
import { memo } from 'react';

const TodoItem = memo(function TodoItem({ todo, onToggle }) {
  console.log('TodoItem rendered');
  return (/* JSX */);
});
```

#### Using useTransition for async updates
```typescript
const [isPending, startTransition] = useTransition();

function handleChange(e) {
  startTransition(() => {
    setFilter(e.target.value);
  });
}
```

### Python Performance

#### Profiling

```python
import cProfile
import pstats

cProfile.run('greet("Alice")', 'stats')
p = pstats.Stats('stats')
p.sort_stats('cumulative').print_stats(10)
```

#### Benchmarking

```python
import timeit

time = timeit.timeit('greet("Alice")', setup='from app import greet', number=100000)
print(f"Average time: {time/100000:.6f} seconds")
```

## Common Issues and Solutions

### Python Issues

#### **Issue**: `ModuleNotFoundError: No module named 'pytest'`
```bash
# Solution: Install pytest in virtual environment
source venv/bin/activate
pip install pytest
```

#### **Issue**: Virtual environment not activating
```bash
# Solution: Use full path
source /Users/ghost/dev/venv/bin/activate
```

#### **Issue**: `black: command not found`
```bash
# Solution: Install black and ensure venv is activated
source venv/bin/activate
pip install black
```

### Frontend Issues

#### **Issue**: Port 5173 already in use
```bash
# Solution: Use different port
npm run dev -- --port 5174

# Or kill the process
lsof -ti:5173 | xargs kill -9  # macOS/Linux
netstat -ano | grep :5173      # Windows
```

#### **Issue**: `npm install` fails
```bash
# Solution: Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### **Issue**: TypeScript errors in IDE but builds fine
```bash
# Solution: Restart TypeScript server in VS Code
Cmd+Shift+P > "TypeScript: Restart TS Server"
```

### Git Issues

#### **Issue**: "Your branch is behind origin/main"
```bash
# Solution: Update local branch
git fetch origin
git rebase origin/main
```

#### **Issue**: Merge conflicts
```bash
# Solution: Resolve conflicts manually, then:
git add .
git commit -m "Resolve merge conflicts"
```

---

For more information, see the main [README.md](README.md) or [CONTRIBUTING.md](CONTRIBUTING.md).
