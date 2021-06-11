import React from 'react';
import CardContact from './CardContact';

export default function About() {
    const data = [
        {
            name: 'Melina Zellweger',
            linkedin: 'https://www.linkedin.com/in/melina-zellweger-/',
            github: 'https://github.com/zmelina99',
            image: 'https://i.ibb.co/Xzb8dnj/Melina.png',
        },
        {
            name: 'Luciano de Pascua',
            linkedin: 'https://www.linkedin.com/in/lucianodepasqua/',
            github: 'https://github.com/ldepasqua',
            image: 'https://i.ibb.co/Zfz3CNH/lucho.png',
        },
        {
            name: 'Nahuel Gomez',
            linkedin: 'https://www.linkedin.com/in/nelgoez/',
            github: 'https://github.com/nelgoez',
            image: 'https://i.ibb.co/5jG9YnJ/nahu.jpg',
        },
        {
            name: 'Julian Vazquez',
            linkedin: 'https://www.linkedin.com/in/julianvazquezdev/',
            github: 'https://github.com/jumjules42',
            image: 'https://i.ibb.co/2KbKH7x/juli.jpg',
        },
        {
            name: 'Leon Vila',
            linkedin: 'https://www.linkedin.com/in/leonvila/',
            github: 'https://github.com/leonvila98',
            image: 'https://i.ibb.co/zXQcCnq/leon.jpg',
        },
        {
            name: 'Sebastian Sanchez',
            linkedin: 'https://www.linkedin.com/in/sebastiansanchezisame/',
            github: 'https://github.com/SebaSanchezI',
            image: 'https://i.ibb.co/dBZYdB2/sebas.jpg',
        },
        {
            name: 'Edith Losada',
            linkedin: 'https://www.linkedin.com/in/edithlosada/',
            github: 'https://github.com/Ululette/',
            image: 'https://i.ibb.co/7rT3v9Q/edith.png',
        },
        {
            name: 'Alan Diaz',
            linkedin: 'https://www.linkedin.com/in/edithlosada/',
            github: 'https://github.com/Ululette/',
            image: 'https://i.ibb.co/qyxpydz/alan.jpg',
        },
    ];

    return (
        <div className='row'>
            {data.map((profile, idx) => (
                <CardContact key={`profile-${idx}`} profile={profile} />
            ))}
        </div>
    );
}
