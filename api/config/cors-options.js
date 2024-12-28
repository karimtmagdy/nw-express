export const allowedOrigins = {
  origin: [
    "http://localhost:3000",
    "https://newave-store.vercel.app",
    "http://localhost:1573",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET,POST,PUT,PATCH,DELETE",
  exposedHeaders: "Content-Type,Authorization",
  allowedHeaders: "Content-Type,Authorization",
  preflightContinue: true,
};

// Replace with your client's origin
