import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Card,
  Button,
} from "@mui/material";
import { useEffect } from "react";

export const ServiceProvidersDetails = (props: any) => {
  useEffect(() => {
    console.log("props = > ", props);
  });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="../cooking.png"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.props.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <Typography gutterBottom variant="h5" component="div">
            Age : {props.props.age}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Reviews : 3 / 5 star
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Call</Button>
        <Button size="small">Read All Reviews</Button>
      </CardActions>
    </Card>
  );
};
