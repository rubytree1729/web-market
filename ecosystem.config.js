module.exports = {
  "apps": [
    {
      "name": "web-market",
      "cwd": "./",
      "script": "node_modules/next/dist/bin/next",
      "args": "start",
      "instances": 0,
      "exec_mode": "cluster",
      "autorestart": true,
      "output": "~/logs/pm2/console.log",
      "error": "~/logs/pm2/consoleError.log"
    }
  ]
}