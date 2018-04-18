app.controller('valueLostByAirlineCtrl', function ($scope) {   
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];

    $scope.options = {
        scales: {
            yAxes: [
              {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
              }              
            ]
        },
		legend: {
		  display: true,
		  position: 'right'
		}
		
    };
	
	$scope.$on('update-valueLostByAirline', function(event, args) {
		renderChart();		
	});


    renderChart();

    function renderChart()
    {       
		$scope.labels = [];
		$scope.series = [];
		$scope.data = [];
		
        for (var i = 0; i < claimsData.length; i++)
        {
            //Get Airlines Names - series
            if ($scope.series.indexOf(claimsData[i].airlineName) == -1) {
                $scope.series.push(claimsData[i].airlineName);
            }

            //Get Months-labels for X-axis
            var claimDate = claimsData[i].dateReceived;
            var month = claimDate.slice(claimDate.indexOf('-') + 1, claimDate.length);
            if ($scope.labels.indexOf(month) == -1) {
                $scope.labels.push(month);
            }
        }

        //Calculate Value Lost Per Month by Airline
        var amtLostByAirlineByMonth = [];
        for (var i = 0; i < $scope.series.length; i++)
        {
			//Initializing an Array for Value Lost per Airline to Zero acrooss All Data Points.
            var currAirlineData = Array.apply(null, Array($scope.labels.length)).map(Number.prototype.valueOf, 0);

            for (var j = 0; j < $scope.labels.length; j++)
            {               
                for (var k = 0; k < claimsData.length; k++)
                {
                    var claimDate = claimsData[k].dateReceived;
                    var month = claimDate.slice(claimDate.indexOf('-') + 1, claimDate.length);

                    if ((claimsData[k].airlineName == $scope.series[i]) && (claimsData[k].disposition == "Approve in Full"))
                    {
                        if (month == $scope.labels[j])
                        {
                            currAirlineData[j] = currAirlineData[j] + parseFloat(claimsData[k].closeAmount.replace("$", '').replace(",", ''));
                        }
                    }
                }
            }
            amtLostByAirlineByMonth.push(currAirlineData);
        }
		
		//Calculation of Average value lost per month across all airlines
		$scope.series.push("Average Loss");
        var avgLossByAirlineByMonth = Array.apply(null, Array($scope.labels.length)).map(Number.prototype.valueOf, 0);
        for (var i = 0; i < amtLostByAirlineByMonth.length; i++)
        {
            for (var j = 0; j < $scope.labels.length; j++)
            {
                avgLossByAirlineByMonth[j] += amtLostByAirlineByMonth[i][j];
                if (i == amtLostByAirlineByMonth.length - 1) //Average it out by length when it reaches maximum
                {
                    avgLossByAirlineByMonth[j] = avgLossByAirlineByMonth[j] / amtLostByAirlineByMonth.length;
                }
            }
        }
        amtLostByAirlineByMonth.push(avgLossByAirlineByMonth); //Add the aveage dataset to the baseArray

        $scope.data = amtLostByAirlineByMonth; 
    }
});