import React, { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ListCard from "../AppCards/ProductListCard";
import ViewModuleIcon from "@material-ui/icons/ViewModuleOutlined";
import ViewListIcon from "@material-ui/icons/ViewListOutlined";
import { useProduct } from "../../services";
import ModularCard from "../AppCards/ProductModularCard";
import { sortParameters } from "./utils";
import CardEnhancer from "../CardEnhancer";
import useStyles from "./styles";

export * from "./utils";
export * from "./@types";

function Sorter() {
  const [param, setParam] = useState(sortParameters[0]);

  const [typeOfCard, setTypeOfCard] = useState<"list" | "module">("module");

  const product = useProduct();

  const classes = useStyles();

  const handleSelect = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentParam = sortParameters.find(
      param => param.type === e.target.value
    );

    if (currentParam) {
      product.sort((a, b) => currentParam.cmpFn(a, b));
      setParam(currentParam);
    }
  };

  const handleTypeOfCard = (arg: typeof typeOfCard) => () => {
    setTypeOfCard(arg);
  };

  const sortOptions = sortParameters.map(param => (
    <option key={param.key} value={param.type}>
      {param.type}
    </option>
  ));

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container direction="row">
          <Grid item>
            <NativeSelect value={param.type} onChange={handleSelect()}>
              {sortOptions}
            </NativeSelect>
          </Grid>
          <div style={{ flexGrow: 1 }} />
          <Grid item>
            <ButtonGroup>
              <IconButton onClick={handleTypeOfCard("list")}>
                <ViewListIcon />
              </IconButton>
              <IconButton onClick={handleTypeOfCard("module")}>
                <ViewModuleIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Paper className={classes.layout}>
          <CardEnhancer size="lg" disableToggler cardType={typeOfCard}>
            {product.all().map(product =>
              typeOfCard === "list" ? (
                <ListCard {...product} key={product.id} />
              ) : (
                <ModularCard {...product} key={product.id} />
              )
            )}
          </CardEnhancer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Sorter;
