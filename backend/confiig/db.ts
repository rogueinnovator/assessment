import mongoose from "mongoose";

const MONGO_URI = process?.env?.MONGO_URI!;
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10, // default: 100 — adjust for your workload
      minPoolSize: 2, // keep a few connections alive for performance
      serverSelectionTimeoutMS: 5000, // timeout for initial connection
      socketTimeoutMS: 45000, // close sockets after 45s of inactivity
      family: 4, // use IPv4, skip IPv6 if not needed
    } as unknown as mongoose.ConnectOptions);

    console.log(" MongoDB connected successfully");
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    setTimeout(connectDB, 5000);
  }

  (mongoose.connection as any).on("disconnected", () => {
    console.warn(" MongoDB disconnected. Attempting to reconnect...");
  });

  (mongoose.connection as any).on("reconnected", () => {
    console.log("MongoDB reconnected");
  });

  (mongoose.connection as any).on("error", (error: unknown) => {
    console.error(" MongoDB error:", error);
  });
};
