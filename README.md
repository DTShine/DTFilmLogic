# DoubleTake FilmLogic

DoubleTake FilmLogic is a comprehensive shop management application designed for auto detailing and film installation businesses. It features job and inventory management, financial tracking, a technician time clock, and powerful AI-driven insights with its "Film LogicIQ" assistant.

This application is built with a modern web stack and leverages Firebase for backend services and Google Gemini for its AI capabilities.

## ✨ Features

*   **Dashboard:** An at-a-glance overview of key metrics like revenue, active jobs, upcoming appointments, and low stock alerts.
*   **Job Management:** Create, update, and track jobs from quote to completion. Includes detailed vehicle information, service breakdowns, and photo attachments for pre-inspection and quality control.
*   **Inventory Control:** Manage inventory for PPF rolls, tint, supplies, and tools. Features real-time tracking of roll materials (SqFt) and low-stock notifications.
*   **Financials:** Visualize revenue, expenses, and profit with interactive charts.
*   **Time Clock:** Technicians can clock in and out for general shop work or specific jobs.
*   **User Management:** Role-based access control for Admins, Managers, and Technicians.
*   **The Shop View:** A dedicated, simplified interface for technicians to view their assigned jobs and manage their time.
*   **Film LogicIQ:** An AI assistant powered by Google Gemini to:
    *   Provide daily business tips.
    *   Decode vehicle VINs.
    *   Generate vehicle images.
    *   Suggest material usage (SqFt).
    *   Answer natural language queries about shop data.
    *   Predict inventory reordering needs.

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **Backend:** Firebase (Cloud Functions, Firestore, Authentication, Storage)
*   **AI:** Google Gemini API (`gemini-2.5-flash-preview-04-17`, `imagen-3.0-generate-002`)
*   **Deployment:** Firebase Hosting & GitHub Actions for CI/CD

## 🚀 Project Setup (Local Development)

To run this project locally, you will need Node.js and the Firebase CLI installed.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install frontend dependencies:**
    This project uses `importmap` and loads dependencies via ESM.sh, so there's no `npm install` needed for the root directory.

3.  **Install Cloud Functions dependencies:**
    ```bash
    npm install --prefix functions
    ```

4.  **Set up Firebase Emulator Suite:**
    The emulators allow you to run Firebase services on your local machine.
    *   Install the emulators: `firebase setup:emulators:firestore,auth,functions,storage`
    *   Start the emulators: `firebase emulators:start`

5.  **Set local environment variables for Functions:**
    The Cloud Functions require a Gemini API key. Set this using the Firebase CLI. This command stores the key in a local `.runtimeconfig.json` file that the emulator will read.
    ```bash
    firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
    ```
    You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

6.  **Run the application:**
    Open the `index.html` file in your browser, for example using a simple local server like `live-server` or a VS Code extension. The application will connect to the local Firebase emulators.

## 🔑 Environment Variables & Secrets

For deployment, you need to configure secrets in your GitHub repository.

Go to your repository's **Settings > Secrets and variables > Actions** and add the following repository secrets:

*   `FIREBASE_TOKEN`: A token for deploying to Firebase. Generate it by running `firebase login:ci` on your local machine and copying the output.
*   `GEMINI_API_KEY`: Your API key for the Google Gemini API.

## ☁️ Deployment

This project is configured for continuous deployment to Firebase using GitHub Actions.

Any push to the `main` branch will automatically trigger a workflow that:
1.  Installs and builds the Cloud Functions.
2.  Sets the Gemini API key from the `GEMINI_API_KEY` secret as a Firebase Function configuration variable.
3.  Deploys the frontend application to Firebase Hosting.
4.  Deploys the backend logic to Cloud Functions for Firebase.

The deployment configuration is located in `.github/workflows/firebase-deploy.yml`.
