module.exports = function(
  app,
  passport,
  sessions,
  redisStore,
  clientRedis,
  Strategy,
  password
) {
  app.use(
    sessions({
      secret: process.env.SECRET_KEY,
      store: new redisStore({
        host: "localhost",
        port: 6379,
        client: clientRedis,
        ttl: 260
      }),
      resave: true,
      saveUninitialized: false,
      cookie: {
        //secure: true,
        httpOnly: true,
        maxAge: 1000 * 3600 * 24
      }
    })
  );

  passport.use(
    new Strategy(function(username, user_password, done) {
      if (user_password === password.value) {
        let user = { name: "Allowed user", id: "example" };
        console.log(password.value, user_password);
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
