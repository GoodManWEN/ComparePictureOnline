var img_target_width = 0;
var img_target_height = 0;
var basic_width;
var basic_height;
var rate = 0;
var ratial = 1;

function test(imgurl1 , imgurl2) {
    var img1 = new Image();
    var img2 = new Image();
    img1.src = imgurl1;
    img2.src = imgurl2;

    
    function callback(imgobj, imgurl1 ,imgurl2) {
        // ����ͼƬ�ļ������ʧ��
        if (imgobj.fileSize <= 0 || imgobj.width <= 0 || imgobj.height <= 0) {  
            $('#loading').remove()
            $('#outter').append('<h1>404 Error loading picture.</h1>');
            return ;  
        }

        if (img1.complete && img2.complete) {
            // ����������Ժ�
            if (img1.height != img2.height || img1.width != img2.width) {
                $("#leftframe").remove();
                $('#outter').append('<h1>Can not handle two img with different size.</h1>');
                return;
            } else {
                // ��������� ,�ȸ���Ԫ��
                $('#loading').remove()
                $("#imgleft").attr("src",imgurl1);
                $("#imgright").attr("src",imgurl2);
                // Ȼ����һ����֮bug
                $('#imgleft').width($('#leftframe').width())
                // �޸�ȫ�ֱ���
                rate = img1.height / img1.width
                img_target_width = $('#leftframe').width()
                img_target_height = img_target_width * rate
                basic_width = $('#leftframe').width()
                // ����dom
                $('#leftframe').height(img_target_height)
                $(window).resize(function() {
                    img_target_width = $('#leftframe').width()
                    img_target_height = img_target_width * rate
                    $('#leftframe').height(img_target_height)
                });
            }

        } else {
            return ;
        }
    }

    if (img1.complete) {
        callback(img1 , imgurl1 , imgurl2);
    } else {
        img1.onload = function () {
            callback(img1 , imgurl1 , imgurl2);
        }
    }

    if (img2.complete) {
        callback(img2 , imgurl1 , imgurl2);
    } else {
        img2.onload = function () {
            callback(img2 , imgurl1 , imgurl2);
        }
    }
}

test(picurl1, picurl2)

function refresh_pic(){
    img_target_width = basic_width * ratial;
    img_target_height = rate * img_target_width 
    $('#times').html('- '+ratial.toString() + 'x -')
    $('#imgleft').width(img_target_width)
    $('#imgleft').height(img_target_height)
    $('#imgright').width(img_target_width)
    $('#imgright').height(img_target_height)
    $('#leftframe').height(img_target_height)
    $('#leftframe').width(img_target_width)
}

function zoomin(){
    if (ratial == 10) {
        return ;
    }
    ratial ++ ;
    refresh_pic();
}

function zoomout() {
    if (ratial == 1) {
        return ;
    } 
    ratial--;
    refresh_pic();
}
