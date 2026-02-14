# Deployment Guide

Instructions for deploying OpenClaw Project 01 to various platforms and environments.

## Table of Contents

- [Deployment Environments](#deployment-environments)
- [Prerequisites](#prerequisites)
- [Local Development Deployment](#local-development-deployment)
- [Heroku Deployment](#heroku-deployment)
- [AWS Deployment](#aws-deployment)
- [Docker Deployment](#docker-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Logging](#monitoring--logging)
- [Rollback Procedures](#rollback-procedures)

## Deployment Environments

### Development
- **URL**: `http://localhost:3000` (frontend)
- **API**: `http://localhost:8000` (backend - future)
- **Database**: Local/SQLite
- **Purpose**: Feature development and testing

### Staging
- **URL**: `https://staging.openclawprj01.com`
- **API**: `https://api-staging.openclawprj01.com`
- **Database**: Staging PostgreSQL
- **Purpose**: Pre-release testing and QA

### Production
- **URL**: `https://openclawprj01.com`
- **API**: `https://api.openclawprj01.com`
- **Database**: Production PostgreSQL
- **Purpose**: Live user application

## Prerequisites

### Required Tools
- Git
- Node.js 16+
- Python 3.8+
- Docker (optional, for containerized deployment)
- AWS CLI (for AWS deployment)
- Heroku CLI (for Heroku deployment)

### Required Accounts
- GitHub (for source code)
- Hosting provider account (Heroku, AWS, Digital Ocean, etc.)
- Domain registrar account (for custom domain)

## Local Development Deployment

### Setup for Development

```bash
# Clone repository
git clone https://github.com/mrbinodbot/openclawprj01.git
cd openclawprj01

# Backend setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

# Frontend setup (in new terminal)
cd todo-react
npm install
npm run dev
```

### Accessing Local Application

**Frontend**: `http://localhost:5173`
**Backend API** (future): `http://localhost:8000`

## Heroku Deployment

### 1. Create Heroku Apps

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create backend app
heroku create openclawprj01-api

# Create frontend app
heroku create openclawprj01
```

### 2. Configure Environment Variables

```bash
# Backend environment variables
heroku config:set DATABASE_URL=postgresql://user:password@host:port/db \
  -a openclawprj01-api
heroku config:set FLASK_ENV=production \
  -a openclawprj01-api
heroku config:set SECRET_KEY=your_secret_key \
  -a openclawprj01-api

# Frontend environment variables
heroku config:set REACT_APP_API_URL=https://openclawprj01-api.herokuapp.com \
  -a openclawprj01
```

### 3. Create Procfile

Backend `Procfile`:
```
web: gunicorn app:app
worker: celery -A app.celery worker
```

Frontend `Procfile` (in `todo-react/`):
```
web: npm run build && npm run preview
```

### 4. Create runtime.txt

```
python-3.11.0
```

### 5. Deploy

```bash
# Backend deployment
git push heroku main -a openclawprj01-api

# Frontend deployment
cd todo-react
git push heroku main -a openclawprj01
cd ..
```

### 5. Monitor Deployment

```bash
# View logs
heroku logs --tail -a openclawprj01

# Check application status
heroku status
```

## AWS Deployment

### Using Elastic Beanstalk (Backend)

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB application
eb init -p python-3.11 openclawprj01-api

# Create environment
eb create production

# Deploy
eb deploy

# View logs
eb logs

# Monitor
eb health
```

### Using Amplify (Frontend)

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify project
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

### Using S3 + CloudFront (Static Frontend)

```bash
# Build frontend
cd todo-react
npm run build
cd ..

# Create S3 bucket
aws s3 mb s3://openclawprj01-frontend

# Upload files
aws s3 sync todo-react/dist s3://openclawprj01-frontend

# Create CloudFront distribution (via AWS Console)
```

## Docker Deployment

### 1. Create Dockerfiles

**Backend Dockerfile**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]
```

**Frontend Dockerfile**:
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY todo-react/package*.json ./
RUN npm ci
COPY todo-react . 
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/openclawprj01
      - FLASK_ENV=production
    depends_on:
      - db
      - redis

  frontend:
    build:
      context: .
      dockerfile: todo-react/Dockerfile
    ports:
      - "80:80"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    depends_on:
      - backend

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=openclawprj01
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### 3. Build and Run

```bash
# Build images
docker-compose build

# Run services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install Python dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      
      - name: Run Python tests
        run: pytest
      
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install frontend dependencies
        run: cd todo-react && npm ci
      
      - name: Run frontend tests
        run: cd todo-react && npm run test
      
      - name: Build frontend
        run: cd todo-react && npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: openclawprj01
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

## Monitoring & Logging

### Application Monitoring

```bash
# Heroku
heroku logs --tail

# AWS CloudWatch
aws logs tail /aws/elasticbeanstalk/openclawprj01

# New Relic (optional)
pip install newrelic
newrelic-admin run-program gunicorn app:app
```

### Performance Monitoring

- **Sentry**: Error tracking and monitoring
- **DataDog**: Infrastructure and application monitoring
- **New Relic**: APM and monitoring

### Logging Setup

```python
# Python logging configuration
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)
logger.info("Application started")
```

## Health Checks

### Backend Health Check Endpoint

```python
@app.route('/health')
def health():
    return {
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    }
```

### Heroku Health Checks

Configure in `Procfile`:

```
web: gunicorn app:app --log-file - --timeout 30
```

## Database Migration

### Using Alembic (Future)

```bash
# Install Alembic
pip install alembic

# Initialize
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Secrets Management

### Environment Variable Templates

Create `.env.example`:

```
# Backend
FLASK_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/db
SECRET_KEY=your_secret_key_here
REDIS_URL=redis://localhost:6379/0

# Frontend
REACT_APP_API_URL=https://api.example.com
REACT_APP_GA_ID=your_google_analytics_id
```

### Using AWS Secrets Manager

```bash
# Store secret
aws secretsmanager create-secret \
  --name openclawprj01/db-password \
  --secret-string "your-password"

# Retrieve secret
aws secretsmanager get-secret-value \
  --secret-id openclawprj01/db-password
```

## SSL/TLS Certificates

### For Heroku
Automatic free SSL certificates with Heroku

### For AWS
```bash
aws acm request-certificate \
  --domain-name openclawprj01.com \
  --subject-alternative-names www.openclawprj01.com \
  --validation-method DNS
```

## Rollback Procedures

### Heroku Rollback

```bash
# View releases
heroku releases -a openclawprj01

# Rollback to previous version
heroku rollback v42 -a openclawprj01

# Verify
heroku logs --tail -a openclawprj01
```

### AWS Rollback

```bash
# Using EB
eb appversion list
eb deploy v1.0.0

# Manual rollback
git revert <commit-hash>
git push heroku main
```

## Post-Deployment Checklist

- [ ] Application is running without errors
- [ ] Database migrations are applied
- [ ] Environment variables are set correctly
- [ ] SSL/TLS certificates are valid
- [ ] Health check endpoint returns 200
- [ ] Frontend loads correctly
- [ ] API endpoints are responding
- [ ] Logging is configured
- [ ] Monitoring alerts are active
- [ ] Backups are scheduled
- [ ] Documentation is updated

## Troubleshooting

### Application Won't Start

```bash
# Check logs
heroku logs --tail

# Check configuration
heroku config

# Restart
heroku restart
```

### Database Connection Issues

```bash
# Check database status
heroku pg:info

# Backups
heroku pg:backups
heroku pg:backups:capture

# Restore
heroku pg:backups:restore
```

### Performance Issues

```bash
# Scale dynos
heroku ps:scale web=2 worker=1

# Monitor resources
heroku ps
heroku metrics
```

---

For additional information, see:
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development setup
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [README.md](README.md) - Project overview
