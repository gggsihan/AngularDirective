app.directive('zInititalSelect',function(){
	return {
		restrict:'ECMA',
		replace:true,
		scope:{
			zModalCurrObj:'=',
			zFilterFieldName:'@'
		},
		controller:'zInititalSelectInititalListController',
		template:'<input ng-model="inititalModel" ng-change="onSelfChange(inititalModel)" type="text" class="form-control input-sm w-sm inline m-r"/>'
	};
});

app.controller('zInititalSelectInititalListController',['$scope','InititalLibrary',function($scope,InititalLibrary){
	$scope.modalBak=new Array;
	
	$scope.inititalModelList=new Array;
	var filterFieldName=$scope.zFilterFieldName;
	
	$scope.onSelfChange=function(inititalModel){
		if($scope.modalBak.length==0 ){
			$scope.modalBak=angular.copy($scope.zModalCurrObj);
			$scope.getModalInitital();
		}
		$scope.modalList=[];
		if(inititalModel){
			angular.forEach($scope.inititalModelList,function(data,index,array){
				if(data.indexOf(inititalModel)!=-1){
					$scope.modalList.push($scope.modalBak[index]);
				}
			})
			$scope.zModalCurrObj=$scope.modalList;
		}else{
			$scope.zModalCurrObj=angular.copy($scope.modalBak);
		}
	};
	
	/**转字符串数组*/
		$scope.makePY=function(str){
			var arrResult=new Array;
			for(var i=0,len=str.length;i<len;i++){
				var ch=str.charAt(i);
				arrResult.push($scope.checkCh(ch));
			}
			return $scope.mkRslt(arrResult);
		}
		
		/**在库中查找首字母*/
		$scope.checkCh=function(ch){
			var uni=ch.charCodeAt(0);
			if(uni>40869 || uni<19968){
				return ch;
			}
			return $scope.strChineseFirstPY.charAt(uni-19968);
		}
		
		/**将首字母数组拼接成字符串*/
		$scope.mkRslt=function(arr){
			var strRslt,str;
			for(var i=0,len=arr.length;i<len;i++){
				str=arr[i];
				strRslt+=str;
			}
			return strRslt;
		}
		
		/**获取所有药品的首字母*/
		$scope.getModalInitital=function(){
			$scope.strChineseFirstPY=InititalLibrary.getInititalLibrary();
			angular.forEach($scope.modalBak,function(data,index,array){
				$scope.inititalModelList.push($scope.makePY(data[filterFieldName]));
			});
		}
	
}]);
