/* 
    JS for Grupo inn
    Author: Edgar Castro
    Mail: edgar.castro.villa@outlook.com
    Version: 0.1
*/
angular.module('profile',[])
.controller('profileController', function($scope) {
    $scope.profile = {
        name: "Edgar Castro",
        email: "edgarkstro@gmail.com",
        phone: "3012477984"
    }
    $scope.editable = false;
    $scope.likes = [{id: 1, name: "Tranquilo"}, {id: 2, name: "Fiestero"}];
    $scope.addLike = function(){
        var i = document.getElementById("Likes").value;
        $scope.likes.push({id: i, name: "Gusto " + i});
        console.log(""+i);
    }
    $scope.quitLike = function(idLike){
        delete $scope.likes[idLike];
    }
});