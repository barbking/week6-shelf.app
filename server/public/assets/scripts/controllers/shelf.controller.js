myApp.controller('shelfController', ['$http', '$location', function($http, $location) {
  console.log('shelfController loaded');
    var vm = this;

  vm.addShelfItem = function(userName){
       var objectToSend = {
         description: vm.descriptionIn,
         imgUrl: vm.imgUrlIn,
         userName: userName
       };
       console.log("in objectToSend-->", objectToSend);
       $http ({
         method: 'POST',
         url: '/shelf',
         data: objectToSend
       }).then (function(response){
         console.log('back from server:', response);
         vm.getItems();
       });
  };//end addShelfItem func

  vm.getItems = function(){
    $http({
      method: 'GET',
      url: '/shelf'
    }).then(function(response){
      console.log('back from server get request with:', response);
      console.log('response.data-->', response.data);
      vm.allItems = response.data;
    });
  };

  vm.getItems();

vm.deleteItem = function (id, name){
  $http({
    method: 'DELETE',
    url: '/shelf/'+ id + '/' + name,
  }).then(function(response){
    console.log("Item deleted:", response);
    vm.getItems();
  });
};


}]);//end shelfController
