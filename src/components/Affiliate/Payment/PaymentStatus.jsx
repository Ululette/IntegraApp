import React, { useState } from 'react';
import supabase from '../../../supabase.config';

function PaymentStatus(props) {
    const userData = JSON.parse(localStorage.getItem('userdata'));

    const [tableUpdated, setTableUpdated] = useState(false);

    function getParameterByName(name, url = props.location.search) {
        name = name.replace(/[[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const updatePayment = async () => {
        await supabase
            .from('payments')
            .update({
                collection_id: getParameterByName('collection_id'),
                collection_status: getParameterByName('collection_status'),
                payment_id: getParameterByName('payment_id'),
                external_reference: getParameterByName('external_reference'),
                payment_type: getParameterByName('payment_type'),
                merchant_order_id: getParameterByName('merchant_order_id'),
                site_id: getParameterByName('site_id'),
                processing_mode: getParameterByName('processing_mode'),
                merchant_account_id: getParameterByName('merchant_account_id'),
                payed: true,
            })
            .eq('preference_id', getParameterByName('preference_id'));

        setTableUpdated(true);
    };

    updatePayment();

    if (tableUpdated) {
        props.history.replace('/' + userData.dni + '/affiliate/payment');
    }

    // return <Redirect to={"/" + userData.dni + "/affiliate/payment"} />; SI SE DESCOMENTA ESTO HAY QUE COMENTAR EL IF
    return <p></p>;
}

export default PaymentStatus;
