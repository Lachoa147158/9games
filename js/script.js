

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
	$http.get('assets/data.json')
       .then(function(res){
           for(var i=0;i<8;i++){
             aux[i] = res.data.games[i];  
           		  }
		   for(var j=i;j<17;j++){
				 aux2[k] = res.data.games[j];  
				 k++;		  
			}
        }); 
	$scope.games = aux;
	$scope.games2 = aux2;
	}


