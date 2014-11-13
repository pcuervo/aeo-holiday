<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>AEO Best Gift Ever</title>

		<!-- Bootstrap -->
		<link href="<?php echo base_url().'assets/css/bootstrap.min.css' ?>" rel="stylesheet">
		<!--FONT AWESOME-->
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

		<meta property="og:title" content="AEO Best Gift Ever" />
		<meta property="og:site_name" content="AEO Best Gift Ever" />
		<meta property="og:url" content="https://www.aeobestgiftever.com/" />
		<?php
			// var_dump($current_fb_user);
		?>
		<meta property="og:description" content="<?php //echo $current_fb_user[]; ?> ya organizó su intercambio y recibió 30% de descuento en AEO. Hazlo tu también con Best Gift Ever" />
		<meta property="og:image" content="https://dev-aeo-holiday.flockos.com/assets/images/aeo_logo_share.png" />
		<meta property="fb:app_id" content="293571087508858" />

		<?php if($current_view == 'new_exchange_group') { ?>
            <!-- Facebook Conversion Code for Crear Intercambio -->
			<script>(function() {
			  var _fbq = window._fbq || (window._fbq = []);
			  if (!_fbq.loaded) {
			    var fbds = document.createElement('script');
			    fbds.async = true;
			    fbds.src = '//connect.facebook.net/en_US/fbds.js';
			    var s = document.getElementsByTagName('script')[0];
			    s.parentNode.insertBefore(fbds, s);
			    _fbq.loaded = true;
			  }
			})();
			window._fbq = window._fbq || [];
			window._fbq.push(['track', '6024165134288', {'value':'0.00','currency':'MXN'}]);
			</script>
			<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6024165134288&amp;cd[value]=0.00&amp;cd[currency]=MXN&amp;noscript=1" /></noscript>
        <?php } ?>
        <?php if($current_view == 'login') { ?>
            <!-- Facebook Conversion Code for Pagina de Permisos -->
			<script>(function() {
			  var _fbq = window._fbq || (window._fbq = []);
			  if (!_fbq.loaded) {
			    var fbds = document.createElement('script');
			    fbds.async = true;
			    fbds.src = '//connect.facebook.net/en_US/fbds.js';
			    var s = document.getElementsByTagName('script')[0];
			    s.parentNode.insertBefore(fbds, s);
			    _fbq.loaded = true;
			  }
			})();
			window._fbq = window._fbq || [];
			window._fbq.push(['track', '6024165093688', {'value':'0.00','currency':'MXN'}]);
			</script>
			<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6024165093688&amp;cd[value]=0.00&amp;cd[currency]=MXN&amp;noscript=1" /></noscript>
        <?php } ?>
        <?php if($current_view == 'perfect_fit') { ?>
            <!-- Facebook Conversion Code for Mi perfil -->
			<script>(function() {
			  var _fbq = window._fbq || (window._fbq = []);
			  if (!_fbq.loaded) {
			    var fbds = document.createElement('script');
			    fbds.async = true;
			    fbds.src = '//connect.facebook.net/en_US/fbds.js';
			    var s = document.getElementsByTagName('script')[0];
			    s.parentNode.insertBefore(fbds, s);
			    _fbq.loaded = true;
			  }
			})();
			window._fbq = window._fbq || [];
			window._fbq.push(['track', '6024165147288', {'value':'0.00','currency':'MXN'}]);
			</script>
			<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6024165147288&amp;cd[value]=0.00&amp;cd[currency]=MXN&amp;noscript=1" /></noscript>
        <?php } ?>
	</head>
	<body>
		<?php if($current_view == 'login') { ?>
			<script type='text/javascript'>
			var ebRand = Math.random()+'';
			ebRand = ebRand * 1000000;
			//<![CDATA[
			document.write('<scr'+'ipt src="HTTPS://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=563081&amp;rnd=' + ebRand + '"></scr' + 'ipt>');
			//]]>
			</script>
			<noscript>
			<img width="1" height="1" style="border:0" src="HTTPS://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=563081&amp;ns=1"/>
			</noscript>
		<?php } ?>
		<?php if($current_view == 'new_exchange_group') { ?>
			<script type='text/javascript'>
			var ebRand = Math.random()+'';
			ebRand = ebRand * 1000000;
			//<![CDATA[
			document.write('<scr'+'ipt src="HTTPS://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=563082&amp;rnd=' + ebRand + '"></scr' + 'ipt>');
			//]]>
			</script>
			<noscript>
			<img width="1" height="1" style="border:0" src="HTTPS://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=563082&amp;ns=1"/>
			</noscript>
		<?php } ?>
		<?php if($current_view == 'complete_perfect_fit') { ?>
			<script type='text/javascript'>
			var ebRand = Math.random()+'';
			ebRand = ebRand * 1000000;
			//<![CDATA[
			document.write('<scr'+'ipt src="HTTPS://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=563083&amp;rnd=' + ebRand + '"></scr' + 'ipt>');
			//]]>
			</script>
			<noscript>
			<img width="1" height="1" style="border:0" src="HTTPS://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=563083&amp;ns=1"/>
			</noscript>
		<?php } ?>
		<?php if($current_view != 'login') { ?>
			<header class="">
	        	<div id="sidebar-wrapper" class="[ clearfix ]">
					<ul class="[ sidebar-nav ]">
						<li class="[ sidebar-brand ]">
							<a href="#menu-toggle" id="menu-toggle">
								<img class="[ right ]" src="<?php echo base_url() ?>assets/images/icon-hamburger-rojo.png">
							</a>
							<h4 href="#">MENÚ</h4>
						</li>
						<li>
							<a class="[ text-center ]" href="<?php echo base_url().'dashboard' ?>">Inicio</a>
						</li>
						<li>
							<a class="[ text-center ]" href="<?php echo base_url() ?>dashboard/view_coupon/m">Cupón 30%</a>
						</li>
						<li>
							<a class="[ text-center ]" href="<?php echo base_url() ?>catalog">Catálogo</a>
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
		            <a href="#menu-toggle" class="[ hidden-xs ] [ right ]" id="menu-toggle2">
						<img src="<?php echo base_url() ?>assets/images/icon-hamburger.png">
		            </a>
		        </div><!-- #menu-principal -->
			</header>
		<?php } ?>
		<div class="wrapper">