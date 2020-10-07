import React, { useState, useContext } from "react";
import styled from "styled-components";
import DashboardLayout from "../layouts/DashboardLayout";

import Card from "./Card";
import Container from "./Container";
import Row from "./Row";
import Header from "./Header";
import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import SaveButton from "./SaveButton";

import api from "../providers/api";

import { Context as AuthContext } from "../state/auth";

import {
  Context as NotificationsContext,
  enqueueSnackbar,
} from "../state/notifications";

function NewTrip({ history }) {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.state.currentUser;

  const notificationsContext = useContext(NotificationsContext);
  const notificationsDispatch = notificationsContext.dispatch;

  const transports = [
    "SUBWAY",
    "CAR",
    "TRUCK",
    "MOTORCYCLE",
    "TRANSANTIAGO",
    "BUS",
    "LOCAL_PLANE",
    "INTERNATIONAL_PLANE",
    "WALK",
  ];

  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(null);
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState(null);
  const [start, setStart] = useState("");
  const [startError, setStartError] = useState(null);
  const [end, setEnd] = useState("");
  const [endError, setEndError] = useState(null);
  const [distance, setDistance] = useState(0);
  const [distanceError, setDistanceError] = useState(null);
  const [by, setBy] = useState("SUBWAY");
  const [byError, setByError] = useState(null);
  const [travelers, setTravelers] = useState(1);
  const [travelersError, setTravelersError] = useState(null);
  const [roundTrip, setRoundTrip] = useState(false);

  const [loading, setLoading] = useState(false);

  const disabled =
    !!dateError ||
    !!timeError ||
    !!startError ||
    !!endError ||
    !!distanceError ||
    !!byError ||
    !!travelersError ||
    loading;

  const handleDate = ({ target: { value } }) => {
    setDate(value);
    dateError && setDateError(null);
  };
  const handleTime = ({ target: { value } }) => {
    setTime(value);
    timeError && setTimeError(null);
  };
  const handleStart = ({ target: { value } }) => {
    setStart(value);
    startError && setStartError(null);
  };

  const handleEnd = ({ target: { value } }) => {
    setEnd(value);
    endError && setEndError(null);
  };

  const handleDistance = ({ target: { value } }) => {
    setDistance(value);
    distanceError && setDistanceError(null);
  };

  const handleTravelers = ({ target: { value } }) => {
    setTravelers(value);
    travelersError && setTravelersError(null);
  };

  const handleAdd = async (evt) => {
    evt.preventDefault();

    setLoading(true);

    if (!date || !time || !start || !end || !distance || !by || !travelers) {
      setLoading(false);
      !date && setDateError("Date is required");
      !time && setTimeError("Time is required");
      !start && setStartError("Start is required");
      !end && setEndError("End Number is required");
      !distance && setDistanceError("Distance Number is required");
      !by && setByError("By Number is required");
      !travelers && setTravelersError("Travalers Number is required");
      setLoading(false);
      return;
    }

    try {
      const form = {
        date,
        time,
        start,
        end,
        distance,
        by,
        travelers,
        roundTrip,
      };

      const options = {
        headers: {
          Authorization: `Bearer ${currentUser}`,
        },
      };

      await api.trips.create(form, options);

      notificationsContext.dispatch(
        enqueueSnackbar({
          message: `Trip created successfully!`,
          options: {
            variant: "success",
          },
        })
      );
      history.push("/dashboard");
      setLoading(false);
    } catch (error) {
      let message;

      if (error.response && error.response.data.message)
        message = error.response.data.message;
      else message = error.message;

      notificationsDispatch(
        enqueueSnackbar({
          message: message,
          options: {
            variant: "error",
          },
        })
      );

      console.error(error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Container>
        <Header>
          <Title>Add New Trip</Title>
        </Header>
        <Card background="lighten" borderRadius={14} elevation={2}>
          <Form encType="multipart/form-data">
            <Row>
              <Input
                label="Date"
                helperText={dateError ? dateError : "Enter the date"}
                placeholder="Date"
                value={date}
                onChange={handleDate}
                error={!!dateError}
              />
            </Row>
            <Row>
              <Input
                label="Time"
                helperText={timeError ? timeError : "Enter the time"}
                placeholder="Time"
                value={time}
                onChange={handleTime}
                error={!!timeError}
              />
            </Row>
            <Row>
              <Input
                label="Start"
                helperText={
                  startError ? startError : "Enter the trip start location"
                }
                placeholder="Start"
                value={start}
                onChange={handleStart}
                error={!!startError}
              />
            </Row>
            <Row>
              <Input
                label="End"
                helperText={endError ? endError : "Enter the trip end location"}
                placeholder="End"
                value={end}
                onChange={handleEnd}
                error={!!endError}
              />
            </Row>
            <Row>
              <Input
                label="Distance"
                helperText={
                  distanceError ? distanceError : "Enter the distance"
                }
                placeholder="Distance"
                value={distance}
                onChange={handleDistance}
                error={!!distanceError}
                type="number"
              />
            </Row>
            <Row>
              <Column>
                <label htmlFor="clients">Choose a transport:</label>
                <br />
                <br />

                <Select
                  name="by"
                  id="by"
                  value={by}
                  onChange={({ target: { value } }) => setBy(value)}
                >
                  {transports.length > 0 &&
                    transports.map((transport) => (
                      <option key={transport} value={transport}>
                        {transport}
                      </option>
                    ))}
                </Select>
              </Column>
            </Row>
            <Row>
              <Input
                label="Travelers"
                helperText={
                  travelersError ? travelersError : "Enter the travelers"
                }
                placeholder="Travelers"
                value={travelers}
                onChange={handleTravelers}
                error={!!travelersError}
                type="number"
              />
            </Row>

            <RoundTrip>
              <Checkbox
                type="checkbox"
                value={roundTrip}
                onChange={() => setRoundTrip((roundTrip) => !roundTrip)}
              />

              <span>Round Trip?</span>
            </RoundTrip>

            <StyledButton
              type="submit"
              color="primary"
              onClick={handleAdd}
              disabled={disabled}
            >
              {loading ? (
                <i className="fas fa-spinner fa-pulse fa-lg"></i>
              ) : (
                "Add Now"
              )}
            </StyledButton>
          </Form>
        </Card>
      </Container>
    </DashboardLayout>
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
`;

const StyledButton = styled(SaveButton)`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(30)};
`;

const RoundTrip = styled.div`
  display: flex;
  align-items: start;
  font-size: 0.9rem;
  margin: ${(props) => props.theme.spacing(10, 0, 0, 0)};
  color: ${(props) => props.theme.colors.text.main};
`;

const Checkbox = styled.input`
  margin: ${(props) => props.theme.spacing(0, 5, 0, 0)};
  height: 20px;
  width: 20px;
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
`;

export default NewTrip;
