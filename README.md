# uupb.github.io



<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Place Holder ? </title>
    <style>
        /* Base styling */
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1f1c2c, #928dab);
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        header, footer {
            width: 100%;
            text-align: center;
            padding: 1rem;
            background-color: rgba(0, 0, 0, 0.7);
        }

        header {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
        }

        footer {
            font-size: 0.875rem;
        }

        main {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            width: 90%;
            max-width: 1200px;
            margin-top: 2rem;
        }

        .nav-box {
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #6f00ff;
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .nav-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
        }

        .nav-box h2 {
            font-size: 1.25rem;
            margin: 0.5rem 0;
        }

        .nav-box p {
            font-size: 0.875rem;
            color: #ccc;
        }

        @media (max-width: 600px) {
            header {
                font-size: 1.25rem;
            }

            footer {
                font-size: 0.75rem;
            }
        }
    </style>
</head>
<body>
    <header>
        Image Placeholder ?
    </header>

    <main>
        <div class="nav-box" onclick="window.location.href='tools.html';">
            <h2>Elite Dangerous Tools</h2>
            <p>Explore tools for the community.</p>
        </div>
        <div class="nav-box" onclick="window.location.href='portfolio.html';">
            <h2>Portfolio</h2>
            <p>Showcasing my projects and strengths.</p>
        </div>
        <div class="nav-box" onclick="window.location.href='links.html';">
            <h2>Other Links</h2>
            <p>Connect to my other online presences.</p>
        </div>
    </main>

    <footer>
        hyperFixationStudios All rights reserved.
    </footer>
</body>
</html>
