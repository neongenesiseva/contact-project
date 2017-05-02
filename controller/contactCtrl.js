app.controller('contactCtrl',['$scope','$firebaseArray',function($scope,$firebaseArray){
    var ref = new Firebase('https://contacts-3550c.firebaseio.com/contacts');
    
    $scope.contacts = $firebaseArray(ref);    
    
    $scope.addFormShow=false;
    $scope.editFormShow=false;
    
     var clearField=function(){
        $scope.name="";
        $scope.company="";
        $scope.email="";
        $scope.hAddress="";
        $scope.hPhone="";
        $scope.mPhone="";
    }
     
    $scope.addForm=function(){
        $scope.addFormShow=true;
        $scope.editFormShow=false;
        clearField();
    }
    
    $scope.collapseForm=function(){
        $scope.addFormShow=false;
    }
    
    $scope.collapse=function(){
        $scope.editFormShow=false;
    }
    
    $scope.cancel=function(){
        $scope.addFormShow=false;
        clearField();
    }
    
    
    $scope.addData=function(){
        $scope.contacts.$add({
                name:$scope.name,
                company:$scope.company,
                email:$scope.email,
                homeAddress:$scope.hAddress,
                homePhone:$scope.hPhone,
                mobilePhone:$scope.mPhone
            }).then(function(ref){
                var id = ref.key();
                console.log('add item with id' + id);
                $scope.$indexFor(id);
            });
        clearField();
    };
    
    $scope.deleteData=function(index){
        $scope.contacts.$remove($scope.contacts[index]).then(function(ref){
            ref.key()===$scope.contacts[index].$id;
        });
    };
    
    $scope.showData=function(index){
        $scope.editFormShow=true;
        $scope.addFormShow=false;
        $scope.editData=$scope.contacts[index];
        $scope.idUsing=$scope.editData.$id;
        $scope.name=$scope.contacts[index].name
        $scope.company=$scope.contacts[index].company;
        $scope.email=$scope.contacts[index].email;
        $scope.hAddress=$scope.contacts[index].homeAddress;
        $scope.hPhone=$scope.contacts[index].homePhone;
        $scope.mPhone=$scope.contacts[index].mobilePhone;
    };
    
    $scope.editSubmit = function (){
        
        var tempData = $scope.contacts.$getRecord($scope.idUsing);
        
        tempData.name=$scope.name;
        tempData.company=$scope.company;
        tempData.email=$scope.email;
        tempData.homeAddress=$scope.hAddress;
        tempData.homePhone=$scope.hPhone;
        tempData.mobilePhone=$scope.mPhone;
        
        $scope.contacts.$save(tempData).then(function(ref){
            console.log(ref.key);
        });
        
        clearField();
        
        $scope.editFormShow=false;
    }

    
}])