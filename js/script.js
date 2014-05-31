

var app = angular.module("nine-games", ['ngResource']);


app.filter('searchFor', function(){

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(game){

			if(game.name.toLowerCase().indexOf(searchString) !== -1 || game.description.toLowerCase().indexOf(searchString) !== -1){
				result.push(game);
			}

		});


		return result;
	};

});

function gamesController($scope, $http) {

	$scope.active = 'home';
    var aux = [];
	var aux2 = [];
	var k =0;
    var rating = [];
	var pop = 0;
	$http.get('assets/data.json')
       .then(function(res){
           for(var i=0;i<8;i++){
             aux[i] = res.data.games[i];  
			 pop = res.data.games[i].popularity;
			 if(pop == 0)
				rating[i] = 0;
			  else if(pop < 50000)
			    rating[i] = 1;
			  else if(pop < 100000)
			    rating[i] = 2;
			  else if(pop < 150000)
			    rating[i] = 3;
			  else if(pop < 200000)
			    rating[i] = 4;
			  else if(pop > 200000)
			    rating[i] = 5;
           		  }
		   for(var j=i;j<17;j++){
				 aux2[k] = res.data.games[j];  
				 k++;		  
			}
        }); 
	$scope.games = aux;
	$scope.games2 = aux2;
	
	var read = [];
	var numLimit = [];
	for(var i=0;i<8;i++){
		numLimit[i] = 60;
	    read[i] = 1;
	}
	$scope.read = read;
	$scope.readMore = function(i){
		$scope.numLimit[i] =330;
		$scope.read[i] = 0;
	};
	$scope.readLess = function(i){
		$scope.numLimit[i] = 60;
		$scope.read[i] = 1;
	};
	$scope.numLimit = numLimit;
	
	$scope.rating = rating;

  };
  
  
  
  app.directive('starRating',
	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	});
	


