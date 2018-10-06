import errorHandler from "errorhandler";

import App from "./app";

App.use(errorHandler());

/**
 * Start Express server.
 */
const server = App.listen(App.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    App.get("port"),
    App.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
