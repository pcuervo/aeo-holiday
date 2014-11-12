<div class="[ container ] [ content ] [ margin-bottom ]">
    <h2 class="[ margin-bottom ] [ text-center ] [ center-block ]">Edita tu intercambio</h2>
    <div class="[ row ]">
        <form action="" method="POST" role="form" class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ j_edit_group_form ]">
            <div class="[ form-group ]">
                <label for="name">Nombre del intercambio</label>
                <input type="text" class="[ form-control ] [ required ]" id="nombre-intercambio" name="name" value="<?php echo $group_details['name'] ?>">
            </div>
            <div class="[ form-group ]">
                <label for="exchange_date">Fecha del intercambio</label>
                <input type="date" class="form-control" id="fecha-intercambio" name="exchange_date" value="<?php echo date('Y-m-d', strtotime($group_details['exchange_date'])) ?>">
            </div>
            <div class="[ form-group ]">
                <label for="join_deadline">Fecha límite para participar</label>
                <input type="date" class="form-control" id="fecha-limite" name="join_deadline" min="2014-11-09" value="<?php echo date('Y-m-d', strtotime($group_details['join_deadline'])) ?>">
            </div>
            <div class="[ form-group ]">
                <label for="place">Lugar</label>
                <input type="text" class="[ form-control ]" id="lugar-intercambio" name="place" value="<?php echo $group_details['place'] ?>">
            </div>
            <div class="[ form-group ]">
                <label for="budget">Monto del regalo</label>
                <select class="[ form-control ]" id="precio-intercambio" name="budget">
                    <option <?php if ( $group_details['budget'] == 50 ){ echo 'selected'; } ?> value="50">$50</option>
                    <option <?php if ( $group_details['budget'] == 100 ){ echo 'selected'; } ?> value="100">$100</option>
                    <option <?php if ( $group_details['budget'] == 200 ){ echo 'selected'; } ?> value="200">$200</option>
                    <option <?php if ( $group_details['budget'] == 300 ){ echo 'selected'; } ?> value="300">$300</option>
                    <option <?php if ( $group_details['budget'] == 400 ){ echo 'selected'; } ?> value="400">$400</option>
                    <option <?php if ( $group_details['budget'] == 500 ){ echo 'selected'; } ?> value="500">$500</option>
                    <option <?php if ( $group_details['budget'] == 600){ echo 'selected'; } ?> value="600">$600</option>
                    <option <?php if ( $group_details['budget'] == 'sin-limite'){ echo 'selected'; } ?> value="sin-limite">Sin límite</option>
                </select>
            </div>
            <div class="[ form-group ]">
                <label class="[ center-block ]" for="description">Descripción</label>
                <textarea class="form-control" rows="6" id="descripcion-intercambio" name="description"><?php echo $group_details['description'] ?></textarea>
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label for="">Agregar a mi calendario</label>
                <br />
                <a href="<?php echo base_url(); ?>" title="Add to Calendar" class="addthisevent" data-track="ga('send', 'event', 'solicitudes', 'click', 'ate-calendar');">
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
            <div class="[ form-group] ">
                <input type="hidden" name="group_id" value="<?php echo $group_details['group_id'] ?>">
            </div>
            <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ scroll-box ]">
                <p class="[ center-block ] [ trade ]" for="name">INVITADOS</p>
                <ul class="list-unstyled">
                    <?php foreach($group_friends as $key => $friend) { ?>
                        <li>
                            <img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="<?php echo $friend['friend_picture'] ?>" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]"><?php echo $friend['friend_name'] ?></p>
                            <a href="#" class="[ j-remove-friend ]" data-group="<?php echo $friend['group_id'] ?>" data-friend="<?php echo $friend['id'] ?>">Eliminar</a>
                        </li>
                    <?php } ?>
                </ul>
            </div>
            <?php if($pending_friends != 0) { ?>
                <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ scroll-box ]">
                    <p class="[ center-block ] [ trade ]" for="name">PENDIENTES</p>
                    <ul class="list-unstyled">
                        <?php foreach($pending_friends as $key => $friend) {  ?>
                            <li>
                                <img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="<?php echo $friend['profile_picture'] ?>" alt=""><p class="[ three-quarter-width ] [ inline-block middle ]"><?php echo $friend['name'] ?></p>
                                <a href="#" class="[ j-remove-invitation ]" data-group="<?php echo $friend['group_id'] ?>" data-fb-user="<?php echo $friend['invited_fb_user_id']   ?>">Eliminar</a>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            <?php }// if ?>
            <div class="text-center">
                <a href="#" class="[ btn btn-primary btn-go ] [ j_invite_friends ] [ margin-bottom ]" ><span>Invitar más amigos</span></a><br/>
                <button class="[ btn btn-primary btn-go ]"><span>Guardar cambios</span></button>
            </div>
        </form>
    </div>
</div><!-- CONTENIDO -->