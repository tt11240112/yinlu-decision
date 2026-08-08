@echo off
set "PATH=C:\Users\TT\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\TT\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;%PATH%"
pnpm.cmd dlx localtunnel --port 4173
