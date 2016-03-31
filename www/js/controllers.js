angular.module('allowanceTracker.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})
        
.controller('HomeCtrl', function($scope, $state, BalanceFactory, $firebaseObject) {
    //the current balance of your account
    //@TODO *********************************************
    //***************************************************
    //Change the username to the current user (placeholder of MATT, currently used, need it to reflect the acutal user)
    var username = "Matt";
    
    //get the day of the year 
    //thanks! http://jsfiddle.net/Bm7GJ/
    getDay = function() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    };

    var theDay = getDay(); 
    BalanceFactory.getBalance(username, theDay).then(function(bal){
       $scope.currentBalance = bal;
    });
    
    //handle the buttons to navigate
    $scope.goAddNew = function(){
        $state.go('app.addNew');
    };
    
    $scope.goLeaderboard = function(){
        $state.go('app.leaderboard');
    };
    
    $scope.goHistory = function(){
        $state.go('app.history');
    };
})

.controller('HistoryCtrl', function() {
    
})

.controller('AddNewCtrl', function() {
    
})

.controller('LeaderboardCtrl', function() {
    
});

