import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-southeast-2_RWvqivz5x",
    ClientId: "lkkunvvhq84ab1hj3efa906tr"
}

export default new CognitoUserPool(poolData);