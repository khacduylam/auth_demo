module.exports = {
  server: {
    port: 3030
    //...other server configs
  },

  mongodb: {
    //mongoUrl: 'mongodb://127.0.0.1:27017/auth_demo'
    mongoUrl: 'mongodb://ahihi:ahihihi0@ds349045.mlab.com:49045/auth_demo'
    //...other mongdb configs
  },

  authentication: {
    local: {
      session: {
        secret: 'ahihi',
        resave: false,
        saveUninitialized: false
      }
    },

    jwt: {
      options: {
        expiresIn: '1d'
      },
      secret: 'dd318ed1fbb196ad7ed727bb0d0d1910'
    }
  },

  pagination: {
    limit: 4,
    sort: '-createdAt'
  }
}