<!DOCTYPE html>
<html lang="es">
  <head>
    <link rel="icon" href="img/logo/logo.ico">
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MCC | Trabajadores</title>
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
      <div class="col-sm-4">
        <div class="input-group flex-nowrap">
          <input
            id="busqueda"
            type="text"
            class="form-control"
            placeholder="Buscar Trabajador"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span class="input-group-text" id="basic-addon2">Buscar</span>
        </div>
      </div>
      <div class="col-sm-2">
        <select
          class="form-select"
          id="bempresa"
          aria-label="Default select example"
        >
        </select>
      </div>
      <div class="col-sm-2">
        <select
          class="form-select"
          id="bpuesto"
          aria-label="Default select example"
        >
        </select>
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
            Nuevo Trabajador
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
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header hblue">
            <h5 class="modal-title" id="exampleModalLabel">
              Registro de Nuevo Trabajador
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
          <h5>Información Personal</h5>
          <hr>
            <div class="row">
              <div class="col-sm-4">
                <label for="" class="form-label is-required">CUI</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Cui"
                  id="cui"
                  aria-label="Cui"
                  maxlength="13"
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
                <label for="" class="form-label is-required">Apellido</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Apellido"
                  id="apellido"
                  aria-label="Apellido"
                  maxlength="100"
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="" class="form-label is-required"
                  >Estado Civil</label
                >
                <select
                  class="form-select"
                  id="estado_civil"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="col-sm-6">
                <label for="" class="form-label is-required"
                  >Fecha Nacimiento</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="fecha_nacimiento"
                  aria-label="Fecha Nacimiento"
                />
              </div>
              <br />
            </div>
            <br>
            <h5>Información Laboral</h5>
            <hr>
            <div class="row">
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Empresa</label>
                <select
                  class="form-select"
                  id="empresa"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Puesto</label>
                <select
                  class="form-select"
                  id="puesto"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Estado Laboral</label>
                <select
                  class="form-select"
                  id="estado_laboral"
                  aria-label="Default select example"
                ></select>
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="" class="form-label">Fecha IGSS</label>
                <input
                  type="date"
                  class="form-control"
                  id="fecha_igss"
                  aria-label="Fecha IGSS"
                />
              </div>
              <div class="col-sm-6">
                <label for="" class="form-label">Numero IGSS</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Número IGSS"
                  id="numero_igss"
                  aria-label="Número IGSS"
                  maxlength="35"
                />
                <br>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="" class="form-label is-required"
                  >Fecha Inicio</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="fecha_inicio"
                  aria-label="Contraseña"
                />
              </div>
              <div class="col-sm-6">
                <label for="" class="form-label is-required">Salario Q</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Salario"
                  id="salario"
                  aria-label="Salario"
                />
                <br />
              </div>
            </div>
            <br>
            <h5>Contacto</h5>
            <hr>
            <div class="row">
              <div class="col-sm-4">
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
              <div class="col-sm-4">
                <label for="" class="form-label">Celular</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Celular"
                  id="celular"
                  aria-label="Celular"
                  maxlength="20"
                />
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label">Correo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Correo"
                  id="correo"
                  aria-label="Correo"
                  maxlength="100"
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
              <div class="col-sm-12">
                <label for="" class="form-label is-required">Dirección</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Dirección"
                  id="direccion"
                  aria-label="Dirección"
                  maxlength="300"
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label for="observaciones" class="form-label">Observaciones</label>
                <textarea class="form-control" id="observaciones" rows="3" maxlength="300"></textarea>
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
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModala"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header hblue">
            <h5 class="modal-title" id="exampleModalLabel">Ver Información</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h5>Información Personal</h5>
            <hr>
            <div class="row">
              <div class="col-sm-4">
                <label for="" class="form-label is-required">CUI</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Cui"
                  id="ucui"
                  aria-label="Cui"
                  maxlength="13"
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
                <label for="" class="form-label is-required">Apellido</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Apellido"
                  id="uapellido"
                  aria-label="Apellido"
                  maxlength="100"
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="" class="form-label is-required">Estado Civil</label>
                <select
                  class="form-select"
                  id="uestado_civil"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="col-sm-6">
                <label for="" class="form-label is-required">Fecha Nacimiento</label>
                <input
                  type="date"
                  class="form-control"
                  id="ufecha_nacimiento"
                  aria-label="Fecha Nacimiento"
                />
                <br>
              </div>
            </div>
            <br>
            <h5>Información Laboral</h5>
            <hr>
            <div class="row">
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Empresa</label>
                <select
                  class="form-select"
                  id="uempresa"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Puesto</label>
                <select
                  class="form-select"
                  id="upuesto"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Estado Laboral</label>
                <select
                  class="form-select"
                  id="uestado_laboral"
                  aria-label="Default select example"
                ></select>
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="" class="form-label">Fecha IGSS</label>
                <input
                  type="date"
                  class="form-control"
                  id="ufecha_igss"
                  aria-label="Fecha IGSS"
                />
              </div>
              <div class="col-sm-6">
                <label for="" class="form-label">Numero IGSS</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Número IGSS"
                  id="unumero_igss"
                  aria-label="Número IGSS"
                  maxlength="35"
                />
                <br>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Fecha Inicio</label>
                <input
                  type="date"
                  class="form-control"
                  id="ufecha_inicio"
                  aria-label="Contraseña"
                />
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Periodo de prueba</label>
                <input
                  type="date"
                  class="form-control"
                  id="uperiodo_prueba"
                  aria-label="Fecha Nacimiento"
                />
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label">Fecha Finalización</label>
                <input
                  type="date"
                  class="form-control"
                  id="ufecha_finalizacion"
                  aria-label="Fecha Nacimiento"
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="" class="form-label is-required">Días Laborados</label>&nbsp;&nbsp;&nbsp;<b id="tiempo"></b>
                <input
                  type="number"
                  class="form-control"
                  id="udias_laborados"
                  aria-label="Fecha Nacimiento"
                />
              </div>
              <div class="col-sm-6">
                <label for="" class="form-label">Salario</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Salario"
                  id="usalario"
                  aria-label="Salario"
                />
                <br />
              </div>
            </div>
            <br>
            <h5>Contacto</h5>
            <hr>
            <div class="row">
              <div class="col-sm-4">
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
              <div class="col-sm-4">
                <label for="" class="form-label">Celular</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Celular"
                  id="ucelular"
                  aria-label="Celular"
                  maxlength="20"
                />
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label">Correo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Correo"
                  id="ucorreo"
                  aria-label="Correo"
                  maxlength="100"
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
                  id="upais"
                  aria-label="Default select example"
                >
                  <option value="0" selected>Seleccione País</option>
                </select>
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Estado o Departamento</label>
                <select
                  class="form-select"
                  id="udepartamento"
                  aria-label="Default select example"
                  disabled
                >
                  <option value="0" selected>Seleccione Departamento</option>
                </select>
              </div>
              <div class="col-sm-4">
                <label for="" class="form-label is-required">Ciudad o Municipio</label>
                <select
                  class="form-select"
                  id="umunicipio"
                  aria-label="Default select example"
                  disabled
                >
                  <option value="0" selected>Seleccione Municipio</option>
                </select>
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label for="" class="form-label is-required">Dirección</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Dirección"
                  id="udireccion"
                  aria-label="Dirección"
                  maxlength="300"
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label for="uobservaciones" class="form-label">Observaciones</label>
                <textarea class="form-control" id="uobservaciones" rows="3" maxlength="300"></textarea>
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

    <div
      class="modal fade"
      id="exampleModalb"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header hblue">
            <h5 class="modal-title" id="exampleModalLabel">Documentos</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h4 class="nombre"></h4><br>  
            <div class="row">
                <div class="col-sm-6">
                    <form
                      id="uploadimage"
                      action=""
                      method="post"
                      enctype="multipart/form-data"
                    >
                        <label for="formFile" class="form-label">DPI</label>
                        <div class="input-group mb-3">  
                            <input
                                class="form-control"
                                type="file"
                                id="dpi"
                                accept="application/pdf"
                            />
                            <span class="a1"></span>
                        </div>
                    </form>
                    <br/>
                </div>
                <div class="col-sm-6">
                    <form
                      id="uploadimage"
                      action=""
                      method="post"
                      enctype="multipart/form-data"
                    >
                        <label for="formFile" class="form-label">Curriculum</label>
                        <div class="input-group mb-3">  
                            <input
                                class="form-control"
                                type="file"
                                id="cv"
                                accept="application/pdf"
                            />
                            <span class="a2"></span>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <form
                      id="uploadimage"
                      action=""
                      method="post"
                      enctype="multipart/form-data"
                    >
                        <label for="formFile" class="form-label">Antecedentes Policiacos</label>
                        <div class="input-group mb-3">  
                            <input
                                class="form-control"
                                type="file"
                                id="apoliciaco"
                                accept="application/pdf"
                            />
                            <span class="a3"></span>
                        </div>
                    </form>
                    <br/>
                </div>
                <div class="col-sm-6">
                    <form
                      id="uploadimage"
                      action=""
                      method="post"
                      enctype="multipart/form-data"
                    >
                        <label for="formFile" class="form-label">Antecedentes Penales</label>
                        <div class="input-group mb-3">  
                            <input
                                class="form-control"
                                type="file"
                                id="apenal"
                                accept="application/pdf"
                            />
                            <span class="a4"></span>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <form
                      id="uploadimage"
                      action=""
                      method="post"
                      enctype="multipart/form-data"
                    >
                        <label for="formFile" class="form-label">Solicitud de Empleo</label>
                        <div class="input-group mb-3">  
                            <input
                                class="form-control"
                                type="file"
                                id="sempleo"
                                accept="application/pdf"
                            />
                            <span class="a5"></span>
                        </div>
                    </form>
                    <br/>
                </div>
                <div class="col-sm-6">
                    <form
                      id="uploadimage"
                      action=""
                      method="post"
                      enctype="multipart/form-data"
                    >
                        <label for="formFile" class="form-label">Notificación de Despido</label>
                        <div class="input-group mb-3">  
                            <input
                                class="form-control"
                                type="file"
                                id="sdespido"
                                accept="application/pdf"
                            />
                            <span class="a6"></span>
                        </div>
                    </form>
                    <br/>
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
            <button type="button" id="btn-actualizard" class="btn btn-primary">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
    <?php include('./components/footer.php') ?>
    <script
      type="text/javascript"
      src="./src/trabajadores/script.js"
    ></script>
  </body>
</html>
