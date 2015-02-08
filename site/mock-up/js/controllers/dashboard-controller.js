/**
 * Created by Sumeet Singh on 2/3/2015.
 */

MainApp.controller('dashboard-controller',['dashboardDataService','$modal',
    function(dashboardDataService,$modal) {

        var me = this

        function prepareItems(items) {
            _.each(items,function(item) {
                switch(item.itemType) {
                    case 'firewall':
                        if(item.status === 'A') {
                            item.dispStatus = "Accepted";
                            item.contextBg = "panel-success";
                        } else if(item.status === 'R') {
                            item.dispStatus = "Rejected";
                            item.contextBg = "panel-danger";
                        } else if(item.status === 'P') {
                            item.dispStatus = "Pending";
                            item.contextBg = "bg-default"
                        }
                        else
                         {
                            item.dispStatus = "Running";
                            item.contextBg = "panel-info";
                        }

                        break;

                    case 'build':
                        if(item.status === 'S') {
                            item.dispStatus = "Complete";
                            item.contextBg = "panel-success";
                        } else if(item.status === 'F') {
                            item.dispStatus = "Fail";
                            item.contextBg = "panel-danger";
                        } else {
                            item.dispStatus = "Pending";
                            item.contextBg = "panel-info";
                        }
                }

                item.metricBg = dashboardDataService.getBgContext(item.metricsStatus);
                item.unitTestBg = dashboardDataService.getBgContext(item.unitTestStatus);
                item.functionalTestBg = dashboardDataService.getBgContext(item.functionalTestStatus);
                item.buildBg = dashboardDataService.getBgContext(item.buildStatus);

                item.icon = item.itemType === 'firewall' ? " glyphicon-fire" : "glyphicon glyphicon-hdd"
            })
        }

        function prepareItemDetails(item) {
            item.detail.metric.contextBg = dashboardDataService.getPanelContext(item.detail.metric.status);
            item.detail.metric.testContext = dashboardDataService.getTextContext(item.detail.metric.testStatus);
            item.detail.metric.maintainabilityContext = dashboardDataService.getTextContext(item.detail.metric.maintainabilityStatus);


            item.detail.build.contextBg = dashboardDataService.getPanelContext(item.detail.build.status);
            item.detail.build.contextBg = dashboardDataService.getPanelContext(item.detail.build.status);

            item.detail.unitTest.contextBg = dashboardDataService.getPanelContext(item.detail.unitTest.status);
            item.detail.unitTest.percentContext = dashboardDataService.getTextContext(item.detail.unitTest.percentStatus);
            item.detail.unitTest.codeCoverageContext = dashboardDataService.getTextContext(item.detail.unitTest.codeCoverageStatus);

            item.detail.functionalTest.contextBg = dashboardDataService.getPanelContext(item.detail.functionalTest.status);
            item.detail.functionalTest.percentContext = dashboardDataService.getTextContext(item.detail.functionalTest.percentStatus);
            item.detail.functionalTest.codeCoverageContext = dashboardDataService.getTextContext(item.detail.functionalTest.codeCoverageStatus);

            item.detail.result.contextBg = dashboardDataService.getTextContext(item.detail.result.status);
        }



        dashboardDataService.fetchDashboardData().then(function(res) {
            prepareItems(res.data.infoItems);
            me.items = res.data.infoItems;

        });

        me.fetchDetails = function(item,index) {
            if(item.isOpen) {
                dashboardDataService.fetchItemDetails(item.link).then(function(res) {
                    item.detail = res.data.item;
                    prepareItemDetails(item);

                    var unitCont = 'unit'+'-'+item.itemId+'-'+index;
                    var functionalCont = 'functional'+'-'+item.itemId+'-'+index;

                    createHighChart(unitCont,item.detail.unitTest);
                    createHighChart(functionalCont,item.detail.functionalTest);
                });
            }
        }

        function createHighChart(container,obj) {
            var chartOptions = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: true
                },
                title: {
                    text:''
                },
                credits: {
                    enabled:false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            },
                            distance:-20,
                            formatter: function () {
                                // display only if larger than 1
                                return this.y;
                            }
                        },
                        shadow:true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Build',
                    data: [
                        {
                            name:'Success',
                            y:obj.successUnits,
                            color: 'green'
                        },
                        {
                            name:'Fail',
                            y:obj.failUnit,
                            color: 'orange'
                        }
                    ]
                }]
            }

            $('#'+container).highcharts(chartOptions);

        }


        me.openInfoModal = function() {
            $modal.open({
                templateUrl:'info-modal.html',
                backdrop: true

            })
        }

    }]);
