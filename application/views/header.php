<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>American Eagle Holiday Exchange</title>

		<!-- Bootstrap -->
		<link href="<?php echo base_url().'assets/css/bootstrap.min.css' ?>" rel="stylesheet">
		<!--FONT AWESOME-->
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	</head>
	<body>
		<?php if($current_view != 'login') { ?>
			<header class="wrapper">
	        	<div id="sidebar-wrapper" class="[ clearfix ]">
					<ul class="[ sidebar-nav ]">
						<li class="[ sidebar-brand ]">
							<a href="#menu-toggle" id="menu-toggle">
							<i class="[ fa fa-chevron-right ] [ right ]"></i>
							</a>
							<a href="#">MENU</a>
						</li>
						<li>
							<a href="<?php echo base_url().'dashboard' ?>">Inicio</a>
						</li>
						</li>
						<li>
							<a href="#">Cupón 20%</a>
						</li>
						<li class="[ sidebar-brand ]">
							<a href="#">Mis Intercambios</a>
						</li>
						<?php foreach ($exchange_groups as $key => $group) { ?>
						<?php $group_url = base_url().'dashboard/view_group/'.$group['id']?>
							<li>
								<a href="<?php echo $group_url ?>"><?php echo $group['name'] ?></a>
							</li>
						<?php } ?>
						<li class="[ sidebar-brand ]">
							<a href="#">Salir</a>
							<img src="<?php echo base_url() ?>assets/images/aeo-logo-white.png" alt="">
						</li>
					</ul>
	        	</div> <!-- #sidebar-wrapper -->
		        <div id="menu-principal" class="[ col-xs-12 clearfix ]">
		            <img class="[ col-xs-3 col-sm-2 col-md-1 center-block logo-home ]" src="<?php echo base_url() ?>assets/images/aeo-logo.png" alt="">
		            <a href="#menu-toggle" class="[ hidden-sm hidden-md hidden-lg ]" id="menu-toggle">
		            	<i class="[ fa fa-bars ]"></i>
		            </a>
		            <a href="#menu-toggle" class="[ hidden-xs ] [ right ]" id="menu-toggle2">Menú</a>
		        </div><!-- #menu-principal -->
			</header>
		<? } ?>
		<div class="wrapper">
