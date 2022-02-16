/* === quiz btm select === */
$(function() {
	$(".layer_btm_menu").hide();
	$(".btn_que_type").click(function() {
		$(".layer_btm_menu.question").show(); 
	}); 
	$(".btn_ans_type").click(function() {
		$(".layer_btm_menu.answer").show(); 
	}); 
	
	$('.layer_btm_menu .layer_quiz_mask').click(function() {
		$(".layer_btm_menu").hide(); 
	}); 
});

/* === view more === */
$(function() {
	var swiper = new Swiper('.quiz_tag_slide', { 
		  slidesPerView: 'auto',
		  centeredSlides: false,
		  spaceBetween: 8,
	});
});

/* === preview === */
$(function() {
	$(".layer_preview").hide();
	$(".btn_q_preview").click(function() {
		$(".layer_preview").show();
	});
	$(".btn_pre_close").click(function() {
		$(".layer_preview").hide();
	});
});

/* === pal plus === */
$(function() {
	$(".layer_plus_pal").hide();
	$(".plus_pal").click(function() {
		$(".layer_plus_pal").show();
	});
	$(".layer_plus_pal .layer_quiz_mask").click(function() {
		$(".layer_plus_pal").hide();
	});
});

/* === pal quiz select === */
$(function() {
	$(".layer_btm_menu").hide();
	$(".btn_pack_detail").click(function() {
		$(".layer_btm_menu.pal_quiz").show(); 
	}); 
	
	$('.layer_btm_menu .layer_quiz_mask').click(function() {
		$(".layer_btm_menu").hide(); 
	}); 
});

/* === quiz list edit === */
$(function() {
	$(".layer_btm_menu").hide();
	$(".btn_list_align").click(function() {
		$(".layer_btm_menu.align").show(); 
	}); 

	$(".btn_list_edit").click(function() {
		$(".layer_btm_menu.edit").show(); 
	}); 
	
	$('.layer_btm_menu .layer_quiz_mask').click(function() {
		$(".layer_btm_menu").hide(); 
	}); 
});

/* === layer_quiz pack === */
$(function() {
	$(".layer_pack_del").hide();
	$(".quiz_pack_del").click(function() {
		$(".layer_pack_del.del_pack").show();
	});

	$(".quiz_packlist_del").click(function() {
		$(".layer_pack_del.del_packlist").show();
	});

	$(".quiz_packlist_open").click(function() {
		$(".layer_pack_del.open_packlist").show();
	});

	$(".quiz_pack_pickup").click(function() {
		$(".layer_pack_del.pickup_pack").show();
	});

	$(".btn_pickup_cancel").click(function() {
		$(".layer_pack_del.pickup_cancel").show();
		$(".layer_btm_menu").hide();
	});

	$(".quiz_pack_plus").click(function() {
		$(".layer_pack_del.plus_pack").show();
	});

	$(".go_tit_edit").click(function() {
		$(".layer_pack_del.edit_tit").show();
	});

	$(".btn_pack_cancel").click(function() {
		$(".layer_pack_del").hide();
	});

	$(".btn_go_report").click(function() {
		$(".layer_pack_del.report").show();
	});
});

/* === slider === */
$(function() {
	var swiper = new Swiper('.channel_keyword_slider', { 
		slidesPerView: 'auto',
		spaceBetween: 8,
	});
	var swiper = new Swiper('.channel_pick_slider', { 
        slidesPerView: 'auto',
		spaceBetween: 12,
		pagination: {
			el: '.swiper-pagination',
		},
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	});
	var swiper = new Swiper('.channel_parner_slider', { 
		slidesPerView: 'auto',
		spaceBetween: 37,
	});
	var swiper = new Swiper('.lately_search_slider', { 
		slidesPerView: 'auto',
		spaceBetween: 8,
	});
	var swiper = new Swiper('.hit_search_slider', { 
		slidesPerView: 'auto',
		spaceBetween: 8,
	});
	var swiper = new Swiper('.donation_parner_slider' , { 
		slidesPerView: 'auto',
		spaceBetween: 16,
	});
	var swiper = new Swiper('.event_speed_slider' , { 
		pagination: {
			el: '.swiper-pagination',
		  },
	});
	var swiper = new Swiper('.attend_slider' , { 
		slidesPerView: 'auto',
		spaceBetween: 16,
	});
});

/* === search area === */
$(function() {
	$(".layer_search_area").hide();
	$(".btn_top_search_kopo").click(function() {
		$(".layer_search_area").slideToggle('fast');
	});
});

/*  === speed fixed === */
var currentScrollTop = 0;
window.onload = function() {
	scrollController();
	$(window).on('scroll', function() {
		scrollController();
	});
}
function scrollController() {
	currentScrollTop = $(window).scrollTop();
	if (currentScrollTop < 200) {
		$('.speed_time_bar').css('top', 200 - (currentScrollTop));
		if ($('.speed_time_bar').hasClass('fixed')) {
			$('.speed_time_bar').removeClass('fixed');
		}
	} else {
		if (!$('.speed_time_bar').hasClass('fixed')) {
			$('.speed_time_bar').css('top', 0);
			$('.speed_time_bar').addClass('fixed');
		}
	}
}

/* === notice area === */
$(function() {
	$(".notice_list li.view").hide();
	$(".notice_list li.tit").click(function() {
		$(this).toggleClass('active');
		$(this).next(".notice_list li.view").slideToggle('fast');
	});
});
