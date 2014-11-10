<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>American Eagle Holiday Exchange</title>

		<!-- Bootstrap -->
		<link href="<?php echo base_url().'assets/css/bootstrap.min.css' ?>" rel="stylesheet">
		<!--FONT AWESOME-->
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	</head>
	<body>
		<?php if($current_view != 'login') { ?>
			<header class="">
	        	<div id="sidebar-wrapper" class="[ clearfix ]">
					<ul class="[ sidebar-nav ]">
						<li class="[ sidebar-brand ]">
							<a href="#menu-toggle" id="menu-toggle">
								<img class="[ right ]" src="<?php echo base_url() ?>assets/images/icon-hamburger-rojo.png">
							</a>
							<h4 href="#">MENU</h4>
						</li>
						<li>
							<a class="[ text-center ]" href="<?php echo base_url().'dashboard' ?>">Inicio</a>
						</li>
						<li>
							<a class="[ text-center ]" href="<?php echo base_url() ?>dashboard/view_coupon">Cupón 30%</a>
						</li>
						<li>
							<a class="[ text-center ]" href="<?php echo base_url() ?>/catalog">Catálogo</a>
						</li>
						<?php if($secret_friends != '') { ?>
						<li>
							<a class="[ text-center ]" href="<?php echo base_url().'secret_friends/view_messages'?>">Mensajes de amigos secretos</a>
						</li>
						<?php } ?>
						<li class="[ sidebar-brand ]">
							<a class="[ text-center ]" href="#">Mis Intercambios</a>
						</li>
						<?php if($exchange_groups != 0) { ?>
							<?php foreach ($exchange_groups as $key => $group) { ?>
							<?php $group_url = base_url().'dashboard/view_group/'.$group['id']?>
								<li>
									<a class="[ text-center ]" href="<?php echo $group_url ?>"><?php echo $group['name'] ?></a>
								</li>
							<?php } ?>
						<?php } ?>
						<li class="[ sidebar-brand ]">
							<img class="[ col-xs-6 ] [ center-block ]" src="<?php echo base_url() ?>assets/images/logo-aeo-red.png" alt="">
						</li>
					</ul>
	        	</div> <!-- #sidebar-wrapper -->
		        <div id="menu-principal" class="[ col-xs-11 clearfix ] [ center-block ]">
		            <img class="[ col-xs-3 col-sm-2 col-md-1 center-block logo-home ]" src="<?php echo base_url() ?>assets/images/logo-aeo-white.png" alt="">
		            <a href="#menu-toggle" class="[ hidden-sm hidden-md hidden-lg ]" id="menu-toggle">
		            	<img src="<?php echo base_url() ?>assets/images/icon-hamburger.png">
		            </a>
		            <a href="#menu-toggle" class="[ hidden-xs ] [ right ]" id="menu-toggle2">Menú</a>
		        </div><!-- #menu-principal -->
			</header>
		<?php } ?>
		<div class="wrapper">