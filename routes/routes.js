module.exports = function(
  app,
  passport,
  devices,
  dbFunctions,
  isAuthenticated
) {
  let jura = "ajmooooooo";

  app.post(
    "/devices",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getDevices({})
        .then(value => {
          res.status(200).json(value);
          console.log(jura)
        })
        .catch(function(error) {
          throw new Error("Cant get devices from a database!");
        });
    }
  );

  app.post(
    "/devices/on",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getDevices({})
        .then(value => {
          for (const item of value) {
            let ip_address = item.ip_address;
            let name = item.name;
            let electro_switch = new devices.ElectroSwitch(name, ip_address);
            electro_switch.turnOn().catch(function(error) {
              console.log(error);
            });
          }
        })
        .catch(function(error) {
          res.status(500).send("Problems with turning on the devices");
        });
      res.status(200).send("Devices turned on!");
    }
  );

  app.post(
    "/devices/off",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getDevices({})
        .then(value => {
          for (const item of value) {
            let ip_address = item.ip_address;
            let name = item.name;
            let electro_switch = new devices.ElectroSwitch(name, ip_address);
            electro_switch.turnOff().catch(function(error) {
              console.log(error);
            });
          }
        })
        .catch(function(error) {
          res.status(500).send("Problems with turning on the devices");
        });
      res.status(200).send("Devices turned off!");
    }
  );

  app.post("/devices/:deviceIP", isAuthenticated, function(req, res) {
    dbFunctions
      .getDevices({ ip_address: req.params.deviceIP })
      .then(value => {
        res.status(200).json(value);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send("Problems with getting the device");
      });
  });

  app.put(
    "/devices/:deviceIP/on",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      let electro_switch = new devices.ElectroSwitch(
        "test",
        req.params.deviceIP
      );
      electro_switch
        .turnOn()
        .then(value => {
          res.status(200).send("Turned On");
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
      let returnValue = dbFunctions.updateDevice(req.params.deviceIP, "on");
    }
  );

  app.put(
    "/devices/:deviceIP/off",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      let electro_switch = new devices.ElectroSwitch(
        "test",
        req.params.deviceIP
      );
      electro_switch
        .turnOff()
        .then(value => {
          res.status(200).send("Turned Off");
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
      let returnValue = dbFunctions.updateDevice(req.params.deviceIP, "off");
    }
  );

  //locations
  app.post(
    "/locations",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getLocations({})
        .then(value => {
          res.status(200).json(value);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
    }
  );

  app.post(
    "/locations/:name",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getLocations({ ip_address: req.params.name })
        .then(value => {
          res.status(200).json(value);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
    }
  );

  //objects
  app.post(
    "/objects",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getObjects({})
        .then(value => {
          res.status(200).json(value);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
    }
  );

  app.post(
    "/objects/:name",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getObjects({ ip_address: req.params.name })
        .then(value => {
          res.status(200).json(value);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
    }
  );

  //rooms
  app.post(
    "/rooms",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getRooms({})
        .then(value => {
          res.status(200).json(value);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
    }
  );

  app.post(
    "/rooms/:name",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getRooms({ ip_address: req.params.name })
        .then(value => {
          res.status(200).json(value);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
    }
  );

  //weather

  //locations
  app.post(
    "/weather",
    passport.authenticate("local", { failureRedirect: "/sss" }),
    function(req, res) {
      dbFunctions
        .getWeather({})
        .then(value => {
          res.status(200).json(value);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).send("Problems with server");
        });
    }
  );
  app.get("/notallowed", function(req, res) {
    res.status(200).json({ message: "Not allowed to access the API" });
  });
  app.all(
    "*",
    passport.authenticate("local", { failureRedirect: "/notallowed" }),
    function(req, res) {
      res.status(200).json({ message: "Not allowed to access the API" });
    }
  );
};
