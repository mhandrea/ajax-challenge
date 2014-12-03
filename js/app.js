"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

angular.module('myApp', ['ui.bootstrap'])
	.config(function($httpProvider) {
		// set default HTTP headers that Parse requires
		// HTTP request we make
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'gXsJUBfD3G80p4cX1RFZnFA09wi8FUVTZ3TZMxeL';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '7lgnhwHh6uzz7sojGg8MvPQzSOFoSrihVScosKgC';
	})
	.controller('CommentController', function($scope, $http) {
		var base_url = 'https://api.parse.com/1/classes/comments';

		$scope.refresh_comments = function() {	
			// get all tasks
			$scope.loading = true;
            $http.get(base_url)
                .success(function(response_data) { //resultSSSSSSSSS no result! WITH AN SSSSS!!!!!!!!!!!!!!!!!!!!! 
                    $scope.comments = response_data.results.sort(function(a,b) { // http://www.w3schools.com/jsref/jsref_sort.asp
                    	if (a.score > b.score) {
                    		return -1;
                    	}
                    	if (a.score == b.score) {
                    		return 0;
                    	}
                    	return 1;
                    }); 
                })
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.loading = false;
                });
		};

		$scope.refresh_comments(); // get all new comments

		// initialize a new comment object on the same scope as the form
		$scope.new_comment = {
            score: 0
        };
        $scope.add_comment = function(comment) {
            $scope.inserting = true;
            $http.post(base_url, comment)
                .success(function(response_data) {
                    comment.objectId = response_data.objectId;
                    $scope.comments.push(comment);
                    $scope.new_comment = {
                        score: 0
                    };
                })
                .error(function (err) {
                    console.log(err);
                })
                .finally(function () {
                    $scope.inserting = false;
                });
            $scope.refresh_comments();
        };

		// function to update an existing comment
		$scope.upvote_comment = function(comment, pnts_change) {
			$scope.updating = true;
			var comment2 = {
				score: {
					__op: "Increment",
					amount: pnts_change
				}
			};
			$http.put(base_url + '/' + comment.objectId, comment2)
				.success(function(response_data) {
					comment.score = response_data.score;
				})
				.error(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.updating = false;
				});
		};
			
		$scope.delete_comment = function(comment) {
			$http.delete(base_url + "/" + comment.objectId)
				.success(function() {
					console.log('comment deleted');
				})
				.error(function(err) {
					console.log(err);
				});
		}
		
	});
