import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

// pages
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/driver/Home";
import { Profile } from "./pages/profile/Profile";
import { MonitoringOrder } from "./pages/orders/MonitoringOrder";
import { ConfirmOrder } from "./pages/orders/ConfirmOrder";
import { History } from "./pages/driver/History";
import { UserLevels } from "./pages/driver/UserLevels";
import { EditProfile } from "./pages/profile/EditProfile";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ChangePassword } from "./pages/auth/ChangePassword";
import { PasswordChangedScreen } from "./pages/auth/PasswordChangedScreen";
import { RegisterStep2 } from "./pages/auth/RegisterStep2";
import { Activation } from "./pages/auth/Activation";
import { GoToStore } from "./pages/orders/GoToStore";
import { InStore } from "./pages/orders/InStore";
import { GoToClient } from "./pages/orders/GoToClient";
import { InClient } from "./pages/orders/InClient";
import { DeliveryConfirmation } from "./pages/orders/DeliveryConfirmation";
import { DeliverySuccessfull } from "./pages/orders/DeliverySuccessfull";

import { DeliveryCompleted } from "./pages/orders/DeliveryCompleted";
import { Rating } from "./pages/orders/Rating";
import { RatingSent } from "./pages/orders/RatingSent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="monitoring-order/:id" element={<MonitoringOrder />} />
        <Route path="confirm-order" element={<ConfirmOrder />} />
        <Route path="history" element={<History />} />
        <Route path="user-levels" element={<UserLevels />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="password-changed" element={<PasswordChangedScreen />} />
        <Route path="register-step2" element={<RegisterStep2 />} />
        <Route path="activation" element={<Activation />} />
        <Route path="go-to-store" element={<GoToStore />} />
        <Route path="in-store" element={<InStore />} />
        <Route path="go-to-client" element={<GoToClient />} />
        <Route path="in-client" element={<InClient />} />
        <Route
          path="delivery-confirmation"
          element={<DeliveryConfirmation />}
        />
        <Route path="delivery-successfull" element={<DeliverySuccessfull />} />
        <Route path="rating" element={<Rating />} />

        <Route path="delivery-completed" element={<DeliveryCompleted />} />
        <Route path="rating-sent" element={<RatingSent />} />
      </Routes>
    </>
  );
}

export default App;
