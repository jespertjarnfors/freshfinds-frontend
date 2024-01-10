import AccountContainer from "../components/Account/AccountContainer";
import OrdersContainer from "../components/Account/OrdersContainer";
import UserNavBar from "../components/UserNavBar";

const Account = () => {
    return (
        <div>
            <UserNavBar></UserNavBar>
            <div className="flex justify-center items-center w-full">
            <AccountContainer></AccountContainer>
            <OrdersContainer></OrdersContainer>
            {/* Your component content goes here */}
            </div>
        </div>
    );
};

export default Account;
