<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="icon" href="img/logo/logo.ico">
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MCC | Empresas</title>
  <?php include('./components/header.php') ?>
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

    <div class="row">
      <div class="col-sm-6">
        <div class="input-group flex-nowrap">
          <input
            id="busqueda"
            type="text"
            class="form-control"
            placeholder="Buscar Empresa"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span class="input-group-text" id="basic-addon2">Buscar</span>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="input-group flex-nowrap">
          <button
            type="button"
            id="btn-nuevo"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Registrar Empresa
          </button>
        </div>
      </div>
    </div>
    <br />
    <div id="tabla-contenido"></div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    ><div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header hblue">
          <h5 class="modal-title" id="exampleModalLabel">
            Registro de Empresa
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>Información Principal</h5>
          <hr>
          <div class="row">
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Código</label>
              <input
                type="text"
                class="form-control"
                placeholder="Código"
                id="codigo"
                aria-label="Código"
                maxlength="10"
              />
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Nombre</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nombre"
                id="nombre"
                aria-label="Nombre"
                maxlength="100"
              />
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">NIT</label>
              <input
                type="text"
                class="form-control"
                placeholder="NIT"
                id="nit"
                aria-label="NIT"
                maxlength="20"
              />
              <br />
            </div>
          </div>
          <br>
          <h5>Ubicación</h5>
          <hr>
          <div class="row">
            <div class="col-sm-4">
              <label for="" class="form-label is-required">País</label>
              <select
                class="form-select"
                id="pais"
                aria-label="Default select example"
              >
                <option value="0" selected>Seleccione País</option>
              </select>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required"
                >Estado o Departamento</label
              >
              <select
                class="form-select"
                id="departamento"
                aria-label="Default select example"
                disabled
              >
                <option value="0" selected>Seleccione Departamento</option>
              </select>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required"
                >Ciudad o Municipio</label
              >
              <select
                class="form-select"
                id="municipio"
                aria-label="Default select example"
                disabled
              >
                <option value="0" selected>Seleccione Municipio</option>
              </select>
              <br />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
              <label for="" class="form-label is-required">Dirección</label>
              <input
                type="text"
                class="form-control"
                placeholder="Dirección"
                id="direccion"
                aria-label="Dirección"
                maxlength="300"
              />
            </div>
            <div class="col-sm-2">
              <label for="" class="form-label">Código Postal</label>
              <input
                type="text"
                class="form-control"
                placeholder="Código Postal"
                id="codigo_postal"
                aria-label="Codigo Postal"
                maxlength="10"
              />
              <br />
            </div>
          </div>
          <br>
          <h5>Contacto</h5>
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <label for="" class="form-label">Página Web</label>
              <input
                type="text"
                class="form-control"
                placeholder="Página Web"
                id="pagina_web"
                aria-label="Pagina Web"
                maxlength="100"
              />
            </div>
            <div class="col-sm-3">
              <label for="" class="form-label is-required">Teléfono</label>
              <input
                type="text"
                class="form-control"
                placeholder="Teléfono"
                id="telefono"
                aria-label="Teléfono"
                maxlength="20"
              />
            </div>
            <div class="col-sm-3">
              <label for="" class="form-label">Celular</label>
              <input
                type="text"
                class="form-control"
                placeholder="Celular"
                id="celular"
                aria-label="Celular"
                maxlength="20"
              />
              <br />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <label for="" class="form-label is-required"
                >Email Principal</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="Email Principal"
                id="email_principal"
                aria-label="Email Principal"
                maxlength="100"
              />
            </div>
            <div class="col-sm-6">
              <label for="" class="form-label">Email Secundario</label>
              <input
                type="text"
                class="form-control"
                placeholder="Email Secundario"
                id="email_secundario"
                aria-label="Email Secundario"
                maxlength="100"
              />
              <br>
            </div>
          </div>
          <br>
          <h5>Documentos</h5>
          <hr>
          <div class="row">
            <div class="col-sm-5">
              <form
                id="uploadimage"
                action=""
                method="post"
                enctype="multipart/form-data"
              >
                <label for="formFile" class="form-label">Logo</label>
                <input
                  class="form-control"
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                />
              </form>
              <br />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button type="button" id="btn-guardar" class="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
    </div></div>

    <div
      class="modal fade"
      id="exampleModala"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    ><div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header hblue">
          <h5 class="modal-title" id="exampleModalLabel">Ver Información de Empresa</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>Información Principal</h5>
          <hr>
          <div class="row">
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Código</label>
              <input
                type="text"
                class="form-control"
                placeholder="Código"
                id="ucodigo"
                aria-label="Código"
                maxlength="10"
              />
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Nombre</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nombre"
                id="unombre"
                aria-label="Nombre"
                maxlength="100"
              />
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">NIT</label>
              <input
                type="text"
                class="form-control"
                placeholder="NIT"
                id="unit"
                aria-label="NIT"
                maxlength="20"
              />
              <br>
            </div>
          </div>
          <br>
          <h5>Ubicación</h5>
          <hr>
          <div class="row">
            <div class="col-sm-4">
              <label for="" class="form-label is-required">País</label>
              <select
                class="form-select"
                id="upais"
                aria-label="Default select example"
              ></select>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Estado o Departamento</label>
              <select
                class="form-select"
                id="udepartamento"
                aria-label="Default select example"
                disabled
              ></select>
            </div>
            <div class="col-sm-4">
              <label for="" class="form-label is-required">Ciudad o Municipio</label>
              <select
                class="form-select"
                id="umunicipio"
                aria-label="Default select example"
                disabled
              ></select>
              <br />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
              <label for="" class="form-label is-required">Dirección</label>
              <input
                type="text"
                class="form-control"
                placeholder="Dirección"
                id="udireccion"
                aria-label="Dirección"
                maxlength="300"
              />
            </div>
            <div class="col-sm-2">
              <label for="" class="form-label">Código Postal</label>
              <input
                type="text"
                class="form-control"
                placeholder="Código Postal"
                id="ucodigo_postal"
                aria-label="Codigo Postal"
                maxlength="10"
              />
              <br />
            </div>
          </div>
          <br>
          <h5>Contacto</h5>
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <label for="" class="form-label">Página Web</label>
              <input
                type="text"
                class="form-control"
                placeholder="Página Web"
                id="upagina_web"
                aria-label="Pagina Web"
                maxlength="100"
              />
            </div>
            <div class="col-sm-3">
              <label for="" class="form-label is-required">Teléfono</label>
              <input
                type="text"
                class="form-control"
                placeholder="Teléfono"
                id="utelefono"
                aria-label="Teléfono"
                maxlength="20"
              />
            </div>
            <div class="col-sm-3">
              <label for="" class="form-label">Celular</label>
              <input
                type="text"
                class="form-control"
                placeholder="Celular"
                id="ucelular"
                aria-label="Celular"
                maxlength="20"
              />
              <br />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <label for="" class="form-label is-required">Email Principal</label>
              <input
                type="text"
                class="form-control"
                placeholder="Email Principal"
                id="uemail_principal"
                aria-label="Email Principal"
                maxlength="100"
              />
            </div>
            <div class="col-sm-6">
              <label for="" class="form-label">Email Secundario</label>
              <input
                type="text"
                class="form-control"
                placeholder="Email Secundario"
                id="uemail_secundario"
                aria-label="Email Secundario"
                maxlength="100"
              />
              <br>
            </div>
            </div>
            <br>
            <h5>Documentos y Estado</h5>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <label for="" class="form-label is-required">Estado</label>
                <select
                  class="form-select"
                  id="uestado"
                  aria-label="Default select example"
                >
                  <option value="0">Inactivo</option>
                  <option value="1">Activo</option>
                </select>
              </div>
              <div class="col-sm-4">
                <form
                  id="uploadimage"
                  action=""
                  method="post"
                  enctype="multipart/form-data"
                >
                  <label for="formFile" class="form-label">Logo</label>
                  <input
                    class="form-control"
                    type="file"
                    id="uimage"
                    accept="image/png, image/jpeg"
                  />
                </form>
                <br />
              </div>
              <div class="col-sm-3">
                <img id="uimagen" class="mini" src="" alt="" />
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
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
    </div></div>
    <?php include('./components/footer.php') ?>
    <script type="text/javascript" src="./src/empresas/script.js"></script>
  </body>
</html>
