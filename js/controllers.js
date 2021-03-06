/*JS_for_Grupo_inn = {Author: Edgar Castro, Mail: edgar.castro.villa@outlook.com, Version: 0.1}*/
//var host = "http://grupoinn.com.co/php/manage.php";
var host = "http://limitless-gorge-37168.herokuapp.com/api";
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
                url: host + '/auth/logout/',
                headers: {
                    'Authorization': 'Token ' + localStorageService.get("auth_token")
                }
            }).then(function successCallback(response) {
                localStorageService.remove("auth_token");
                $location.path("/signin/");
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
    .controller("eventsController", function ($scope, $http, $mdDialog, localStorageService, $location) {
        $http({
            method: 'GET',
            url: host + '/events/',
            headers: {
                'Authorization': 'Token ' + localStorageService.get("auth_token")
            }
        }).then(function successCallback(response) {
            $scope.events = response.data;
        }, function errorCallback(response) {
            console.log("Error" + response);
            $location.path("/signin/");
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
    .controller("eventController", function ($scope, $http, $routeParams, localStorageService, $mdDialog, $mdMedia) {
        $http({
            method: 'GET',
            url: host + '/events/' + $routeParams.id + '/',
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
            url: host + '/events/' + $routeParams.id + '/groups/',
            headers: {
                'Authorization': 'Token ' + localStorageService.get("auth_token")
            }
        }).then(function successCallback(response) {
            $scope.groups = response.data;
        }, function errorCallback(response) {
            console.log("Error" + response);
        });

        $scope.join = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                    controller: newReservController,
                    templateUrl: 'templates/reservdialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                .then(function (data) {
                    console.log("este dentro del evento" + data.group);
                    if (data.group == 0) {
                        $http({
                            method: 'POST',
                            url: host + '/groups/',
                            data: {
                                event: $routeParams.id
                            },
                            headers: {
                                'Authorization': 'Token ' + localStorageService.get("auth_token")
                            }

                        }).then(function successCallback(response) {
                            console.log("Exito con el grupo" + response);
                            $http({
                                method: 'POST',
                                url: host + '/reservations/',
                                data: {
                                    assistants: data.assistant,
                                    group: response.data.id
                                },
                                headers: {
                                    'Authorization': 'Token ' + localStorageService.get("auth_token")
                                }

                            }).then(function successCallback(response) {
                                console.log("Exito con la reserva" + response);


                            }, function errorCallback(response) {
                                console.log("Error con la reserva" + response);
                            });

                        }, function errorCallback(response) {
                            console.log("Error con el grupo" + response);
                        });
                    } else {
                        $http({
                            method: 'POST',
                            url: host + '/reservations/',
                            data: {
                                assistants: data.assistants,
                                group: data.group
                            },
                            headers: {
                                'Authorization': 'Token ' + localStorageService.get("auth_token")
                            }

                        }).then(function successCallback(response) {
                            console.log("Exito con la reserva" + response);


                        }, function errorCallback(response) {
                            console.log("Error con la reserva" + response);
                        });
                    }
                }, function () {
                    //cancelar reserva
                });
        };
    })
    .controller("reservationController", function ($scope) {

    })
    .controller("profileController", function ($scope, $http, $mdDialog, localStorageService) {
        $http({
            method: 'GET',
            url: host + '/auth/me/',
            headers: {
                'Authorization': 'Token ' + localStorageService.get("auth_token")
            }
        }).then(function successCallback(response) {
            console.log(response.data);
        }, function errorCallback(response) {
            console.log("Error" + response);
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
            $location.path("/events/");
        } else {
            $scope.login = function () {
                $http.post(host + "/auth/login/", {
                        username: $scope.user.name,
                        password: $scope.user.pass
                    })
                    .success(function (reply) {
                        localStorageService.set("auth_token", reply.auth_token);
                        $location.path("/events/");
                    })
                    .error(function (reply) {
                        console.log("datos equivocados" + reply);
                    });
            };
        }
    })
    .controller("registerController", function ($scope, $http, $location) {
        $scope.register = function () {
            $http({
                method: 'POST',
                url: host + '/auth/register/',
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
        };
    });

function newReservController($scope, $mdDialog, $http, $routeParams, localStorageService) {
    $http({
        method: 'GET',
        url: host + '/events/' + $routeParams.id + '/groups/',
        headers: {
            'Authorization': 'Token ' + localStorageService.get("auth_token")
        }
    }).then(function successCallback(response) {
        $scope.groups = response.data;
    }, function errorCallback(response) {
        console.log("Error" + response);
    });
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.confirm = function () {
        $mdDialog.hide({
            group: $scope.myGroup,
            assistants: $scope.assistants
        });
    };
}
