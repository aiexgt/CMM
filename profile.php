<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="icon" href="img/logo/logo.ico">
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MCC | Perfil</title>
    <link
      href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="assets/imported/menu/menuStyle.css"
      type="text/css"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="assets/css/style.css" />
  </head>
  <body id="body-pd">
    <div id="menu">
      <header class="header" id="header">
        <div class="header_toggle">
          <i class="bx bx-menu" id="header-toggle"></i>
        </div>
        <b><p id="busuario"></p></b>
      </header>
      <div class="l-navbar" id="nav-bar">
        <nav class="nav">
          <div>
            <a href="#" class="nav_logo">
              <img src="img/logo/logo50x50.png" class="logo-icon" alt="">
              <span class="nav_logo-name">MCC</span>
            </a>
            <div class="nav_list">
              <a href="dashboard.php" class="nav_link">
                <i class="bx bx-grid-alt nav_icon"></i>
                <span class="nav_name">Panel Principal</span>
              </a>
              <a href="rrhh.php" class="nav_link active">
                <i class="bx bx-user nav_icon"></i>
                <span class="nav_name">Recursos Humanos</span>
              </a>
              <a href="importaciones.php" class="nav_link">
                <i class="bx bx-message-square-detail nav_icon"></i>
                <span class="nav_name">Importaciones</span>
              </a>
              <a href="bodega.php" class="nav_link">
              <i class="bx bx-bookmark nav_icon"></i>
              <span class="nav_name">Bodega</span>
              </a>
              <a href="administracion.php" class="nav_link">
                <i class="bx bx-folder nav_icon"></i>
                <span class="nav_name">Administración</span>
              </a>
              <a href="ayuda.php" class="nav_link">
                <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
                <span class="nav_name">Soporte</span>
              </a>
            </div>
          </div>
          <a href="index.php" class="nav_link">
            <i class="bx bx-log-out nav_icon"></i>
            <span class="nav_name">Cerrar Sesión</span>
          </a>
        </nav>
      </div>
    </div>
    <!--Container Main start-->
    
    <div class="row">
     
      <div class="col-sm-4">
        <div class="card h-100 card-center">
          <img src="https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg" class="card-img-top imagen-perfil" alt="...">
          <div class="card-body card-center">
            <h5 class="card-title"><b>Juan Luis Guerra</b></h5>
            <p class="card-text"> <span class="gray">Puesto:</span>  Sistemas <br>
              <span class="gray">Empresa:</span>  Tubagua S.A. </p>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Información<button class="btn btn-outline-danger float-end">Editar</button></h5>
            
            <hr>
            <p class="card-text">
              <span class="gray">Nombre:</span> Juan Luis <br>
              <span class="gray">Apellido:</span> Guerra Paz <br>
              <span class="gray">Edad:</span> 44 <br>
              <span class="gray">Puesto:</span> Sistemas <br>
              <span class="gray">Empresa:</span> Tubagua S.A. <br>
              <span class="gray">Ciudad:</span> Mixco <br>
              <span class="gray">Dirección:</span> 15 Calle B Cayala Zona 5 Guatemala <br>
              <span class="gray">Celular: </span> +502 45488454 <br>
              <span class="gray">Teléfono:</span> +502 54548154 <br> 
              <span class="gray">Correo Electrónico:</span> marcapatitogt@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card h-75">
          <div class="card-body">
            <h5 class="card-title">Contactos<button class="btn btn-outline-danger float-end">Editar</button></h5>
            <hr>
            <p class="card-text"><span class="gray">Esposa: </span> Maria Juana - +502 54656484 <br><br>
              <span class="gray">Esposa: </span> Maria Juana - +502 54656484 <br><br>
              <span class="gray">Esposa: </span> Maria Juana - +502 54656484 <br><br>
            </p>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="row">
      <div class="col-sm-6">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Informacion</h5>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Informacion</h5>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <span class="text-muted">
          <p>Copyright &copy; | Tubagua 2022</p>
        </span>
      </div>
    </footer>
    <!-- Scripts -->
    <script src="assets/imported/jquery/jquery.min.js"></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"
      integrity="sha256-/H4YS+7aYb9kJ5OKhFYPUjSJdrtV6AeyJOtTkw6X72o="
      crossorigin="anonymous"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
    ></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Scripts Propios -->
    <script
      type="text/javascript"
      src="assets/imported/menu/menuScript.js"
    ></script>
    <script type="text/javascript" src="assets/js/rrhh/script.js"></script>
  </body>
