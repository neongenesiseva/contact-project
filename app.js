var app = angular.module('contact',['ngRoute','firebase']);
app.config(function($routeProvider){
    $routeProvider
    .when("/contact",{
        templateUrl:'template/contact.html',
        controller:'contactCtrl'
    })
    .when("/about",{
        templateUrl:'template/about.html'
    })
    .otherwise({
        redirectTo:"/contact"
    })
});