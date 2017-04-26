'use strict';

angular.module('groupdApp')
  .controller('CreateProjectCtrl',['ProjectFactory','UserFactory', 'AuthFactory', '$scope', '$location',
  function (ProjectFactory, UserFactory, AuthFactory, $scope, $location) {

    $scope.project = {
        projectName: null,
        projectThumb: null,
        projectCreator: JSON.parse(AuthFactory.auth.getAuth()).username,
        projectMembers: [JSON.parse(AuthFactory.auth.getAuth()).username],
        projectDelete: false,
        maxMembers: null,
        projectDesc: null,
        tags: [],
        comments: [],
        time: new Date()
    }
    $scope.message = "Enter required (*) fields.";
    $scope.createProject = function(){
        ProjectFactory.project.postProject($scope.project).then(function(d){
          if(d.message="Project Added"){
            updateUser($scope.project.projectCreator, d.id);
            window.location = "/#/project/"+d.id;
          }
      });
    }
    
    $scope.tag;

    function updateUser(username, projectId){
      UserFactory.user.getUser(username).then(function(d){
        if(!d){
        }else{
          d.projects.push(projectId);
          UserFactory.user.putUser(d).then(function(d){
          });
      }
      })
    }
    

    $scope.addTag = function(tag){
      var found = false;
      if(tag == null){
        $scope.message = "Enter a tag";
        return;
      }
      else{
        for(var i = 0; i < $scope.project.tags.length; i++){
          
          if(tag == $scope.project.tags[i]){
            $scope.message = "Tag already exists";
            found = true;
          }
        }
      }
      if(found == false){
        $scope.project.tags.push(tag);
        $scope.tag = null;
        $scope.message = "Enter required (*) fields.";
      }
    }

    $scope.removeTag = function(tag){
        for(var i = 0; i < $scope.project.tags.length; i++){
          if(tag == $scope.project.tags[i]){
            $scope.project.tags.splice(i, 1)
          }
        }
      }
  }]);
