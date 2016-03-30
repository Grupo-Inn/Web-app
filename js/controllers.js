/*JS_for_Grupo_inn = {Author: Edgar Castro, Mail: edgar.castro.villa@outlook.com, Version: 0.1}*/
//var host = "http://localhost/grupoinn/mobile/php/manage.php";
var host = "http://grupoinn.com.co/php/manage.php";
angular.module("grupoinn")
    .controller("parentController", function ($scope, localStorageService, $location) {
        if (typeof localStorageService.get("auth_token") !== 'undefined') {
            console.log("Autorizado");
        } else {
            console.log("No Autorizado");
            $location.path("/signin");
        }
        $scope.signout = function () {
            localStorageService.remove("auth_token");
            $location.path("/signin");
        };
    })
    .controller("initController", function ($scope, localStorageService, $location) {


    })
    .controller("eventsController", function ($scope, $http, $mdDialog, $resource, localStorageService, $mdSidenav) {
        /*$http.get(host + "?option=feed")
            .success(function (reply) {
                $scope.events = reply;
            })
            .error(function (reply) {
                console.log(reply)
            });*/
        Events = $resource("http://limitless-gorge-37168.herokuapp.com/api/events/:id/?format=json", {
            id: "@id"
        });
        $scope.events = Events.query();
        $scope.showFilter = function (ev) { //Configurar para filtrar los eventos
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
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
    })
    .controller("eventController", function ($scope, $http, $routeParams, localStorageService, $resource) {
        Events = $resource("http://limitless-gorge-37168.herokuapp.com/api/events/:id/?format=json", {
            id: "@id"
        });
        $scope.event = Events.get({
            id: $routeParams.id
        });
        /*$http.get(host + "?option=detail&idEvent=" + $routeParams.id)
            .success(function (reply) {
                $scope.event = reply;
            })
            .error(function (reply) {
                console.log(reply);
            });*/
        $scope.join = function () {
            //Aqui se une al evento
            $http.post("http://limitless-gorge-37168.herokuapp.com/api/groups/", {
                    event: 1
                })
                //$http.get(host + "?option=join&idUser=" + localStorageService.get("data-user") + "&idEvent=" + $routeParams.id)
                .success(function (reply) {
                    console.log(reply);
                })
                .error(function (reply) {
                    console.log(reply);
                });
        };
    })
    .controller("reservationController", function ($scope) {

    })
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
        $scope.update = function () {
            //Actualizar informacion
            console.log("actualizado");
        };
    })
    .controller("signInController", function ($scope, $http, localStorageService, $location) {
        if (localStorageService.get("auth_token")) {
            $location.path("/events");
        } else {
            $scope.login = function () {
                $http.post("http://limitless-gorge-37168.herokuapp.com/api/auth/login/?format=json", { //{username: "sairth19", password: "term2tjd1992nys"}
                        username: $scope.user.name,
                        password: $scope.user.pass
                    })
                    .success(function (reply) {
                        localStorageService.set("auth_token", reply.auth_token);
                        $location.path("/events");
                    })
                    .error(function (reply) {
                        console.log("datos equivocados" + reply);
                    });
            };
        }
    });
