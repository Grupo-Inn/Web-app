/*JS_for_Grupo_inn = {Author: Edgar Castro, Mail: edgar.castro.villa@outlook.com, Version: 0.1}*/
angular.module("grupoinn", ["ngRoute", "ngMaterial", "LocalStorageModule", "ngResource"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "initController",
                templateUrl: "templates/home.html"
            })
            .when("/events/", {
                controller: "eventsController",
                templateUrl: "templates/events.tmpl.html"
            })
            .when("/events/:id", {
                controller: "eventController",
                templateUrl: "templates/event.tmpl.html"
            })
            .when("/reservation/", {
                controller: "reservationController",
                templateUrl: "templates/reservation.html"
            })
            .when("/user/", {
                controller: "profileController",
                templateUrl: "templates/profile.tmpl.html"
            })
            .when("/user/edit/", {
                controller: "profileController",
                templateUrl: "templates/edit_profile.tmpl.html"
            })
            .when("/signin/", {
                controller: "signInController",
                templateUrl: "templates/sign_in.tmpl.html"
            })
            .when("/register/", {
                controller: "registerController",
                templateUrl: "templates/register.tmpl.html"
            });
    })
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('amber');
    });
