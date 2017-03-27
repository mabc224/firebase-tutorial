
jQuery(document).ready(function() {

    /*
        Fullscreen background
    */
    $.backstretch("/img/backgrounds/1.jpg");

    /*
        Form validation
    */
    $('.login-form input[type="email"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });

    $('.login-form').on('submit', function(e) {

    	$(this).find('input[type="email"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});

    });


	jQuery.validator.setDefaults({
		debug: false,
		success: "valid"
	});

	$('#signup-form').validate({
		rules:{
			"form-email":
			{

				required:true,
				email:true
			},
			"form-password":
			{
				required:true,
				minlength:6,
				maxlength:10
			},
			"form-repassword":{
				equalTo:"#form-password"

			}
		},

		highlight: function( element ) {
			$(element).closest('.form-group').addClass('has-error');

		},
		unhighlight: function( element ) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}

	});

	$('#put-data-button').on('click', function( event ) {

		event.preventDefault();

		$.ajax({
			url: '/putdata',
			type: 'get',
			success: function(books) {

				var data = '<div id="book-data"><div class="table-responsive">' +
					'<table class="table table-hover table-striped">' +
					'<thead>' +
					'<tr>' +
					'<th>Author</th>' +
					'<th>Author Image</th>' +
					'<th>Title</th>' +
					'<th>Image</th>' +
					'<th>Price</th>' +
					'<th>Short Description</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>';
				var remainData = "";
				for (var id in books) {
					var book = books[id];
					remainData += '<tr>' +
						'<td>' + book.author + '</td>'+
						'<td><img class="img-responsive img-thumbnail" src="'+ book.author_image +'" alt=""></td>'+
					'<td>' + book.title + '</td>'+
					'<td><img width="15%" class="img-responsive img-thumbnail" src="'+ book.image +'" alt=""> </td>'+
					'<td>' + book.price + '</td>'+
					'<td>' + book.short_description + '</td>' +
					'</tr>';
				};

				$( "#book-data" ).replaceWith( data+remainData+'</tbody></table></div>');

			}
		});
	});

});
