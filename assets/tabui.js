$(document).ready(function(){
$( ".sub-menu-items" ).hide();
$( ".vit-pane-container" ).show();
        
  /*  $('.v-rooms-list').click(function(){
    $( ".vit-pane-container" ).animate({left:"0px"},350);
	// $( ".vit-pane-tab" ).toggle( "slide" );
	//$(".vit-pane-tab").anbimate({width:'toggle'},350);
	$( ".sub-menu-items" ).slideToggle( "slow" );
    });*/
	
	var stile;
	var state = true;
	var mtab=false;
	var lasttab, thistab;
    $( ".menu-item" ).on("click", function(e) {
        e.stopPropagation();
        $( ".menu-item" ).removeClass("selected");

        $(this).addClass("selected");
       // $(".vit-pane-container" ).hide();
        thistab= $(this).attr('class').split(' ');
			//$(this).attr('class').split(' ').map(function(cls){ console.log(cls);});
		if($(this).next().is(':hidden')) //.is(':visible');
        {
            console.log("---");
            $( ".sub-menu-items" ).hide();
        	$(this).next().show();
            $(".vit-pane-container").animate({
                left: "0px"
            }, 350);

            $(".vit-pane-tab").animate({
                left: "-3px"
            }, 350);
            mtab = true;
            console.log(thistab);
        }else
		{
            $(this).next().hide();
            $(".vit-pane-container"  ).animate({
                  left:"-684px"
                 }, 350 );
                $(".vit-pane-tab" ).animate({
                   left:"-686px"
                 }, 350 );
				mtab=false;
		}

        console.log("---");
      // if ( state ) {
       //  $(".vit-pane-container" ).animate({
       //    left:"0px"
       //  }, 350 );
		//
		// $(".vit-pane-tab" ).animate({
       //    left:"-3px"
       //  }, 350 );
		// mtab=true;
       //    $(this).addClass("selected");
      //
      // } else if(thistab[1]== lasttab[1]) {
       //  $(".vit-pane-container"  ).animate({
       //   left:"-684px"
       //  }, 350 );
		// $(".vit-pane-tab" ).animate({
       //    left:"-686px"
       //  }, 350 );
		// mtab=false;
		// $(this).removeClass("selected");
       //  //  $( ".sub-menu-items" ).hide();
      // }
      // state = !state;
	  //
	  // //$( ".sub-menu-items" ).slideToggle( "slow" );
       //  $(this).next().slideToggle( "slow" );
       //  lasttab= thistab;
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
		$( ".sub-menu-items" ).hide();
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


    $( ".v-select-room-type-button" ).on("click", function(e) {
        $(".vit-content-pane").children().hide();
        $(".vit-content-rooms").show();

    });

    $('.v-tiles-list ').on("click", function(e) {
        $(".vit-content-pane").children().hide();
		$(".vit-content-tiles-type").show();
	});

    $(".v-select-tile-type-button").on("click", function(e) {
        $(".vit-content-pane").children().hide();
       var category=$(this).parent().attr("data-select-tile-type");
       category = category.split(" ");
		console.log(category[0].toLowerCase());
		$(".vit-content-tiles").show().children().hide();
		$("."+category[0].toLowerCase()).show();
		$('.tiles-list').show();
		layout.workingArea=category[0].toLowerCase();
    });

    $('.vl-tile').on("click", function(e) {

		stile = $(this).attr("data-select-id");
		console.log(stile);
		$(".current-tile img").attr('src',window.location.href+"assets/tiles/"+stile).show();
        $(".vit-pane-container"  ).animate({
            left:"-684px"
        }, 350 );
        $(".vit-pane-tab" ).animate({
            left:"-686px"
        }, 350 );
        $( ".sub-menu-items" ).hide();
        $(".tools-container").animate({right:"-275px"},350);
        $(".vit-tools-tab").animate({right:"145px"},350);
        $( ".menu-item" ).removeClass("selected");
        if(layout.workingArea == "wall")
        	layout.wallTile=stile;
        else
        	layout.floorTile=stile;

        $(".vit-message").show();
        $(".vit-message > p").hide();
        // tileselected event triger
        // $.event.trigger({
        //     type: "tileSelected",
        //     area: layout.workingArea
        // });
        $( document ).trigger( "tileSelected", [ layout ] );
    });
});