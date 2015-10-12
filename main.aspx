﻿<!doctype html>
<html ng-app="ConMonApp" xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
  <head>
<!--[if gte mso 9]><xml>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<mso:CustomDocumentProperties>
<mso:ContentTypeId msdt:dt="string">0x010100AD4D8DF2E176674A875678EA2D713F57</mso:ContentTypeId><mso:ContentType msdt:dt="string">Document</mso:ContentType><mso:Approval_x0020_Level msdt:dt="string"></mso:Approval_x0020_Level><mso:Categories msdt:dt="string"></mso:Categories><mso:Assigned_x0020_To msdt:dt="string"></mso:Assigned_x0020_To></mso:CustomDocumentProperties></xml><![endif]-->
    <link href="/appdev/NFRMgmt.dev/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/appdev/NFRMgmt.dev/css/angular-chart.css">
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/angular.min.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/lodash.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/ui-bootstrap-tpls-0.12.1.min.js"></script>
    <link rel="stylesheet" href="/appdev/NFRMgmt.dev/css/styles.css"
  </head>
  <body>
    <div ng-controller="ConMonAppCtrl">
    <h1 class="text-center"><b>iCRM</b></h1>
    <p class="text-center"><u>intelligent Compliance & Risk Management</u></p>
    <form class="text-center" name="ConMonLookupForm" validate>
	<div class="container panel panel-default">
        <!--Default buttons with dropdown menu-->
        <div class="btn-group panel-body">
            <button type="button" name="searchFocusString" data-toggle="dropdown" class="btn btn-default dropdown-toggle">{{searchFocusString}}<span class="caret"></span></button>
            <ul class="dropdown-menu">
	     <li ng-repeat="focusArea in focusAreas"><a href="#" ng-click="updateSearchFocusString(focusArea)" >{{focusArea}}</a></li>
            </ul>
        </div>
        <div class="btn-group panel-body">
            <button type="button" name="searchSystemString" data-toggle="dropdown" class="btn btn-default dropdown-toggle">{{searchSystemString}}<span class="caret"></span></button>
            <ul class="dropdown-menu">
	     <li ng-repeat="system in systems"><a href="#" ng-click="updateSearchSystemString(system)" >{{system}}</a></li>
            </ul>
        </div>
        <!-- <input type="text" ng-model="searchControlString" ng-minlength="2" ng-maxlength="15" placeholder="Enter Control Name..." ng-required="!searchSystemString.length" /><br> -->
        <div class="btn-group panel-body">
            <button type="button" ng-model="searchControlString" name="searchControlString" data-toggle="dropdown" class="btn btn-default dropdown-toggle">{{searchControlString}}<span class="caret"></span></button>
            <ul class="dropdown-menu">
	     <li ng-repeat="control in controls"><a href="#" ng-click="updateSearchControlString(control)">{{control}}</a></li>
            </ul>
        </div>
        <button type="submit" class="btn btn-primary panel-body" ng-click="getLookupResults()" ><b>NFR Lookup</b></button>
        <button type="submit" class="btn btn-primary panel-body" ng-click="resetLookupResults()" ><b>NFR Reset</b></button>
	</div>
        <button type="button" class="btn btn-primary" ng-click="openNewNFRForm()" >Add New NFR</button>
        <button type="button" class="btn btn-primary" ng-click="uploadBulkNFRs()" >Upload Bulk NFRs</button>
        <button type="button" class="btn btn-primary" ng-click="showAnalytics()" >Real-time Analytics</button>
	<a class="btn btn-primary" target="_blank" href="https://analytics.dodiis.ic.gov/analytics/saw.dll?Dashboard&_scid=5fcvfPtNiwE&PortalPath=%2Fshared%2FSAACT%2F_portal%2FExecutive&Page=Executive%20Dashboard&PageIdentifier=eua282857j3vsj9p&BookmarkState=j1pgnih8nhfhk6ipj5ao40tskm">Reports Dashboard</a>
	<br><br>
    </form>
    <div id="NFRMgmtAlerts">
  	<alert ng-repeat="alert in alerts" type="{{alert.type}}" dismiss-on-timeout="5000" close="closeAlert($index)">{{alert.msg}}</alert>
    </div>
    <div id="ConMonItemsContainer" class="container-fluid bg-primary">
	<h3 class="text-center">Notice of Findings & Recommendations</h3>
	<table class="table table-bordered">
	<th>NFR Number</th>
	<th>NFR Title</th>
	<th>NFR Condition</th>
	<th>NFR Criteria</th>
	<th>NFR Effect</th>
	<th>NFR Recommendation</th>
	<th>System</th>
	<th>Control Category</th>
	<th>NFR Owner</th>
	<th>NFR Status</th>
	<th>Actions</th>
	<tr ng-repeat="result in lookupResultsPageData">
		<td>{{result.NFRNumber}}</td>
		<td>{{result.NFRTitle}}</td>
		<td>{{result.NFRCondition}}</td>
		<td>{{result.NFRCriteria}}</td>
		<td>{{result.NFREffect}}</td>
		<td>{{result.NFRRecommendation}}</td>
		<td>{{result.System}}</td>
		<td>{{result.Control}}</td>
		<td>{{result.NFROwner}}</td>
		<td>{{result.NFRStatusValue}}</td>
		<td>        
			<div class="btn-group">
			<button type="button" class="btn btn-default" ng-click="viewNFR(result)" >View Details</button>
			<button type="button" class="btn btn-warning" ng-click="updateNFR(result)" >Update</button>
        		<button type="button" class="btn btn-danger" ng-click="deleteNFR(result)" >Delete</button>
		        <button type="button" class="btn btn-default" ng-click="$parent.isCollapsed = !$parent.isCollapsed">Toggle CAP Info</button>
			</div>
		</td>
	</tr>
	</table>
	<pagination total-items="totalItems" items-per-page="numPerPage" ng-model="currentPage" ng-change="pageChanged()"></pagination>
    </div>
        <hr>
        <div collapse="isCollapsed" class="row">
		<div class="well well-lg">
			<h3 class="text-center">Corrective Action Plan</h3>
	<div class="container well well-lg">
	   <div class="row">
	      <div class="col-xs-6">
              <div class="form-group">
                <label>CAP Title:</label>
                <input class="form-control ng-pristine ng-untouched ng-valid" type="text" readonly="readonly" placeholder="CAP Title..." ng-readonly="true">
              </div>
              <div class="form-group">
                <label for="nameSecondaryPOC">CAP Info</label>
                <input class="form-control ng-pristine ng-untouched ng-valid" id="nameSecondaryPOC" type="text" readonly="readonly" placeholder="CAP Info..." ng-readonly="true">
              </div>
              <div class="form-group">
                <label for="lowEmailSecondaryPOC">CAP POC</label>
                <input class="form-control ng-pristine ng-untouched ng-valid ng-valid-email" id="lowEmailSecondaryPOC" type="email" readonly="readonly" placeholder="CAP POC..." ng-readonly="true">
              </div>
              <div class="form-group">
                <label for="highEmailSecondaryPOC">CAP Start Date</label>
			<datepicker ng-model="CAPStartDate" class="well well-sm" show-weeks="false" ></datepicker>
			<p class="input-group">
				<pre>Selected date is: <em>{{CAPStartDate | date:'fullDate' }}</em></pre>
            		</p>

              </div>
              <div class="form-group">
                <label for="lowPhoneSecondaryPOC">CAP End Date</label>
			<datepicker ng-model="CAPEndDate" class="well well-sm" show-weeks="false" ></datepicker>
			<p class="input-group">
				<pre>Selected date is: <em>{{CAPEndDate | date:'fullDate' }}</em></pre>
            		</p>

              </div>
            </div>
	  </div>
	</div>
		</div> 
        </div>
    <br><br>
    <!-- add the html for the charts-->
    <div id="chartcontainer" class="text-center">
    <div id="chartColumnLeft" class="col-md-6">
    <canvas id="chartline" options="chartoptions" class="chart chart-line" data="chartdata"
      labels="chartlabels" legend="true" series="chartseries"
      click="chartOnClick">
    </canvas><br><br><br>
    </div>
    <div id="chartColumnRight" class="col-md-6">
	<button class="btn btn-primary" ng-click="chart2toggle()" type="button">Toggle Control Chart</button><br><br>
    <canvas id="base" class="chart-base" chart-type="chart2type" data="chart2data"
      labels="chart2labels" legend="true"></canvas>
    </div>
    </div>
    </div>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/chart.min.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/angular-chart.min.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/smart-table.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/conmon-lookup.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/xlsx_core_min.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/ExcelReader.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/svcExcelReader.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/controllers/newNFRForm.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/controllers/viewNFRForm.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/controllers/updateNFRForm.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/controllers/deleteNFRForm.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/controllers/loadBulkNFRsForm.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/controllers/showAnalytics.js"></script>
    <script type="text/javascript" src="/appdev/NFRMgmt.dev/scripts/directives/dirBulkUpload.js"></script>
  </body>
</html>
