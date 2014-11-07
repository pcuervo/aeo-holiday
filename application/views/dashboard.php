<div class="[ container ] [ contenido home ] [ margin-bottom ] [ clearfix ]">
    <h2 class="[ text-center ]">Best gift ever</h2>
    <div class="row">
        <div class="[ col-xs-12 col-md-6 ] [ center-block margin-bottom ]">
            <div class="row">
                <img class="[ col-xs-5 ] [ user-photo ] [ img-circle ]" src="<?php echo $fb_user_pic ?>" alt="Usuario">
                <div class="[ col-xs-5 ]">
                    <h4 class="[ margin-bottom ]"><?php echo $fb_user['first_name'].' '.$fb_user['last_name'] ?></h4>
                    <a href="<?php echo base_url() ?>dashboard/new_exchange_group" class="[ btn btn-primary btn-go ] [ margin-bottom ]"><span>Crear nuevo intercambio</span></a>
                     <?php if(!$has_perfect_fit){ ?>
                        <a href="<?php echo base_url() ?>dashboard/complete_perfect_fit" class="[ btn btn-primary btn-go ]">Completar mi perfil</a>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div><!-- row -->

    <div class="row">
        <div class="[ col-xs-12 col-md-6 ] [ center-block ] [ clearfix ] [ solicitudes-intercambio ]">
            <h3>Solicitudes</h3>
            <?php if($pending_invitations != '') { ?>
                <div class="[ invitaciones-contenedor ] [ margin-bottom clearfix ]">
                    <div class="[ invitacion-intercambio ] [ margin-bottom clearfix ]">
                    <?php foreach ($pending_invitations as $key => $invitation) { ?>
                        <div class="row">
                             <div class="[ col-xs-4 col-sm-2 ]">
                                <img class="[ img-responsive ]" src="<?php echo $invitation['admin_profile_picture']  ?>" alt="">
                            </div>
                            <div class="[ col-xs-8 col-sm-10 ]">
                                <p class="[ margin-bottom ]">
                                    <?php echo $invitation['admin_first_name'].' '.$invitation['admin_last_name'] ?> te ha invitado al intercambio <a class="[ ]" href="<?php echo base_url().'dashboard/view_group/'.$invitation['group_id'] ?>"><?php echo $invitation['name'] ?></a>
                                </p>
                                <div class="[ text-center ]">
                                    <a href="<?php echo base_url().'dashboard/accept_invitation/'.$invitation['group_id'] ?>" class="[ btn btn-default ] [ margin-bottom ]">Aceptar</a>
                                    <a href="<?php echo base_url().'dashboard/decline_invitation/'.$invitation['group_id'] ?>" class="[ btn btn-default ] [ margin-bottom ]">Rechazar</a>
                                </div>
                            </div>
                        </div><!-- row -->
                    <?php } ?>
                    </div><!-- invitacion-intercambio -->
                </div><!-- invitaciones-contenedor -->
            <?php } else { ?>
                <p>No tienes solicitudes pendientes.</p>
            <?php } ?>
        </div><!--SOLICITUDES DE INTERCAMBIO-->
    </div><!-- row -->


    <?php if($secret_friends != '') { ?>
    <div class="row">
        <div class="[ col-xs-12 col-md-6 ] [ center-block ] [ clearfix ] [ solicitudes-intercambio ]">
            <h3>Amigos secretos</h3>
            <?php foreach ($secret_friends as $key => $friend) { ?>
            <div class="[ invitaciones-contenedor ] [ margin-bottom clearfix ]">
                <div class="[ invitacion-intercambio ] [ margin-bottom clearfix ]">
                    <div class="row">
                         <div class="[ col-xs-4 col-sm-2 ]">
                            <img class="[ img-responsive ]" src="<?php echo $friend['friend_picture']  ?>" alt="">
                        </div>
                        <div class="[ col-xs-8 col-sm-10 ]">
                            <p class="[ margin-bottom ]">
                                <?php echo $friend['name'] ?>
                            </p>
                            <p class="[ margin-bottom ]">
                                <?php echo $friend['group'] ?>
                            </p>
                            <a href="<?php echo base_url().'secret_friends/view/'.$friend['group_friend_id'] ?>">Ver</a>
                        </div>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div><!--SOLICITUDES DE INTERCAMBIO-->
    </div><!-- row -->
    <?php } ?>

    <div class="[ col-xs-12 ] [ clearfix ] [ actividad ]">
        <h3>Actividad</h3>
        <div class="[ actividad-contenedor ] [ margin-bottom clearfix ]">
            <!-- <div class="[ actividad-aviso ] [ margin-bottom clearfix ]">
                <img src="<?php echo base_url() ?>/assets/images/piernas.jpg" alt="" class="[ col-xs-4 ]">
                <p class="[ col-xs-8 ] [ margin-bottom ]">Fulanito de tal te ha invitado al intercambio bla bla bla.</p>
            </div> -->
            <p>No tienes actividad todavía... </p>
        </div>
    </div><!--ACTIVIDAD-->

</div><!-- CONTENIDO -->