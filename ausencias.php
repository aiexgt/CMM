<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="icon" href="img/logo/logo.ico">
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MCC | Ausencias</title>
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
            <a href="bodega.php" class="nav_link">
              <i class="bx bx-bookmark nav_icon"></i>
              <span class="nav_name">Bodega</span>
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

  <div class="row">
    <div class="col-sm-2">
      <select class="form-select" id="filtroEmpresa" aria-label="Default select example">
      </select>
    </div>
    <div class="col-sm-2">
      <select class="form-select" id="filtroTrabajador" aria-label="Default select example" disabled>
      </select>
    </div>
    <div class="col-sm-2">
      <div class="input-group flex-nowrap">
        <button type="button" id="btn-nuevo" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Nueva Ausencia
        </button>
      </div>
    </div>
  </div>
  <br />
  <div id="tabla-contenido"></div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header hblue">
          <h5 class="modal-title" id="exampleModalLabel">
            Registro de Ausencia
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>Información Empleado</h5>
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <label for="" class="form-label is-required">Empresa</label>
              <select class="form-select" id="empresa" aria-label="Default select example">
              </select>
            </div>
            <div class="col-sm-6">
              <label for="" class="form-label is-required">Trabajador</label>
              <select class="form-select" id="trabajador" aria-label="Default select example" disabled>
              </select> <br>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <label for="" class="form-label is-required">Fecha (Temporal)</label>
              <input type="date" class="form-control" placeholder="Nombre" id="fecha-temp" aria-label="Nombre" />
            </div>
            <br>
          </div>
          <br>
          <h5>Fechas</h5>
          <hr>
          <div class="row">
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Fecha Inicio</label>
              <input type="date" class="form-control" placeholder="Nombre" id="fecha" aria-label="Nombre" />
              <br>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Cantidad Días</label>
              <input type="number" class="form-control" placeholder="Cantidad" id="cantidad" aria-label="Cantidad" disabled />
              <br>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Fecha Fin</label>
              <input type="date" class="form-control" placeholder="Fecha Fin" id="fecha_fin" aria-label="Fecha Fin" />
              <br>
            </div>

          </div>
          <br>
          <h5>Justificante</h5>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <label for="" class="form-label is-required">Tipo</label>
              <select class="form-select" id="tipo" aria-label="Default select example">
                <option value="0" selected>Justificada</option>
                <option value="1">No Justificada</option>
                <option value="2">IGSS</option>
              </select>
              <br>
            </div>
            <div class="col-sm-9">
              <label for="" class="form-label is-required">Asunto</label>
              <input type="text" class="form-control" placeholder="Asunto" id="asunto" aria-label="Asunto" maxlength="100" />
              <br>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <label for="exampleFormControlTextarea1" class="form-label is-required">Descripción</label>
              <textarea class="form-control" id="descripcion" rows="3" maxlength="300"></textarea>
              <br />
            </div>
          </div>
          <br>
          <h5>Comprobantes</h5>
          <hr>
          <div class="row">
            <div class="col-sm-4">
              <form id="uploadimage" action="" method="post" enctype="multipart/form-data">
                <label for="formFile" class="form-label is-required">Comprobante</label>
                <input class="form-control" type="file" id="image" accept="application/pdf" />
              </form>
              <br />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cerrar
          </button>
          <button type="button" id="btn-guardar" class="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModala" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header hblue">
          <h5 class="modal-title" id="exampleModalLabel">
            Ver Información
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>Información Empleado</h5>
          <hr>
          <div class="row">
            <div class="col-sm-8">
              <label for="" class="form-label">Trabajador</label>
              <input type="text" class="form-control" placeholder="Trabajador" id="utrabajador" aria-label="Nombre" /> <br>
            </div>
          </div>
          <br>
          <h5>Fechas</h5>
          <hr>
          <div class="row">
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Fecha Inicio</label>
              <input type="date" class="form-control" placeholder="Nombre" id="ufecha" aria-label="Nombre" />
              <br>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Cantidad Días</label>
              <input type="number" class="form-control" placeholder="Cantidad" id="ucantidad" aria-label="Cantidad" />
              <br>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Fecha Fin</label>
              <input type="date" class="form-control" placeholder="Fecha Fin" id="ufecha_fin" aria-label="Fecha Fin" />
              <br>
            </div>
          </div>
          <br>
          <h5>Justificante</h5>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <label for="" class="form-label is-required">Tipo</label>
              <select class="form-select" id="utipo" aria-label="Default select example">
                <option value="0" selected>Justificada</option>
                <option value="1">No Justificada</option>
                <option value="2">IGSS</option>
              </select>
              <br>
            </div>
            <div class="col-sm-9">
              <label for="" class="form-label is-required">Asunto</label>
              <input type="text" class="form-control" placeholder="Asunto" id="uasunto" aria-label="Asunto" maxlength="100" />
              <br>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <label for="exampleFormControlTextarea1" class="form-label is-required">Descripción</label>
              <textarea class="form-control" id="udescripcion" rows="3" maxlength="300"></textarea>
              <br />
            </div>
          </div>
          <br>
          <h5>Comprobantes</h5>
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <form id="uploadimage" action="" method="post" enctype="multipart/form-data">
                <label for="" class="form-label is-required">Comprobante Solicitud</label>
                <div class="input-group mb-3">
                  <input class="form-control" type="file" id="uimage" accept="application/pdf" disabled />
                  <button class="btn btn-success" id="verComprobante">Ver</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cerrar
          </button>
          <button type="button" id="btn-editar" class="btn btn-success">
            Editar
          </button>
          <button type="button" id="btn-actualizar" class="btn btn-primary">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>

  <?php include('./components/footer.php') ?>
  <script type="text/javascript" src="./src/ausencias/script.js"></script>
</body>

</html>