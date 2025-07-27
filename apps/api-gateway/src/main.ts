import express from 'express';
import cors from 'cors';
import proxy from "express-http-proxy";
import morgan from 'morgan';
import rateLimit, {ipKeyGenerator} from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'], // cuz frontend will run at 3000 port
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());
app.set('trust proxy', 1);

const keyGenerator = (req: express.Request): string => req.ip!;

// Apply rate limiting 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req:any) => (req.user ? 1000 : 100), // 1000 requests for authenticated users, 100 for unauthenticated
  message:{error : 'Too many requests, please try again later.'},
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator
});

app.use(limiter); //Now using limiter middleware

app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use("/", proxy("http://localhost:6001")) // Proxy to auth service

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
