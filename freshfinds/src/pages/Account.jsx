import AccountContainer from "../components/Account/AccountContainer";
import OrdersContainer from "../components/Account/OrdersContainer";
import UserNavBar from "../components/UserNavBar";

const Account = () => {
    return (
        <div>
            <UserNavBar></UserNavBar>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center w-full">
            <AccountContainer></AccountContainer>
            <OrdersContainer></OrdersContainer>
            </div>
        </div>
    );
};

export default Account;
