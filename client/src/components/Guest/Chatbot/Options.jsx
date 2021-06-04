import React from 'react';
import './Options.css';

const Options = (props) => {
    const options = [
        {
            text: 'Planes',
            handler: props.actionProvider.handlePlansList,
            id: 1,
        },
        {
            text: 'Numeros de emergencia',
            handler: props.actionProvider.handleEmergencyList,
            id: 2,
        },
        {
            text: 'Preguntas frecuentes',
            handler: props.actionProvider.handleFAQList,
            id: 3,
        },
        {
            text: 'Asociate',
            handler: props.actionProvider.handleFormList,
            id: 4,
        },
        {
            text: 'Provincias con cobertura',
            handler: props.actionProvider.handleStatesList,
            id: 5,
        },
        { text: 'Mi plan', handler: props.actionProvider.handleMyPlan, id: 6 },
    ];

    const optionsMarkup = options.map((option) => (
        <button
            className='learning-option-button'
            key={option.id}
            onClick={option.handler}
        >
            {option.text}
        </button>
    ));

    return <div className='learning-options-container'>{optionsMarkup}</div>;
};

export default Options;
