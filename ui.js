var addedVariable = function(){};
var onVariableRemove = function(){};
var callRemoveVariable = function(){};

var degRadVal = "nul";
(function(){
	var variableRemoveListeners = [];
	onVariableRemove = function(f) {
		if( typeof f != 'function' ) {
			throw new Error("Argument 0 must be a function");
		}
		variableRemoveListeners.push(f);
	}
	callRemoveVariable = function(k) {
		console.log("removing variable " + k );
		console.log("Listeners: ", variableRemoveListeners);
		for( var i in variableRemoveListeners ) {
			try {
				variableRemoveListeners[i](k);
			} catch(baby) {
				throw baby;
			}
		}
	}
})();
$(document).ready(function(){
	var reqFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(f){setTimeout(f,17)};
	
	onStorageReady(function(){
		$("#controls").removeClass("pending");
		
		if( storage.data.degrad ) {
			if( storage.data.degrad == "deg" ) {
				$(".toggle-button").addClass('switch').attr('value','deg');
				degRadVal = "deg";
			} else {
				degRadVal = "rad";
			}
		} else {
			degRadVal = "rad";
		}
	});
	initStorage();
	
	
	$(".toggle-button").click(function(){
		$(this).toggleClass("switch");
		var value = $(this).find('.toggle-item:first-child').attr('value');
		if( $(this).hasClass('switch')) {
			value = $(this).find('.toggle-item:last-child').attr('value');
		}
		setAngles(value);
		inputHandle();
		storage.data.degrad = value;
		$(this).attr('value', value );
	});
	
	var eventVariableRemoveClick = function(e) {
		var variable = $(this).parent();
		variable.css({
			'-webkit-transform-origin': '50% 0',
			'-moz-transform-origin': '50% 0',
			'-ms-transform-origin': '50% 0',
			'-o-transform-origin': '50% 0',
			'transform-origin': '50% 0',
			'-webkit-transition': '-webkit-transform .3s cubic-bezier(.2,.3,0,1)',
			'-o-transition': '-o-transform .3s cubic-bezier(.2,.3,0,1)',
			'transition': 'transform .3s cubic-bezier(.2,.3,0,1)'
		});
		reqFrame(function(){
			variable.css({
				'-webkit-transform': 'scaleY(0)',
				'-ms-transform': 'scaleY(0)',
				'-o-transform': 'scaleY(0)',
				'transform': 'scaleY(0)'
			}).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
				var key = variable.data('key');
				variable.remove();
				callRemoveVariable(key);
			});
		});
	}
	
	addedVariable = function(obj) {
		if( typeof obj != 'object' ) {
			throw new Error("Argument 0 must be an object");
		}
		var variable = $(obj);
		variable.find(".variable-remove").on('click', eventVariableRemoveClick);
		
		var touching = false;
		var touchStartX = 0;
		var touchX = 0;
		variable.on('touchstart', function(e){
			touchStartX = e.pageX - variable.offset().left;
			touchX = 0;
			touching = true;
		});
		$(document).on('touchmove', function(e){
			if( touching ) {
				if( variable.scrollLeft() <= 0 ) {
					touchX = e.pageX - variable.offset().left - touchStartX;
				}
			}
		}).on('touchend', function(e){
			if( touching ) {
				touching = false;
				
			}
		})
	}
});