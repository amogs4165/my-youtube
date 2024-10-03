import React from "react";
import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";

const appRoute = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <MainContainer />,
            },
            {
                path: "/watch",
                element: <WatchPage />,
            },
        ],
    },
]);

function App() {
    return (
        <Provider store={store}>
            <Head />
            <RouterProvider router={appRoute} />
        </Provider>
    );
}

export default App;
