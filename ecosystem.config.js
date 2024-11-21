module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start",
      exec_mode: "cluster", // Enable cluster mode
      instances: "max",     // Utilize all CPU cores
      max_memory_restart: "1G", // Restart the app if it uses more than 1GB of memory
    },
  ],
};