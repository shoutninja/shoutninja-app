angular.module('starter.controllers', ['ngRoute', 'firebase'])

.constant('fbURL', 'https://unknown-chat.firebaseio.com/')

.constant('chatURL', '/chats')

.constant('eventURL', '/events')

.controller('DashCtrl', function ($scope, $firebase, fbURL, eventURL) {
    var ref = new Firebase(fbURL + eventURL);
    var sync = $firebase(ref);

    var events = sync.$asArray();

    $scope.events = events;

    //    $scope.getVotes = votes.getVotes;
    //    $scope.getVotesArray = function (e) {
    //        return $scope.getVotes(e).$asArray();
    //    }

    $scope.save = function (event) {
        events.$add({
            name: event.name,
            description: event.description,
            date: event.date
        });

    }
    //    $scope.addVote = function (event) {
    //        if (auth.authMessage()) {
    //            var votesArray = $scope.getVotes(event);
    //            var vote = new defaults.User();
    //            vote.uid = auth.getAuth().uid;
    //            vote.username = auth.getAuth().getUsername();
    //            vote.provider = auth.getAuth().provider;
    //            votesArray.$set(vote.uid, vote);
    //
    //        }
    //    };
})

.controller('ChatsCtrl', function ($scope, $firebase, fbURL, chatURL) {
    var ref = new Firebase(fbURL + chatURL);
    var sync = $firebase(ref);

    var chats = sync.$asArray();

    $scope.chats = chats;

    $scope.save = function (chat) {
        chats.$add({
            message: chat.message,
            user: chat.user,
            img: chat.img
        });
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function ($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function ($scope,$rootScope) {
    $scope.login = function () {
        var ref = new Firebase("https://unknown-chat.firebaseio.com");
        ref.authWithOAuthPopup("twitter", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                alert(authData.twitter.username);
                $rootScope.$apply(function() {
                    $scope.authData = authData;
                });
            }
        });
    }
});