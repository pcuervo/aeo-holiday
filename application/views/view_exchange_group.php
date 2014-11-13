<div class="[ container ] [ margin-bottom ]">
    <h2 class="[ margin-bottom ] [ text-center ] [ center-block ]">Datos del intercambio</h2>
    <div class="row">
        <form role="form" class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ]">
            <?php if ( $secret_friend != 0 ){ ?>
                <div class="[ form-group ] [ margin-bottom ]">
                    <label for="">Tu amigo secreto</label>
                    <div class="[ margin-bottom ] [ actividad-aviso ]">
                        <img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="<?php echo $secret_friend['friend_picture']  ?>" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]"><?php echo $secret_friend['name']; ?></p>
                    </div>
                </div><!-- form-group -->
            <?php } ?>
            <div class="[ form-group ] [ margin-bottom ]">
                <label for="">Nombre del intercambio</label>
                <p><?php echo $group_details['name'] ?></p>
            </div><!-- form-group -->
            <div class="[ form-group ] [ margin-bottom ]">
                <label for="">Fecha del intercambio</label>
                <p><?php echo date('Y-m-d', strtotime($group_details['exchange_date'])) ?></p>
            </div><!-- form-group -->
            <div class="[ form-group ] [ margin-bottom ]">
                <label for="">Fecha límite de inscripción</label>
                <p><?php echo date('Y-m-d', strtotime($group_details['join_deadline'])) ?></p>
            </div><!-- form-group -->
            <div class="[ form-group ] [ margin-bottom ]">
                <label for="">Lugar</label>
                <p><?php echo $group_details['place'] ?></p>
            </div><!-- form-group -->
            <div class="[ form-group ] [ margin-bottom ]">
                <label for="">Monto del regalo</label>
                <p>$<?php echo $group_details['budget'] ?></p>
            </div><!-- form-group -->
            <div class="[ form-group ] [ margin-bottom ]">
                <label for="">Descripción</label>
                <p><?php echo $group_details['description'] ?></p>
            </div><!-- form-group -->
            <div class="[ form-group ] [ margin-bottom ]">
                <a class="[ addthisevent ] [ btn btn-primary btn-go ]" href="<?php echo base_url(); ?>" title="Add to Calendar" data-track="ga('send', 'event', 'solicitudes', 'click', 'ate-calendar');">
                    <span>Agregar a mi calendario</span>
                    <span class="_start"><?php echo date('Y-m-d', strtotime($group_details['exchange_date'])) ?></span>
                    <span class="_end"><?php echo date('Y-m-d', strtotime($group_details['exchange_date'])) ?></span>
                    <span class="_zonecode">12</span>
                    <span class="_summary">Grupo de intercambio <?php echo $group_details['name'] ?></span>
                    <span class="_description"><?php echo $group_details['description'] ?></span>
                    <span class="_location"><?php echo $group_details['place'] ?></span>
                    <span class="_organizer">Organizer</span>
                    <span class="_organizer_email">Organizer e-mail</span>
                    <span class="_all_day_event">true</span>
                    <span class="_date_format">DD/MM/YYYY</span>
                </a>
            </div><!-- form-group -->
        </form>
        <div class="[ col-xs-12 ] [ center-block ] [ margin-bottom ] [ scroll-box ]">
            <p class="[ center-block ] [ trade ]" for="name">INVITADOS</p>
            <ul class="list-unstyled">
                <?php foreach($group_friends as $key => $friend) { ?>
                    <li>
                        <img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="<?php echo $friend['friend_picture'] ?>" alt=""><p class="[ three-quarter-width ] [ inline-block middle ]"><?php echo $friend['friend_name'] ?></p>
                    </li>
                <?php } ?>
            </ul>
        </div>
        <?php if($pending_friends != 0) { ?>
            <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ scroll-box ]">
                <p class="[ center-block ] [ trade ]" for="name">PENDIENTES</p>
                <ul class="list-unstyled">
                    <?php foreach($pending_friends as $key => $friend) { ?>
                        <li>
                            <img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="<?php echo $friend['profile_picture'] ?>" alt=""><p class="[ three-quarter-width ] [ inline-block middle ]"><?php echo $friend['name'] ?></p>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        <?php }// if ?>
    </div>
</div><!-- CONTENIDO -->