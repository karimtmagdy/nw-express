const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://newave-store.vercel.app",
];

// export const corsOption = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,

//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   allowedHeaders: [
//     "Content-Type",
//     "Access-Control-Allow-Origin",
//     "Authorization",
//     "Origin",
//     "Accept",
//   ],
// };
export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
