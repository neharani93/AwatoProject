app.controller('claimsByAirportCtrl', function ($scope) {
    //Hardcoding these, there are ton of them. Not parsing data to obtain these, coz these might be coming form differnt table in the db and 
	//we do not have to parse such a big dataset always to obtain these.
	$scope.airports = {EWR: true, JFK: true, SFO: true, HOU: true};	
	$scope.years = {2010: true, 2011:true, 2012:true, 2013 : true};
	
	$scope.onFiltersChange = function()
	{
		renderChart();
	}   
	
	$scope.options = {      
        legend: {
            display: true           
        }
    };
	
	$scope.$on('update-claimsByAirport', function(event, args) {
		if(!$scope.airports.hasOwnProperty(args.airportCode)){
			$scope.airports[args.airportCode]= true;
		}
		if(!$scope.years.hasOwnProperty(args.year)){
			$scope.years[args.year] = true;
		}		
		renderChart();
	});

   renderChart();

    function renderChart()
    {
		$scope.labels = [];
		$scope.data = [];
		$scope.series = [];
		
		//Parse the airport selections to get the series
		var airportKeyNames = Object.keys($scope.airports);
		for(var i=0; i<airportKeyNames.length; i++){
			if($scope.airports[airportKeyNames[i]]){
				$scope.series.push(airportKeyNames[i]);
			}
		}		
			
		//Parse the data to get the data points	for x-axis		
        for (var i = 0; i < claimsData.length; i++)
        {
            //Get Months-labels for X-axis
            var claimDate = claimsData[i].dateReceived;
            var month = claimDate.slice(claimDate.indexOf('-') + 1, claimDate.length);
			
			var jsDate = new Date(claimDate);			
			var claimYear = jsDate.getFullYear();
			
            if ($scope.labels.indexOf(month) == -1 && $scope.years[claimYear]) {
                $scope.labels.push(month);
            }
        }
        
		//Calculate of claims per airport across all the data-points
        var avgClaimsByAirport = [];
        for (var i = 0; i < $scope.series.length; i++) {		
            var currAirportVolume = Array.apply(null, Array($scope.labels.length)).map(Number.prototype.valueOf, 0);

            for (var j = 0; j < $scope.labels.length; j++) {
                for (var k = 0; k < claimsData.length; k++) {
                    var claimDate = claimsData[k].dateReceived;
                    var month = claimDate.slice(claimDate.indexOf('-') + 1, claimDate.length);					
				
					if (claimsData[k].airportCode == $scope.series[i]) {
						if (month == $scope.labels[j]) {
							currAirportVolume[j] = currAirportVolume[j] + 1;							
						}
					}										
                }
            }
            avgClaimsByAirport.push(currAirportVolume);
        }

        $scope.data = avgClaimsByAirport;
    }

});