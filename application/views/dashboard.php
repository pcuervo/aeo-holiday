<div class="[ container ] [ contenido home ] [ margin-bottom ] [ clearfix ]">
    <h2 class="[ text-center ]">Best gift ever</h2>
    <div class="[ row ] [ margin-bottom ]">
        <div class="[ col-xs-12 col-sm-6 ] [ center-block ]">
            <div class="margin-bottom">
                <img class="[ half-width ] [ inline-block middle ] [ user-photo ] [ img-circle ]"src="<?php echo $fb_user_pic ?>" alt="Usuario"><h4 class="[ half-width margin-bottom ] [ inline-block middle ]"><?php echo $fb_user['first_name'].' '.$fb_user['last_name'] ?></h4>
            </div>
            <div class="text-center">
                <a href="<?php echo base_url() ?>dashboard/new_exchange_group" class="[ btn btn-primary btn-go ] [ margin-bottom ]" onclick="ga('send', 'event', 'intercambio', 'click', 'intenciónCrearIntercambio');"><span>Crear nuevo intercambio</span></a>
            </div>
            <?php if($pending_friends != 0){ ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="#" class="[ btn btn-primary btn-go ] [ j-resend-invitations ]"><span>Reenviar invitaciones</span></a>
                </div>
            <?php } ?>
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
    <div class="[ row ] [ margin-bottom ]">
        <div class="[ col-xs-12 col-sm-8 ] [ center-block ]">
            <ul id="myTab" class="nav nav-tabs" role="tablist">
                <li role="presentation" class="[ active ]"><a href="#solicitudes-pendientes" id="solicitudes-pendientes-tab" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="true">SOLICITUDES</a></li>
                <?php if($secret_friends != '') { ?>
                    <li role="presentation"><a href="#amigos-secretos" role="tab" id="amigos-secretos-tab" data-toggle="tab" aria-controls="profile">AMIGOS SECRETOS</a></li>
                <?php } ?>
            </ul>
            <div id="myTabContent" class="tab-content">
                <?php if($pending_invitations != '') { ?>
                    <div role="tabpanel" class="tab-pane fade in active" id="solicitudes-pendientes" aria-labelledby="home-tab">
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
                                        <a href="#" class="[ btn btn-default btn-go ] [ margin-bottom ] [ j-accept-invitation ]" data-group="<?php echo $invitation['group_id'] ?>"><span>Aceptar</span></a>
                                        <a href="#" class="[ btn btn-default btn-no ] [ margin-bottom ] [ j-decline-invitation ]" data-group="<?php echo $invitation['group_id'] ?>" ><span>Rechazar</span></a>
                                    </div>
                                    <div class="[ loader invitacion ] [ center-block ]">
                                        <img class="[ img-responsive ]" src="<?php echo base_url() ?>assets/images/loader.gif">
                                    </div><!-- loader -->
                                </div><!-- invitacion-intercambio -->
                            <?php } ?>
                        </div><!-- invitaciones-contenedor -->
                    </div>
                <?php } else { ?>
                    <div role="tabpanel" class="tab-pane fade in active" id="solicitudes-pendientes" aria-labelledby="home-tab">
                        <p class="[ text-center ]">NO TIENES SOLICITUDES PENDIENTES.</p>
                    </div>
                <?php } ?>
                <?php if($secret_friends != '') { ?>
                    <div role="tabpanel" class="tab-pane fade" id="amigos-secretos" aria-labelledby="profile-tab">
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
                    </div>
                <?php } ?>
            </div>
        </div>
    </div><!-- row -->
    <div class="[ col-xs-12 col-sm-8 ] [ center-block ] [ clearfix ] [ actividad ]">
        <h3 class="[ text-center ] [ margin-bottom ]">Actividad reciente</h3>
        <div class="[ actividad-contenedor ] [ margin-bottom clearfix ]">
            <div class="[ actividad-grupo ] [ margin-bottom clearfix ]">
                <div class="[ loader ] [ center-block ]">
                    <img class="[ img-responsive ]" src="<?php echo base_url() ?>assets/images/loader.gif">
                    <p class="[ text-center ]">buscando actividad…</p>
                </div><!-- loader -->
            </div>
        </div>
    </div><!-- actividad -->
</div><!-- CONTENIDO -->