/*JS_for_Grupo_inn = {Author: Edgar Castro, Mail: edgar.castro.villa@outlook.com, Version: 0.1}*/
angular.module("grupoinn", ["ngRoute", "ngMaterial", "LocalStorageModule"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "feedController",
                templateUrl: "templates/feed.html"
            })
            .when("/event/:id", {
                controller: "eventController",
                templateUrl: "templates/event.html"
            })
            .when("/user/", {
                controller: "profileController",
                templateUrl: "templates/profile.html"
            })
            .when("/user/edit/", {
                controller: "profileController",
                templateUrl: "templates/edit_profile.html"
            })
    });
