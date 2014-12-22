/**
 * Config.js
 * This is a home for configuration code for the entire app
 * I.E. constants and database URLs.
 */

//Declare angular app
var app = angular.module("ninja.shout", ["ionic", "ngCookies", "firebase"]);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

//Base API Urls
app.constant("ninja.shout.constants.urls.firebase", "https://eakjb-shout-ninja2.firebaseio.com");
app.constant("ninja.shout.constants.urls.twitter", "https://twitter.com");
//Cookie prefix
app.constant("ninja.shout.constants.local.cookies.prefix", "ninja.shout.local.cookie");

app.constant("ninja.shout.constants.local.notifications.length", 2000);

//API Urls
app.service("ninja.shout.urls", ["ninja.shout.constants.urls.firebase",
    function (fbURL) {
        this.events = fbURL + "/events";
        this.chats = fbURL + "/chats";
        this.users = fbURL + "/users";
        this.settings = fbURL + "/settings";
        this.votes = "/votes";
        this.location = "/location";
        this.comments = "/comments";
        this.settingsUsernameImageMap = this.settings + "/chats/usernameImageMap";
}]);

app.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "views/tabs.html"
    })
    // Each tab has its own nav history stack:
    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'views/view_events.html',
                controller: 'ninja.shout.index.events'
            }
        }
    })
        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'views/view_chats.html',
                    controller: 'ninja.shout.index.chats'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'views/view_settings.html',
                    controller: 'ninja.shout.index.settings'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

});

//==============Defaults for database values==============
app.service("ninja.shout.defaults", function () {
    var User = function () {
        return {
            "username": "Guest",
            "href": "",
            "uid": "",
            "provider": "",
            "image": "img/anonymous.jpg"
        };
    };
    var Chat = function () {
        return {
            //id
            "text": "",
            "timestamp": 0,
            "user": new User()
        };
    };
    var Event = function () {
        return {
            //id
            "name": "",
            "description": "",
            "twitter": "",
            "timestamp": 0,
            "votes": [],
            "comments": []
        };
    };
    var Location = function () {
        return {
            "name": "",
            "lattitude": "",
            "longitude": ""
        }
    }
    this.User = User;
    this.Chat = Chat;
    this.Event = Event;

});

//==============Firebase API declarations==============
app.factory("ninja.shout.api.raw.ref", ["$firebase", "ninja.shout.constants.urls.firebase",
    function ($firebase, fbURL) {
        return new Firebase("https://eakjb-shout-ninja2.firebaseio.com/");
    }
]);

app.factory("ninja.shout.api.settings", ["$firebase", "ninja.shout.urls",
    function ($firebase, urls) {
        return $firebase(new Firebase(urls.settings)).$asObject();
}]);

app.factory("ninja.shout.api.settings.usernameImageMap", ["$firebase", "ninja.shout.urls",
    function ($firebase, urls) {
        return $firebase(new Firebase(urls.settingsUsernameImageMap)).$asArray();
}]);

app.factory("ninja.shout.api.events", ["$firebase", "ninja.shout.urls",
    function ($firebase, urls) {
        return $firebase(new Firebase(urls.events)).$asArray();
}]);

app.service("ninja.shout.api.events.votes", ["$firebase", "ninja.shout.urls",
    function ($firebase, urls) {
        this.getVotes = function (event) {
            return $firebase(new Firebase(urls.events + "/" + event.$id + urls.votes));
        };
}]);
app.service("ninja.shout.api.event.comments", ["$firebase", "ninja.shout.urls",
    function ($firebase, urls) {
        this.getComments = function (event) {
            return $firebase(new Firebase(urls.events + "/" + event.$id + urls.comments));
        };
}]);
app.service("ninja.shout.api.events.location", ["$firebase", "ninja.shout.urls",
    function ($firebase, urls) {
        this.getLocation = function (event) {

        }
}]);

app.factory("ninja.shout.api.chats", ["$firebase", "ninja.shout.api.settings", "ninja.shout.urls",
    function ($firebase, settings, urls) {
        return $firebase(new Firebase(urls.chats)).$asArray();
    }
]);

app.factory("ninja.shout.api.users", ["$firebase", "ninja.shout.api.settings", "ninja.shout.urls",
    function ($firebase, settings, urls) {
        return $firebase(new Firebase(urls.users));
    }
]);