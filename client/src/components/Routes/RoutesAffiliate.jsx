import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import FamilyMembers from '../Affiliate/UserFamilyMembers/FamilyMembers.jsx';
import UserNav from '../Affiliate/UserNav/UserNav.jsx';
import UserAside from '../Affiliate/UserAside/UserAside.jsx';
import UserHome from '../Affiliate/UserHome/UserHome.jsx';
import UserMedRec from '../Affiliate/UserMedRec/UserMedRec.jsx';
import RenderPDF from '../Affiliate/UserMedRec/RenderPDF';
import MedicalDirectory from '../Affiliate/AffiliateDoctors/AffiliateDoctors';
import UserProfile from '../Affiliate/UserProfile/UserProfile.jsx';
import { StylesProvider } from '@material-ui/styles';
import styles from './RoutesAffiliate.module.css';

function RoutesAffiliate() {
    const firebase = useFirebaseApp();
    return (
        <>
            <div className={styles.home}>
                <Route
                    path='/:id/affiliate'
                    render={() => <UserNav firebase={firebase} />}
                />
                <div className={styles.asideContent}>
                    <Route
                        path='/:id/affiliate'
                        render={() => <UserAside firebase={firebase} />}
                    />
                    <Route
                        exact
                        path='/:id/affiliate'
                        render={() => <UserHome firebase={firebase} />}
                    />
                </div>
            </div>
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
        </>
    );
}

export default RoutesAffiliate;
