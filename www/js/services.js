angular.module('allowanceTracker.services', ['firebase'])

        .factory('BalanceFactory', function ($q, $firebaseObject) {

            //get the current balance in the DB and then do the calculation to
            //determine if a weekly allowance should be added or not
            function getBalance(name, day) {
                var deferred = $q.defer();
                var str1 = "https://allowancetracker.firebaseio.com/";
                var str2 = name.toString();
                var str = str1.concat(str2);
                var ref = new Firebase(str);
                var curBal, weeklyAll, lastUpdate;
                ref.child("balance").on("value", function (snapshot) {
                    curBal = snapshot.val();
                    console.log(curBal);
                    ref.child("weeklyAllowance").on("value", function (snapshot) {
                        weeklyAll = snapshot.val();
                        console.log(weeklyAll);
                        ref.child("lastUpdate").on("value", function (snapshot) {
                            lastUpdate = snapshot.val();
                            console.log(lastUpdate);
                            var newBal = day-lastUpdate;
                            newBal = Math.floor(newBal/7);
                            newBal = newBal * weeklyAll;
                            curBal = newBal + curBal;
                            console.log("NEW BAL: " + curBal);
                            
                            deferred.resolve(curBal);
                            //spawn the function to update the remote db with newbalance
                            updateBalance(ref, newBal, day);
                        });
                    });
                });
                
                return deferred.promise;
            }
            
            //TODO implement the function to update the remote DB with the 
            //new balance, and current day
            function updateBalance(ref, newBal, day){
                
            }

            //the public API
            return {
                getBalance: function (username, day) {
                    return getBalance(username, day);
                }
            };
        });
