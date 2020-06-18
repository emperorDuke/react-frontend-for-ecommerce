import React, { useContext } from "react";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Rating from "../Rating";
import Link from "../Link";
import Img from "../Img";
import { EnhancedMerchantStore } from "../../services";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StoreCard: React.ComponentType<EnhancedMerchantStore> = store => {

  return (
    <Card>
      <Link href={store.href} as={store.as}>
        <CardActionArea>
          <CardHeader title={store.name} />
          <Img src={store.logo} alt={store.name} />
          <Divider />
          <CardContent>
            <Typography variant="h4">{store.address.state}</Typography>
            <Rating readonly rating={store.rating.average_rating} />
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default StoreCard;
