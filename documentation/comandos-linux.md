Comandos para dar permisos de subir archivos linux

sudo chgrp www-data /var/www/html/img/doc-ausencias
sudo usermod -a -G www-data tubagua
sudo chmod -R 775 /var/www/html/img/doc-ausencias
sudo chmod -R g+s /var/www/html/img/doc-ausencias
sudo chown -R tubagua /var/www/html/img/doc-ausencias