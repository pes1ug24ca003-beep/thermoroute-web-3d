@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background: #020817;
  color: #e2e8f0;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  height: 100%;
  background: #020817;
}

body {
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  font: inherit;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 9999px;
}
