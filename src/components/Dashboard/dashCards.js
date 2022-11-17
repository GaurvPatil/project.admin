import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useStyles } from "../../CommonCss/commonCss";
export default function OutlinedCard({ count }) {
 
  const classes = useStyles();
  return (
    <div className= {classes.flexInitiate}>
      {count.map((data, index) => {
        return (
          <Box sx={{ minWidth: 300, marginRight: "1rem" }} key={index}>
            <Card
              variant="outlined"
              style={{ background: "#2044a7", color: "rgb(216 255 0)" }}
            >
              <React.Fragment>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {data.name}
                  </Typography>
                  <br />
                  <Typography variant="h5" component="div">
                    {data.count}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        );
      })}
    </div>
  );
}
