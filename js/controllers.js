/*JS_for_Grupo_inn = {Author: Edgar Castro, Mail: edgar.castro.villa@outlook.com, Version: 0.1}*/
var host = "http://localhost/grupoinn/mobile/php/manage.php";
angular.module("grupoinn")
    .controller("profileController", function ($scope, $http, $mdDialog) {
        $http.get(host + "?option=profile&idUser=1")
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
        $scope.showAlert = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            var confirm = $mdDialog.confirm()
                .clickOutsideToClose(true)
                .title('Confirmacion')
                .textContent('¿Estas seguro de eliminar este gusto?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function () {
                //Confirmacion
            }, function () {
                //Cancelar
            });
        };
    })
    .controller("eventController", function ($scope, $http,  $routeParams) {
        $http.get(host+"?option=detail&idEvent=" + $routeParams.id)
            .success(function (reply) {
                $scope.event = reply;
            })
            .error(function (reply) {
                console.log(reply);
            });
    })
    .controller("loginController", function ($scope, $http, localStorageService) {
        if (localStorageService.get("data-user")) {
            window.location.href = "profile.html";
        } else {
            $scope.login = function (user) {
                $http.get(host+"?option=login&username=" + user.username + "&password=" + user.password)
                    .success(function (reply) {
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
    })
    .controller("feedController", function ($scope, $http) {
        $scope.limit = 5;
        $http.get(host+"?option=feed")
            .success(function (reply) {
                $scope.events = reply;
            })
            .error(function (reply) {
                console.log(reply)
            });

        $scope.loadMore = function () {
            $scope.limit += 5;
        };
    });
