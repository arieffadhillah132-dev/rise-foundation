import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './src/server/config/dbInit';

// Import routes
import authRoutes from './src/server/routes/auth.routes';
import academyRoutes from './src/server/routes/academy.routes';
import campRoutes from './src/server/routes/camp.routes';
import scholarshipRoutes from './src/server/routes/scholarship.routes';
import libraryRoutes from './src/server/routes/library.routes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  
  app.use(express.json());

  // Initialize DB tables
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/academy', academyRoutes);
  app.use('/api/camp', campRoutes);
  app.use('/api/scholarship', scholarshipRoutes);
  app.use('/api/library', libraryRoutes);

  // Vite Integration
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    
    app.use(vite.middlewares);
    
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Prod static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.use('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
