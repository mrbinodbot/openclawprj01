# Contributing to OpenClaw Project 01

Thank you for your interest in contributing to OpenClaw Project 01! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on code and ideas, not personal criticism
- Help others learn and grow

## How to Contribute

### Reporting Bugs

If you discover a bug, please:

1. **Search existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Detailed description of the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Your environment (OS, Python/Node version, etc.)
   - Screenshots if applicable

### Suggesting Enhancements

Feature suggestions are welcome:

1. **Check existing issues** for similar suggestions
2. **Create a new issue** with:
   - Clear, descriptive title starting with "Feature:"
   - Detailed description of the enhancement
   - Rationale and use cases
   - Potential implementation approach (optional)

### Submitting Changes

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/openclawprj01.git
cd openclawprj01

# Add upstream remote
git remote add upstream https://github.com/mrbinodbot/openclawprj01.git
```

#### 2. Create a Feature Branch

```bash
# Update from upstream
git fetch upstream
git checkout upstream/main

# Create your feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/fixes

#### 3. Make Your Changes

**For Python Backend:**
```bash
# Activate virtual environment
source venv/bin/activate

# Make your changes
# Add tests for new functionality

# Format code
black .

# Check style
ruff check .

# Run tests
pytest
```

**For React Frontend:**
```bash
cd todo-react

# Make your changes
# Add tests for new components

# Run tests
npm run test

# Build to check for errors
npm run build
```

#### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with clear, descriptive message
git commit -m "Add feature: description of changes"
```

**Commit message guidelines:**
- Use imperative mood ("Add feature" not "Added feature")
- Write concise but descriptive messages
- Reference issues when applicable: "Fixes #123"
- Keep commits logical and atomic
- One feature/fix per commit when possible

Examples:
```
Add todo edit functionality
Fix localStorage persistence issue
Docs: Update installation instructions
Refactor: Simplify TodoApp component logic
Test: Add TodoApp filter tests
```

#### 5. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

**Pull Request template:**

```markdown
## Description
Brief description of changes

## Related Issues
Fixes #123
Related to #456

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Changes Made
- List of specific changes
- What files were modified
- Brief implementation details

## Testing
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add any relevant screenshots

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing tests passed locally with my changes
```

## Development Setup

### Backend Setup

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install black ruff pytest

# Verify installation
pytest --version
```

### Frontend Setup

```bash
cd todo-react
npm install
cd ..
```

### Running Tests

```bash
# Backend tests
pytest -v

# Frontend tests
cd todo-react
npm run test
```

### Code Formatting

```bash
# Format Python code
black .

# Check formatting
black --check .

# Lint Python code
ruff check .
```

## Pull Request Review Process

1. **Automated checks**: GitHub Actions will run tests and linting
2. **Review**: Maintainers will review your code
3. **Changes requested** (if any): Make requested changes and push updates
4. **Approval**: Once approved, your PR will be merged

### What Reviewers Look For

- **Code Quality**: Clean, readable, well-structured code
- **Tests**: Comprehensive test coverage
- **Documentation**: Clear comments and documentation
- **Performance**: No performance degradation
- **Best Practices**: Following project conventions
- **Backward Compatibility**: Not breaking existing functionality

## Testing Requirements

### Python Tests

- Write tests for all new functions
- Maintain or increase test coverage
- Run `pytest` before submitting PR
- Tests should be in `tests/` directory with `test_` prefix

### React Tests

- Write tests for new components
- Use `@testing-library/react` for component tests
- Run `npm run test` before submitting PR
- Test files should be named `ComponentName.test.tsx`

## Documentation

### When to Update Documentation

- Adding new features
- Changing existing behavior
- Adding new API endpoints
- Updating dependencies
- Fixing unclear instructions

### Documentation Files

- **README.md**: General overview and setup
- **CONTRIBUTING.md**: Contributing guidelines
- **DEVELOPMENT.md**: Detailed development guides
- **Code comments**: Inline documentation for complex logic

## Style Guides

### Python Code Style

- Follow PEP 8
- Use Black for formatting
- Type hints for function signatures
- Descriptive variable and function names

```python
def process_todo_items(items: list[dict]) -> list[dict]:
    """Process and filter todo items based on status."""
    return [item for item in items if not item.get('archived')]
```

### TypeScript/React Style

- Use TypeScript for type safety
- Descriptive component and function names
- Clear prop interfaces
- Use functional components

```typescript
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    // Component JSX
  );
}
```

### Commit Message Style

```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(TodoApp): add bulk delete functionality

- Add select-all checkbox
- Add delete selected button
- Update tests

Fixes #456
```

## Getting Help

- **Issues**: Ask questions in GitHub Issues
- **Discussions**: Use GitHub Discussions if available
- **Documentation**: Check README.md and DEVELOPMENT.md
- **Code Review**: Ask questions during PR review

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md (if created)
- GitHub contributors page
- Release notes for significant contributions

## Questions?

Feel free to:
1. Ask in GitHub Issues
2. Create a discussion thread
3. Contact maintainers

Thank you for contributing! 🙏
