const { exec } = require("child_process");
const path = require("path");

// Define colors using ANSI escape codes
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
};

// Emoji text
const emojis = {
  folder: "📁",
  check: "✅",
  wrench: "🛠️",
  tada: "🎉",
  cross: "❌",
};

const clientFolder = path.join(__dirname, "..", "client");

console.log(
  `${colors.blue}${emojis.folder} Client folder: ${clientFolder}${colors.reset}`
);

exec("npm install", { cwd: clientFolder }, (err, stdout, stderr) => {
  if (err) {
    console.error(
      `${colors.red}${emojis.cross} Error during client dependencies installation: ${err.message}${colors.reset}`
    );
    process.exit(1);
  }
  if (stderr) {
    console.error(
      `${colors.red}${emojis.cross} Error during client dependencies installation: ${stderr}${colors.reset}`
    );
    process.exit(1);
  }

  console.log(
    `${colors.green}${emojis.check} Client dependencies installed: ${stdout}${colors.reset}`
  );
  console.log(
    `${colors.blue}${emojis.wrench} Creating client build...${colors.reset}`
  );
  createClientBuild();
});

function createClientBuild() {
  exec("npm run build", { cwd: clientFolder }, (err, stdout, stderr) => {
    if (err) {
      console.error(
        `${colors.red}${emojis.cross} Error during client build: ${err.message}${colors.reset}`
      );
      process.exit(1);
    }
    if (stderr) {
      console.error(
        `${colors.red}${emojis.cross} Error during client build: ${stderr}${colors.reset}`
      );
      process.exit(1);
    }

    console.log(
      `${colors.green}${emojis.tada} Client build completed: ${stdout}${colors.reset}`
    );
  });
}
