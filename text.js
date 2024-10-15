let text = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Scroll Snap Demo</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet">
      <link href="style.css" rel="stylesheet">
  </head>
  <body>
      <div class="container-snap">
          <div id="section1" class="section" style="background-color: #ff6b6b;">
              <p class="where" data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on right">
                  <i class="bi bi-search"></i> Where am I?
              </p>
              <div class="fluid-container">
                  <h1><span id="typed-text"></span><span class="underscore">_</span></h1><br>
                  <h3>Full-Stack Developer with a passion for software and hardware</h3>
              </div>
              <svg id="animation-container"></svg>
              <img src="man4.png" class="man">
          </div>
          <div id="section2" class="section" style="background-color: rgba(170, 151, 204);">Section 2</div>
          <div id="section3" class="section" style="background-color: #45b7d1;">Section 3</div>
          <div id="section4" class="section" style="background-color: #f7b731;">Section 4</div>
      </div>

      <nav id="navbar">
          <div class="nav-item" data-bs-toggle="tooltip" data-bs-placement="left" title="Tooltip on right" data-target="section1" style="background-color: #ff6b6b;">
              <span class="tooltip">Section 1</span>
          </div>
          <div class="nav-item" data-target="section2" style="background-color: #4ecdc4;">
              <span class="tooltip">Section 2</span>
          </div>
          <div class="nav-item" data-target="section3" style="background-color: #45b7d1;">
              <span class="tooltip">Section 3</span>
          </div>
          <div class="nav-item" data-target="section4" style="background-color: #f7b731;">
              <span class="tooltip">Section 4</span>
          </div>
      </nav>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      <script src="script.js"></script>
  </body>
  </html>
`;