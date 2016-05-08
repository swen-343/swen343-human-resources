angular.module('employeeController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', function($scope, $http, Employees) {
        $scope.formData = {};

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Employees.get()
            .success(function(data) {
                $scope.employees = data;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createEmployee = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Employees.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.employees = data; // assign our new list of todos
                    });
            }
        };

        // DELETE ==================================================================
        // delete a todo after checking it
       
    });