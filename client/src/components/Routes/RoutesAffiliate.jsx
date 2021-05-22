import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import FamilyMembers from '../Affiliate/UserFamilyMembers/FamilyMembers.jsx';
import UserNav from '../Affiliate/UserNav/UserNav.jsx';
import UserHome from '../Affiliate/UserHome/UserHome.jsx';
import UserMedRec from '../Affiliate/UserMedRec/UserMedRec.jsx';
import RenderPDF from '../Affiliate/UserMedRec/RenderPDF';
import MedicalDirectory from '../Affiliate/AffiliateDoctors/AffiliateDoctors';
import UserProfile from '../Affiliate/UserProfile/UserProfile.jsx';
import AffiliateOrdersAndPrescriptions from '../Affiliate/AffiliateOrdersAndPrescriptions/AffiliateOrdersAndPrescriptions.jsx';

function RoutesAffiliate() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/affiliate'
                render={() => <UserNav firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/affiliate'
                render={() => <UserHome firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/affiliate/familymembers'
                component={FamilyMembers}
            />
            <Route
                exact
                path='/:id/affiliate/mymedicalrecords'
                component={UserMedRec}
            />
            <Route
                exact
                path='/:id/mymedicalrecords/pdf'
                render={() => <RenderPDF firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/affiliate/profile'
                render={() => <UserProfile firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/affiliate/doctor'
                component={MedicalDirectory}
            />
            {/* -------------Ordenes y Recetas--------------------------- */}
            <Route
                exact
                path='/:id/affiliate/ordersandpresc'
                render={() => <AffiliateOrdersAndPrescriptions firebase={firebase} />}
            />
        </>
    );
}

export default RoutesAffiliate;
