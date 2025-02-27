import { development, port } from "./constants/env.js";

export const startServerApplication = (app) => {
  const server = app
    .listen(port, () => {
      console.log(
        `Server started in ${
          development ? "development" : "production"
        } mode on port ${port}`
      );
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`error: Port ${port} is already in use.`);
        process.exit(1);
      }
    });
  // التعامل مع الأخطاء غير المعالجة
  process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: (${err.name} - ${err.message})`);
    server.close(() => {
      console.error("Shutting down server...");
      process.exit(1);
    });
  });
  // التعامل مع إيقاف التشغيل اليدوي
  process.on("SIGINT", async () => {
    console.log("Received SIGINT, shutting down gracefully...");
    try {
      await database.close(); // تأكد من أن لديك دالة `close` في `database`
      console.log("Database connection closed.");
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
};
