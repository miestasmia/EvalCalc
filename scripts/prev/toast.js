/**
 * Copyright 2015 Mia Nordentoft, Creeper32605
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var reqFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(f){setTimeout(f,16.6);}
var toastMargin = 10;
var toast = function(text) {
	var tid = Math.floor(Math.random()*Date.now()).toString(16);
	$("body").prepend("<div class='toast' id='" + tid + "'></div>");
	var toast = $("body .toast#" + tid);
	toast.removeAttr('id');
	toast.text(text);
	toast.css({
		position: 'fixed',
		top: 10,
		right: 10,
		'max-width': '400px',
		background: '#fff',
		color: 'rgba(0,0,0,0.7)',
		padding: '10px 20px',
		opacity: 0,
		'border-radius': '2px',
		'-webkit-box-shadow': '0 3px 12px 0 rgba(0,0,0,0.23), 0 -1px 3px 0 rgba(0,0,0,0.15)',
		'box-shadow': '0 3px 12px 0 rgba(0,0,0,0.23), 0 -1px 3px 0 rgba(0,0,0,0.15)',
		'-webkit-transform': 'scale(.7)',
		'-ms-transform': 'scale(.7)',
		'-o-transform': 'scale(.7)',
		'transform': 'scale(.7)',
		'-webkit-transition': '-webkit-transform .3s cubic-bezier(.2,.3,0,1), opacity .3s',
		'-o-transition': '-o-transform .3s cubic-bezier(.2,.3,0,1), opacity .3s',
		'transition': 'transform .3s cubic-bezier(.2,.3,0,1), opacity .3s',
		'z-index': 999
	});
	var tHeight = toast.outerHeight();
	$(".toast").each(function(){
		if( this == toast[0] ) {
			return;
		}
		var top = parseInt($(this).css('top'));
		$(this).css('top', top + tHeight + toastMargin );
	});
	reqFrame(function(){
		toast.css({
			opacity: 1,
			'-webkit-transform': 'scale(1)',
			'-ms-transform': 'scale(1)',
			'-o-transform': 'scale(1)',
			'transform': 'scale(1)'
		}).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			toast.off('transitionend webkitTransitionEnd oTransitionEnd');
			toast.css({
				'-webkit-transition': '-webkit-transform 10s cubic-bezier(.2,.3,0,1), opacity 10s',
				'-o-transition': '-o-transform 10s cubic-bezier(.2,.3,0,1), opacity 10s',
				'transition': 'transform 10s cubic-bezier(.2,.3,0,1), opacity 10s'
			});
			reqFrame(function(){
				toast.css({
					opacity: 0
				}).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
					toast.remove();
				});
			});
		});
	});
}