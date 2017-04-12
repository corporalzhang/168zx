$(function() {
	//图片本地预览
	$('#upload_image').change(function(event) {
		// 根据这个 <input> 获取文件的 HTML5 js 对象
		var files = event.target.files, file;
		if (files && files.length > 0) {
			// 获取目前上传的文件
			file = files[0];
			// 来在控制台看看到底这个对象是什么
			console.log(file);
			// 那么我们可以做一下诸如文件大小校验的动作
			if (file.size > 1024 * 1024 * 2) {
				alert('图片大小不能超过 2MB!');
				return false;
			}
			// !!!!!!
			// 下面是关键的关键，通过这个 file 对象生成一个可用的图像 URL
			// 获取 window 的 URL 工具
			var URL = window.URL || window.webkitURL;
			// 通过 file 生成目标 url
			var imgURL = URL.createObjectURL(file);
			// 用这个 URL 产生一个 <img> 将其显示出来
			$('#image_view').attr('src', imgURL);
			// 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
			 //URL.revokeObjectURL(imgURL); 
		}
	});
	
	//
	$("#add_slide").click(function(){
		 var fd = new FormData();
		
		    fd.append('sn', $("#add_sn").val());
	
		    fd.append('remark', $("#add_remark").val());
		    var upload_image = document.getElementById("upload_image");
		    for (var i = 0; i < upload_image.files.length; i++) {

		        var pic = upload_image.files[i];
		        fd.append('slide_file', pic);
		    }
		    
		    var header = $("meta[name='_csrf_header']").attr("content");
		    var token = $("meta[name='_csrf']").attr("content");
		    $.ajax({
		        url: "slide/addSlide",
		        type: "POST",
		        // Form数据
		        data: fd,
		        cache: false,
		        contentType: false,
		        processData: false,
		        beforeSend: function(xhr) {
		            xhr.setRequestHeader(header, token);
		        },
		        success: function(data) {
		            // 1向品牌列表动态添加一条显示数据
		            if (data.success) {
		            	
		            }

		        }
		    });
		    
	});
	
	
	
});