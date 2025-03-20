# 🌦️ Weather App

**Weather App** is a high-performance, offline-capable Progressive Web App (PWA) that provides real-time weather data for cities worldwide. Built with **React**, **TypeScript**, **React Query**, **Vite**, and **Workbox**, it offers a seamless user experience with fast loading times, offline support, and a modern design.

## 🚀 Features

- ✅ **Real-time Weather Data** – Fetches up-to-date weather information for any city.
- ✅ **Search & Autocomplete** – Search for cities with a smooth and responsive autocomplete feature.
- ✅ **Favorites & Notes** – Save your favorite cities and add personal notes for each.
- ✅ **Offline Support** – View previously searched and favorited cities' weather data without an internet connection.
- ✅ **Geolocation Support** – Detects the user’s location to provide instant weather updates.
- ✅ **Performance Optimized** – Uses React app performance optimization techniques ( `React.memo`, `useMemo`, `React.lazy`, lazy-loading data using [Intersetion Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), and more ), and Vite for blazing-fast performance.
- ✅ **PWA Ready** – Installable on mobile and desktop with [Workbox](https://developer.chrome.com/docs/workbox) service workers.
- ✅ **SEO & Sitemap** – Optimized metadata, dynamic routing support, and sitemap generation for search engines.
- ✅ **Unit Tested** – Thorough `Jest` & `@testing-library/react` unit tests to ensure reliability.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **State Management:** React Hooks
- **Networking:** Fetch API + `@tanstack/react-query`
- **Caching & Offline Mode:** [Workbox](https://developer.chrome.com/docs/workbox) + LocalStorage
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Testing:** Jest + @testing-library/react
- **Deployment:** Netlify

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**
- **npm**

### 📥 Step 1: Extract the ZIP Archive

1. **Extract** the ZIP file:
   - On Windows: Right-click the ZIP file and select **Extract All…**
   - On macOS/Linux: Use the terminal:
     ```sh
     unzip weather-app.zip -d weather-app
     ```
2. Add Evironment Variables

Create a `.env.local` file at the root of the weather-app directory with the following ccontent:

```
WEATHERSTACK_API_KEY=your_weatherstack_api_key

VITE_BASE_URL=http://localhost:5173
VITE_TWITTER_DOMAIN=localhost
VITE_IMAGE_PATH=favicon.svg
```

3. Open the extracted folder in a terminal:
   ```sh
   cd weather-app
   ```

### 🟢 Step 2: Install Dependencies

Run the following command to install all necessary dependencies:

- `npm install`

### ⚡ step 3: Run the App

Start the Development ServerTo launch the app in development mode:

- `npm run dev`
  This starts a local Vite-powered development server.
  Open http://localhost:5173 in your browser.

### 🏗️ Build for Production
Create a `.env.production` file root of the weather-app directory with the following ccontent:

```
VITE_BASE_URL=your_hosting_base_url ( Example: https://prismatic-eclair-33cbd8.netlify.app)
VITE_TWITTER_DOMAIN=your_hosting_twitter_domain ( Example: prismatic-eclair-33cbd8.netlify.app)
VITE_IMAGE_PATH=favicon.svg
```

To generate an optimized production build:
- `npm run build`
  This creates a dist/ folder containing minified, ready-to-deploy assets.
- Preview Production Build - `npm run preview`
  This serves the built app at http://localhost:4173


## USAGE
The web app can be accessed by simply entering https://prismatic-eclair-33cbd8.netlify.app on the address bar of your browser.
However if you wish to install it on your device as a desktop app, you can take the following steps:

Installing as an app on the homescreen your device:
1: From Chrome ( Desktop ):
Enter https://prismatic-eclair-33cbd8.netlify.app on the address bar of your Chrome browser
Click on the install icon at the top right end of Chrome address bar.
Click the install button on the pop up that appears
2: From Chrome ( Mobile ):
Enter https://prismatic-eclair-33cbd8.netlify.app on the address bar of your Chrome browser
From the browser menu, click on “Add to Home screen”.
Select “Install”. The app is installed on your homescreen.

3: From Safari ( Desktop ):
Enter https://prismatic-eclair-33cbd8.netlify.app on the address bar of your browser
Click on the share icon at the top right end of the browser.
Select Add to Dock. The app is installed on your homescreen.


Launching the PWA:
Once installed, the app can be accessed in the following ways:
1: On macbook:
Click on the Launchpad icon
Locate and click on the app to launch it
2: Through chrome app:
Type  chrome://apps on the address bar of Google Chrome and press Enter
Locate the weather app and click on it 

Uninstalling the app:
1: From Chrome:
Type  chrome://apps on the address bar of Google Chrome and press Enter
Locate and Control-Click on the Weather App to open the context menu
Click on “Uninstall”
2: From Safari:
Long-press the App Icon on your home screen , then tap “Remove

📦 Installing the PWA
Since this is a Progressive Web App (PWA), you can install it on your device:

Open the app in Google Chrome (or another PWA-compatible browser).
Click on the Install button (or "Add to Home Screen" on mobile).
The app will now function as a standalone app with offline capabilities!
🛠️ Configuration
Setting Up Environment Variables
If your app requires an API key, create a .env file in the extracted project folder:

plaintext
Copy
Edit
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://api.weatherapi.com
Note: Replace your_api_key_here with your actual API key.

🧪 Running Tests
To ensure everything works correctly, run:

sh
Copy
Edit
npm test
To run tests in watch mode:

sh
Copy
Edit
npm run test:watch
🚀 Deployment
To deploy the app after extracting the ZIP and installing dependencies:

Build the project:
sh
Copy
Edit
npm run build
Deploy the contents of the dist/ folder to your preferred hosting provider:
Netlify:
sh
Copy
Edit
netlify deploy --prod
Vercel:
sh
Copy
Edit
vercel
Static Hosting (e.g., GitHub Pages, Firebase Hosting, etc.): Upload the dist/ folder manually.
📜 License
MIT License © 2025 Your Name or Company

🌟 Support & Feedback
⭐ Star this project if you found it useful!
🐛 Found a bug? Report it here
💡 Have a suggestion? Open a feature request
