# House Numbers Assessment

## Description
This project has been generated using **Nx** as a monorepo containing both the frontend and backend applications.

---

## Prerequisites
Before running this application, ensure that your system meets the following prerequisites:
1. **Node.js**: Install [Node.js](https://nodejs.org/) (preferably the latest LTS version).
  - You can verify if Node.js is installed by running the following command:
    ```bash
    node -v
    ```

---

## Getting Started

Follow these steps to set up and run the application:

### **Option 1: Run Locally**

This option allows you to run the application locally with the API and UI started individually using **Nx**.

#### **Steps**:
1. **Install Dependencies**:
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

2. **Start the Local MongoDB Database**:
   Ensure you have a local instance of MongoDB running. By default, MongoDB runs at `mongodb://localhost:27017`.

3. **Configure the `.env` File**:
   Create a `.env` file in the root of the project and configure the `MONGODB_URI` to point to your local MongoDB instance. For example:

   ```env
   OPENAI_API_KEY=your_own_openai_api_token_here
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   ```

4. **Run the API**:
   Start the backend service by running:
   ```bash
   npx nx serve api
   ```

5. **Run the UI**:
   In another terminal, start the frontend service by running:
   ```bash
   npx nx serve ui
   ```

6. **Access the Application**:
  - The backend (API) should be available at: http://localhost:3333
  - The frontend (UI) should be available at: http://localhost:4200

---

### **Option 2: Run with Docker**

This option allows you to run the application using Docker, which includes the backend, frontend, and MongoDB running in containers.

#### **Steps**:

1. **Configure the `.env` File**:
   Create a `.env` file in the root of the project and configure only the `OPENAI_API_KEY`. For example:

   ```env
   OPENAI_API_KEY=your_own_openai_api_token_here
   ```
   
2. **Build and Start the Containers**:
   Run the following command to build and start all application services (API, UI, and MongoDB) in detached mode:
   ```bash
   docker compose up -d
   ```

3. **Access the Application**:
  - You can access the frontend application at: http://localhost:4200
  - The backend API will be available at: http://localhost:3333

4. **Stop the Containers**:
   When done testing or using the application, you can stop and remove the containers by running:
   ```bash
   docker compose down
   ```

---

## Summary
You can choose to either:
1. Run the application **locally using Nx** (`nx serve`) with a locally running MongoDB instance.
2. Use **Docker Compose** to run the entire setup (UI, API, and MongoDB) with a single command.

Both approaches allow you to effectively develop and test the application. Happy coding!
