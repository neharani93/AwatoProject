app.controller('valueLostByAirlineCtrl', function ($scope) {    
    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];

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
        }
    };

    activate();

    function activate()
    {       
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

        $scope.data = amtLostByAirlineByMonth;
    }
});