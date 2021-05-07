import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './FaqsPage.module.css';

function FaqsPage() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h2>Preguntas y Respuestas Integra</h2>
            </section>

            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    className={styles.accordionSummary}
                >
                    <Typography>¿Que es Integra?</Typography>
                    <Typography className={styles.description}>
                        Descubre la verdad de todo lo que se maneja en las
                        prepagas.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Integra es una <strong>prepaga medica</strong>{' '}
                        interesada en acompañar y ayudar a todos los
                        beneficiarios para que puedan acceder a una de las
                        mejores prestaciones del mundo entero.{' '}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    className={styles.accordionSummary}
                >
                    <Typography>
                        ¿Que diferencia a Integra de otras prepagas?
                    </Typography>
                    <Typography className={styles.description}>
                        Lo que nos hace unicos.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Tenemos a los mejores profesional del mundo aqui con
                        nosotros y son muy buenas personas.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    className={styles.accordionSummary}
                >
                    <Typography>
                        ¿Cual es la mision de esta singular prepaga?
                    </Typography>
                    <Typography className={styles.description}>
                        Lo que nos inspira cada dia.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Ayudar a que todos tengan acceso a una salud medica
                        profesional, dedicada y global. Ultimamente hay mucha
                        desigualdad social. Nosotros nos comprometemos a hacer
                        del mundo un lugar mejor.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    className={styles.accordionSummary}
                >
                    <Typography>¿Quien esta detras de Integra?</Typography>
                    <Typography className={styles.description}>
                        Nuestro equipo de trabajo.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Ocho samurais que buscan ganarle al desempleo.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    className={styles.accordionSummary}
                >
                    <Typography>
                        ¿Integra esta disponible en todo el mundo?
                    </Typography>
                    <Typography className={styles.description}>
                        Informate de nuestro alcance.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Neh. Bueno. Depende. Si sos de Argentina si, si sos de
                        Uruguay no. Porque en Uruguay no operamos.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    className={styles.accordionSummary}
                >
                    <Typography>¿Puedo trabajar con ustedes?</Typography>
                    <Typography className={styles.description}>
                        Descubre nuestras busquedas laborales.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Claro que puedes. Solamente debes cumplir un par de
                        requerimientos. No dudes en mandarnos tu mensaje a
                        traves de la solapa 'Contactanos'.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    className={styles.accordionSummary}
                >
                    <Typography>¿Que medios de pago puedo usar?</Typography>
                    <Typography className={styles.description}>
                        Diversos metodos de pago.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laudantium natus beatae expedita atque dolor provident
                        velit quis modi soluta? Suscipit, autem quis dolorem
                        animi culpa fugit! Debitis iure nostrum facilis! Lorem,
                        ipsum dolor sit amet consectetur adipisicing elit. Est
                        modi sunt vero eos voluptates ea aspernatur repudiandae
                        temporibus necessitatibus, laborum saepe corporis
                        eveniet, in consequatur dolorum. Minus repellat eaque
                        in!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default FaqsPage;
