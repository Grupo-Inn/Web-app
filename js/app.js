/*JS_for_Grupo_inn = {Author: Edgar Castro, Mail: edgar.castro.villa@outlook.com, Version: 0.1}*/
angular.module("profile", [])
    .controller("profileController", function ($scope, $http) {
        $http.get("http://localhost/grupoinn/mobile/php/manage.php?option=profile&idUser=1")
            .success(function (reply) {
                $scope.profile = {
                    name: reply.names,
                    birthday: reply.birthday,
                    email: reply.email,
                    phone: reply.phone,
                    image: reply.image
                };
                $scope.likes = reply.likes;
            })
            .error(function (reply) {
                console.log(reply);
            });

        $scope.edit = false;
        $scope.editable = function () {
            $scope.edit = !($scope.edit);
        };

        $scope.addLike = function () {
            var i = document.getElementById("Likes").value;
            $scope.likes.push({
                id: i,
                name: "Gusto " + i
            });
            console.log(i);
        };
        $scope.quitLike = function (idLike) {
            delete $scope.likes[idLike];
        };
    });

angular.module("login", ["LocalStorageModule"])
    .controller("loginController", function ($scope, $http, localStorageService) {
        if (localStorageService.get("data-user")) {
            window.location.href = "profile.html";
        } else {
            $scope.login = function (user) {
                $http.get("http://localhost/grupoinn/mobile/php/manage.php?option=login&username=" + user.username + "&password=" + user.password)
                    .success(function (reply) {
                        console.log(reply);
                        if (reply.status === "OK") {
                            localStorageService.set("data-user", reply.idUser);
                            window.location.href = "profile.html";
                        }
                    })
                    .error(function (reply) {
                        console.log(reply);
                    });
            };
        }
    });

angular.module("feed", [])
    .controller("feedController", function ($scope, $http) {
        $http.get("http://localhost/grupoinn/mobile/php/manage.php?option=feed")
            .success(function (reply) {
                $scope.events = reply;
            })
            .error(function (reply) {

            });
        $scope.details = function (event){
            
        };
    });
