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
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const {fetchUser}  = useContext(UserContext);
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
    console.log(response)

    if (response.url.includes("error")) {
        setErrorMessageShown(true);
      } else {
        fetchUser()
        setErrorMessageShown(false);
        history.push("/")
      }
    
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={performLogin}>
          <FormGroup >
            <Label for="emailAddress">Email</Label>
            <Input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup >
            <Label
              for="password"
            >
              Lösenord
            </Label>
            <Input
          required
          className="noBorder"
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          </FormGroup>

          <FormGroup >
            {errorMessageShown ? (
              <div className=" mb-2 text-center font-weight-bold">
                Felaktigt användarnamn eller lösenord
              </div>
            ) : (
              ""
            )}
            <Button >
              Logga in
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};
export default LoginPage;
