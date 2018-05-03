var layout = {
    wallTile:"",
    floorTile:"",
    room:"",
    workingArea:""
};

$(document).ready(function() {
    // $('.scene').each(function() {
    //    // var design = $(this).attr('data-design');
    //     load_layer(this,3,'http://res.cloudinary.com/halfbug/image/upload/bathroom.png',1);
    //     load_layer(this,2,"http://res.cloudinary.com/halfbug/image/upload/c_thumb,fl_tiled,h_120,l_art-004-light-medium-blue-glossy.png,w_180/l_basic_pattern_wall.png/fl_cutter,l_wallmask.png/v1525018972/blankmask.png",0);
    //     load_layer(this,1,"http://res.cloudinary.com/halfbug/image/upload/c_thumb,fl_tiled,h_120,l_art-007-light-walnut-brown-glossy.png,w_180/l_basic_pattern_floor.png/fl_cutter,l_floormask.png/v1525018972/blankmask.png",0);
    //     load_layer(this,0,"http://res.cloudinary.com/halfbug/image/upload/mask.png",0);
    // });

    //setTimeout(function(){ showTarget(); }, 10000);

    load_layout("assets/mask.png",
        "assets/whole.png",
        "",
        "assets/mask.png"
        // 'http://res.cloudinary.com/halfbug/image/upload/bathroom1.png'
    );
});

function load_layout(lname0,lname1,lname2,lname3){
    $('.scene').each(function() {
        // var design = $(this).attr('data-design');
        if(lname0)
        load_layer(this,0,lname0,0); //mask
        if(lname1)
        load_layer(this,1,lname1,0); //wall
        if(lname2)
        load_layer(this,2,lname2,0); //floor
        if(lname3)
        load_layer(this,3,lname3,1); //room
    });
}

function load_layer(layout,lindex,lsource,cevent){
    var id = $(layout).attr('id');
    var canvas = $(layout).find("canvas")[lindex];
    var ctx = canvas.getContext("2d");
    var img = new Image;
    img.setAttribute('crossOrigin', '');
    img.onload = function() {
        ctx.drawImage(this, 0, 0, 1600,1068);
        if(cevent)
        match_pixel(canvas,ctx);
    };
    img.src =lsource  ; // design;
 //return canvas;
}

function match_pixel(canvas, ctx){
    /// enable mouse click
    canvas.onclick = function(e) {

        /// adjust mouse position to be relative to canvas
        var canvasmask = $("#mask");
        var ctxmask = canvasmask[0].getContext("2d");
        var rect = canvas.getBoundingClientRect(),
            // x = e.clientX - rect.left,
            // y = e.clientY - rect.top;
            x= e.clientX - canvas.offsetLeft,
            y= e.clientY - canvas.offsetTop;

        /// grab a pixel
        var data = ctxmask.getImageData(x, y, 1, 1).data;
console.log(data);
        /// check it's alpha value to see if we're in a map point
        /// this of course assumes the map has transparent areas.
        /// if not just check for the color values instead.
        if (data[3] == 0 ) {
            $(".vit-message").show().delay(4000).fadeOut();
        }
    }
}

$( document ).on( "tileSelected",function( event, clayout ) {
var floortiling="";
var walltiling="";
    console.log( clayout );           // "bim"
    if(clayout.workingArea == "floor"){
       floortiling="http://res.cloudinary.com/halfbug/image/upload/c_thumb,fl_tiled,h_120,w_180,l_"
                        +clayout.floorTile+"/"
                        +"l_liner_floor_pattern.png/fl_cutter,l_floormask.png/v1525018972/blankmask.png"
    }
    else if(clayout.workingArea == "wall"){
        walltiling = "http://res.cloudinary.com/halfbug/image/upload/c_thumb,fl_tiled,h_120,l_" +
            layout.wallTile +
            ",w_180/l_basic_pattern_wall.png/fl_cutter,l_wallmask.png/v1525018972/blankmask.png";


    }

    load_layout("",floortiling,walltiling,"");
    $(".vit-message").delay(8000).fadeOut();
});