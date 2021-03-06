import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const { fetchUser } = useContext(UserContext);
  const history = useHistory();

  const performLogin = async (e) => {
    e.preventDefault();
    const credentials =
      "username=" +
      encodeURIComponent(email) +
      "&password=" +
      encodeURIComponent(password);

    let response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: credentials,
    });

    if (response.url.includes("error")) {
      setErrorMessage("Fel användarnamn eller lösenord");
    } else {
      fetchUser();
      setErrorMessage("");
      history.push("/");
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();

    let userInformation = {
      email: email,
      password: password,
      username: username,
      roles: ["USER"],
    };

    let response = await fetch("/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInformation),
    });

    if (response.status === 400) {
      response = await response.json();
     
      setErrorMessage(response.message);
    } else {
      setErrorMessage("");
      await performLogin(e);
    }
  };

  return (
    <Card>
      <CardBody>
        {!toggle ? (
          <Form onSubmit={performLogin}>
            <FormGroup>
              <Label for="emailAddress">Email</Label>
              <Input
                required
                minLength="4"
                maxLength="30"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Lösenord</Label>
              <Input
                required
                minLength="6"
                maxLength="20"
                className="noBorder"
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <div className=" mb-2 text-center font-weight-bold">
                {errorMessage}
              </div>

              <Button>Logga in</Button>
            </FormGroup>
            <p onClick={() => setToggle(true)}>Skapa konto</p>
          </Form>
        ) : (
          <Form onSubmit={createAccount}>
            <FormGroup>
              <Label for="emailAddress">Email</Label>
              <Input
                required
                minLength="3"
                maxLength="50"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="username">Användarnamn</Label>
              <Input
                required
                minLength="4"
                maxLength="15"
                className="noBorder"
                type="username"
                placeholder="Användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Lösenord</Label>
              <Input
                required
                minLength="6"
                maxLength="20"
                className="noBorder"
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <div className=" mb-2 text-center font-weight-bold">
              {errorMessage}
            </div>
            <Button>Skapa Konto</Button>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};
export default LoginPage;
