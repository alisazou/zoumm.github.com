

(function(){
		function iScroll (el,options) {
	        var that = this, doc = document, i;
			that.wrapper =  doc.getElementById(el);
			that.wrapper.style.overflow = 'hidden';
			that.scroller = that.wrapper.children[0];
			that.scroller.style.cssText += '-webkit-transition-property:-webkit-transform;-webkit-transform-origin:0 0;-webkit-transform:translateY(-40px)' ;
			that.scroller.style.cssText += '-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;';
           // Default options
			that.options = {
			//是否具有滚动条
  				scrollbars: true,
			// 其实时期Y的位置
  				startY: 0,
			//超出边界还原时间点
  				bounceTime: 600,
		    //超出边界返回的动画
  			bounceEasing: utils.ease.circular,
			//超出边界时候是否还能拖动
  				bounce: true,
			//当window触发resize事件60ms后还原
			  resizePolling: 60,
			  startX: 0,
			  startY: 0
				
			};

		}

		iScroll.prototype = {
				refresh: function () {
				  var rf = this.wrapper.offsetHeight;     // Force reflow
				  this.wrapperHeight = this.wrapper.clientHeight;
				  this.scrollerHeight = this.scroller.offsetHeight;
				  this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
				  this.endTime = 0;
				  var offset = $(this.wrapper).offset();
				  this.wrapperOffset = {
				    left: offset.left * (-1),
				    top: offset.top * (-1)
				  };

				  this._execEvent('refresh');

				  this.resetPosition();

				},
				_initIndicator: function () {
				  //滚动条
				  var el = createDefaultScrollbar();
				  this.wrapper.appendChild(el);
				  this.indicator = new Indicator(this, { el: el });

				  this.on('scrollEnd', function () {
				    this.indicator.fade();
				  });

				  var scope = this;
				  this.on('scrollCancel', function () {
				    scope.indicator.fade();
				  });

				  this.on('scrollStart', function () {
				    scope.indicator.fade(1);
				  });

				  this.on('beforeScrollStart', function () {
				    scope.indicator.fade(1, true);
				  });

				  this.on('refresh', function () {
				    scope.indicator.refresh();
				  });

				},
				_resize: function () {
				  var that = this;
				  clearTimeout(this.resizeTimeout);
				  this.resizeTimeout = setTimeout(function () {
				    that.refresh();
				  }, this.options.resizePolling);
				},
				resetPosition: function (time) {
					  var x = this.x,
					y = this.y;

					  time = time || 0;

					  if (this.y > 0) {
					    y = 0;
					  } else if (this.y < this.maxScrollY) {
					    y = this.maxScrollY;
					  }

					  if (y == this.y) {
					    return false;
					  }

					  this.scrollTo(x, y, time, this.options.bounceEasing);

					  return true;
					},
					_transitionTime: function (time) {
						  time = time || 0;
						  this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

						  //滚动条，我们这里只会出现一个滚动条就不搞那么复杂了
						  this.indicator && this.indicator.transitionTime(time);

						},

					getComputedPosition: function () {
						  var matrix = window.getComputedStyle(this.scroller, null), x, y;

						  matrix = matrix[utils.style.transform].split(')')[0].split(', ');
						  x = +(matrix[12] || matrix[4]);
						  y = +(matrix[13] || matrix[5]);

						  return { x: x, y: y };
					},
					_transitionTimingFunction: function (easing) {
					this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

					this.indicator && this.indicator.transitionTimingFunction(easing);
					},
					_translate: function (x, y) {
						  this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
						  this.x = x;
						  this.y = y;

						  if (this.options.scrollbars) {
						    this.indicator.updatePosition();
						  }

					},
					scrollTo: function (x, y, time, easing) {
  easing = easing || utils.ease.circular;

  this.isInTransition = time > 0;

  if (!time || easing.style) {
    this._transitionTimingFunction(easing.style);
    this._transitionTime(time);
    this._translate(x, y);
  }
},
	  /*dist：当前鼠标位置
			start：touchStart时候记录的Y（可能是X）的开始位置，但是在touchmove时候可能被重写
			time： touchstart到手指离开时候经历的时间，同样可能被touchmove重写
			lowerMargin：y可移动的最大距离，这个一般为计算得出 this.wrapperHeight - this.scrollerHeight
			size：如果有边界距离的话就是可拖动，不然碰到0的时候便停止
		*/
				_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
					var that = this,
						deceleration = 0.0006,
						speed = Math.abs(dist) / time,
						newDist = (speed * speed) / (2 * deceleration),
						newTime = 0, outsideDist = 0;

					// Proportinally reduce speed if we are outside of the boundaries 
					if (dist > 0 && newDist > maxDistUpper) {//dist当前鼠标位置
						outsideDist = size / (6 / (newDist / speed * deceleration));
						maxDistUpper = maxDistUpper + outsideDist;
						that.returnTime = 800 / size * outsideDist + 100;
						speed = speed * maxDistUpper / newDist;
						newDist = maxDistUpper;
					} else if (dist < 0 && newDist > maxDistLower) {
						outsideDist = size / (6 / (newDist / speed * deceleration));
						maxDistLower = maxDistLower + outsideDist;
						that.returnTime = 800 / size * outsideDist + 100;
						speed = speed * maxDistLower / newDist;
						newDist = maxDistLower;
					}

					newDist = newDist * (dist < 0 ? -1 : 1);
					newTime = speed / deceleration;

					return { dist: newDist, time: Math.round(newTime) };
				},

				_scrollbar: function () {
					var that = this,
						doc = document,
						bar;
						// Create the scrollbar indicator
						bar = doc.createElement('div');
					    bar.style.cssText = "position:absolute;right:0;top:'+100+';z-index:100;width:10px;height:30px;background:rgba(0,0,0,0.5);";
						that.wrapper.appendChild(bar);
						
				},
			
	

			
		

		}

 window.iScroll = iScroll;
		


})();