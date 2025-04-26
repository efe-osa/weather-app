import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  styled,
  Container,
  Stack,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const UNITS = {
  fahrenheit: "F",
  celsius: "C",
};

export default function CurrentWeather({ data }) {
  const {
    coord,
    main: { humidity, temp, temp_max, temp_min },
    name,
    sys,
    weather: [weather],
  } = data;
  const [unit, setUnit] = useState("celsius");
  const [tempInCelsius, setTempInCelsius] = useState(temp);
  const [tempMinCelsius, setTempMinCelsius] = useState(temp_min);
  const [tempMaxCelsius, setTempMaxCelsius] = useState(temp_max);

  const isCelsius = useMemo(() => unit === "celsius", [unit]);

  const convertToFahrenheit = () => {
    const tempInC = (temp * 9) / 5 + 32;
    const tempMin = (temp_min * 9) / 5 + 32;
    const tempMax = (temp_max * 9) / 5 + 32;
    setTempInCelsius(tempInC.toFixed(2));
    setTempMinCelsius(tempMin.toFixed(2));
    setTempMaxCelsius(tempMax.toFixed(2));
    setUnit("fahrenheit");
  };

  const convertToCelsius = () => {
    setTempInCelsius(temp);
    setTempMinCelsius(temp_min);
    setTempMaxCelsius(temp_max);
    setUnit("celsius");
  };

  const toggleConversion = () => {
    isCelsius ? convertToFahrenheit() : convertToCelsius();
  };

  return (
    <Box sx={{ minWidth: 275, marginTop: 5 }}>
      <Card variant="outlined" sx={{ padding: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} gap={10}>
              <Typography variant="h2" component="div" color={"info.main"}>
                {name.toUpperCase()}
              </Typography>
              <Typography variant="caption" color={"info.main"}>
                &nbsp;(Lon:{coord.lon} | Lat: {coord.lat})
              </Typography>
              <Stack>
                <Typography
                  variant="h6"
                  component="div"
                  color={"text.secondary"}
                >
                  Today&apos;s weather:
                </Typography>
                <Box>
                  <Image
                    width={80}
                    height={80}
                    src={`${process.env.WEATHER_ICON_URL}/img/wn/${weather.icon}@2x.png`}
                    alt={`${weather.description}`}
                  />
                </Box>
                <Typography variant="caption" color={"text.secondary"}>
                  {weather.description}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Item elevation={3}>
                <Typography variant="h2" component="div" mb={2}>
                  {tempInCelsius}&#176;
                  {UNITS[unit]}
                </Typography>
                <Typography variant="subtitle2">
                  Humidity: {humidity}%
                  <br />
                  Temperature min: {tempMinCelsius}
                  &#176;
                  {UNITS[unit]}
                  <br />
                  Temperature max: {tempMaxCelsius}
                  &#176;
                  {UNITS[unit]}
                  <br />
                  Sun rises: {new Date(sys.sunrise).toLocaleTimeString()}
                  <br />
                  Sun sets: {new Date(sys.sunset).toLocaleTimeString()}
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="info"
            variant="contained"
            size="small"
            onClick={toggleConversion}
          >
            Convert To {isCelsius ? "fahrenheit" : "celsius"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
