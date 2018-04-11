$(document).ready(function(){
$( ".sub-menu-items" ).hide();
$( ".vit-pane-container" ).show();
        
  /*  $('.v-rooms-list').click(function(){
    $( ".vit-pane-container" ).animate({left:"0px"},350);
	// $( ".vit-pane-tab" ).toggle( "slide" );
	//$(".vit-pane-tab").anbimate({width:'toggle'},350);
	$( ".sub-menu-items" ).slideToggle( "slow" );
    });*/
	
	
	var state = true;
	var mtab=false;
    $( ".v-rooms-list" ).on("click", function() {
      if ( state ) {
        $(".vit-pane-container" ).animate({
          left:"0px"
        }, 350 );
		
		$(".vit-pane-tab" ).animate({
          left:"-3px"
        }, 350 );
		mtab=true;
		
      } else {
        $(".vit-pane-container"  ).animate({
         left:"-684px"
        }, 350 );
		$(".vit-pane-tab" ).animate({
          left:"-686px"
        }, 350 );
		mtab=false;
		
      }
      state = !state;
	  
	  $( ".sub-menu-items" ).slideToggle( "slow" );
    });
	var state2=true;
	$( ".vit-pane-tab" ).on("click", function() {
		if(mtab){
			$(".vit-pane-container"  ).animate({
         left:"-684px"
        }, 350 );
		$(".vit-pane-tab" ).animate({
          left:"-686px"
        }, 350 );
		$( ".sub-menu-items" ).slideToggle( "slow" );
		mtab=false;
		state = !state;
		state2 = !state2;
		}
		else if(state2){
			$(".vit-pane-container" ).animate({
          left:"-924px"
        }, 340 );
			$(".main-nav-container" ).animate({
          left:"-240px"
        }, 350 );
		$(".vit-pane-tab" ).animate({
          left:"-924px"
        }, 350 );
		$("#leftm").hide();
		$("#rightm").show();
			
			
		}
		else{
			$(".vit-pane-container" ).animate({
          left:"-684px"
        }, 340 );
			$(".main-nav-container" ).animate({
          left:"0px"
        }, 350 );
		$(".vit-pane-tab" ).animate({
          left:"-686px"
        }, 350 );
		$("#leftm").show();
		$("#rightm").hide();
		}
		
		state2 = !state2;
		console.log(state2);
	});
	
	$( "#rightm").on("click", function() {
			
	});
	
	$('.btn-cross').click(function(){
    $( ".vit-pane-container" ).toggle( "slide" );
	// $( ".vit-pane-tab" ).toggle( "slide" );
	//$(".vit-pane-tab").animate({width:'toggle'},350);
	$( ".sub-menu-items" ).slideToggle( "slow" );
	
    });
	var ccount=0;
	$('.vit-tools-tab').click(function(){
	
	if(ccount == 0){
	$(".tools-container").animate({right:"-275px"},350);
	$(".vit-tools-tab").animate({right:"145px"},350);
	ccount++;
	}else if(ccount ==1){
	$(".tools-container").animate({right:"15px"},350);
	$(".vit-tools-tab").animate({right:"435px"},350);
	$("#lefta").hide();
	$("#righta").show();
	
	ccount++;
	}else if(ccount == 2){
	
	$(".tools-container").animate({right:"-420px"},350);
		$(".vit-tools-tab").animate({right:"0"},350);
		$("#lefta").show();
		$("#righta").hide();
		ccount=0;
	}
	console.log(ccount);
	});
	
});