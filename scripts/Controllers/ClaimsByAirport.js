app.controller('claimsByAirportCtrl', function ($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 54],
      [28, 48, 40, 19, 86, 27, 90]
    ];
});
