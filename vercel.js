{
  "projects": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" },
      "name": "frontend"
    },
    {
      "src": "backend/index.js",
      "use": "@vercel/node",
      "name": "backend"
    }
  ]
}
