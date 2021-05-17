import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import supabase from "../../supabase.config";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function FamilyMembersList() {
  const classes = useStyles();
  const [familyGroup, setFamilyGroup] = useState([]);
  const [titular, setTitular] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAffiliate() {
      try {
        const { data: user, error: errorFetchUserData } = await supabase
          .from("partners")
          .select("*")
          .eq("dni", JSON.parse(localStorage.getItem("userdata")).dni)
          .eq("family_bond", "titular");

        const { data: family, error: errorFetchFamilyData } = await supabase
          .from("partners")
          .select("*")
          .eq("family_group", user[0].family_group)
          .neq("dni", user[0].dni);

        setFamilyGroup(family);
        setTitular(true);
        console.log(family);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getAffiliate();
  }, []);

  if (loading) return <CircularProgress />;

  if (!titular) return <p>Solo el titular puede verificar esta información</p>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Birthdate</TableCell>
            <TableCell align="right">Family Bond</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">DNI</TableCell>
            <TableCell align="right">E-Mail</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {familyGroup.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.birthdate}</TableCell>
              <TableCell align="right">{row.family_bond}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.dni}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone_number}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" size="small">
                  Unsuscribe
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
