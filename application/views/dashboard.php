<div class="[ container ] [ contenido home ] [ margin-bottom ] [ clearfix ]">
    <h2 class="[ text-center ]">Best gift ever</h2>
    <div class="[ row ] [ margin-bottom ]">
        <div class="[ col-xs-12 col-md-6 ] [ center-block ]">
            <div class="margin-bottom">
                <img class="[ half-width ] [ inline-block middle ] [ user-photo ] [ img-circle ]"src="<?php echo $fb_user_pic ?>" alt="Usuario"><h4 class="[ half-width margin-bottom ] [ inline-block middle ]"><?php echo $fb_user['first_name'].' '.$fb_user['last_name'] ?></h4>
            </div>
            <div class="text-center">
                <a href="<?php echo base_url() ?>dashboard/new_exchange_group" class="[ btn btn-primary btn-go ] [ margin-bottom ]" onclick="ga('send', 'event', 'intercambio', 'click', 'intenciónCrearIntercambio');"><span>Crear nuevo intercambio</span></a>
            </div>
             <?php if(!$has_perfect_fit){ ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo base_url() ?>dashboard/complete_perfect_fit" class="[ btn btn-primary btn-go ]" onclick="ga('send', 'event', 'perfil', 'click', 'CompletarPerfil');"><span>Completar mi perfil</span></a>
                </div>
            <?php } ?>
            <div class="text-center">
                <a href="<?php echo base_url() ?>dashboard/view_coupon/m" class="[ btn btn-primary btn-go ]" onclick="ga('send', 'event', 'menu', 'click', 'cupón');"><span>Ver mi cupón</span></a>
            </div>
        </div>
    </div><!-- row -->
    <hr class="[ center-block ]" >
    <?php if($secret_friends != '') { ?>
    <div class="row">
        <div class="[ col-xs-12 col-md-6 ] [ center-block ] [ clearfix ] [ solicitudes-intercambio ]">
            <h2 class="[ text-center ]">Amigos secretos</h2>
            <div class="[ invitaciones-contenedor ] [ margin-bottom clearfix ]">
            <?php foreach ($secret_friends as $key => $friend) { ?>
                <div class="[ invitacion-intercambio ] [ margin-bottom clearfix ]">
                    <div class="row">
                         <div class="[ col-xs-4 col-sm-2 ]">
                            <img class="[ img-responsive ] [ user-photo ]" src="<?php echo $friend['friend_picture']  ?>" alt="">
                        </div>
                        <div class="[ col-xs-8 col-sm-10 ]">
                            <p class="[  ]"><?php echo $friend['name'] ?> </p>
                            <p class="[  ]"><?php echo $friend['group'] ?> </p>
                            <a class="[ btn btn-default btn-go ]" href="<?php echo base_url().'secret_friends/view/'.$friend['group_friend_id'] ?>" onclick="ga('send', 'event', 'amigosSecretos', 'click', 'ver');"><span>Ver</span></a>
                        </div>
                    </div>
                </div><!-- invitacion -->
            <?php } ?>
            </div>
        </div><!--SOLICITUDES DE INTERCAMBIO-->
    </div><!-- row -->
    <?php } ?>
    <hr class="[ center-block ]">
    <div class="row">
        <div class="[ col-xs-12 col-md-6 ] [ center-block ] [ clearfix ] [ solicitudes-intercambio ]">
            <h2 class="[ text-center ] [ margin-bottom ]">Solicitudes</h2>
            <?php if($pending_invitations != '') { ?>
                <div class="[ invitaciones-contenedor ] [ margin-bottom clearfix ]">
                    <?php foreach ($pending_invitations as $key => $invitation) { ?>
                        <div class="[ invitacion-intercambio ] [ margin-bottom clearfix ]">
                            <div class="[ row ] [ margin-bottom ]">
                                <div class="[ col-xs-4 col-sm-2 ]">
                                    <img class="[ img-responsive ] [ user-photo ]" src="<?php echo $invitation['admin_profile_picture']  ?>" alt="">
                                </div>
                                <div class="[ col-xs-8 col-sm-10 ]">
                                    <p class="[  ]"> <?php echo $invitation['admin_first_name'].' '.$invitation['admin_last_name'] ?> te ha invitado al intercambio:</p>
                                    <a class="[ ]" href="<?php echo base_url().'dashboard/view_group/'.$invitation['group_id'] ?>">"<?php echo $invitation['name'] ?>"</a>
                                </div>
                            </div><!-- row -->
                            <div class="[ text-center ] [ ]">
                                <a href="<?php echo base_url().'dashboard/accept_invitation/'.$invitation['group_id'] ?>" class="[ btn btn-default btn-go ] [ margin-bottom ]" onclick="ga('send', 'event', 'solicitudes', 'click', 'aceptarIntercambio');"><span>Aceptar</span></a>
                                <a href="<?php echo base_url().'dashboard/decline_invitation/'.$invitation['group_id'] ?>" class="[ btn btn-default btn-no ] [ margin-bottom ]" onclick="ga('send', 'event', 'solicitudes', 'click', 'rechazarIntercambio');"><span>Rechazar</span></a>
                            </div>
                        </div><!-- invitacion-intercambio -->
                    <?php } ?>
                </div><!-- invitaciones-contenedor -->
            <?php } else { ?>
                <p class="[ text-center ]">No tienes solicitudes pendientes.</p>
            <?php } ?>
        </div><!--SOLICITUDES DE INTERCAMBIO-->
    </div><!-- row -->
    <hr class="[ center-block ]">
    <div class="[ col-xs-12 ] [ clearfix ] [ actividad ]">
        <h3 class="[ text-center ] [ margin-bottom ]">Actividad reciente</h3>
        <div class="[ actividad-contenedor ] [ margin-bottom clearfix ]">
            <div class="[ actividad-grupo ] [ margin-bottom clearfix ]">

            </div>
            <div class="[ actividad-mensajes ] [ margin-bottom clearfix ]">

            </div>
        </div>
    </div><!-- actividad -->

</div><!-- CONTENIDO -->