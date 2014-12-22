app.directive("shoutNinjaChat", function() {
    return {
        scope: {
            sidebar: "=sidebar"
        },
        templateUrl: 'views/fragment_chats.html'
    };
});