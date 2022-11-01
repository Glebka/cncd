import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IconContext } from "react-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./App";
import {
  GrblController,
  GrblHandlersGroup,
  JobStateHandler,
  MachineStateHandler,
} from "./grbl";
import { store } from "./store";
import { ControllerContext, JobHandlerContext } from "./context";

const main = async () => {
  const controller = new GrblController();
  const handlers = new GrblHandlersGroup();
  const machineStateHandler = new MachineStateHandler(store.dispatch);
  const jobStateHandler = new JobStateHandler(store.dispatch);
  handlers.addHandler(machineStateHandler);
  handlers.addHandler(jobStateHandler);
  controller.setHandler(handlers);
  controller.connect();
  ReactDOM.render(
    <IconContext.Provider value={{ style: { marginTop: "-0.3rem" } }}>
      <Provider store={store}>
        <ControllerContext.Provider value={controller}>
          <JobHandlerContext.Provider value={jobStateHandler}>
            <App />
          </JobHandlerContext.Provider>
        </ControllerContext.Provider>
      </Provider>
    </IconContext.Provider>,
    document.getElementById("root")
  );
};

main();
