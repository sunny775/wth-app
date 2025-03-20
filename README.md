# 🌦️ Weather App

**Weather App** is a high-performance, offline-capable Progressive Web App (PWA) that provides real-time weather data for cities worldwide. Built with **React**, **TypeScript**, **React Query**, **Vite**, and **Workbox**, it offers a seamless user experience with fast loading times, offline support, and a modern design.

## 🚀 Features

- ✅ **Real-time Weather Data** – Fetches up-to-date weather information for any city.
- ✅ **Search & Autocomplete** – Search for cities with a smooth and responsive autocomplete feature.
- ✅ **Favorites & Notes** – Save your favorite cities and add personal notes for each.
- ✅ **Offline Support** – View previously searched and favorited cities' weather data without an internet connection.
- ✅ **Geolocation Support** – Detects the user’s location to provide instant weather updates.
- ✅ **Performance Optimized** – Uses React app performance optimization techniques ( `React.memo`, `useMemo`, `React.lazy`, lazy-loading data using [Intersetion Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), and more ), and Vite for blazing-fast performance.
- ✅ **PWA Ready** – Installable on mobile and desktop with React Query cache persistence and [Workbox](https://developer.chrome.com/docs/workbox) service workers.
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

## 📦 Development

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

2. Open the extracted folder in a terminal:
   ```sh
   cd weather-app
   ```
2. Add Evironment Variables

Create a `.env.local` file at the root of the weather-app directory with the following content:

```
WEATHERSTACK_API_KEY=[your_weatherstack_api_key](https://weatherstack.com)

VITE_BASE_URL=http://localhost:5173
VITE_TWITTER_DOMAIN=localhost
VITE_IMAGE_PATH=favicon.svg
```

### 🟢 Step 2: Install Dependencies

Run the following command to install all necessary dependencies:

- `npm install`

### ⚡ step 3: Run the App

Start the Development Server to launch the app in development mode:

- `npm run dev`
  This starts a local Vite-powered development server.
  Open http://localhost:5173 in your browser.

### 🧪 Running Tests
To run the unit tests:

 - `npm run test-unit`

### 🏗️ Build for Production
Create a `.env.production` file root of the weather-app directory with the following ccontent:

```
WEATHERSTACK_API_KEY=[your_weatherstack_api_key](https://weatherstack.com)

VITE_BASE_URL=your_hosting_base_url ( Example: https://prismatic-eclair-33cbd8.netlify.app)
VITE_TWITTER_DOMAIN=your_hosting_twitter_domain ( Example: prismatic-eclair-33cbd8.netlify.app)
VITE_IMAGE_PATH=favicon.svg
```

To generate an optimized production build:
- `npm run build`
  This creates a dist/ folder containing minified, ready-to-deploy assets.
- Preview Production Build - `npm run preview`
  This serves the built app at http://localhost:4173


## 📥 Installing the PWA

You can access the web app by simply entering  
🔗 **[prismatic-eclair-33cbd8.netlify.app](https://prismatic-eclair-33cbd8.netlify.app)** in your browser.  

However, if you wish to install it as a **desktop or mobile app**, follow the steps below:  

---

### 📱 Installing as an App on Your Device  

#### **🖥️ On Chrome (Desktop)**  
1️⃣ Open **Google Chrome** and enter:  
   🔗 [prismatic-eclair-33cbd8.netlify.app](https://prismatic-eclair-33cbd8.netlify.app)  
2️⃣ Click the **install icon** 🏠 at the top-right of the address bar.  
3️⃣ Click the **"Install"** button in the pop-up that appears.  

---

#### **📱 On Chrome (Mobile)**  
1️⃣ Open **Google Chrome** and enter:  
   🔗 [prismatic-eclair-33cbd8.netlify.app](https://prismatic-eclair-33cbd8.netlify.app)  
2️⃣ Open the browser menu (⋮) in the top-right corner.  
3️⃣ Click **"Add to Home Screen"** 📌.  
4️⃣ Select **"Install"**. The app is now on your **home screen**!  

---

#### **🍏 On Safari (Desktop - macOS)**  
1️⃣ Open **Safari** and enter:  
   🔗 [prismatic-eclair-33cbd8.netlify.app](https://prismatic-eclair-33cbd8.netlify.app)  
2️⃣ Click the **Share** icon 📤 at the top-right of the browser.  
3️⃣ Select **"Add to Dock"** 📌.  
4️⃣ The app is now installed on your **dock/home screen**!  

---

## 🚀 Launching the PWA  

Once installed, you can **access the app** in the following ways:  

### **💻 On macOS (MacBook)**  
1️⃣ Click on the **Launchpad** icon 🚀.  
2️⃣ Locate and **click the app** to open it.  

### **🌍 Through Chrome Apps**  
1️⃣ Type **`chrome://apps`** in the Chrome address bar and press **Enter**.  
2️⃣ Locate the **Weather App** 🌤️ and **click on it**.  

---

## 🗑️ Uninstalling the PWA  

### **🗑️ From Chrome**  
1️⃣ Type **`chrome://apps`** in the Chrome address bar and press **Enter**.  
2️⃣ Locate the **Weather App** 🌤️ and **right-click (Control-Click on Mac)** to open the **context menu**.  
3️⃣ Click **"Uninstall"** ❌.  

### **🗑️ From Safari (Mac)**  
1️⃣ **Long-press** the **App Icon** on your home screen.  
2️⃣ Tap **"Remove"** ❌.  

---

✅ **Your PWA is now installed and ready to use! Enjoy weather updates anytime, anywhere! 🌤️📱💻**  



## Lighthouse Report
![LightHouse Report](https://drive.google.com/file/d/1F4LDx7-LfhlNaTrylrFoS-sK5dtoXInb/view?usp=sharing)
  - Best practices is only less than 100% because the app requests location on page load.
