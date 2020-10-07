import React, { useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

import { Context as AuthContext } from "../state/auth";
import {
  Context as NotificationsContext,
  enqueueSnackbar,
  closeSnackbar,
} from "../state/notifications";
import { LOGIN_USER } from "../state/types";

import api from "../providers/api";

function Login({ history }) {
  const authContext = useContext(AuthContext);
  const notificationsContext = useContext(NotificationsContext);

  const [secret, setSecret] = useState("");
  const [secretError, setSecretError] = useState(null);

  const [loading, setLoading] = useState(false);

  const disabled = !!secretError || loading;

  const handleSecret = ({ target: { value } }) => {
    setSecret(value);
    secretError && setSecretError(null);
  };

  const handleInit = async (evt) => {
    evt.preventDefault();

    setLoading(true);

    if (!secret) {
      setLoading(false);
      setSecretError("Secret is required");
      return;
    }

    try {
      const token = await (await api.users.init({ secret })).data;

      const key = `logout_${new Date().getTime()}`;

      notificationsContext.dispatch(
        enqueueSnackbar({
          message: `Init successfully!`,
          options: {
            variant: "success",
            key,
          },
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await authContext.dispatch({ type: LOGIN_USER, payload: token });
      history.push("/dashboard");
      notificationsContext.dispatch(closeSnackbar(key));
    } catch (error) {
      let message;
      if (error.response && error.response.data.message)
        message = error.response.data.message;
      else message = error.message;

      notificationsContext.dispatch(
        enqueueSnackbar({
          message: message,
          options: {
            variant: "error",
          },
        })
      );
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Container>
      <StyledCard
        maxHeight="500px"
        maxWidth="400px"
        direction="column"
        justify="space-evenly"
        borderRadius={14}
        border="3px solid"
        background="lighten"
        elevation={12}
      >
        <header>
          <Title>Init App</Title>
          <SubTitle>Please enter secret to continue</SubTitle>
        </header>
        <Form>
          <Input
            label="Secret"
            type="text"
            placeholder="secret"
            helperText={secretError ? secretError : "Enter your Secret"}
            leftIcon="fa-at"
            value={secret}
            onChange={handleSecret}
            error={!!secretError}
          />
        </Form>
        <StyledButton
          type="submit"
          width="100%"
          color="primary"
          variant="compressed"
          onClick={handleInit}
          disabled={disabled}
        >
          {loading ? (
            <i className="fas fa-spinner fa-pulse fa-lg"></i>
          ) : (
            "Start"
          )}
        </StyledButton>
      </StyledCard>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.primary.darken};
`;

const StyledCard = styled(Card)`
  padding: ${(props) => props.theme.spacing(20, 40)};
  margin: ${(props) => props.theme.spacing(30)};
`;

const Title = styled.h1`
  margin: ${(props) => props.theme.spacing(2)};
  text-align: center;
`;

const SubTitle = styled.h3`
  margin: ${(props) => props.theme.spacing(2)};
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
`;

const Form = styled.form`
  align-self: start;
  width: 100%;
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
  font-weight: 600;
`;

export default Login;
