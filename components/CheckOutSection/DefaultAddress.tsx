import React, { useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ShippingDetailType } from "../../redux/actionCreators/AddressActions";
import { flatten } from "../../utils";

interface Props {
  defaultAddress: ShippingDetailType;
  addresses: ShippingDetailType[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

export default function DefaultAddresses(props: Props) {
  const defaultAddress = useMemo(() => {
    return transform(props.defaultAddress);
  }, []);

  const addresses = useMemo(() => {
    return props.addresses.map((address) =>
      transform(address, { minimal: false })
    );
  }, []);

  const transform = (address: any, options = { minimal: true }) => {
    const filterKeys = ["first_name", "last_name", "phone_number", "address"];
    const extraKeys = ["city", "state"];
    const flattenAddress = flatten(address);

    if (!options.minimal) filterKeys.concat(extraKeys);

    return Object.keys(flattenAddress)
      .filter((key) => filterKeys.includes(key))
      .map((key) => ({
        key,
        col: key === "address" ? 12 : 6,
        value: flattenAddress[key],
      }));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <Grid container>
            <Grid item container xs={12}>
              {defaultAddress.map((address) => (
                <Grid item key={address.key} xs={address.col as any}>
                  <Typography>{address.value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item container xs={12}>
        {addresses.map((address, i) => (
          <Paper key={i}>
            <Grid item container xs={12}>
              {address.map((k) => (
                <Grid item key={k.key} xs={k.col as any}>
                  <Typography>{k.value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
      </Grid>
    </Grid>
  );
}
