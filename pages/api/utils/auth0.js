// utils/auth0.js
import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  secret: "06308918b12acc792297e7922719de347549a1178e98ed92a34eadc753a8d742",
  issuerBaseURL: "https://dev-w36h99kc.us.auth0.com",
  baseURL: "http://localhost:3000",
  clientID: "h5aJlr400ywGjvqJ0BzqunHxO2l22dy0",
  clientSecret:
    "1zcBJ_0zj8pEvkmO3c2M7HQilqz8V2pazw1q9C1Pvy51ziCQT13Ncmi_gY8gP3Y_",
});
