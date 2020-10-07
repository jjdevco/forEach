import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import DashboardLayout from "../layouts/DashboardLayout";

import Button from "./Button";

import api from "../providers/api";

import { Context as AuthContext } from "../state/auth";

import {
  Context as NotificationsContext,
  enqueueSnackbar,
} from "../state/notifications";

function Trips({ history }) {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.state.currentUser;

  const notificationsContext = useContext(NotificationsContext);
  const notificationsDispatch = notificationsContext.dispatch;
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    headers: {
      Authorization: `Bearer ${currentUser}`,
    },
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.trips.getAll(options);
        setTrips(data);
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
      }
    };
    fetch();
  }, [currentUser]);

  return (
    <DashboardLayout>
      <Container>
        <Header>
          <h1>Trips</h1>
          <StyledButton
            color="primary"
            onClick={() => history.push("/dashboard/trips/new")}
          >
            Add New Trip
          </StyledButton>
        </Header>

        {loading ? (
          <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
            <i className="fas fa-spinner fa-pulse fa-4x"></i>
          </div>
        ) : (
          <table style={{ width: "100%" }}>
            <tr>
              <th style={{ textAlign: "left" }}>Date</th>
              <th style={{ textAlign: "left" }}>Time</th>
              <th style={{ textAlign: "left" }}>Start</th>
              <th style={{ textAlign: "left" }}>End</th>
              <th style={{ textAlign: "left" }}>Distance</th>
              <th style={{ textAlign: "left" }}>By</th>
              <th style={{ textAlign: "left" }}>Travelers</th>
              <th style={{ textAlign: "left" }}>Round Trip</th>
              <th style={{ textAlign: "left" }}>Co2 per Person</th>
            </tr>
            {trips.map((trip) => (
              <tr>
                <td>{trip.date}</td>
                <td>{trip.time}</td>
                <td>{trip.start}</td>
                <td>{trip.end}</td>
                <td>{trip.distance}</td>
                <td>{trip.by}</td>
                <td>{trip.travelers}</td>
                <td>{trip.roundTrip ? "Yes" : "No"}</td>
                <td>{trip.costPerPerson}</td>
              </tr>
            ))}
          </table>
        )}
      </Container>
    </DashboardLayout>
  );
}

const Container = styled.div`
  height: 100%;
  padding: ${(props) => props.theme.spacing(10, 30)};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 40px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export default Trips;
