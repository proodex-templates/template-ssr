# Use a clean Node base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (to leverage Docker layer caching)
COPY package.json package-lock.json* ./

# Install all dependencies including dev
RUN npm install --include=dev --legacy-peer-deps

# DO NOT copy the rest of the files; they will be mounted at runtime
# COPY . .

# Expose Vite port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
