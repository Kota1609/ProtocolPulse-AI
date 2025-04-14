# Deploying ProtocolPulse AI to Render

This document provides step-by-step instructions for deploying the combined frontend and backend of ProtocolPulse AI to Render's free tier.

## Prerequisites

- A GitHub account
- A Render account (sign up at [render.com](https://render.com))
- API keys for:
  - OpenAI (required)
  - Google (optional, for Gemini)
  - Tavily (required for research)

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub
2. Push your code to the repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/protocolpulse.git
   git push -u origin main
   ```

## Step 2: Deploy to Render

1. Log in to your Render account
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the deployment:
   - **Name**: `protocolpulse` (or a name of your choice)
   - **Region**: Choose the region closest to your users
   - **Branch**: `main` (or your default branch)
   - **Runtime**: `Python 3`
   - **Build Command**: `bash build.sh`
   - **Start Command**: `python application.py`
   - **Plan**: Select "Free" ($0/month)

5. Add the following environment variables (click "Advanced" and then "Add Environment Variable"):
   ```
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key (optional)
   TAVILY_API_KEY=your_tavily_api_key
   PORT=10000
   ```

6. Click "Create Web Service"

## Step 3: Monitor the Deployment

1. Render will automatically start building and deploying your application
2. You can monitor the build progress in the logs
3. Once deployed, Render will provide a URL (e.g., `https://protocolpulse.onrender.com`)
4. Click on the URL to access your application

## Troubleshooting

### If the Frontend Doesn't Load
- Check the build logs to ensure the frontend was built successfully
- Verify that the `ui/dist` directory was created correctly
- Ensure the environment variables in the frontend are set correctly

### If the Backend API Calls Fail
- Check the environment variables are set correctly in Render
- Look at the logs for any errors
- Ensure your API keys are valid

### Free Tier Limitations
- The free tier will spin down after 15 minutes of inactivity
- The first request after inactivity will take longer to respond
- Consider setting up a simple ping service to keep it alive

## Keeping Your Service Active

To prevent your service from spinning down, you can set up a recurring ping:

1. Use a service like [cron-job.org](https://cron-job.org) or [UptimeRobot](https://uptimerobot.com)
2. Set up a job to ping your service's URL every 14 minutes
3. Use the route `/` for the ping, as it's lightweight and will keep the service active

## Updating Your Deployment

When you make changes to your code:

1. Push the changes to your GitHub repository
2. Render will automatically detect the changes and start a new deployment
3. Monitor the build logs to ensure the deployment succeeds

## Further Optimizations

For better performance on the free tier:

1. Modify the code to use smaller language models (e.g., GPT-3.5-Turbo instead of GPT-4)
2. Add timeouts for research jobs to prevent long-running processes
3. Implement caching for repetitive operations
4. Optimize API calls to reduce token usage

---

That's it! Your ProtocolPulse AI application should now be deployed and accessible via your Render URL. 