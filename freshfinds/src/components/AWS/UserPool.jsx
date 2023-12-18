import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-southeast-2_PUleLJDeA",
    ClientId: "6m7j1ln119betth3tl5hani9p0"
}

export default new CognitoUserPool(poolData);