
    /*
     * 模板2
     * 因为框架自己的模板(template)的Contain模式会导致左右两边有空白，是因为scala的参数没算好，所以自己算必要的参数
     */
     function pageResponse(opt) {
        var ua = navigator.userAgent,
            wp = ua.match(/Windows Phone ([\d.]+)/),
            android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
            dw = document.documentElement.clientWidth,
            dh = document.documentElement.clientHeight,
            ds = dw / dh,// 设备宽高初始比例
            pw = opt.width || 320,
            ph = opt.height || 504,
            ps = pw / ph,// 页面宽高初始比例

            // 调用的选择器
             pd = document.querySelectorAll(opt.selectors),
            // i = pd.length,
            //pd = getElementsByClassName(opt.class),
            sm = opt.mode || "auto",
            fw = dw / pw,// 页面宽度满屏比例
            sn = (sm == "contain") ? (ds > ps ? dh / ph : dw / pw) : (sm == "cover") ? (ds < ps ? dh / ph : dw / pw) : dw / pw;// 页面缩放比例，默认模式为auto
        function template2(mode, obj, xScala, yScala){
            var s = obj.style;
            s.width = pw + "px";
            s.height = ph + "px";
            s.webkitTransformOrigin = "left top 0";
            s.transformOrigin = "left top 0";
            s.webkitTransform = "scale(" + xScala + "," + yScala + ")";
            s.transform = "scale(" + xScala + "," + yScala + ")";
            // 兼容android 2.3.5系统下body高度不自动刷新的bug
            if(mode == "auto" && android){
                document.body.style.height = ph * yScala + "px";
            }
            else if(mode == "contain" || mode == "cover"){
                s.position = "absolute";
                s.left = "50%";
                s.top = "50%";
                s.marginLeft = pw / -2 + "px";
                s.marginTop = ph / -2 + "px";
                s.webkitTransformOrigin = "center center 0";
                s.transformOrigin = "center center 0";
                document.body.style.msTouchAction = "none";// 阻止默认滑屏事件
                document.ontouchmove = function(e){e.preventDefault()}
            }
        }
    
   //运行
    for(i = 0;i < pd.length;i++){
        switch(opt.template){
            case 1:
                template(sm, pd[i], sn);
                break;
            case 2 :
                template2(sm, pd[i], fw, sn);
                break;
        }
    }

}




