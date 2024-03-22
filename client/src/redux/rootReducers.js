import app from "./app/appSlice";
import auth from "./auth/authSlice";
import plan from "./plan/planSlice";
//Include all the reducer to combine and provide to configure store.

const rootReducer = {
    app,
    auth,
    plan,
};

export default rootReducer;
