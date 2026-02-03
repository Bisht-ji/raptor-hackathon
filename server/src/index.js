import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB Connection (optional - for storing collapse history)
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('📦 MongoDB connected');
    } else {
      console.log('⚠️  MongoDB URI not provided - running without database');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Connect to DB
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Collapsing IDE API is running',
    timestamp: new Date().toISOString()
  });
});

// Socket.IO for real-time collaboration (future feature)
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('code-update', (data) => {
    // Broadcast code updates to other users (for collaborative mode)
    socket.broadcast.emit('code-updated', data);
  });

  socket.on('collapse-event', (data) => {
    // Broadcast collapse events
    socket.broadcast.emit('collapse-occurred', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    message: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   💥 COLLAPSING IDE - BACKEND SERVER                  ║
║                                                        ║
║   Server running on port ${PORT}                         ║
║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
║   API Health: http://localhost:${PORT}/api/health        ║
║                                                        ║
║   Ready for chaos...                                   ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

export default app;
