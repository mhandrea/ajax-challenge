"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/


// app Lpi7BkWiEtAHRjlc3rofafI3C0UGsCDgf1WWeCjX
// rest X1QNW3oDTkZeQDf9jt9ZPEUIZ1XdEO34XDYTcItx

angular.module('review_app', ['ui.bootstrap'])
	.config(function($httpProvider) {
		// set default HTTP headers that Parse requires
		// HTTP request we make
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'Lpi7BkWiEtAHRjlc3rofafI3C0UGsCDgf1WWeCjX';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'X1QNW3oDTkZeQDf9jt9ZPEUIZ1XdEO34XDYTcItx';
	})
	.controller('TasksController', function($scope, $http) {
		var base_url = 'https://api.parse.com/1/classes/comments';

		$scope.get_commments = function() {	
			// get all tasks
			$scope.loading = true;
			$http.get(base_url) // '?where={"done": false}' 
				.success(function(response_data) {
					$scope.tasks = response_data.results
				})
				.error(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.loading = false;
				});
		};
		$scope.get_commments(); // get all new comments

		// initialize a new comment object on the same scope as the form
		$scope.new_comment = {
			score: 0
		};

		// add a new comment to the list
		$scope.add_comment = function(comment) {
			$scope.inserting = true;
			$http.post(comment_url, comment)
				.success(function(response_data) {
					comment.object_id = response_data.object_id; // copy reponse data to the comment we just added.
					$scope.comments.push(comment); // add comment to the list
					$scope.new_comment = {
						score: 0
					}; // reset new_comment to score of 0.
				})
				.error(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.inserting = false;
				});
			$scope.get_commments();
		};

		// function to update an existing comment
		$scope.upvote_comment = function(commment, pnts_change) {
			$scope.updating = true;
				var comment = {
					score: {
						__op: "Increment",
						amount: pnts_change
					}
				};
			};
			$http.put(comment_url + '/' + comment.object_id, comment)
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

	});

/* .sort(function(x, y) {
						if (x.score > y.score) {
							return -1;
						}
						if (x.score == y.score) {
							return 0;
						}
						return 1;
					});&.sort(function(x, y) {
						if (x.score > y.score) {
							return -1;
						}
						if (x.score == y.score) {
							return 0;
						}
						return 1;
					});*/