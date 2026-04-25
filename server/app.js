const express = require("express");
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 8080
const routeHandlers = require("./routes/index.js");

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

  app.use(cors({
    origin: (origin, callback) => {
        // allow server-to-server requests (no origin header)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
// Global: 100 requests per 15 minutes per IP across all routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,  // sends RateLimit-* headers the client can read
  legacyHeaders: false,
  message: { error: "Too many requests, please try again in 15 minutes." },
});

// /ask: 10 requests per minute per IP — tighter because each call hits Bedrock
const askLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  // SSE is already open when rate limit fires on the next call, so return JSON
  message: { error: "Too many questions. You can ask up to 10 per minute." },
  skip: (req) => req.method === "OPTIONS",
});

// /ask: 50 requests per day per IP — daily billing cap
const dailyAskLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Daily question limit reached. Come back tomorrow." },
  skip: (req) => req.method === "OPTIONS",
});

app.use(globalLimiter);
app.use(helmet());

app.use("/api/v1", routeHandlers);
app.get("/", (req,res)=>{ res.send("Welcome to the service"); })
app.use("/api/v1/bedrock", require("./bedrock/bedrock.routes.js"))

app.listen(port, ()=> {
    console.log(`App is listening to ${port}`)
})

