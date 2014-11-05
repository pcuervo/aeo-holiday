<div class="[ container ] [ contenido home ] [ margin-bottom ] [ clearfix ]">
    <div class="[ col-xs-6 col-md-3 ] [ center-block margin-bottom ]">
        <img src="<?php echo $fb_user_pic ?>" alt="" class="[ user-photo ]">
    </div>
    <h4 class="[ text-center ] [ margin-bottom ]"><?php echo $fb_user['first_name'].' '.$fb_user['last_name'] ?></h4>
    <div class="row">
        <div class="[ col-xs-12 col-md-6 ] [ center-block margin-bottom ] [ text-center ] [ main-buttons ]">
            <a href="<?php echo base_url() ?>dashboard/new_exchange_group" class="[ btn btn-primary ] [ margin-bottom ]">Crear intercambio</a>
            <?php if(!$has_perfect_fit){ ?>
                <a href="<?php echo base_url() ?>dashboard/complete_perfect_fit" class="[ btn btn-primary ]">Completar "Perfect Fit"</a>
            <?php } ?>
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