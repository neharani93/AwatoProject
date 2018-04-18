app.controller('addClaimCtrl', function ($scope, $rootScope) {
	$scope.submitClaim= function(){
		claimsData.push(
		{
			"claimNumber": "",
            "dateReceived": $scope.dateReceived,
            "incidentDate": "",
            "airportCode": $scope.airportCode,
            "airportName": "",
            "airlineName": $scope.airlineName,
            "claimType": "",
            "claimSite": "",
            "itemCategory": "",
            "closeAmount": $scope.closeAmount,
            "disposition": "Approve in Full"
		});
		
		alert("Claim Successfully Added. Navigate to repspective tabs to see changes");		
		
		var dateReceived = new Date($scope.dateReceived); 
		$rootScope.$broadcast('update-valueLostByAirline', { });
		$rootScope.$broadcast('update-claimsByAirport', { airportCode : $scope.airportCode, year : dateReceived.getFullYear()});	
		
		$scope.dateReceived = "";
		$scope.airportCode = "";
		$scope.airlineName = "";
		$scope.closeAmount ="";		
	};
    
});
