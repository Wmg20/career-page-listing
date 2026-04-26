import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Career Portal API | Next-Gen Job Search</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --secondary: #a855f7;
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f1f5f9;
            --text-dim: #94a3b8;
            --glass: rgba(255, 255, 255, 0.05);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        header {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
        }

        .glow {
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, var(--primary), transparent 70%);
            filter: blur(80px);
            opacity: 0.15;
            z-index: -1;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        h1 {
            font-size: 5rem;
            font-weight: 800;
            background: linear-gradient(to right, #fff, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
            letter-spacing: -0.05em;
        }

        p.subtitle {
            font-size: 1.5rem;
            color: var(--text-dim);
            max-width: 600px;
            margin-bottom: 2.5rem;
        }

        .btn-group {
            display: flex;
            gap: 1.5rem;
        }

        .btn {
            padding: 1rem 2.5rem;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 1.1rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            box-shadow: 0 10px 30px -10px var(--primary);
        }

        .btn-primary:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 20px 40px -15px var(--primary);
        }

        .btn-outline {
            border: 1px solid var(--glass);
            background: var(--glass);
            color: #fff;
            backdrop-filter: blur(10px);
        }

        .btn-outline:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-5px);
        }

        .endpoints {
            padding: 6rem 0;
        }

        .section-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
            text-align: center;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .card {
            background: var(--card-bg);
            padding: 2.5rem;
            border-radius: 24px;
            border: 1px solid var(--glass);
            transition: all 0.3s ease;
        }

        .card:hover {
            border-color: var(--primary);
            transform: translateY(-10px);
        }

        .method {
            font-weight: 800;
            font-size: 0.8rem;
            padding: 4px 10px;
            border-radius: 6px;
            margin-bottom: 1rem;
            display: inline-block;
            text-transform: uppercase;
        }

        .get { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
        .post { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }

        .path {
            font-family: 'Courier New', monospace;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            display: block;
            color: #fff;
        }

        .card p {
            color: var(--text-dim);
            font-size: 1rem;
        }

        footer {
            padding: 4rem 0;
            text-align: center;
            border-top: 1px solid var(--glass);
            color: var(--text-dim);
        }

        .scroll-down {
            position: absolute;
            bottom: 2rem;
            animation: bounce 2s infinite;
            color: var(--text-dim);
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        @media (max-width: 768px) {
            h1 { font-size: 3rem; }
            .btn-group { flex-direction: column; }
        }
    </style>
</head>
<body>
    <div class="glow"></div>
    
    <header class="container">
        <h1>Career Portal API</h1>
        <p class="subtitle">Access 600+ career pages with advanced filtering, fuzzy search, and real-time synchronization.</p>
        
        <div class="btn-group">
            <a href="/portals" class="btn btn-primary">Explore API</a>
            <a href="https://github.com/Wmg20/career-page-listing" class="btn btn-outline">Github Repo</a>
        </div>

        <div class="scroll-down">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </div>
    </header>

    <section class="endpoints container">
        <h2 class="section-title">API Endpoints</h2>
        <div class="grid">
            <div class="card">
                <span class="method get">GET</span>
                <span class="path">/portals</span>
                <p>Fetch paginated listings. Supports <code>page</code>, <code>limit</code>, and <code>search</code>.</p>
            </div>
            <div class="card">
                <span class="method get">GET</span>
                <span class="path">/portals/suggest</span>
                <p>Real-time typeahead suggestions for company names based on search query <code>q</code>.</p>
            </div>
            <div class="card">
                <span class="method post">POST</span>
                <span class="path">/portals/favorite</span>
                <p>Toggle favorite status for a portal. Persisted across sessions.</p>
            </div>
            <div class="card">
                <span class="method post">POST</span>
                <span class="path">/portals/sync</span>
                <p>Force a fresh synchronization with the remote GitHub data source.</p>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 Career Portal API. Built with NestJS and Passion.</p>
        </div>
    </footer>
</body>
</html>
    `;
  }
}
