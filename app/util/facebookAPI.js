// let fetch = require('node-fetch'); // uncomment when testing with Node in local terminal

let User = {
  userId: '10107292935765083',
  token: 'EAAEAM7Faw6YBAN41oLYWhQAlqldM21gtolZAs3NDGKWXyjrvguMjdwSwHm4BKAWD5hUaaDr6uiBI4b0nOTSTz70vA5r5f0dshTvUbOTj6ljwfycKWLJJcdQrZCjy4yLN9YZB6zDw5MV4CEdyCuyaolhoZCZBOkIjZChOHPmAD0pNaaQZAfzNsncJxM7IzUwZCDLZCJAudsyIrZA36v8utvFiwjJMZBktltDmZAMZD'
};

/*

From Facebook API, extract the following:
-name
-profile pic
-email
-location
-friends

*/

/* Bunch of API Endpoint URLS */

let NameUrl = function(userId, token) {
  return `https://graph.facebook.com/v2.8/${userId}?access_token=${token}`;
};

let ProfilePicUrl = function(userId, token) {
  return `https://graph.facebook.com/v2.8/${userId}/picture?type=large?access_token=${token}`;
};

let EmailUrl = function(userId, token) {
  return `https://graph.facebook.com/v2.8/${userId}?fields=email&access_token=${token}`;
};

let LocationUrl = function(userId, token) {
  return `https://graph.facebook.com/v2.8/${userId}?fields=location&access_token=${token}`;
};

let FriendsUrl = function(userId, token) {
  return `https://graph.facebook.com/v2.8/${userId}/friends?access_token=${token}`;
};

/* Helper function using fetch */

let fetchFromUrl = function(url) {

  return fetch(url)
  .catch(error => {
    console.error('Error', error);
  });

};

/* Function to get name from Facebook Graph API */

let getName = function(userId, token, callback) {

  fetchFromUrl(NameUrl(userId, token))
  .then(response => {
    return response.json();
  })
  .then(data => {
    return data.name;
  })
  .then(name => {
    callback(name);
  });

};

/* Function to get location from Facebook Graph API */

let getLocation = function(userId, token, callback) {

  fetchFromUrl(LocationUrl(userId, token))
  .then(response => {
    return response.json();
  })
  .then(data => {
    return data.location.name;
  })
  .then(location => {
    callback(location);
  });

};

/* Function to get email from Facebook Graph API */

let getEmail = function(userId, token, callback) {

  fetchFromUrl(EmailUrl(userId, token))
  .then(response => {
    return response.json();
  })
  .then(data => {
    return data.email;
  })
  .then(email => {
    callback(email);
  });

};

/* Function to get profile picture from Facebook Graph API */

let getProfilePic = function(userId, token, callback) {

  fetchFromUrl(ProfilePicUrl(userId, token))
  .then(data => {
    return data.url;
  })
  .then(picUrl => {
    callback(picUrl);
  });

};

/* Function to get friends from Facebook Graph API */

let getFriends = function(userId, token, callback) {

  fetchFromUrl(FriendsUrl(userId, token))
  .then(response => {
    return response.json();
  })
  .then(data => {
    return data.data;
  })
  .then(friends => {
    callback(friends);
  });

};

let getUserData = function(userId, token, callback) {

  let user = { facebookId: userId };
  let count = 0;

  getName(userId, token, name => {
    user.name = name;
    user.firstName = name;
    user.lastName = name;
    count++;
  });

  getEmail(userId, token, email => {
    user.email = email;
    count++;
  });

  getProfilePic(userId, token, picUrl => {
    user.profilePic = picUrl;
    user.photoUrl = picUrl;
    count++;
  });

  getFriends(userId, token, friends => {
    // user.friends = friends;
    user.facebookFriends = friends;
    count++;
  });

  getLocation(userId, token, location => {
    user.city = location;
    count++;
  });

  let collectUserData = setInterval(() => {
    if (count === 5 ) {
      callback(user);
      clearInterval(collectUserData);
    }
  }, 500);

};

// getName(User.userId, User.token, name => console.log(name));
// getEmail(User.userId, User.token, email => console.log(email));
// getProfilePic(User.userId, User.token, pic => console.log(pic));
// getFriends(User.userId, User.token, friends => console.log(friends));
// getLocation(User.userId, User.token, location => console.log(location));

module.exports = {
  getName: getName,
  getEmail: getEmail,
  getProfilePic: getProfilePic,
  getFriends: getFriends,
  getLocation: getLocation,
  getUserData: getUserData
};
