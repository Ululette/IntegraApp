import React, { useState, useEffect } from 'react';
import supabase from '../../supabase.config.js';
import 'firebase/auth';

//styles
import styles from './AdminAffiliate.module.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

//icons
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';

// functions
import calculateAge from '../../functions/calculateAge.js';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function AdminAffiliate() {
    const classes = useStyles();
    const [listAffiliates, setListAffiliates] = useState([]);
    const [editActive, setEditActive] = useState(false);
    const [affData, setAffData] = useState(null);

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const fetchAffiliate = async () => {
        const { data: affiliates, error: errorFetchAffiliate } = await supabase
            .from('partners')
            .select('*');
        if (errorFetchAffiliate) return console.log(errorFetchAffiliate);
        setListAffiliates(affiliates);
    };

    useEffect(() => {
        fetchAffiliate();
    }, []);

    const handleEdit = (affiliateData) => {
        setAffData(affiliateData);
        setEditActive(true);
        if (editActive) setEditActive(false);
    };

    const handleDelete = async (affiliateData) => {
        const confirm = window.confirm(
            `Desea eliminar al afiliado ${affiliateData.name} ${affiliateData.lastname} de la obra social? (Esta accion no se puede deshacer)`
        );
        if (confirm) {
            try {
                await supabase
                    .from('medics')
                    .delete()
                    .eq('dni', affiliateData.dni);
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (listAffiliates.length === 0) return <h2>Cargando...</h2>;
    console.log(listAffiliates);

    return (
        <div className={styles.container}>
            <h2>Lista de socios</h2>
            <List className={classes.root}>
                {listAffiliates.map((affiliate) => {
                    const labelId = `checkbox-${affiliate}`;

                    return (
                        <ListItem
                            key={affiliate}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(affiliate)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge='start'
                                    checked={checked.indexOf(affiliate) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={`${affiliate.name} ${affiliate.lastname}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge='end' aria-label='comments'>
                                    <CommentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

export default AdminAffiliate;
