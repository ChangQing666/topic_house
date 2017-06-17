var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: false,
    effect: 'coverflow',
    coverflow: {
        rotate: 38,
        stretch:-15,
        depth: 150,
        modifier: 1,
        slideShadows : false
    },
    roundLengths : true,
    initialSlide :0,
    speed:600,
    slidesPerView:"auto",
    centeredSlides : true,
    followFinger : false,
    onSlideNextStart:function(swiper){
        console.log(000)
        if(swiper.activeIndex==0){
            $(".swiper-pagination").addClass("active");
        }
    },
    onSliderMove: function(swiper){
        if(swiper.activeIndex==1){
            $(".swiper-pagination").addClass("active");
            if(!$(".purpose>li").hasClass("selected")){
                swiper.lockSwipes();
                toast("请选择购房目的");
            }
        }else if(swiper.activeIndex==3){
            if(!$(".type .item").hasClass("selected")){
                swiper.lockSwipes();
                toast("请选择户型");
            }
        }else if(swiper.activeIndex==4){
            //if(!$(".selected_box .item").hasClass("selected")){
            //    swiper.lockSwipes();
            //    toast("请选择区域");
            //}
        }else if(swiper.activeIndex==5){
            if(! $(".feature .item").hasClass("selected")){
                swiper.lockSwipes();
                toast("请选择房源特色");
            }
        }

    }
});

var purpose;var type=[];var feature=[];
//    购房目的
$(".purpose>li").click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    purpose = $(this).html();
    swiper.unlockSwipes() ;
    swiper.slideNext();
    console.log(purpose);
})
//    户型
$(".type .item").click(function(){
    var selLen = $(".type .item.selected").length;
    if(!$(this).hasClass("selected")){
        if(selLen>=2){
            toast("最多只能选两项");
            return
        }else{
            $(this).addClass("selected");
            type.push($(this).html());
        }
    }else{
        $(this).removeClass("selected");
        type.remove($(this).html());
    }
    swiper.unlockSwipes();
    console.log(type);
})

//  区域选择
var city1 = [], city2 = [], city3 = [], cityType = 1, cityChecked = [0, 0, 0];
$(function () {
    if (cityType == 1) {
        if (city1.length != 0) {
            render(city1);
        } else {
            getCity1();
        }
    } else if (cityType == 2) {
        if (city2.length != 0) {
            render(city2);
        } else {
            getCity2();
        }
    } else if (cityType == 3) {
        if (city3.length != 0) {
            render(city3);
        } else {
            getCity3();
        }
    }
})
var requestFlag = true;
$(".select-scroll").on("click", "li", function (e) {
    //   选择城市
    if (!requestFlag) return;
    requestFlag = false;
    var index = $(this).attr("index");
    if (cityType == 1) {
        cityType = 2;
        getCity2(city1[index].cityId);
        $(".tabs").css({visibility:"visible"});
        $(".select-value").find("li").eq(0).show().text($(this).text()).addClass("selected").siblings().removeClass("selected");
        cityChecked[0] = index;
    } else if (cityType == 2) {
        cityType = 3;
        getCity3(city2[index].id);
        $(".select-value").find("li").eq(1).show().text($(this).text()).addClass("selected").siblings().removeClass("selected");
        cityChecked[1] = index;
    } else if (cityType == 3) {
        $(".select-value").find("li").eq(2).show().text($(this).text()).addClass("selected").siblings().removeClass("selected");
        var curIndexId;
        var selLen = $(".select-scroll li.selected").length;

        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            var curIndex = $(this).attr("index");
            curIndexId = "index"+curIndex;
            var curSelector ="#" +curIndexId;
            $(curSelector).remove();
        }else{
            if( selLen >2){
                toast("最多选三个");
            }else{
                $(this).addClass("selected");
                var str =  $(".selected_box").html();
                var curIndex = $(this).attr("index");
                curIndexId = "index"+curIndex;
                str+= '<span class="item" id="'
                    + curIndexId
                    +'">'
                    + $(this).text()
                    +' <img class="btn_close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAACkUlEQVRIx6WXS1IaQRiAuyh14Razo7wGOUnUnERPgBewIHdgY5nKDXogsxHGXWqSUEDMg0diNKVQWF8WMz39D3QPUHZv5vH3N/33/xyF8s4SVU5pEjHhiScmRDQ5pUrJv8r3okKNPr7Rp0alEKjFpMwFM9aNGReUdX6lC8gbRmw6RhwVAtmhLuUXjIiJCGnRIiQiZsQiD62z4wGyz5WVeySmjXbMNjGPEnnFvgPIDpdG4pkegRNmZkCPZ4u8THaZBzbs3jqFMDM7cp+NJSBH5s0D4UY4jSbkwSJPJLBsLPu4BS5BZruc8MoC6+bsOlvhNJpre5YNAzxknjzpZWIDFtx6IS0iYbSeAc45TIA1o64VSr76w6PmP2AqLJ6pXUMpSgySu1gs+plKfPfgYCaexQY4oKSomqho5/xsnMrcOnHwKefqWfRUFWcmLJddd7KC/Ji5SbwknYX/qaLpFtEETFOpb2twQumm4ia5ipwBZpBD2tyn158dkpEB3ihzWKHHQX5n6S8ZXzyWT8dYGcnA63N/RGL56k0W5rtrgZowi4VpQfaxwEKVNS3uxA573o9alQuMInFPhUpLo3jdRp5fnzZ/C5DSbTyOLS08SOPh3mtp6divXaGnCTLcUISY2xdbudBzJoflKCkOvnxycKavX87UIJFzb/pSVIwvWqdYeHC2kkxWE+yMiikBF6YEXKdCfebi7FbN1c20ESWgLovU+MVFakxZltHjF5fRtwWF/nrDeicK/bvVzmHvRa3InrtZ+pBvlloekyw1S++dzZJWWrFrFbftXJeQgICQrquda7Bb3HAeb9Vwnngaztw8oL5RS1znYJum/ZyhFzbkfE3T7v2tOKNJxJQ5c6ZENDkr/q34D4W+dHxkTkUlAAAAAElFTkSuQmCC" alt="">'
                    +'</span> '

                $(".selected_box").html(str)
            }
        }
        cityChecked[2] = index;
        requestFlag = true;
        swiper.unlockSwipes();
    }
});
/*点击已选中的城市*/
$(".select-value").find("li").eq(0).click(function () {
    cityType = 1;
    cityChecked[1] = 0;
    cityChecked[2] = 0;
    render(city1);
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".selected_box").html("");
    $(".select-value").find("li").eq(1).text("").hide();
    $(".select-value").find("li").eq(2).text("").hide();
});
$(".select-value").find("li").eq(1).click(function () {
    cityType = 2;
    cityChecked[2] = 0;
    render(city2);
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".selected_box").html("");
    $(".select-value").find("li").eq(2).text("").hide();
});

/*点击选中的三级地区*/
$(".selected_box").on("click",".btn_close",function(){
    $(this).parent().remove()
    var curId =Number($(this).parent().attr("id").substring(5)) ;
    $(".select-scroll li").eq(curId).removeClass("selected");
    swiper.unlockSwipes();
    console.log("id",curId )
})

/*请求数据*/
function getCity1() {
    $.get("https://m.jyall.com/entrust/queryOpenCityList",function (res) {
        res = JSON.parse(res);
        console.log(1,res);
        if(res.state == 1){
            city1 = res.resultList;
            render(city1);
        }
    })
}
function getCity2(id) {
    $.ajax({
        url: "https://m.jyall.com/entrust/queryCountry/"+id,
        dataType : "jsonp",
        success: function (res) {
            console.log(2,res);
            city2 = res.countries;
            render(city2);
        }
    });
}
function getCity3(id) {
    $.ajax({
        url: "https://m.jyall.com/entrust/querTown/"+id,
        dataType : "jsonp",
        success: function (res) {
            console.log(3,res);
            city3 = res.towns;
            render(city3);
        }
    });
}
function render(citylist) {
    var str = "";
    citylist.forEach(function (i,index) {
        var name = '';
        if(cityType==1){
            name = i.cityName;
        }else{
            name = i.name;
        }
        str += "<li index='"+ index +"'>" + name + "</li>";
    });
    $(".select-scroll ul").html(str);
    requestFlag =true;
}

//    房源特色
$(".feature .item").click(function(){
    $(this).toggleClass("selected");
    if($(this).hasClass("selected")){
        feature.push($(this).html());
    }else{
        feature.remove($(this).html());
    }
    swiper.unlockSwipes();
    console.log(feature);
})


//    兼容input安卓样式
var H = $("body").height();
$("input").focus(function(){
    console.log($("body").height())
    $("body").height( $("body").height()+30)
    console.log($("body").height())
}).blur(function(){
    $("body").height(H)
})


    //删除数组中指定元素
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var emp = ['abs','dsf','sdf','fd']
emp.remove('fd');


//开始找房
/*立即预约*/
var getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
};
var wwwURL = (/https/i.test(location.protocol) === false ? 'http://' : 'https://') + location.hostname,
    isOnline=true,
    domain_v1 = isOnline ? wwwURL:'/api.php?jsApiUrl=' + wwwURL;
$("#btnSubmit").click(function () {
    var contacter=$("#name").val(),
        mobilePhone=$("#phone").val(),
        mobileCode=$("#yzm").val();
    if ("" == contacter || !/[\u4e00-\u9fa5|a-z|A-Z]/.test(contacter)) {
        toast("请输入汉字或英文字母姓名");
        return;
    }
    if(mobilePhone==""){
        toast("请输入手机号");
        return;
    }
    if(!/^1[34578]\d{9}$/.test(mobilePhone)){
        toast("请输入正确手机号");
        return;
    }
    if (mobileCode == "") {
        toast("请输入验证码");
        return;
    }
    var source = getQueryString('source')=='app'?'2':'3';
    var appointID = "FCESF20170616001";
    var catagoryOneId = 1;

    var APPkey= getQueryString('APPkey') ? getQueryString('APPkey') : 'b40538ab5bef1ffd18605efda7f820d9';
    var _track_d="";
    if($.fn.cookie('_track_d')){
        _track_d=$.fn.cookie('_track_d').split('.')[0];
    }
    var deviceId=_track_d;
    var validate = 1;var cName='';
    $(".select-scroll .selected").map(function(){
        var cIndex = $(this).attr("index")
        console.log(city3[cIndex].name);
        cName+=city3[cIndex].name+","
    })
    var //wAraea = city3[1].cityName+";"+ city3[1].countyName+";"+cName,//"北京市;东城区;朝阳门,安定门,东四"
        appointTime,//预约时间
        housePurpose = $(".purpose li.selected").text(),//购房目的
        totalCount = (parseInt($("#sliderHandler").css("left"))*0.01*900+100), //预算总价            //总价
        houseRoom = type,//户型
        houseFeature = feature,//房源特色
        name=$("#name").val(),//姓名
        cellphone=$("#phone").val(),//手机号（字符形式）
        appointName="二手房帮您找房",
        catagoryOneName="房产",
        messageParam="二手房帮您找房",
        handleFlag="暂不处理";
    //citySite=city3[1].cityId;//一级城市Id
    var data = {
//        appointTime:appointTime,
        cellphone: cellphone,
        source: source,
//        citySite: citySite,
        housePurpose: housePurpose,
        totalCount: totalCount,
        houseRoom: houseRoom,
        houseFeature: houseFeature,
//        wAraea: wAraea,
        appointID: appointID,
        appointName: appointName,
        catagoryOneId: catagoryOneId,
        catagoryOneName: catagoryOneName,
        messageParam: messageParam,
        handleFlag: handleFlag
    };
    data = JSON.stringify(data);
    console.log("data数据",data);
    $.ajax({
        url:"https://m.jyall.com/jygoods-api/v1/dispatch/addWithValidate/1/"+ "FCESF20170616001"  + "/" + 2 + "?validate=1",
        beforeSend: function(xhr){
            xhr.setRequestHeader('deviceId', _track_d);
            xhr.setRequestHeader('APPkey', APPkey);
        },
        type:"post",
        data:data,
        dataType:"json",
        contentType:"application/json",
        cache:false,
        success: function (data) {
            //res = JSON.parse(data);
            if(data.state==1){
                swiper.slideNext();
            }
            if(data.state==0){
                toast(data.message)
            }
            if(data.state==2){
                toast(data.message)
            }
        },
        error: function () {
            toast("发生了错误，请您尝试再次申请！");
        }
    })
});


//    slider滑块取值
$(function(){
    var $sliderTrack = $('#sliderTrack'),
        $sliderHandler = $('#sliderHandler'),
        $sliderValue = $('#sliderValue');
        $trackerModal = $('.tracker_modal');
    var totalLen = $('#sliderInner').width(),
        startLeft = 0,
        startX = 0;
    console.log(totalLen);
    $sliderHandler
        .on('touchstart', function (e) {
            startLeft = parseFloat($sliderHandler.css('left')) * totalLen / 100;
            console.log(1,e)
            startX = e.changedTouches[0].clientX;
        })
        .on('touchmove', function(e){
            console.log(2,e)
            var dist = startLeft + e.changedTouches[0].clientX - startX,
                percent;
            dist = dist < 0 ? 0 : dist > totalLen ? totalLen : dist;
            percent =  parseFloat(dist / totalLen * 100);
            $sliderTrack.css('width', percent + '%');
            $sliderHandler.css('left', percent + '%');
            $trackerModal.css('left', percent + '%');
            $sliderValue.text(percent);
            if(percent==100){
                $trackerModal.css({fontSize:".28rem"}).text("1000万以上")
            }
            else if(percent==0){
                $trackerModal.text("100万以下")
            }else{
                $trackerModal.text(parseInt(percent*0.01*900+100)+"万");
            }
            e.preventDefault();
        });

});


$(function(){
    var seconds = 60,interval=null,flag=false;
    $(".hqyzm").click(function () {
        if(flag) {
            return;
        }
        var num = $("#phone").val();
        console.log(num)
        if(num == ""){
            toast("请输入手机号");
            return;
        }
        if(!/^1[34578]\d{9}$/.test(num)){
            toast("请输入正确手机号");
            return;
        }
        flag = true;
        var self = $(this);
        var str = "(" + seconds + ")";
        self.text(str).addClass("hqyzm-djs");
        interval = setInterval(function(){
            seconds--;
            var str = "(" + seconds+")";
            self.text(str).addClass("hqyzm-djs");
            if(seconds<0){
                clearInterval(interval);
                seconds = 60;
                self.text("获取验证码").removeClass("hqyzm-djs");
                flag = false;
            }
        },1000);

        $.ajax({
            url: "https://m.jyall.com/entrust/sendvcode?mobile="+num,
            dataType : "jsonp",
            success: function (res) {
                console.log(res);
                if(res.state==0){
                    toast(res.message);
                }else if(res.state==1){
                    toast("验证码已发送")
                }
            }
        });
    })
})

// toast提示
var timer = '';
function toast(str){
    $(".my-toast").text(str).show(400);
    timer = setTimeout(function(){
        $(".my-toast").hide(400);
        clearTimeout(timer);
    },1000)
};
