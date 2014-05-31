/* 9games - Script file */
var app = angular.module("nine-games", ['ngResource']);

/* Search filter */
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

/* Main Controller */
function gamesController($scope, $http) {
    
	/* Home page initialization */
	$scope.active = 'home';
    
	/* Arrays define */
	var aux = [];
	var rating = [];
	var read = [];
	var numLimit = [];
    $scope.nomore = false;
    $scope.havemore = true;
	/* Secvential game load function */
		$scope.getMoreGames = function(lastIndex,secv){
		var pop = 0;
		/* load json file */
		$http.get('assets/data.json')
       .then(function(res){
	       /* for loop, from last loaded index to new value(+ 9) */
           for(var i=lastIndex;i<secv;i++){
		     /* load games in aux array */
	         if(res.data.games[i] == null){
			   $scope.nomore = true;
			   $scope.havemore = false;
			   break;
			   }
             aux[i] = res.data.games[i]; 	
			 /* set rating value 0-5 */
			 pop = res.data.games[i].popularity;
			 if(pop == 0)
				rating[i] = 0;
			  else if(pop < 500)
			    rating[i] = 1;
			  else if(pop < 1000)
			    rating[i] = 2;
			  else if(pop < 50000)
			    rating[i] = 3;
			  else if(pop < 1000000)
			    rating[i] = 4;
			  else if(pop > 1000000)
			    rating[i] = 5;
			/* initialize 'read more' array */	
			numLimit[i] = 60;
			read[i] = 1;				
				  }
        }); 
			$scope.secv = secv;
			$scope.games = aux;
			$scope.rating = rating;
			$scope.read = read;
			$scope.numLimit = numLimit;
	};
	
	
	$scope.readMore = function(i){
		$scope.numLimit[i] =330;
		$scope.read[i] = 0;
	};
	$scope.readLess = function(i){
		$scope.numLimit[i] = 60;
		$scope.read[i] = 1;
	};
	
	
  };
  
 
/* Rating-star directive */ 
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
	


