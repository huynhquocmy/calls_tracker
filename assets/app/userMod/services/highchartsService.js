userMod
  .factory('highchartService', ['$state', '$cacheFactory',
    function($state, $cacheFactory) {
      var fn = function() {},
        config = {},
        data = [],
        formatedData = [],
        categories = [],
        element,
        filterType;

      fn.config = function(_config) {
        if (!arguments.length) return config;
        config = _config;
        return fn;
      };

      fn.filterType = function (_filterType) {
        if (!arguments.length) return filterType;
        filterType = _filterType;
        return fn;
      };

      fn.element = function(_element) {
        if (!arguments.length) return element;
        element = _element;
        return fn;
      };

      fn.data = function(_data) {
        if (!arguments.length) return data;
        data = _data;
        return fn;
      };

      fn.formatedData = function(_data) {
        if (!arguments.length) return data;
        formatedData = _data;
        return fn;
      };

      fn.categories = function(_categories) {
        if (!arguments.length) return data;
        categories = _categories;
        return fn;
      };

      fn.renderPieChart = function() {
        // Build the chart
        $(element).highcharts({
          chart: {
            backgroundColor:'rgba(255, 255, 255, 0.1)'
          },
          colors: ['#CDDC39', '#F44336'],
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                formatter: function() {
                  return Math.round(this.percentage * 100) / 100 + ' %';
                },
                distance: -40,
                color: 'white'
              },
              showInLegend: true
            }
          },
          title: {
            text: ''
          },
          credits: {
            enabled: false
          },
          legend: {
            align: 'bottom',
            verticalAlign: 'top',
            layout: 'vertical'
          },
          series: [{
            type: 'pie',
            name: 'Response status',
            data: formatedData
          }]
        });
      };

      fn.renderBarChart = function () {
        $(element).highcharts({
          chart: {
              type: 'column',
              backgroundColor:'rgba(255, 255, 255, 0.1)'
          },
          credits: {
            enabled: false
          },
          title: {
              text: 'All logs in this ' + filterType
          },
          xAxis: {
              categories: categories,
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Logs'
              }
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
          },
          series: [{
              name: 'Logs',
              data: formatedData

          }]
        });
      };

      fn.formatData = function () {
        var _grouped, startDate, endDate;

        switch (filterType) {
          case 'week': {
            startDate = moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss');
            endDate = moment().endOf('isoweek').format('YYYY-MM-DD HH:mm:ss');
            
            _grouped = _.groupBy(data, function (item) {
              return moment(item.createdAt).format('dddd');
            });
            break;
          }

          case 'month': {
            startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
            endDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');

            _grouped = _.groupBy(data, function (item) {
              return moment(item.createdAt).format('DD');
            });
            break;
          }

          case 'year': {
            startDate = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss');
            endDate = moment().endOf('year').format('YYYY-MM-DD HH:mm:ss');

            _grouped = _.groupBy(data, function (item) {
              return moment(item.createdAt).format('MMMM');
            });
            break;
          }
        }

        var categories = _.keys(_grouped);
        var _data = [];
        _.forEach(_grouped, function (item) {
          _data.push(item.length);
        });

        fn.categories(categories).formatedData(_data);

        return fn;
      };

      return fn;
    }
  ]);