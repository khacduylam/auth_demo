//For authenticating by facebook strategy========================
  //DO NOT use in this demo project, 
  // passport.use(new FacebookStrategy(config.facebook, 
  //   (accessToken, refreshToken, profile, next) => {
  //     User.findOne({ facebookId: profile.id })
  //       .then(user => {
  //         if(user) {
  //           next(null, user);
  //         } else {
  //           const newFbUser = new User({
  //             facebookId: profile._json.id,
  //             facebook: {
  //               _id: profile._json.id,
  //               displayname: profile._json.name,
  //               gender: profile._json.gender,
  //               birthday: profile._json.birthday,
  //               email: profile._json.email,
  //               photo: profile._json.picture.data.url
  //             }
  //           });

  //           newFbUser.save()
  //             .then(user => {
  //               next(null, user);
  //             })
  //             .catch(err => next(err));
  //         }
  //       })
  //       .catch(err => next(err))
  //   }));