<!DOCTYPE html>
<!-- saved from url=(0040)https://www.toppstiles.co.uk/visualiser/ -->
<html class=" js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>
	

	<title>Stile | Virtual Rooms Design</title>

	<meta name="description" content="Personalise your home at the click of a button. Simply select a room type and then add your preferred tiles, grout or flooring to reveal your custom design">

	<!-- <meta name="viewport" content="width=device-width, initial-scale=0.7, minimal-ui"  name="apple-mobile-web-app-capable" content="yes"> -->
	<!-- Keep as 980 width scaled to display <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,minimal-ui"> -->
	<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

	<meta name="viewport" content="user-scalable=no">

<!-- 	<link rel="stylesheet" href="<?=base_url();?>assets/font-awesome.css"> -->
	<link rel="stylesheet" href="<?=base_url();?>assets/VisualizerToppsTilesGUI.css">
<script type="text/javascript" async="" src="<?=base_url();?>assets/ec.js"></script>
<script type="text/javascript" async="" src="<?=base_url();?>assets/analytics.js"></script>
<script type="text/javascript" id="MouseStatsTrackingScript" src="<?=base_url();?>assets/5695192039959168505.js" async=""></script>

</head>

<body style="background-color: rgb(255, 255, 255);">


<a download="room-styles-data.txt" href="https://visualiser/" class="save-saved-rooms-to-disk yellowButton">Save As 'Room Styles Data'</a>

<div class="vit-message hide" style="display: none;">
	<img class="hide" src="<?=base_url();?>assets/ajax-loader.gif" style="padding-left: 110px; display: block;">
	<p>First select a tile from Decorate Your Room on the left</p>
</div>

<div class="vit-tool-message hide">
	<p>...</p>
</div>

<div class="modal-container modal-webgl-overlay hide">
	<div class="vit-webgl-overlay">
		<p class="vit-webgl-overlay-title"><b>Welcome to the Topps Tiles Visualiser!</b></p>
		<p>To access our extra options such as laying borders, tiling as a range and creating a bespoke area, please ensure your browser or tablet is up to date with the latest software update.</p>
		<p>If you’d like to continue without the additional functionality, please select Continue.</p>
		<p class="vit-small-text">Please note that the additional functionality is unavailable on the iPad1 and some versions of the iPad2.</p>
		<div class="vit-webgl-overlay-margins">
		    <div class=""><a href="javascript:void(0);" class="run-layering yellowButton">Continue</a></div>
		</div>
	</div>
</div>

<div class="modal-container modal-webglfail-overlay hide">
	<div class="vit-webgl-overlay">
		<p class="vit-webgl-overlay-title"><b>Welcome to the Topps Tiles Visualiser!</b></p>
		<p>To access our extra options such as laying borders, tiling as a range and creating a bespoke area, your browser must be up to date with the latest software.</p>
		<p>There was a problem running this additional functionality on your browser and/or device, please select Retry to try again, or Continue to run with reduced functionality. You will be unable to lay borders, tile as a range or create a bespoke area. </p>
		<p class="vit-small-text">Please note that the additional functionality is unavailable on the iPad1 and some versions of the iPad2.</p>
		<div class="vit-webgl-overlay-margins">
		    <div class=""><a href="javascript:void(0);" class="run-layering yellowButton">Continue</a></div>
		</div>
		<div class="vit-webgl-overlay-margins">
		    <div class=""><a href="javascript:void(0);" class="run-retrywebgl yellowButton">Retry</a></div>
		</div>
	</div>
</div>

<div class="modal-container modal-startup-overlay hide" style="display: none;">
	<div class="vit-startup-overlay">
		<button class="close">
			<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
		</button>
		<p class="vit-startup-overlay-title"><b>Welcome to the Topps Tiles Visualiser</b></p>
		<p><b>We understand it can be difficult to visualise how your chosen tiles might look in your home, which is why we created our inspirational Visualiser.</b></p>
		<p>Choose from a wide variety of bathrooms, kitchens, living areas, indoor/outdoor areas or commercial spaces and lay your chosen tiles however you wish. You can mix and match styles, change laying patterns and even draw areas for features such as splashbacks.</p>
		<p>To get started, simply click ‘Get Started’ at the bottom of this message. A selection of room categories will appear and you’ll need to click on one of these which will then bring up a variety of room choices. Once you’ve chosen your room, you can then start tiling by selecting ‘Decorate Your Room’ and use our editing tools to create the room of your dreams. If you need any further assistance, please visit our <span class="vit-help-link">Help</span> section.</p>
		<img class="vit-get-started-image" src="<?=base_url();?>assets/welcome_image.jpg">
		<div class="vcol-md-4"></div>
		<div class="vcol-md-4">
			<div class="vit-get-started-button basket-btn"><a href="javascript:void(0);" class="yellowButton">GET STARTED</a></div>
		</div>
	</div>
</div>

<div class="modal-container modal-styles-overlay hide">
	<div class="vit-styles-overlay">
		<button class="close">
			<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
		</button>
		<p class="vit-styles-overlay-title"><b>Neutral Style</b></p>
		<p class="non-tablet">Hover over a surface to see which tiles have been used. Please note you can’t edit these rooms – click ‘Select Room’ from the left hand side panel to create one of your own!</p>
		<p class="tablet" style="display: none;">Tap a surface to see which tiles have been used. Please note you can’t edit these rooms – tap ‘Select Room’ from the left hand side panel to create one of your own!</p>
	</div>
</div>

<div class="vit-page-container" style="display: block;">

	<div class="scene-container">
		<div id="scene" class="scene">
            <canvas width="1600" height="1068" id="mask" class="render" style="width: 100%; height: auto; display:none"></canvas>
            <canvas width="1600" height="1068" class="outlines-canvas" style="width: 100%; height: auto;"></canvas>
            <canvas width="1600" height="1068" class="outlines-canvas" style="width: 100%; height: auto;"></canvas>
			<canvas class="outlines-canvas" onclick="void(0);" width="1600" height="1068" style="cursor: pointer; width: 100%; height: auto;">
				<p>Your browser doesn't support canvas.</p>
			</canvas>
		</div>
	</div>

<div class="quick-edits-container closeTools" style="right: 0px;">
	<div class="gui-tools" tt-gui-tools="">
		<div class="vcol-md-12 vl-no-padding" style="height: 100%">
			<div class="thumb vcol-md-12 vl-no-padding" style="height: 100%">
				<div class="v-quick-edit-heading">QUICK EDIT</div>
				<div class="quick-edit-container vl-no-padding">
					<div class="tool v-undo-change disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_undo.png">
						</div>
						<span class="disabled">Undo Change</span>
					</div>
					<div class="tool v-redo-change disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_redo.png">
						</div>
						<span class="disabled">Redo Change</span>
					</div>
					<div class="tool v-rotate-pattern disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_rotate.png">
						</div>
						<span class="disabled">Rotate Product</span>
					</div>
					<div class="tool v-change-pattern disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_pattern.png">
						</div>
						<span class="disabled">Change Pattern</span>
					</div>
					<div class="tool v-single-tile-mode disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_singletile.png">
						</div>
						<span class="disabled">Single Tile Mode</span>
					</div>
					<div class="tool v-clear-all-changes disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_clear.png">
						</div>
						<span class="disabled">Clear All Changes</span>
					</div>
					<div class="tool v-view-basket disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_basket.png">
						</div>
						<span class="disabled">View<br>Basket</span>
						<div class="v-view-basket-total" style="display: none;">999+</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

	<div class="modal-container modal-email hide">
		<div class="modal-popup">
			<div class="modal-default-bkg email">
    			<p class="heading">
        			<strong>Email This Room</strong>
    			</p>
    			<button ng-click="toggleShowModal()" class="close">
        			<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
        		</button>
        		<div class="vcol-md-12">
            		<div class="input-padding">
                		<div class="vcol-md-3">Your Name:</div>
                		<div class="vcol-md-9">
                    		<input class="input-full-width" type="text">
                    	</div>
                	</div>
                	<div class="input-padding">
                    	<div class="vcol-md-3">Email To:</div>
                    	<div class="vcol-md-9">
                        	<input class="input-full-width" type="text" placeholder="Separate email addresses with a comma">
                    	</div>
                	</div>
                	<div class="input-padding">
                    	<div class="vcol-md-3">Message:</div>
                    	<div class="vcol-md-9">
                    		<textarea class="input-full-width" rows="4" cols="50" name="comment"></textarea>
                    	</div>
                	</div>
            	</div>
            	<div class="vcol-md-12">
					<div class="email-btn"><a href="javascript:void(0);" class="yellowButton">Send</a></div>
            	</div>
        	</div>
    	</div>
    </div>
            

	<div class="modal-container modal-share hide">
		<div class="modal-popup">
			<div class="modal-default-bkg share">
    			<p class="heading">
    		    	<strong>Share Your Room</strong>
    			</p>
    			<div class="vl-center-block social-icon-container">
        			<button class="close">
            			<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
            		</button>
            		<div class="icons vl-center-block">
            		    <img src="<?=base_url();?>assets/icon_social_facebook.png">
            		    <img src="<?=base_url();?>assets/icon_social_twitter.png">
            		    <img src="<?=base_url();?>assets/icon_social_pinterest.png">
            		    <!-- <img src="images/<?=base_url();?>assets/icon_social_googleplus.png"> -->
            		    <!-- <img src="images/<?=base_url();?>assets/icon_social_email.png"> -->
            		</div>
        		</div>
        		<div class="exporting">
          		  <p class="vl-text-center exporting-text">Exporting your room image...</p>
        		</div>
        		<div class="share-it">
					<div class="vcol-md-12">
						<div class="vcol-md-offset-4 vcol-md-4">
						    <div><a href="javascript:void(0);" class="yellowButton">Share</a></div>
						</div>
					</div>
        		</div>
    		</div>
    	</div>
    </div>

	<div class="modal-container modal-pattern hide">
		<div class="modal-popup">
			<div class="modal-default-bkg pattern">
				<p class="heading">
		            <strong>Select a Tile Pattern</strong>
        		</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>

	            <div class="vcol-md-12 vit-no-padding">
    	            <div class="vcol-md-4 vit-no-padding">
	                    <div class="vl-pull-right">
    	                    <p>
        	                    <img class="select-pattern" src="<?=base_url();?>assets/icon_pattern_linear.png">
                            </p>
                            <p class="vl-text-center">Linear</p>
                        </div>
                    </div>
                    <div class="vcol-md-4 vit-no-padding">
                    	<div class="vit-pull-left">
                        	<p>
                            	<img class="select-pattern" src="<?=base_url();?>assets/icon_pattern_brick.png">
                            </p>
                            <p class="vl-text-center">Brick</p>
                        </div>
                    </div>
    	            <div class="vcol-md-4 vit-no-padding">
	                    <div class="vl-pull-right">
    	                    <p>
        	                    <img class="select-pattern" src="<?=base_url();?>assets/icon_pattern_diamond.png">
                            </p>
                            <p class="vl-text-center">Diamond</p>
                        </div>
                    </div>
	           </div>

	            <div class="vcol-md-12 vit-no-padding">
                    <div class="vcol-md-4 vit-no-padding">
                    	<div class="vit-pull-left">
                        	<p>
                            	<img class="select-pattern" src="<?=base_url();?>assets/icon_pattern_herringbone.png">
                            </p>
                            <p class="vl-text-center">Herringbone</p>
                        </div>
                    </div>
                    <div class="vcol-md-4 vit-no-padding">
                    	<div class="vit-pull-left">
                        	<p>
                            	<img class="select-pattern" src="<?=base_url();?>assets/icon_pattern_block_herringbone.png">
                            </p>
                            <p class="vl-text-center">Block Herringbone</p>
                        </div>
                    </div>
                    <div class="vcol-md-4 vit-no-padding">
                    	<div class="vit-pull-left">
                        	<p>
                            	<img class="select-pattern" src="<?=base_url();?>assets/icon_pattern_34_brick_bond.png">
                            </p>
                            <p class="vl-text-center">¾ Brick Bond</p>
                        </div>
                    </div>
	           </div>


            </div>
        </div>
    </div>

	<div class="modal-container modal-decorate-options hide">
		<div class="modal-popup">
			<div class="modal-default-bkg decorate-options">
				<p class="heading">
					<strong>What would you like to do?</strong>
				</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>

				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-change-single-tile yellowButton">Change Tile</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-move-single-tile yellowButton">Move Tile</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-delete-single-tile yellowButton">Delete Tile</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-grout-border yellowButton"><span class="border-type-border">Change Border Grout</span><span class="border-type-capping">Change Capping Grout</span><span class="border-type-finishing-strip">Change Finishing Strip Grout</span></a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-change-border yellowButton"><span class="border-type-border">Change Border</span><span class="border-type-capping">Change Capping</span><span class="border-type-finishing-strip">Change Finishing Strip</span></a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-edit-border yellowButton"><span class="border-type-border">Move/Resize Border</span><span class="border-type-capping">Move/Resize Capping</span><span class="border-type-finishing-strip">Move/Resize Finishing Strip</span></a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-delete-border yellowButton"><span class="border-type-border">Delete Border</span><span class="border-type-capping">Delete Capping</span><span class="border-type-finishing-strip">Delete Finishing Strip</span></a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-mosaic-fill yellowButton">Fill With Mosaic</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-mosaic-border yellowButton">Lay Mosaic Border</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-tile-zone yellowButton">Lay Tile</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-tiles-zone yellowButton">Lay Tiles</a></div>
				</div>
<!--				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-single-zone yellowButton">Change Single Tile</a></div>
				</div> -->
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-lay-floor-border yellowButton">Change Floor Border</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-change-skirting yellowButton">Change Skirting</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-grout-zone yellowButton">Change Grout</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-grout-floor-border yellowButton">Change Floor Border Grout</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-edit-zone yellowButton">Move/Resize Tile Area</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-delete-zone yellowButton">Delete Tile Area</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-delete-floor-border yellowButton">Delete Floor Border</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-delete-skirting yellowButton">Delete Skirting</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="decorate-delete-glass-splashback yellowButton">Delete Glass Splashback</a></div>
				</div>
				<div class="vcol-md-12 decorate-options-margins">
				    <div><p class="decorate-tile-zone-text">To change the tile within the area, first select a new tile and then click inside the area to lay</p></div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-container modal-tiling-range-or-single hide">
		<div class="modal-popup">
			<div class="modal-default-bkg tiling-range-or-single">
				<p class="heading">
					<strong>What would you like to do?</strong>
				</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>
				<div class="vcol-md-12 tiling-range-or-single-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="yellowButton">Decorate my room using only this tile</a></div>
				</div>
				<div class="vcol-md-12 tiling-range-or-single-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="yellowButton">Decorate my room by mixing with other tiles in the same range</a></div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-container modal-tiling-range hide">
		<div class="modal-popup">
			<div class="modal-default-bkg tiling-range">
				<div class="heading">
					<strong>Please select the tiles you would like to decorate with:</strong>
					<p class="sub-heading">(make your selection first and then decide your percentage mix)</p>
				</div>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>

				<div class="vit-tiling-range-heading">
					<div class="tile-range-col-tile">&nbsp;
					</div>
					<div class="tile-range-col-select vl-text-center">
						<p><strong>Select Tile</strong></p>
					</div>
					<div class="tile-range-col-price vl-text-center">
						<p><strong>Percentage Mix</strong></p>
					</div>
				</div>

				<div class="vit-tiling-range-list">
	
					<div class="tiling-range-margins">
						<div class="tile-range-col-tile-name vl-text-center">
							<p class="vit-tile-range-tile-name">Tile Name</p>
						</div>

						<div class="tile-range-col-tile vl-text-center">
							<img class="vit-tile-range-thumbnail" src="<?=base_url();?>assets/811639.jpg">
						</div>
						<div class="tile-range-col-select vl-text-center vit-tile-range-top-align">
							<img data-select-id="SELECT-ID-ENABLE" class="vit-tile-range-tick" src="<?=base_url();?>assets/checkbox_inactive.png">
						</div>
						<div class="tile-range-col-percentage vit-tile-range-percentage vl-text-center vit-tile-range-top-align">
							<input data-select-id="SELECT-ID-PERCENTAGE" class="number-input" type="number">
						</div>
					</div>

				</div>

				<div class="vcol-md-12 range-basket-add">
				    <div class="basket-btn"><a href="javascript:void(0);" class="yellowButton">Select</a></div>
				</div>
				<div class="vcol-md-12 vit-tiling-range-error-message">abc</div>

			</div>
		</div>
	</div>

	<div class="modal-container modal-range-samples hide">
		<div class="modal-popup">
			<div class="modal-default-bkg range-samples">
				<p class="heading">
					<strong>Please select the tiles you would like to order a sample of:</strong>
				</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>

				<div class="vit-range-samples-heading">
					<div class="tile-range-col-tile">&nbsp;
					</div>
					<div class="tile-range-col-select vl-text-center">
						<p><strong>Select Tile</strong></p>
					</div>
					<div class="tile-range-col-price vl-text-center">
						<p><strong>Price (inc. VAT)</strong></p>
					</div>
				</div>

				<div class="vit-range-samples-list">
	
					<div class="range-samples-margins">
						<div class="tile-range-col-tile-name vl-text-center">
							<p class="vit-tile-range-tile-name">Tile Name</p>
						</div>

						<div class="tile-range-col-tile vl-text-center">
							<img class="vit-tile-range-thumbnail" src="<?=base_url();?>assets/811639.jpg">
						</div>
						<div class="tile-range-col-select vl-text-center vit-tile-range-top-align tile-range-not-in-basket">
							<img data-select-id="SELECT-ID-ENABLE" data-list-index="LIST-INDEX" class="vit-tile-range-tick" src="<?=base_url();?>assets/checkbox_inactive.png">
						</div>
						<div class="tile-range-col-price vl-text-center vit-tile-range-top-align tile-range-not-in-basket">
							<p class="tile-range-price">0.00</p>
						</div>
						<div class="tile-range-col-already-in-basket vl-text-center vit-tile-range-top-align tile-range-is-in-basket">
							<p>Already in basket</p>
							<p>Sample unavailable</p>
						</div>
					</div>

				</div>

				<div class="vcol-md-12 range-basket-add">
				    <div class="basket-btn"><a href="javascript:void(0);" class="yellowButton">Add To Basket</a></div>
				</div>

			</div>
		</div>
	</div>

	<div class="modal-container modal-range-basket hide">
		<div class="modal-popup">
			<div class="modal-default-bkg range-basket">
				<p class="heading">
					<strong>Please select the tiles you would like to add to your basket:</strong>
				</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>

				<div class="vit-range-basket-heading">
					<div class="tile-range-col-tile">&nbsp;
					</div>
					<div class="tile-range-col-select vl-text-center">
						<p><strong>Select Tile</strong></p>
					</div>
					<div class="tile-range-col-price vl-text-center">
						<p><strong>Price (inc. VAT)</strong></p>
					</div>
					<div class="tile-range-col-quantity vl-text-center">
						<p><strong>Quantity</strong></p>
					</div>
					<div class="tile-range-col-or basket-centre-or vl-text-center">
						<p>- or -</p>
					</div>
					<div class="tile-range-col-coverage vl-text-center">
						<p><strong>m<sup>2</sup></strong></p>
					</div>
				</div>

				<div class="vit-tile-range-list">
	
					<div class="range-basket-margins">
						<div class="tile-range-col-tile-name vl-text-center">
							<p class="vit-tile-range-tile-name">Tile Name</p>
						</div>

						<div class="tile-range-col-tile vl-text-center">
							<img class="vit-tile-range-thumbnail" src="<?=base_url();?>assets/811639.jpg">
						</div>
						<div class="tile-range-col-select vl-text-center vit-tile-range-top-align tile-range-not-in-basket">
							<img data-select-id="SELECT-ID-ENABLE" data-list-index="LIST-INDEX" class="vit-tile-range-tick" src="<?=base_url();?>assets/checkbox_inactive.png">
						</div>
						<div class="tile-range-col-price vl-text-center vit-tile-range-top-align tile-range-not-in-basket">
							<p class="tile-range-price">£0.00</p>
						</div>
						<div class="tile-range-col-quantity vit-tile-range-quantity vl-text-center vit-tile-range-top-align tile-range-not-in-basket">
							<input data-select-id="SELECT-ID-QUANTITY" class="number-input" type="number">
						</div>
						<div class="tile-range-col-or vl-text-center vit-tile-range-top-align tile-range-not-in-basket">
						</div>
						<div class="tile-range-col-coverage vit-tile-range-coverage vl-text-center vit-tile-range-top-align tile-range-not-in-basket">
							<input data-select-id="SELECT-ID-COVERAGE" class="number-input" type="number">
						</div>
						<div class="tile-range-col-sample-already-in-basket vl-text-center vit-tile-range-top-align tile-range-is-in-basket">
							<p>Sample already in basket</p>
						</div>
					</div>

				</div>

				<div class="vcol-md-12 range-basket-add">
				    <div class="basket-btn"><a href="javascript:void(0);" class="yellowButton">Add To Basket</a></div>
				</div>

			</div>
		</div>
	</div>

	<div class="modal-container modal-basket hide">
		<div class="modal-popup">
			<div class="modal-default-bkg basket">
				<p class="heading">
					<strong>Add To Basket</strong>
				</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>
				<div class="vl-row basket-margins vl-text-center">
					<div class="no-metres-sq hide vcol-md-3">
					</div>
					<div class="vcol-md-offset-1 vcol-md-4">
						<div class="vl-text-center">
							<p>Quantity</p>
							<input class="number-input" type="number">
						</div>
					</div>
					<div class="vcol-md-2">
						<div class="basket-centre-or vl-text-center">- or -</div>
					</div>
					<div class="vcol-md-4">
						<div class="metres-sq vl-text-center">
							<p>m<sup>2</sup></p>
							<input class="number-input" type="number">
						</div>
					</div>
				</div>
				<div class="vl-row">
					<div class="vcol-md-12 vl-text-center">
						<p class="normal-text">
							<strong>Price</strong> (incl. VAT) 
							<strong>£0.00</strong>
						</p>
					</div>
				</div>
				<div class="vcol-md-12 basket-margins">
				    <div class="basket-btn"><a href="javascript:void(0);" class="yellowButton">Add To Basket</a></div>
				</div>
			</div>
		</div>
	</div>

	<div class="select-tile-modal" style="display: none;">
		<div>
			<button class="close">
				<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
			</button>
			<div class="vl-tile-popup-thumbnail">
				<img class="vit-thumbnail" src="<?=base_url();?>assets/811639.jpg">
			</div>
			<div class="vl-tile-popup-details details">
				<p class="normal-text">Deco Red</p>
				<p class="small-text">Code: 123456</p>
				<p class="small-text">20cm x 20cm</p>
				<p class="price">
					<strong>123.45</strong>
					<span class="small-text">price/box</span>
				</p>
				<p class="price">
					<strong>678.99</strong>
					<span class="small-text">price/m<sup>2</sup></span>
				</p>
			    <div class="select-tile"><a href="javascript:void(0);" class="yellowButton">Select Tile</a></div>
<!--				<button class="select-tile">
					<strong>Select Tile</strong>
				</button>-->
     		</div>
		</div>
	</div>

	<div class="style-tile-modal hide" style="display: none;">
		<div>
			<div class="vl-tile-popup-thumbnail">
				<img class="vit-thumbnail" src="<?=base_url();?>assets/811639.jpg">
			</div>
			<div class="vl-tile-popup-details details">
				<p class="normal-text">Deco Red</p>
				<p class="small-text">Code: 123456</p>
				<p class="small-text">20cm x 20cm</p>
				<p class="price">
					<strong>123.45</strong>
					<span class="small-text">price/box</span>
				</p>
				<p class="price">
					<strong>678.99</strong>
					<span class="small-text">price/m<sup>2</sup></span>
				</p>
     		</div>
		</div>
	</div>

	<div class="modal-container modal-save-room-changes-yn hide">
		<div class="modal-popup">
			<div class="modal-default-bkg save-room-changes-yn">
				<p class="heading">
					<strong class="v-save-yn v-save-load">Select Room</strong>
					<strong class="v-save-yn v-save-share hide">Share Room</strong>
					<strong class="v-save-yn v-save-email hide">Email Room</strong>
					<strong class="v-save-yn v-save-print hide">Print Room</strong>
					<strong class="v-save-yn v-save-view-tiles-used hide">View Tiles Used</strong>
				</p>
				<p class="v-text">
					<span class="v-save-yn v-save-load">Before you select your room, do you want to save changes to the room that you're working on?</span>
					<span class="v-save-yn v-save-share hide">Before you share your room, do you want to save changes to the room that you're working on?</span>
					<span class="v-save-yn v-save-email hide">Before you email your room, do you want to save changes to the room that you're working on?</span>
					<span class="v-save-yn v-save-print hide">Before you print your room, do you want to save changes to the room that you're working on?</span>
					<span class="v-save-yn v-save-view-tiles-used hide">Before you view your room tiles, do you want to save changes to the room that you're working on?</span>
				</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>
				<div class="vcol-md-12 save-room-changes-yn-margins">
				    <div class="basket-btn v-yes"><a href="javascript:void(0);" class="yellowButton">Yes</a></div>
				    <div class="basket-btn v-no"><a href="javascript:void(0);" class="yellowButton">No</a></div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-container modal-area-options hide">
		<div class="modal-popup">
			<div class="modal-default-bkg area-options">
				<p class="heading">
					<strong>What would you like to do?</strong>
				</p>
				<button class="close">
					<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
				</button>
				<div class="vcol-md-12 area-options-margins">
				    <div class="v-area-option-fill-whole-floor"><img src="<?=base_url();?>assets/mosaics_fill_whole_floor.png"><p>Fill Whole Floor</p></div>
				    <div class="v-area-option-fill-whole-floor-and-skirting"><img src="<?=base_url();?>assets/icon_fill_whole_floor_and_skirting.png"><p>Fill Whole Floor &amp; Skirting</p></div>
				    <div class="v-area-option-fill-whole-wall"><img src="<?=base_url();?>assets/mosaics_fill_whole_wall.png"><p>Fill Whole Wall</p></div>
				    <div class="v-area-option-fill-half-wall"><img src="<?=base_url();?>assets/mosaics_fill_bottom_half_of_wall.png"><p>Fill Bottom Area of Wall</p></div>
				    <div class="v-area-option-lay-mosaic-border"><img src="<?=base_url();?>assets/mosaics_lay_border.png"><p>Lay Mosaic Border</p></div>
				    <div class="v-area-option-create-splashback"><img src="<?=base_url();?>assets/mosaics_create_a_splashback.png"><p>Create a Splashback</p></div>
				    <div class="v-area-option-draw-wall-area"><img src="<?=base_url();?>assets/mosaics_draw_an_area_wall.png"><p>Draw an Area</p></div>
				    <div class="v-area-option-draw-floor-area"><img src="<?=base_url();?>assets/mosaics_draw_an_area_floor.png"><p>Draw an Area</p></div>
				</div>
			</div>
		</div>
	</div>

	<div class="main-nav-container vl-main-nav" style="left: 0px;">
		<div class="main-nav vl-main-nav-content">

			<div class="logo">
				<img src="<?=base_url();?>assets/logo-stile.png" usemap="#tt-logo-map">
				<map name="tt-logo-map">
				  <area shape="rect" coords="0,0,150,36" alt="Sun" target="_blank" href="http://www.toppstiles.co.uk/">
				</map>
			</div>

			<div class="menu-items">

				<a class="menu-item v-rooms-list ">
					
					<p>SELECT A ROOM</p>
				</a>

				<div class="sub-menu-items">
                    <a class="sub-menu-item" data-select-id="SelectRoomType=Bathroom">Bathrooms</a>
                    <a class="sub-menu-item" data-select-id="SelectRoomType=Kitchen">Kitchens</a>
                    <a class="sub-menu-item" data-select-id="SelectRoomType=Living Area">Living Areas</a>
<!--                    <a class="sub-menu-item" data-select-id="SelectRoomType=Outside Space">Indoor/Outdoor<span class="pull-right fa fa-angle-right"></span></a>-->
<!--                    <a class="sub-menu-item" data-select-id="SelectRoomType=Commercial Space">Commercial Spaces<span class="pull-right fa fa-angle-right"></span></a>-->
<!--                    <a class="sub-menu-item" data-select-id="SelectRoomType=*">All Rooms<span class="pull-right fa fa-angle-right"></span></a>-->
<!--                    <a class="sub-menu-item" data-select-id="SelectRoomType=Saved">My Saved Rooms<span class="pull-right fa fa-angle-right"></span></a>-->
                </div>

				<a class="menu-item v-tiles-list">
					
					<p>DECORATE YOUR ROOM</p>
				</a>

				<div class="sub-menu-items">
                    <a class="sub-menu-item" data-tiles-type="Wall Tiles">Wall Tiles<span class="pull-right fa fa-angle-right"></span></a>
                    <a class="sub-menu-item" data-tiles-type="Floor Tiles">Floor Tiles<span class="pull-right fa fa-angle-right"></span></a>
                </div>
<!--
				<a class="menu-item v-tile-area">
					<img class="icon" src="<?=base_url();?>assets/icon_menu_createarea.png">
					<p>DRAW AREA</p>
				</a>


				<a class="menu-item">
					<img class="icon" src="images/<?=base_url();?>assets/icon_menu_chooseyourstyle.png">
					<p>CHOOSE YOUR STYLE</p>
				</a>

				<div class="sub-menu-items">
					<a class="sub-menu-item selected">
					Bathrooms
					<span class="pull-right fa fa-angle-right"></span>
					</a>
				</div>
-->

				<a class="menu-item v-favourites-list">
					
					<p>YOUR FAVOURITES (0)</p>
				</a>
				<a class="menu-item v-tiles-used-list">
					
					<p>VIEW TILES USED (0)</p>
				</a>
				<a class="menu-item v-basket-list">
					
					<p>BASKET (0)</p>
				</a>
				<a class="menu-item v-help">
					
					<p>HELP</p>
				</a>



			</div>



		</div>

	</div>

	<div class="vit-pane-container vl-pane" style="left: -684px;">

		<div class="vit-hide-scrollbar vit-scrollbar1" style="display: none;"></div>
		<div class="vit-hide-scrollbar vit-scrollbar2" style="display: none;"></div>

		<div class="vit-content-pane vl-pane-content">





			<div class="vit-content-help" style="display: none;">

				<div class="vcol-md-12">
				<div class="vcol-md-12">

					<p class="heading">Help</p>

<p>
</p><p class="section-jump" data-section-pos="section1-pos">Selecting a Room</p>
<p class="section-jump" data-section-pos="section2-pos">Decorating Your Room</p>
<p class="section-jump" data-section-pos="section3-pos">Drawing an Area</p>
<p class="section-jump" data-section-pos="section4-pos">Editing Your Decorated Room</p>
<p class="section-jump" data-section-pos="section5-pos">Share/Save/Print</p>
<p class="section-jump" data-section-pos="section6-pos">View Tiles Used</p>
<p class="section-jump" data-section-pos="section7-pos">Making an Order/Viewing Your Basket</p>
<p class="section-jump" data-section-pos="section8-pos">Product Details</p>
<p></p>

<div class="section1-pos"></div>
<p><b>Selecting a Room</b></p>
<p>Choose ‘Select A Room’ from the left hand tab. This will open a range of Bathrooms, Kitchens, Living Areas, Indoor/Outdoor areas and Commercial Spaces for you to choose from. We recommend selecting a room to decorate which best resembles your home. Simply click on the room type you’d like to decorate and then click on your chosen room to select it.</p>
<p>This area will also contain any rooms you have previously saved.</p>
<img src="<?=base_url();?>assets/help_selecting_a_room.jpg">

<div class="section2-pos"></div>
<p><b>Decorating Your Room</b></p>
<p>Choose ‘Decorate Your Room’ from the left hand tab. Select the tile type you’d like to use in your room and this will open all available tiles. Scroll down to see more and use the page numbers at the top to click to the next page. To narrow down your search, click ‘Filter Your Results’. This will allow you to search by tile type, size, material, colour and shape; click ‘Apply Filters &amp; Exit’ to view your selections. Please note your filters will apply until you go back and remove them. If you already know the name or code of a tile you like, you can type this in the search box and press the search icon.</p>
<p>Along with our wall and floor tiles, you can also view our range of Mosaics, Natural Stone or Borders by clicking the links on the left hand side of the tab.</p>
<p>Once you have found a product that you like, click on the tile and it will become highlighted in a yellow border. You have now selected your tile, and once you click on a surface, you will start the decorating process. Please note that tiles which are suitable for wall only cannot be placed on the floor.</p>
<p>When you have selected a tile, it will appear in the bottom right hand tab to remind you of your choice.</p>
<img src="<?=base_url();?>assets/help_tile_selected.jpg">
<p>When you click on a surface, you will be presented with different options depending on your room type. You will be asked if you’d like to tile the whole wall or floor, the bottom area of the wall, draw an area or create a splashback.</p>
<img src="<?=base_url();?>assets/help_half_wall.jpg">
<p>If you choose a Mosaic, you will be given the option of tiling the whole surface, the bottom area of the wall, laying the Mosaic as a border or drawing an area. If you select to lay the Mosaic as a border, it will be placed on the surface and you can then click on the border to change the width of the border, move its position or lay another Mosaic in this area.</p>
<img src="<?=base_url();?>assets/help_mosaic_tile.jpg">
<p>If you select a tile that is from a mixed range, an overlay will appear and you can select the mix of tiles you’d like to use. The mix will be divided by the number of tiles you choose but you can change this, although the percentage mix must add up to 100%.</p>
<img src="<?=base_url();?>assets/help_mixed_range.jpg">
<p>Once you have tiled your area, you can change the grout colour. Go back to ‘Decorate Your Room’ and select ‘Grout’. Click on a colour you like and click a tiled surface to apply the grout colour.</p>
<p>You can also change the colour of any worktops or cabinets in a kitchen by selecting these from the left hand panel and clicking on the surface you’d like to change.</p>
<p>If you select ‘Paint’, you will have the option to add a paint colour to a wall. Simply select the colour of your choice and click on the area of your room you’d like to paint.</p>
<p>When you make changes to a room, you will be asked if you want to save your changes before you move on to decorate another room. Select ‘Yes’ to add your current room to your ‘Saved Rooms’ or ‘No’ to delete it completely.</p>

<div class="section3-pos"></div>
<p><b>Drawing an Area</b></p>
<p>Choose ‘Draw Area’ from the left hand tab, or select it as your first option in the overlay when you go to tile a wall or floor, and place your cursor on the surface you wish to create your area on. This will automatically lay a purple square which you can then move or resize. Simply click on the purple area and three options will appear allowing you to lay your selected tile, move or resize the area or delete the area. To move or resize the area, select this option and then use the yellow guide dots to change the shape and size of the area and the arrows to move the area. Once you’ve created an area you’re happy with, click on anywhere within the room to confirm its placement. You can then select ‘Lay Tiles’ and fill the area with your chosen tile or select a new tile and click in the area to place it here.</p>
<p>You can also amend your area later by clicking on it and selecting ‘Move/Resize Tile Area’. Drag the border of the area to change its size or shape and use the arrows in the centre of the area to reposition it. You can also delete your area by clicking on it and selecting ‘Delete Tile Area’.</p> 
<img src="<?=base_url();?>assets/help_creating_an_area.jpg">

<div class="section4-pos"></div>
<p><b>Editing Your Decorated Room</b></p>
<p>Once you have selected your tile, all of the options to edit your room can be found in the ‘Quick Edit’ panel at the top right of the screen.</p>
<p>The ‘Quick Edit’ options to edit your room are as follows:</p>
<ul>
<li>Undo Change – click this button to undo the last thing you did</li>
<li>Redo Change – click this button to redo the last thing you did</li>
<li>Rotate Product – click this button and then click the surface on which you want the tiles to rotate. The tiles will rotate from horizontal to vertical, or vice versa</li>
<li>Change Pattern – any tiles selected will automatically be tiled in a brick effect pattern. To change this, click this button and choose from the range of patterns on the overlay. Click the surface on which you want to change the pattern of the tiles</li>
<li>Single Tile – this option allows you to lay a tile singularly on a tiled surface. Select the tile you’d like to lay and then select ‘Single Tile’. Simply place the tile on the tiled surface in the position of your choice. You will stay in ‘Single Tile’ mode until you select a new tile or a blank room.</li> 
<li>Clear All Changes – click this button to go back to a blank room. If you click this accidentally, click ‘Undo Change’ and your room will go back to the way it was</li>
</ul>
<img src="<?=base_url();?>assets/help_top_toolbar.jpg">

<div class="section5-pos"></div>
<p><b>Share/Save/Print</b></p>
<p>All of these options can be found in the panel at the bottom right of the screen. To open this, click the yellow tab.</p>
<p>To share your decorated room via Facebook, Pinterest or Twitter, click ‘Share Room’ and select the desired social media icon. You can also email your decorated room – click ‘Email Room’ and add in your details. You can send your visualised room to yourself, a friend or even a Topps Tiles store. This will email an image of your decorated room, as well as a list of the products used.</p>
<p>To save your room, click ‘Save Room’. Please note that this is saved via the cookies on your machine so you will only be able to view using the same computer. You can view your saved rooms from the left hand tab, in the ‘Select A Room’ link. Here you’ll have the option to view your saved room, view the tiles you’ve used and share/save/print. You can also open the room to make further changes.</p>
<p>If you’d like to save the tile you’re currently using, click ‘Save Tile’. The product will be moved to ‘Your Favourites’ which can be accessed via the left hand panel.</p>
<p>To print your room, click ‘Print Room’. This will print out an image of your decorated room, as well as a list of the products used.</p>
<img src="<?=base_url();?>assets/help_bottom_toolbar.jpg">

<div class="section6-pos"></div>
<p><b>View Tiles Used</b></p>
<p>To view the tiles you’ve used in the room you’re currently decorating, select ‘View Tiles Used’ on the left hand panel. This will display your tiles and give you the option to add these to your basket or save them to ‘Your Favourites’.</p>

<div class="section7-pos"></div>
<p><b>Making an Order/Viewing Your Basket</b></p>
<p>Once you have selected your tile, the options to place an order can be found in the panel at the bottom right of the screen. To open this, click the yellow arrow. You can either order a sample, or place a full order from here.</p>
<p>To place a sample order, click ‘Order Sample’. This will automatically add one tile to your basket.</p>
<p>To place a full order, click ‘Add to Basket’. This will open a pop up where you can enter the quantity by pieces, or in m². Simply add your desired quantity and click ‘Add to Basket’ in the overlay. This can be viewed from the ‘Basket’ link in the left hand panel or the top right hand ‘Quick Edit’ tool. When this is clicked, it opens the basket where the quantities can be edited, or you can checkout by selecting ‘Pay Securely Now’. This will link you back to the main Topps Tiles website to make payment.</p>
<p>Please note that anything you have added to your basket on the main Topps Tiles website will automatically appear in the Visualiser basket, and vice versa.</p>

<div class="section8-pos"></div>
<p><b>Product Details</b></p>
<p>Once you have selected your tile, the option to find out more can be found in the panel at the bottom right of the screen. To open this, click the yellow arrow.</p>
<p>To find out more information about your selected tile, click ‘Product Details’. This will open up the product page on the main website, in a new tab.</p>

<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
<p><br></p>
				</div>
				</div>
			</div>


			<div class="vit-content-rooms-type">
			<!--
			<button class="close btn-cross" style="float:right;z-index: 100;position: relative;">
			<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
		</button>
			-->
				<p class="heading">Select the type of room you'd like to decorate</p>
				<div class="rooms-type-list vl-rooms">
					<div class="vl-room-type">
						<div class="v-room-type-selector" data-select-id="SelectRoomType=Bathroom">
							<p class="heading">Bathrooms</p>

                            <img class="vit-room-type" src="<?=base_url();?>assets/room_bathroom.png">
							<div class="v-select-room-type-button">Select Room »</div>
						</div>
					</div>
					<div class="vl-room-type">
						<div class="v-room-type-selector" data-select-id="SelectRoomType=Kitchen">
							<p class="heading">Kitchens</p>
							<img class="vit-room-type" src="<?=base_url();?>assets/room_kitchen.png">
							<div class="v-select-room-type-button-disabled" >Select Room »</div>
						</div>
					</div>
					<div class="vl-room-type">
						<div class="v-room-type-selector" data-select-id="SelectRoomType=Living Area">
							<p class="heading">Living Areas</p>
							<img class="vit-room-type" src="<?=base_url();?>assets/room_living_areas.png">
							<div class="v-select-room-type-button-disabled">Select Room »</div>
						</div>
					</div>
<!--					<div class="vl-room-type">-->
<!--						<div class="v-room-type-selector" data-select-id="SelectRoomType=Outside Space">-->
<!--							<p class="heading">Indoor/Outdoor</p>-->
<!--							<img class="vit-room-type" src="--><?//=base_url();?><!--assets/room_indoor_outdoor.png">-->
<!--							<div class="v-select-room-type-button-disabled">Select Room »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-room-type">-->
<!--						<div class="v-room-type-selector" data-select-id="SelectRoomType=Commercial Space">-->
<!--							<p class="heading">Commercial Spaces</p>-->
<!--							<img class="vit-room-type" src="--><?//=base_url();?><!--assets/room_commercial_spaces.png">-->
<!--							<div class="v-select-room-type-button-disabled">Select Room »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-room-type">-->
<!--						<div class="v-room-type-selector" data-select-id="SelectRoomType=*">-->
<!--							<p class="heading">All Rooms</p>-->
<!--							<img class="vit-room-type" src="--><?//=base_url();?><!--assets/room_all_rooms.png">-->
<!--							<div class="v-select-room-type-button-disabled">Select Room »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-room-type">-->
<!--						<div class="v-room-type-selector" data-select-id="SelectRoomType=Saved">-->
<!--							<p class="heading">My Saved Rooms</p>-->
<!--							<img class="vit-room-type" src="--><?//=base_url();?><!--assets/room_saved_rooms.png">-->
<!--							<div class="v-select-room-type-button">Select Room »</div>-->
<!--						</div>-->
<!--					</div>-->
				</div>
			</div>

			<div class="vit-content-rooms" style="display: none;">
<!--				<div class="v-select-room-back"> « Back</div>-->
				<p class="heading hide">Sel ect a Room</p>
<!--				<p class="heading">Select a Saved Room</p>-->
				<p class="heading">Select a Room Style</p>
<!--				<p class="vit-commercial-rooms-sub-heading">Please note that some tiles may not be suitable for commercial areas. To double check please call Customer Services on 0800 783 6262 or visit your local store.</p>-->
<!--				<p class="rooms-empty vcol-md-offset-12 vl-text-center">-->
<!--					No Saved Rooms found<br><br>-->
<!--					Please create a room and then save it here where it can be admired, edited or even sent to your friends!-->
<!--				</p>-->
				<div class="rooms-list vl-rooms">
					<div class="vl-room vit-room-container">
						<div class="v-room-selector ROOM-STYLE" data-select-id="SELECT-ID-ROOM">
<!--							<button class="share HIDE-SHARE" data-select-id="SELECT-ID-SHARE">-->
<!--								<img alt="" src="--><?//=base_url();?><!--assets/saved_rooms_share.png">-->
<!--							</button>-->
<!--							<button class="email HIDE-EMAIL" data-select-id="SELECT-ID-EMAIL">-->
<!--								<img alt="" src="--><?//=base_url();?><!--assets/saved_rooms_email.png">-->
<!--							</button>-->
<!--							<button class="print HIDE-PRINT" data-select-id="SELECT-ID-PRINT">-->
<!--								<img alt="" src="--><?//=base_url();?><!--assets/saved_rooms_print.png">-->
<!--							</button>-->
<!--							<button class="close HIDE-DELETE" data-select-id="SELECT-ID-DELETE">-->
<!--								<img alt="" src="--><?//=base_url();?><!--assets/icon_close.png">-->
<!--							</button>-->
							<img class="vit-room" src="<?=base_url();?>assets/bathroom-thumb.png">
							<div class="v-select-room-button ROOM-BUTTON-STYLE HIDE-SELECT-ROOM">Select Room »</div>

<!--							<div class="v-view-room-button HIDE-VIEW-ROOM">View Room »</div>-->
<!--							<div class="v-view-tiles-used-button HIDE-VIEW-TILES-USED" data-select-id="SELECT-ID-VIEW-TILES-USED">View Tiles Used »</div>-->

						</div>
					</div>
				</div>
			</div>

			<div class="vit-content-tiles-type" style="display: none;">
				<p class="heading">Decorate Your Room</p>
				<div class="tile-type-list vl-rooms">
					<div class="vl-tile-type">
						<div class="v-tile-type-selector" data-select-tile-type="Wall Tiles">
							<p class="heading">Wall Tiles</p>
							<img class="vit-tile-type" src="<?=base_url();?>assets/decorate_wall_tiles.jpg">
							<div class="v-select-tile-type-button">Select »</div>
						</div>
					</div>
					<div class="vl-tile-type">
						<div class="v-tile-type-selector" data-select-tile-type="Floor Tiles">
							<p class="heading">Floor Tiles</p>
							<img class="vit-tile-type" src="<?=base_url();?>assets/decorate_floor_tiles.jpg">
							<div class="v-select-tile-type-button">Select »</div>
						</div>
					</div>
<!--					<div class="vl-tile-type">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Mosaics">-->
<!--							<p class="heading">Mosaics</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_mosaics.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Natural Stone">-->
<!--							<p class="heading">Natural Stone</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_natural_stone.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type vl-tile-type-glass-splashbacks">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Glass Splashbacks">-->
<!--							<p class="heading">Glass Splashbacks</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/element_splashbacks.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Borders">-->
<!--							<p class="heading">Borders and Corners</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_borders.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Capping and Finishing Strips">-->
<!--							<p class="heading">Capping and Finishing Strips</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_capping.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Wood Flooring">-->
<!--							<p class="heading">Wood Flooring</p>-->
<!--							<img class="vit-tile-type" src="images/--><?//=base_url();?><!--assets/decorate_wood_flooring.jpg">-->
<!--							<div class="v-select-tile-type-button">Select &raquo;</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Grout">-->
<!--							<p class="heading">Grout</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_grout.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Paint">-->
<!--							<p class="heading">Paint</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_paint.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type v-coloured-worktops-cabinets" style="display: none;">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Cabinets">-->
<!--							<p class="heading">Cabinets</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_cabinets.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type v-coloured-worktops-cabinets" style="display: none;">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Worktops">-->
<!--							<p class="heading">Worktops</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_worktops.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type v-textured-worktops-cabinets">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Cabinets Texture">-->
<!--							<p class="heading">Cabinets</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/decorate_cabinets.jpg">-->
<!--							<!-- <img class="vit-tile-type" src="images/--><?//=base_url();?><!--assets/element_visualiser_worktops_icon.jpg"> -->-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="vl-tile-type v-textured-worktops-cabinets">-->
<!--						<div class="v-tile-type-selector" data-select-tile-type="Worktops Texture">-->
<!--							<p class="heading">Worktops</p>-->
<!--							<img class="vit-tile-type" src="--><?//=base_url();?><!--assets/element_visualiser_worktops_icon.jpg">-->
<!--							<div class="v-select-tile-type-button">Select »</div>-->
<!--						</div>-->
<!--					</div>-->
				</div>
			</div>
			
			<div class="vit-content-tiles" style="display: none;">

<!--				<div class="vit-search-in-progress hide">-->
<!--					<img src="--><?//=base_url();?><!--assets/ajax-loader-transparent.gif">-->
<!--					<p>Searching...please wait...</p>-->
<!--				</div>-->
<!---->
<!--				<div class="vit-not-search-in-progress">-->
<!---->
<!--				<div class="v-select-tile-back"> « Back</div>-->
				<p class="heading wall">Wall Tiles</p>
				<p class="heading floor">Floor Tiles</p>
				<p class="heading mosaics">Mosaics</p>
				<p class="heading natural-stone">Natural Stone</p>
				<p class="heading wood">Wood Flooring</p>
				<p class="heading borders">Borders and Corners</p>
				<p class="heading capping">Capping and Finishing Strips</p>
				<p class="heading glass-splashbacks">Glass Splashbacks</p>
				<p class="heading grout">Grout</p>
				<p class="heading paint-colour">Paint</p>
				<p class="heading cabinet-colour">Cabinets</p>
				<p class="heading worktop-colour">Worktops</p>

				<p class="vit-grout-sub-heading">Please note these grout colours are for illustration purposes only. Not all grouts can be used with all ranges, such as our Indoor/Outdoor range Spaces™.</p>

				<div class="vl-search vit-search">
					<div class="vl-search-text vit-input-container">
						<input class="zzvit-search" placeholder="Search for colour, product name or material">
						<div class="vit-search-button"></div>
					</div>
					<div class="vit-search-results-template vit-search-results">
						<span class="">Showing search results for "[SEARCH-STRING]"</span>&nbsp;&nbsp;&nbsp;&nbsp;<a class="vit-clear-search">Clear Search</a>
					</div>
					 <div class="vl-search-refine">
					  <!-- <div><a href="javascript:void(0);" class="yellowButton">Refine</a></div> -->
				    <button class="filter-button"><span class="fa fa-cog">&nbsp;</span> Filter Your Results</button>
					</div>

				</div>

				<div class="vl-current-filters current-filters">
					<button data-select-id="SELECT-CURRENT-FILTER">CURRENT-FILTER-LABEL &nbsp;<span class="fa fa-close"></span></button>
				</div>

<!--				<div class="tiles-list vl-tiles">
					<div class="vl-tile">
						<img class="vit-tile" src="images/placeholder/thumbnails/rooms/Room1.jpg">
					</div>
				</div> -->

			<div class="vit-tiles-nav-template">
				<div class="vit-tiles-found">[TOTAL] Products Found.<span class="[DISPLAYINGNONESTYLE]">&nbsp;Displaying [FROM] - [TO].</span></div>
				<div class="vit-tiles-pages">
					<a class="page-prev [NOPREV]">« Previous / </a>
					<a class="page-num [PAGENUMSTYLE0]" data-select-tile-page="SELECT-TILE-PAGE">&nbsp;[PAGENUM0]&nbsp;</a>
					<span class="page-prev-gap [PAGEPREVGAPSTYLE]">&nbsp;...&nbsp;</span>
					<a class="page-num [PAGENUMSTYLE1]" data-select-tile-page="SELECT-TILE-PAGE">&nbsp;[PAGENUM1]&nbsp;</a>
					<a class="page-num [PAGENUMSTYLE2]" data-select-tile-page="SELECT-TILE-PAGE">&nbsp;[PAGENUM2]&nbsp;</a>
					<a class="page-num [PAGENUMSTYLE3]" data-select-tile-page="SELECT-TILE-PAGE">&nbsp;[PAGENUM3]&nbsp;</a>
					<a class="page-num [PAGENUMSTYLE4]" data-select-tile-page="SELECT-TILE-PAGE">&nbsp;[PAGENUM4]&nbsp;</a>
					<a class="page-num [PAGENUMSTYLE5]" data-select-tile-page="SELECT-TILE-PAGE">&nbsp;[PAGENUM5]&nbsp;</a>
					<span class="page-next-gap [PAGENEXTGAPSTYLE]">&nbsp;...&nbsp;</span>
					<a class="page-num [PAGENUMSTYLE6]" data-select-tile-page="SELECT-TILE-PAGE">&nbsp;[PAGENUM6]&nbsp;</a>
					<a href="javascript:void(0);" class="page-next [NONEXT]"> / Next »</a>
				</div>
			</div>

				<div class="vit-worktops-cabinets-subheading-colours-template hide"><p class="vit-worktops-cabinets-subheading vit-worktops-cabinets-subheading-colours">Colours</p></div>
				<div class="vit-worktops-cabinets-subheading-wood-template hide"><p class="vit-worktops-cabinets-subheading vit-worktops-cabinets-subheading-wood">Wood</p></div>
				<div class="vit-worktops-cabinets-subheading-granite-template hide"><br><br><br><br><br><br><p class="vit-worktops-cabinets-subheading vit-worktops-cabinets-subheading-granite">Granite/Quartz</p></div>

<!--				<div class="tiles-list vl-tiles">-->
<!--					<div class="vl-tile-container [CROPHEIGHT] [WORKTOPSCABINETS]">-->
<!--						<div class="vl-tile [TILE-STYLE]" data-select-id="SELECT-ID-TILE" data-entry-index="[ENTRY-INDEX]">-->
<!--							<img class="vit-tile [WORKTOPSCABINETS]" src="--><?//=base_url();?><!--assets/811639.jpg">-->
<!--								<div class="vit-tile-details [HIDEDETAILS]">-->
<!--									<p class="small-text">[SIZE]</p>-->
<!--									<p class="small-text">Suitable for [SUITABLEFOR]</p>-->
<!--<!--									<p class="price"><strong>[PRICE1]</strong>&nbsp;<span class="small-text">[PRICE2]</span></p> -->-->
<!--									<p class="price [HIDEM2PRICE]"><strong>[PRICE3]</strong>&nbsp;<span class="small-text">price/m<sup>2</sup></span></p>-->
<!--							</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->

                <div class="tiles-list vl-tiles">
                    <div class="tiles-list vl-tiles">
                        <div class="vl-tile-container">
                            <div class="vl-tile " data-select-id="art-16-light-brown-gl.png" data-entry-index="3">
                                <img class="vit-tile" src="assets/tiles/art-16-light-brown-gl.png">
                                <div class="vit-tile-details">
                                    <p class="small-text">20cm x 10cm</p>
                                    <p class="small-text">Suitable for Wall</p>
                                    <!--									<p class="price"><strong>[PRICE1]</strong>&nbsp;<span class="small-text">[PRICE2]</span></p> -->
                                    <p class="price "><strong>£29.50</strong>&nbsp;<span class="small-text">price/m<sup>2</sup></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="vl-tile-container">
                            <div class="vl-tile " data-select-id="art-16-brown-gl.png" data-entry-index="3">
                                <img class="vit-tile" src="assets/tiles/art-16-brown-gl.png">
                                <div class="vit-tile-details">
                                    <p class="small-text">20cm x 10cm</p>
                                    <p class="small-text">Suitable for Wall</p>
                                    <!--									<p class="price"><strong>[PRICE1]</strong>&nbsp;<span class="small-text">[PRICE2]</span></p> -->
                                    <p class="price "><strong>£29.50</strong>&nbsp;<span class="small-text">price/m<sup>2</sup></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="vl-tile-container">
                            <div class="vl-tile " data-select-id="kate-green-matt.png" data-entry-index="1">
                                <img class="vit-tile" src="http://res.cloudinary.com/halfbug/image/upload/v1525091214/kate-green-matt.png">
                                <div class="vit-tile-details">
                                    <p class="small-text">12cm x 18cm</p>
                                    <p class="small-text">Suitable for Wall</p>
                                    <!--									<p class="price"><strong>[PRICE1]</strong>&nbsp;<span class="small-text">[PRICE2]</span></p> -->
                                    <p class="price "><strong>£19.50</strong>&nbsp;<span class="small-text">price/m<sup>2</sup></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="vl-tile-container">
                            <div class="vl-tile " data-select-id="carla-dark-ivory-glossy.png" data-entry-index="1">
                                <img class="vit-tile" src="http://res.cloudinary.com/halfbug/image/upload/v1525091201/carla-dark-ivory-glossy.png">
                                <div class="vit-tile-details">
                                    <p class="small-text">12cm x 18cm</p>
                                    <p class="small-text">Suitable for Wall</p>
                                    <!--									<p class="price"><strong>[PRICE1]</strong>&nbsp;<span class="small-text">[PRICE2]</span></p> -->
                                    <p class="price "><strong>£19.50</strong>&nbsp;<span class="small-text">price/m<sup>2</sup></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="vl-tile-container">
                            <div class="vl-tile " data-select-id="art-008-bluish-grey-glossy.png" data-entry-index="3">
                                <img class="vit-tile" src="assets/tiles/art-008-bluish-grey-glossy.png">
                                <div class="vit-tile-details">
                                    <p class="small-text">20cm x 10cm</p>
                                    <p class="small-text">Suitable for Wall</p>
                                    <!--									<p class="price"><strong>[PRICE1]</strong>&nbsp;<span class="small-text">[PRICE2]</span></p> -->
                                    <p class="price "><strong>£29.50</strong>&nbsp;<span class="small-text">price/m<sup>2</sup></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="vl-tile-container">
                            <div class="vl-tile " data-select-id="art-007-light-walnut-brown-glossy.png" data-entry-index="3">
                                <img class="vit-tile" src="assets/tiles/art-007-light-walnut-brown-glossy.png">
                                <div class="vit-tile-details">
                                    <p class="small-text">20cm x 10cm</p>
                                    <p class="small-text">Suitable for Wall</p>
                                    <!--									<p class="price"><strong>[PRICE1]</strong>&nbsp;<span class="small-text">[PRICE2]</span></p> -->
                                    <p class="price "><strong>£29.50</strong>&nbsp;<span class="small-text">price/m<sup>2</sup></span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>

			</div>

			<div class="vit-content-filters" style="display: none;">
				<div class="vl-filters-heading">
					<p class="heading">Filter Your Search</p>
				</div>

				<div class="vit-filters-desc-long vl-filters-desc">
					To help find the tile you are looking for, make your selections from the choice below. You can filter by type, size, material, colour and shape. Click ‘Apply filters’ to show the tiles which fit your criteria.
				</div>
				<div class="vit-filters-desc-short vl-filters-desc">
					To help find the tile you are looking for, make your selections from the choice below. Click ‘Apply filters’ to show the tiles which fit your criteria.
				</div>

				<div class="vit-apply-filters vl-filters-apply-filters">
				    <!-- <div><a href="javascript:void(0);" class="yellowButton">Apply filters</a></div> -->
			    <button class="filter-button"><span class="fa fa-cog">&nbsp;</span> Apply Filters &amp; Exit</button>
				</div>

				<div class="vit-filter-sets">

					<div class="vit-filter-set vl-filter-set">
				        <p class="vl-filter-set-heading">
	    		    	    <strong>Tile Type</strong>
       		 			</p>
						<div class="vl-filter-button-small">
							<button>Wall Tiles</button>
						</div>
						<div class="vl-filter-button-small">
							<button>Floor Tiles</button>
						</div>
						<div class="vl-filter-set-line"><p class="vit-filter-set-divider"></p></div>
					</div>

				</div>

				<div class="vl-filters-bottom-padding">&nbsp;</div>
				<div class="vit-apply-filters vl-filters-apply-filters">
				    <!-- <div><a href="javascript:void(0);" class="yellowButton">Apply filters</a></div> -->
				    <button class="filter-button"><span class="fa fa-cog">&nbsp;</span> Filter Your Results</button>
				</div>

			</div>

			<div class="vit-content-wishlist" style="display: none;">
				<div class="vit-content-wishlist-holder vcol-md-12">
					<p class="heading">Your Favourites</p>
					<p class="wishlist-empty vcol-md-offset-12 vl-text-center">Empty</p>
					<div class="wishlist-list vl-wishlists">
						<div class="vl-wishlist-item-container">
							<div class="vit-wishlist-item vl-wishlist-item">
								<button class="close" data-select-id="SELECT-ID-CLOSE">
									<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
								</button>
								<div class="vl-wishlist-item-thumbnail">
									<img class="thumbnail" src="<?=base_url();?>assets/811639.jpg">
								</div>
								<div class="vl-wishlist-item-details">
									<p class="normal-text">
										<strong>Tile Name</strong>
									</p>
									<p class="small-text">Code: 123456</p>
									<p class="small-text">20cm x 20cm</p>
									<p class="price">
										<strong>123.45</strong>
										<span class="small-text">price/box</span>
									</p>
									<p class="price">
										<strong>678.99</strong>
										<span class="small-text">price/m<sup>2</sup></span>
									</p>
								</div>
							</div>
							<div class="add-to-basket vl-wishlist-item">
								<button class=" vl-wishlist-item" data-select-id="SELECT-ID-ADD-TO-BASKET">
									<span>Add to Basket</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="vit-content-tiles-used" style="display: none;">
				<div class="vit-content-tiles-used-holder vcol-md-12">
					<p class="heading">View Tiles Used</p>
					<p class="tiles-used-empty vcol-md-offset-12 vl-text-center">Empty</p>
					<div class="tiles-used-list vl-tiles-used">
						<div class="vl-tiles-used-item-container">
							<div class="vit-tiles-used-item vl-tiles-used-item">
								<!-- <button class="close" data-select-id="SELECT-ID-CLOSE">
									<img alt="close button" src="images/<?=base_url();?>assets/icon_close.png">
								</button> -->
								<div class="vl-tiles-used-item-thumbnail">
									<img class="thumbnail" src="<?=base_url();?>assets/811639.jpg">
								</div>
								<div class="vl-tiles-used-item-details">
									<p class="normal-text">
										<strong>Tile Name</strong>
									</p>
									<p class="small-text">Code: 123456</p>
									<p class="small-text">20cm x 20cm</p>
									<p class="price">
										<strong>123.45</strong>
										<span class="small-text">price/box</span>
									</p>
									<p class="price">
										<strong>678.99</strong>
										<span class="small-text">price/m<sup>2</sup></span>
									</p>
								</div>
							</div>
							<div class="add-to-basket vl-tiles-used-item">
								<button class=" vl-tiles-used-item" data-select-id="SELECT-ID-ADD-TO-BASKET">
									<span>Add to Basket</span>
								</button>
							</div>
							<div class="add-to-favourites vl-tiles-used-item">
								<button class=" vl-tiles-used-item" data-select-id="SELECT-ID-ADD-TO-FAVOURITES">
									<span>Add to Favourites</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="vit-content-basket" style="display: none;">
				<div class="vit-content-basket-holder vcol-md-12">
					<p class="heading">Your Basket</p>

					<p class="basket-empty vcol-md-offset-12 vl-text-center">Empty</p>

					<div class="vcol-md-4 vcol-md-offset-8">
					    <div class="pay"><a href="javascript:void(0);" class="yellowButton">Pay Securely Now</a></div>
					    <br>
					</div>

					<div class="table-heading vl-hidden-xs">
						<div class="vcol-md-5 no-padding">
							<strong>Product</strong>
						</div>
						<div class="vcol-md-3 text-left" style="padding-left: 15px">
							<strong></strong>
						</div>
						<div class="vcol-md-2 text-center">
							<strong>Item Price</strong>
						</div>
						<div class="col-xs-2 text-center no-padding-left">
							<strong>Total Price</strong>
						</div>
					</div>

					<div class="basket-items-container">
					<div class="vcol-md-12 basket-item-container">
						<div class="vcol-md-12 basket-item">
							<div>
								<button class="close" data-select-id="SELECT-ID-CLOSE">
									<img alt="close button" src="<?=base_url();?>assets/icon_close.png">
								</button>
								<div class="vcol-md-2 vl-no-padding">
									<img class="thumbnail" src="<?=base_url();?>assets/811639.jpg">
								</div>
								<div class="vcol-md-3 vl-no-padding-right">
									<p>
										<strong class="ng-binding">Tile Name</strong>
									</p>
									<p class="ng-binding">Code: 123456</p>
									<p>
										<i>Sample Tile</i>
									</p>
								</div>
							</div>
							<div class="vcol-md-3 vl-text-center">
								<div class="vcol-md-6 vl-text-right vl-no-padding-left">Qty</div>
								<div class="vcol-md-6 vl-text-center vl-no-padding">
									<input data-select-id="SELECT-ID-QUANTITY" class="quantity pull-left vl-text-center number-input" type="number" value="[111]">
								</div>
								<br>
								<br>
								<div class="show vcol-md-6 vl-text-right vl-no-padding-left">m<sup>2</sup></div>
								<div class="show vcol-md-6 vl-text-center vl-no-padding">
									<input data-select-id="SELECT-ID-COVERAGE" class="coverage vl-text-center number-input" type="number" value="[222]">
								</div>
								<br>
		                		<div class="vcol-md-offset-6 vcol-md-6 vl-text-center vl-no-padding">
									<div class="refresh" data-select-id="SELECT-ID-REFRESH">
										<img src="<?=base_url();?>assets/icon_refresh.png">
										<span>Refresh</span>
									</div>
								</div>
							</div>
							<div class="item-price vcol-md-2 vl-text-center vl-no-padding-right">88.88</div>
							<div class="total-price vcol-md-2 vl-text-center vl-no-padding-right">99.99</div>
						</div>
					</div>
					</div>

					<div class="grand-total vcol-md-12">
						<div class="vl-pull-right">
							<strong>Grand Total</strong> (incl. VAT) 
							<span style="margin-left: 20px">
								<strong class="grand-total-price">£999.99</strong>
							</span>
						</div>
					</div>

					<div class="vcol-md-4 vcol-md-offset-8">
						<br>
					    <div class="pay"><a href="javascript:void(0);" class="yellowButton">Pay Securely Now</a></div>
						<br>
					</div>
				</div>
			</div>

		</div>

	</div>

<!--	<img class="vit-pane-tab" src="images/vit_main_menu_tab_left.png"> -->
	<span class="vit-pane-tab" style="left: -686px;">
		<img src="<?=base_url();?>assets/right-arrow64.png" id="rightm" style="display:none">
		<img src="<?=base_url();?>assets/left-arrow64.png" id="leftm" >
	</span>
	<img class="cache" src="<?=base_url();?>assets/vit_main_menu_tab_right.png">

<div class="tools-container closeTools" style="right: -420px;">

	<div class="v-toolbar-heading">SAVE, SHARE &amp; BUY</div>

	<div class="gui-tools" tt-gui-tools="">
		<div class="vcol-md-12 vl-no-padding" style="height: 100%">

			<div class="thumb vcol-md-12 vl-no-padding" style="height: 100%">

				<div class="current-tile">
					<img alt="" src="<?=base_url();?>assets/811639.jpg" style="display: none;">
					<div style="background-color: rgb(255, 255, 255);"></div>
				</div>

				<div class="tool-container vl-no-padding">

					<div class="tool v-add-to-basket disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_basket.png">
						</div>
						<span class="disabled">Add to Basket</span>
					</div>
					<div class="tool v-order-sample disabled">
						<div class="tool-img-container sample">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_sample.png">
						</div>
						<span class="disabled">Order Sample</span>
					</div>
					<div class="tool v-product-details disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_details.png">
						</div>
						<span class="disabled">Product Details</span>
					</div>
					<div class="tool v-save-tile disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_save_tile.png">
						</div>
						<span class="disabled">Save<br>Tile</span>
					</div>
					<div class="tool v-save-room disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_save.png">
						</div>
						<span class="disabled">Save<br>Room</span>
					</div>
					<div class="tool v-share-room disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_share.png">
						</div>
						<span class="disabled">Share<br>Room</span>
					</div>
					<div class="tool v-email-room disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_email.png">
						</div>
						<span class="disabled">Email<br>Room</span>
					</div>
					<div class="tool v-print-room disabled">
						<div class="tool-img-container">
							<img class="tool-img disabled" src="<?=base_url();?>assets/icon_toolbar_print.png">
						</div>
						<span class="disabled">Print<br>Room</span>
					</div>

				</div>

			</div>
		</div>
	</div>
</div>

<!-- <img class="vit-tools-tab" src="images/vit_tool_tab_left.png"> -->
<span class="vit-tools-tab" style="right: 0px;">
	<img src="<?=base_url();?>assets/left-arrow.png" id="lefta"> 
	<img src="<?=base_url();?>assets/right-arrow.png" id="righta" style="display:none">
</span>

</div>

<script type="text/javascript" src="<?=base_url();?>assets/OtherAll-min.js"></script> 
<script type="text/javascript" src="<?=base_url();?>assets/All-min.js"></script>

<script>


</script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript">

    // var selected_tile = "";
    // var selected_category = "";
</script>
<script type="text/javascript" src="<?=base_url();?>assets/layout.js"></script>

<script type="text/javascript" src="<?=base_url();?>assets/tabui.js"></script>



</body></html>