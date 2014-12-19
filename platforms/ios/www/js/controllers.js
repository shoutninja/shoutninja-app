angular.module('starter.controllers', ['ngRoute', 'firebase'])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, $firebase) {
    var chatURL = "https://unknown-chat.firebaseio.com/";
    var ref = new Firebase(chatURL);
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

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});