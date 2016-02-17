(function(window, document, exports, undefined) {

    function Scratch(options) {
        this.threshold = options.threshold;
        this.radius = options.radius;
        this.cvs = options.canvas;
        this.ctx = this.cvs.getContext('2d');
        this.size = {
            width: this.cvs.width,
            height: this.cvs.height
        };
        this._cvs = document.createElement('canvas');
        this._ctx = this._cvs.getContext('2d');
        this._cvs.width = this.cvs.width;
        this._cvs.height = this.cvs.height;
        this._initEvent();
        this.img = new Image;
        this.img.onload = (function(_this) {
            return function() {
                return _this.reset();
            };
        })(this);
        this.img.src = options.img;

        /**********娣诲姞涓€涓� callback 鍑芥暟*******/
        this.callback = options.callback;


        /**************************************/

    }

    Scratch.prototype.threshold = 0;

    Scratch.prototype.color = '#ccc';

    Scratch.prototype.size = null;

    Scratch.prototype._count = 0;

    Scratch.prototype.drawMask = function() {
        this._ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.size.width, this.size.height);
        return this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.size.width, this.size.height);
    };

    Scratch.prototype.clear = function() {
        return this.ctx.clearRect(0, 0, this.size.width, this.size.height);
    };

    Scratch.prototype.onScratchEnd = function(_doneHandler) {
        this._doneHandler = _doneHandler;
    };

    Scratch.prototype.reset = function() {
        this._count = 0;
        this._upHandler();
        return this.drawMask();
    };

    Scratch.prototype.setEnabled = function(enabled) {
        this.enabled = enabled;
    };

    Scratch.prototype._initEvent = function() {
        var downEventName,
            move,
            up;

        if (!this._inited) {
            move = this._moveHandler;
            up = this._upHandler;
            this._moveHandler = (function(_this) {
                return function(e) {
                    return move.call(_this, e);
                };
            })(this);
            this._upHandler = (function(_this) {
                return function(e) {
                    return up.call(_this, e);
                };
            })(this);
            this._inited = true;
        }

        this.supportTouch = window.ontouchstart !== void 0;
        downEventName = this.supportTouch ? 'touchstart' : 'mousedown';
        this._moveEventName = this.supportTouch ? 'touchmove' : 'mousemove';
        this._upEventName = this.supportTouch ? 'touchend' : 'mouseup';

        return this.cvs.addEventListener(downEventName, (function(_this) {
            return function(e) {
                // console.log(e);
                if (!_this._checkEraseOnPoint(e)) {
                    // console.log(e);
                    return;
                }
                if (window.__isTouchLocked__) {
                    window.__isTouchLocked__.locked = true;
                }
                _this.cvs.addEventListener(_this._moveEventName, _this._moveHandler, false);
                return _this.cvs.addEventListener(_this._upEventName, _this._upHandler, false);
            };
        })(this));
    };

    Scratch.prototype._moveHandler = function(e) {
        return this._checkEraseOnPoint(e);
    };

    Scratch.prototype._upHandler = function(e) {
        this.lastPoint = null;
        if (window.__isTouchLocked__) {
            window.__isTouchLocked__.locked = false;
        }
        e && e.stopPropagation();
        e && e.preventDefault();
        if (e && this._isOver()) {
            this._doneHandler();
        }
        this.cvs.removeEventListener(this._upEventName, this._upHandler);
        return this.cvs.removeEventListener(this._moveEventName, this._moveHandler);
        // this.cvs.removeEventListener(this._moveEventName, this._moveHandler);
        
    };

    Scratch.prototype._doneHandler = function() {
        this.clear();
        setTimeout(this.callback, 300);
    };

    Scratch.prototype._isOver = function() {
        var count,
            data,
            e,
            i,
            _i,
            _len;
        data = this.ctx.getImageData(0, 0, this.size.width, this.size.height).data;
        count = 0;
        for (i = _i = 0, _len = data.length; _i < _len; i = _i += 4) {
            e = data[i];
            if (data[i + 3] < 128) {
                count += 1;
            }
        }
        return count / data.length * 4 > this.threshold;
    };

    Scratch.prototype._checkEraseOnPoint = function(e) {
        var rect,
            x,
            y;
        if (!this.enabled) {
            return false;
        }
        e.stopPropagation();
        e.preventDefault();

        // if (this._isOver()) {
            // return this._doneHandler();
        // }

        rect = this.cvs.getBoundingClientRect();
        x = this.supportTouch ? e.touches[0].clientX : e.clientX;
        y = this.supportTouch ? e.touches[0].clientY : e.clientY;
        x -= rect.left;
        y -= rect.top;
        this._erase(x, y);
        return true;
    };

    Scratch.prototype._erase = function(x, y) {
        var p;
        this._ctx.save();
        this._ctx.globalCompositeOperation = 'destination-out';
        this._ctx.fillStyle = '#000';
        this._ctx.strokeStyle = '#000';
        this._ctx.lineWidth = this.radius * 2;
        p = this.lastPoint;
        this._ctx.beginPath();
        this._ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
        this._ctx.closePath();
        this._ctx.fill();
        if (p) {
            this._ctx.beginPath();
            this._ctx.moveTo(p.x, p.y);
            this._ctx.lineTo(x, y);
            this._ctx.stroke();
        }
        this._ctx.restore();
        this.lastPoint = {
            x: x,
            y: y
        };
        this.cvs.width = this.cvs.width;
        this.cvs.height = this.cvs.height;
        return this.ctx.drawImage(this._cvs, 0, 0);
    };

    Scratch.prototype.setImg = function(src){
        this.img.src = src;
    };

    window[exports] = Scratch;
})(window, document, 'Scratch');