angular.module('magicEightBall.controllers', [])
.controller("CrystalBall",function($scope, $rootScope, $ionicPlatform, $ionicPopup){
	$scope.possibleAnswers = 
	[
		"It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes definitely",
		"You may rely on it",
		"As I see it, yes",
		"Most likely",
		"Outlook good",
		"Yes",
		"Signs point to yes",
		"Reply hazy try again",
		"Ask again later",
		"Better not tell you now",
		"Cannot predict now",
		"Concentrate and ask again",
		"Don't count on it",
		"My reply is no",
		"My sources say no",
		"Outlook not so good",
		"Very doubtful"
		
	];

	$scope.showAnswerVar = false;


	$scope.showAnswer = function(){
		if (!$scope.showAnswerVar){
			$scope.showAnswerVar=true;
			$scope.answer = $scope.possibleAnswers[Math.floor(Math.random()*100) % $scope.possibleAnswers.length ];
			setTimeout($scope.hideAnswer, 5000);
		}
	}

	$scope.hideAnswer = function(){
		$scope.showAnswerVar=false;
		$scope.$apply();
	}

	

	$scope.$on("deviceShaken", function(event,obj){
		console.log("deviceShaken event received");
		$scope.showAnswer();
	});

  	ionic.Platform.ready(function(){
  		console.log("deviceready");
		shake.startWatch(
			function(){
		        console.log("device is being shaken");
		        $scope.showAnswer();
		        $scope.$apply();
		    }, 40 /*, onError */
	    );
		}
	);


  $ionicPlatform.registerBackButtonAction(function (e) {
      var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm Exit',
              template: "Are you sure you want to exit?"
          });
      confirmPopup.then(function (close) {
          if (close) {
          	  // Stop watching for shake gestures
			  shake.stopWatch();
              // there is no back view, so close the app instead
              ionic.Platform.exitApp();
          } // otherwise do nothing
          console.log("User canceled exit.");
      });
      e.preventDefault();
      return false;
  }, 101); // 1 more priority than back button  
	
});
