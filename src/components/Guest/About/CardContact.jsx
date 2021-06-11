import React from 'react';
import './About.css';

function CardContact({ profile }) {
    return (
        <div className='container'>
            <div
                id='curve'
                class='card'
                style={{
                    backgroundImage: `url(${profile.image})`,
                }}
            >
                <div class='footer'>
                    <div class='connections'>
                        <a
                            href={profile.linkedin}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <div class='connection facebook'>
                                <div class='icon'></div>
                            </div>
                        </a>
                        <a
                            href={profile.portfolio || '#!'}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <div class='connection twitter'>
                                <div class='icon'></div>
                            </div>
                        </a>
                        <a
                            href={profile.github}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <div class='connection behance'>
                                <div class='icon'></div>
                            </div>
                        </a>
                    </div>
                    <svg className='svg' id='curve'>
                        <path
                            id='p'
                            d='M0,200 Q80,100 400,200 V150 H0 V50'
                            transform='translate(0 300)'
                        />
                        <rect
                            id='dummyRect'
                            x='0'
                            y='0'
                            height='450'
                            width='400'
                            fill='transparent'
                        />
                        <animate
                            xlinkHref='#p'
                            attributeName='d'
                            to='M0,50 Q80,100 400,50 V150 H0 V50'
                            fill='freeze'
                            begin='dummyRect.mouseover'
                            end='dummyRect.mouseout'
                            dur='0.1s'
                            id='bounce1'
                        />
                        <animate
                            xlinkHref='#p'
                            attributeName='d'
                            to='M0,50 Q80,0 400,50 V150 H0 V50'
                            fill='freeze'
                            begin='bounce1.end'
                            end='dummyRect.mouseout'
                            dur='0.15s'
                            id='bounce2'
                        />
                        <animate
                            xlinkHref='#p'
                            attributeName='d'
                            to='M0,50 Q80,80 400,50 V150 H0 V50'
                            fill='freeze'
                            begin='bounce2.end'
                            end='dummyRect.mouseout'
                            dur='0.15s'
                            id='bounce3'
                        />
                        <animate
                            xlinkHref='#p'
                            attributeName='d'
                            to='M0,50 Q80,45 400,50 V150 H0 V50'
                            fill='freeze'
                            begin='bounce3.end'
                            end='dummyRect.mouseout'
                            dur='0.1s'
                            id='bounce4'
                        />
                        <animate
                            xlinkHref='#p'
                            attributeName='d'
                            to='M0,50 Q80,50 400,50 V150 H0 V50'
                            fill='freeze'
                            begin='bounce4.end'
                            end='dummyRect.mouseout'
                            dur='0.05s'
                            id='bounce5'
                        />
                        <animate
                            xlinkHref='#p'
                            attributeName='d'
                            to='M0,200 Q80,100 400,200 V150 H0 V50'
                            fill='freeze'
                            begin='dummyRect.mouseout'
                            dur='0.15s'
                            id='bounceOut'
                        />
                    </svg>
                    <div class='info'>
                        <div class='name'>{profile.name}</div>
                        <div class='job'>Full Stack Developer</div>
                    </div>
                </div>
                <div class='card-blur'></div>
            </div>
        </div>
    );
}

export default CardContact;
