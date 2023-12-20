import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-southeast-2_wUuWGaqVq",
    ClientId: "5onoqjsb8vc4m2oi75gjen0l2h"
}

export default new CognitoUserPool(poolData);