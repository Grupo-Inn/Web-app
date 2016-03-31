/*JS_for_Grupo_inn = {Author: Edgar Castro, Mail: edgar.castro.villa@outlook.com, Version: 0.1}*/
//var host = "http://localhost/grupoinn/mobile/php/manage.php";
var host = "http://grupoinn.com.co/php/manage.php";
angular.module("grupoinn")
    .controller("parentController", function ($scope, localStorageService, $location, $mdSidenav, $http) {
        /*if (localStorageService.get("auth_token")) {
            //Verificar que el token es valido en el backend

        } else {
            console.log("No Autorizado");
            $location.path("/signin");
        }*/
        $scope.signout = function () {
            $http({
                method: 'POST',
                url: 'http://limitless-gorge-37168.herokuapp.com/api/auth/logout/',
                headers: {
                    'Authorization': 'Token ' + localStorageService.get("auth_token")
                }
            }).then(function successCallback(response) {
                localStorageService.remove("auth_token");
                $location.path("/signin");
            }, function errorCallback(response) {
                console.log("Error" + response);
            });
        };
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
    })
    .controller("initController", function ($scope, localStorageService, $location) {

    })
    .controller("eventsController", function ($scope, $http, $mdDialog, localStorageService) {
        $http({
            method: 'GET',
            url: 'http://limitless-gorge-37168.herokuapp.com/api/events/',
            headers: {
                'Authorization': 'Token ' + localStorageService.get("auth_token")
            }
        }).then(function successCallback(response) {
            $scope.events = response.data;
        }, function errorCallback(response) {
            console.log("Error" + response);
        });

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
    })
    .controller("eventController", function ($scope, $http, $routeParams, localStorageService, $resource) {
        $http({
            method: 'GET',
            url: 'http://limitless-gorge-37168.herokuapp.com/api/events/' + $routeParams.id + '/',
            headers: {
                'Authorization': 'Token ' + localStorageService.get("auth_token")
            }
        }).then(function successCallback(response) {
            $scope.event = response.data;
        }, function errorCallback(response) {
            console.log("Error" + response);
        });
        $http({
            method: 'GET',
            url: 'http://limitless-gorge-37168.herokuapp.com/api/events/' + $routeParams.id + '/groups/',
            headers: {
                'Authorization': 'Token b492e0efa86edcd341358b511e42f42f11083fe2'
            }
        }).then(function successCallback(response) {
            $scope.groups = response.data;
            console.log(response.data);
        }, function errorCallback(response) {
            console.log("Error" + response);
        });

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
    .controller("profileController", function ($scope, $http, $mdDialog, localStorageService) {
        $http({
            method: 'GET',
            url: 'http://limitless-gorge-37168.herokuapp.com/api/auth/me/',
            headers: {
                'Authorization': 'Token ' + localStorageService.get("auth_token")
            }
        }).then(function successCallback(response) {
            console.log(response.data);
        }, function errorCallback(response) {
            console.log("Error" + response);
        });
        /*$http.get(host + "?option=profile&idUser=1")
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
            });*/
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
                $http.post("http://limitless-gorge-37168.herokuapp.com/api/auth/login/", { //{username: "sairth19", password: "term2tjd1992nys"}
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
    })
    .controller("registerController", function ($scope, $http, $location) {
        $http({
            method: 'POST',
            url: 'http://limitless-gorge-37168.herokuapp.com/api/auth/register/',
            data: {
                username: $scope.user.name,
                password: $scope.user.pass,
                email: $scope.user.mail
            }
        }).then(function successCallback(response) {
            console.log("Exito" + response);

        }, function errorCallback(response) {
            console.log("Error" + response);
        });
    });
