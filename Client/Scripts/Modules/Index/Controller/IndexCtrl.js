(function () {
    'use strict';
    angular
        .module('BouncingBall')
        .controller('IndexCtrl', IndexCtrl);
    function IndexCtrl($timeout, $scope) {
        var vm = this;
        vm.ballSize = 140;
        vm.containerHeight = 0;
        vm.leftBallBouncing = false;
        vm.rightBallBouncing = false;
        var leftBallCurrHeight = 0;
        var rightBallCurrHeight = 0;
        $timeout(initBall, false);
        function initBall() {
            $scope.$apply(function () {
                vm.containerHeight = Math.floor( $('.ballContainer').innerHeight() - vm.ballSize - 2 );
            });
            
            vm.leftBallSelectedHeight = vm.containerHeight;
            vm.rightBallSelectedHeight = vm.containerHeight;
            vm.leftBallBounciness = 100;
            vm.rightBallBounciness = 100;
            vm.leftBallGravity = 9.8;
            vm.rightBallGravity = 9.8;

            updateBallHeights();   
        }
        // Updates the balls properties when the user resizes the window
         $(window).resize(function(){
             var currContainerHeight = Math.floor( $('.ballContainer').innerHeight() - vm.ballSize - 2 );

            $timeout(function () {
                vm.leftBallSelectedHeight = 0;
                vm.rightBallSelectedHeight = 0;
                leftBallCurrHeight = 0;
                rightBallCurrHeight = 0;
                vm.containerHeight = currContainerHeight;
                vm.leftBallBouncing = false;
                vm.rightBallBouncing = false;
            }, 0);
            updateBallHeights();
            
        });
            
        function updateBallHeights() {
            $('.leftBall').css({'width':vm.ballSize, 'height':vm.ballSize, 'margin-left':-(vm.ballSize/2),'display':'block', 'bottom':vm.leftBallSelectedHeight  + 11});
            $('.rightBall').css({'width':vm.ballSize, 'height':vm.ballSize, 'margin-left':-(vm.ballSize/2),'display':'block', 'bottom':vm.rightBallSelectedHeight  + 11});
        }
        
        vm.dropBothBalls = function () {
            vm.dropLeftBall();
            vm.dropRightBall();
        };
        
        vm.dropLeftBall = function (bounceTime) {
            if (!vm.leftBallBouncing && vm.leftBallSelectedHeight !== 0) {
                leftBallCurrHeight = vm.leftBallSelectedHeight;
                vm.leftBallBouncing = true;
                bounceTime = (leftBallCurrHeight / vm.containerHeight) * 9.8 / vm.leftBallGravity * 1000;
            }

            if (leftBallCurrHeight > 0 && vm.leftBallBouncing) {
                $('.leftBall').animate({'bottom':11}, bounceTime, 'easeInQuad', function() {
                    leftBallCurrHeight = Math.floor(leftBallCurrHeight * (vm.leftBallBounciness / 100));
                    // the container height is always considered to be 9.8 metres in the calculations. 
                    bounceTime = (leftBallCurrHeight / vm.containerHeight) * 9.8 / vm.leftBallGravity * 1000;
                    $('.leftBall').animate({'bottom':leftBallCurrHeight + 11}, bounceTime, 'easeOutQuad', function() {
                        vm.dropLeftBall(bounceTime);
                    });
                });
            } else  {
                $timeout(function () {
                    vm.leftBallBouncing = false;
                    vm.leftBallSelectedHeight = 0;
                }, 0);
            }
        };
        
        vm.dropRightBall = function (bounceTime) {
            if (!vm.rightBallBouncing  && vm.rightBallSelectedHeight !== 0) {
                rightBallCurrHeight = vm.rightBallSelectedHeight;
                vm.rightBallBouncing = true;
                bounceTime = (rightBallCurrHeight / vm.containerHeight) * 9.8 / vm.rightBallGravity * 1000;
            }
            if (rightBallCurrHeight > 0 && vm.rightBallBouncing) {
                $('.rightBall').animate({'bottom':11}, bounceTime, 'easeInQuad', function() {
                    rightBallCurrHeight = Math.floor(rightBallCurrHeight * (vm.rightBallBounciness / 100));
                    // the container height is always considered to be 9.8 metres in the calculations. 
                    bounceTime = (rightBallCurrHeight / vm.containerHeight) * 9.8 / vm.rightBallGravity * 1000;
                    $('.rightBall').animate({'bottom':rightBallCurrHeight + 11}, bounceTime, 'easeOutQuad', function() {
                        vm.dropRightBall(bounceTime);
                    });
                });
            } else {
                $timeout(function () {
                    vm.rightBallBouncing = false;
                    vm.rightBallSelectedHeight = 0;
                }, 0);
            }
        };
    }
    
    IndexCtrl.$inject = ['$timeout', '$scope'];
})();