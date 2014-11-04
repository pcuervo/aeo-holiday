<div class="[ contenido home ] [ content ] [ margin-bottom ] [ clearfix ]">

    <div class="[ col-xs-4 center-block ]">
        <img src="<?php echo $fb_user_pic ?>" alt="" class="[ user-photo ]">
    </div>

    <h4 class="[ col-xs-11 col-sm-10 col-md-6 center-block ]">
        <?php echo $fb_user['first_name'].' '.$fb_user['last_name'] ?>
    </h4>
    <div class="[ col-xs-12 ] [ margin-bottom clearfix ] [ main-buttons ]">
        <a href="<?php echo base_url() ?>dashboard/new_exchange_group" class="[ btn btn-primary ]">Crear intercambio</a>
        <?php if(!$has_perfect_fit){ ?>
            <a href="<?php echo base_url() ?>dashboard/complete_perfect_fit" class="[ btn btn-primary ]">Completar "Perfect Fit"</a>
        <?php } ?>
    </div>

    <?php if($pending_invitations != '') { ?>
    <div class="[ col-xs-12 ] [ clearfix ][ solicitudes-intercambio ]">
        <h3>Solicitudes</h3>
        <?php foreach ($pending_invitations as $key => $invitation) { ?>
        <div class="[ invitaciones-contenedor ] [ margin-bottom clearfix ]">
            <div class="[ invitacion-intercambio ] [ margin-bottom clearfix ]">
                <img src="<?php echo $invitation['admin_profile_picture']  ?>" alt="" class="[ col-xs-4 ]">
                 <p class="[ col-xs-8 ] [ margin-bottom ]">
                    <?php echo $invitation['admin_first_name'].' '.$invitation['admin_last_name'] ?> te ha invitado al intercambio <a href="<?php echo base_url().'dashboard/view_group/'.$invitation['group_id'] ?>"><?php echo $invitation['name'] ?></a>
                </p>
                <a href="<?php echo base_url().'dashboard/accept_invitation/'.$invitation['group_id'] ?>" class="[ btn btn-default ]">Aceptar</a>
                <a href="<?php echo base_url().'dashboard/decline_invitation/'.$invitation['group_id'] ?>" class="[ btn btn-default ]">Rechazar</a>
            </div>
        </div>
        <? } ?>
    </div><!--SOLICITUDES DE INTERCAMBIO-->
    <?php } ?>

    <div class="[ col-xs-12 ] [ clearfix ] [ actividad ] [ hide ]">
        <h3>Actividad</h3>
        <div class="[ actividad-contenedor ] [ margin-bottom clearfix ]">
            <div class="[ actividad-aviso ] [ margin-bottom clearfix ]">
                <img src="<?php echo base_url() ?>/assets/images/piernas.jpg" alt="" class="[ col-xs-4 ]">
                <p class="[ col-xs-8 ] [ margin-bottom ]">Fulanito de tal te ha invitado al intercambio bla bla bla.</p>
            </div>
        </div>
    </div><!--ACTIVIDAD-->

</div><!-- CONTENIDO -->