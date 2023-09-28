import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'app/app';

console.log('API: ', process.env.API_URL);

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<App />);
