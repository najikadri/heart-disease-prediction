# Healthcare Analytics Dashboard – Frontend

A modern, interactive dashboard for visualizing and analyzing patient heart disease risk data.
Built with **React + Vite + TypeScript** and styled with **Tailwind CSS**.

![Screenshot](./public/Dashboard%20Demo.png) <!-- You can replace this with your screenshot file path -->

---

## Features

* 📊 **Interactive Charts:** Pie, scatter, and customizable line charts powered by Chart.js
* 🎛️ **Advanced Filtering:** Filter patients by age, sex, and risk category
* ⚡ **Responsive UI:** Optimized for desktop and mobile, with clean Tailwind styling
* 🤖 **ML-Ready:** Designed for integration with backend ML predictions (see backend repo)
* 🔍 **Real-time Data Exploration:** Explore relationships between key health metrics

---

## Technologies Used

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [react-chartjs-2](https://react-chartjs-2.js.org/)
* [Chart.js](https://www.chartjs.org/)

---

## Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/najikadri/heart-disease-prediction.git
cd frontend
```

### 2. **Install Dependencies**

You’ll need [Node.js](https://nodejs.org/) (v16+ recommended).

```bash
npm install
```

### 3. **Set up Environment Variables**

If your frontend needs to talk to a backend API, create a `.env` file and add your backend URL:

```env
VITE_API_URL=http://localhost:8000/api
```

> Adjust the URL as needed for your backend. Default URL is http://localhost:8000.

### 4. **Run the Development Server**

```bash
npm run dev
```

* App will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. **Build for Production**

```bash
npm run build
```

* Output will be in the `dist/` folder.

### 6. **Preview Production Build**

```bash
npm run preview
```

---

## Project Structure

```
frontend/
│
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context providers (global state)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Main and sub pages
│   ├── utilities/        # Utility/helper functions like API services
│   ├── types/            # TypeScript types/interfaces
│   ├── App.tsx           # App entry point
│   ├── main.tsx          # Vite main file
│   └── index.css         # Tailwind CSS entry
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Customization & Extending

* **To connect to your own backend:** Update `VITE_API_URL` in your `.env`.
* **To add new features:** Extend the components or add new charts inside `src/pages/dashboard/AnalysisPage.tsx`.
* **Styling:** All UI is built with Tailwind, so use utility classes or edit `tailwind.config.js` for theme changes.

---

## Troubleshooting

* **Port already in use?** Change the port in `vite.config.ts` or kill the conflicting process.
* **API issues?** Ensure your backend server is running and the `VITE_API_URL` is correct.

---

**Questions or issues?**
Open an issue or contact \[[najikadri2000@gmail.com](mailto:najikadri2000@gmail.com)].