import React from 'react';

import './LinkList.css';

const LinkList = (props) => {
    const linkMarkup = props.options.map((link) => (
        <p key={link.id} className='link-list-item'>
            <a
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='link-list-item-url'
            >
                {link.text}
            </a>
        </p>
    ));

    return <ul className='link-list'>{linkMarkup}</ul>;
};

export default LinkList;
