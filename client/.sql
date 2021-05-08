CREATE TABLE users (
    id INTEGER PRIMARY KEY NOT NULL,
    role VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);
roles -->admin,
socio_titular,
medico,
socio_gf;
socio_gf -->soy socio pero no titular,
no accedo a la pagina,
no tengo que cargar email,
si tengo el resto de cosas de socio_titular como carpeta medica,
DNI,
etc.;
socio_titular 1_______N socio_gf;
socio_titular N_______M medico;
;
medico N________M socio_gf;
admin N_______ * roles;