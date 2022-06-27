<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="icon" href="img/logo/logo.ico">
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MCC | Administración</title>
  <?php include('./components/header.php') ?>
</head>

<body id="body-pd">
  <div id="menu">
    <header class="header" id="header">
      <div class="header_toggle">
        <i class="bx bx-menu" id="header-toggle"></i>
      </div>
      <b>
        <p id="busuario"></p>
      </b>
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
            <a href="rrhh.php" class="nav_link">
              <i class="bx bx-user nav_icon"></i>
              <span class="nav_name">Recursos Humanos</span>
            </a>
            <a href="importaciones.php" class="nav_link">
              <i class="bx bx-message-square-detail nav_icon"></i>
              <span class="nav_name">Importaciones</span>
            </a>
            <a href="cooperativa.php" class="nav_link">
              <i class="bx bx-bookmark nav_icon"></i>
              <span class="nav_name">Cooperativa</span>
            </a>
            <a href="administracion.php" class="nav_link active">
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

  <div class="">
    <div class="row text-center">
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Empresas</h5>
            <p class="card-text"><i class="bx bx-building bigIcons"></i></p>
            <a href="empresas.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Usuarios</h5>
            <p class="card-text"><i class="bx bx-user bigIcons"></i></p>
            <a href="usuarios.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reportes Empleados</h5>
            <p class="card-text"><i class="bx bx-file bigIcons"></i></p>
            <a href="reporte_empleados.php" class="btn btn-primary">Adminstrar</a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="row text-center">
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Trabajadores</h5>
            <p class="card-text">
              <i class="bx bx-user-circle bigIcons"></i>
            </p>
            <a href="trabajadores.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Puestos</h5>
            <p class="card-text"><i class="bx bx-briefcase bigIcons"></i></p>
            <a href="puestos.php" class="btn btn-primary">Adminstrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Vacaciones</h5>
            <p class="card-text">
              <i class="bx bx-calendar-exclamation bigIcons"></i>
            </p>
            <a href="vacaciones.php" class="btn btn-primary">Adminstrar</a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="row text-center">
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Feriados</h5>
            <p class="card-text"><i class="bx bx-football bigIcons"></i></p>
            <a href="feriados.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Ausencias</h5>
            <p class="card-text">
              <i class="bx bxs-alarm-exclamation bigIcons"></i>
            </p>
            <a href="ausencias.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Llamadas de Atención</h5>
            <p class="card-text">
              <i class="bx bx-traffic-cone bigIcons"></i>
            </p>
            <a href="llamadas_atencion.php" class="btn btn-primary">Adminstrar</a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="row text-center">
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Bitacora</h5>
            <p class="card-text"><i class="bx bx-archive bigIcons"></i></p>
            <a href="bitacora.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Contratos</h5>
            <p class="card-text"><i class="bx bxs-file bigIcons"></i></p>
            <a href="contratos.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Estado Laboral</h5>
            <p class="card-text"><i class="bx bx-layer bigIcons"></i></p>
            <a href="estados_laborales.php" class="btn btn-primary">Administrar</a>
          </div>
        </div>
        <br />
      </div>
    </div>
    <div class="row text-center">
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Roles</h5>
            <p class="card-text"><i class="bx bx-tag bigIcons"></i></p>
            <a href="roles.php" class="btn btn-primary">Adminstrar</a>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
  <?php include('./components/footer.php') ?>
</body>

</html>