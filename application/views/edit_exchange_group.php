<div class="[ contenido ] [ content ] [ margin-bottom ] [ clearfix ]">

    <h3 class="[ col-xs-11 col-sm-10 col-md-6 center-block ]">Edita tu intercambio</h3>

    <div class="[ col-xs-11 col-sm-10 col-md-6 center-block ]">
        <a href="http://example.com/link-to-your-event" title="Add to Calendar" class="addthisevent">Agregar a mi calendario
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
    </div>

    <form action="" method="POST" role="form" class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ j_edit_group_form ]">
        <div class="[ form-group ]">
            <label class="[ center-block ]" for="name">Nombre del intercambio</label>
            <input type="text" class="[ form-control ]" id="nombre-intercambio" name="name" value="<?php echo $group_details['name'] ?>">
        </div>
        <div class="[ form-group ]">
            <label class="center-block" for="exchange_date">Fecha del intercambio</label>
            <input type="date" class="form-control" id="fecha-intercambio" name="exchange_date" value="<?php echo date('Y-m-d', strtotime($group_details['exchange_date'])) ?>">
        </div>
        <div class="[ form-group ]">
            <label class="center-block" for="join_deadline">Fecha límite de inscripción</label>
            <input type="date" class="form-control" id="fecha-limite" name="join_deadline" value="<?php echo date('Y-m-d', strtotime($group_details['join_deadline'])) ?>">
        </div>
        <div class="[ form-group ]">
            <label class="[ center-block ]" for="place">Lugar</label>
            <input type="text" class="[ form-control ]" id="lugar-intercambio" name="place" value="<?php echo $group_details['place'] ?>">
        </div>
        <div class="[ form-group ]">
            <label class="[ center-block ]" for="budget">Monto del regalo</label>
            <select class="[ form-control ]" id="precio-intercambio" name="budget">
                <option value="50">$50</option>
                <option value="100">$100</option>
                <option value="200">$200</option>
                <option value="300">$300</option>
                <option value="400">$400</option>
                <option value="500">$500</option>
                <option value="600">$600</option>
                <option value="">Sin límite</option>
            </select>
        </div>
        <div class="[ form-group ]">
            <label class="[ center-block ]" for="description">Descripción</label>
            <textarea class="form-control" rows="6" id="descripcion-intercambio" name="description"><?php echo $group_details['description'] ?></textarea>
        </div>
        <div class="[ form-group] ">
            <input type="hidden" name="group_id" value="<?php echo $group_details['group_id'] ?>">
        </div>
        <label class="[ center-block ]" for="description">Amigos en el grupo</label>
        <ul class="list-unstyled">
        <div class="row">
        <?php foreach($group_friends as $key => $friend) { ?>
            <li class="[ clearfix ] [ col-xs-3 ]">
                <img class="[ img-responsive ]" src="<?php echo $friend['friend_picture'] ?>" alt="" class="[ user-photo ]">
                <p class="[ ]"><?php echo $friend['friend_name'] ?></p>
            </li>
        <?php } ?>
        </div>
        </ul>
        <?php if($pending_friends != 0) { ?>
            <label class="[ center-block ]" for="description">Amigos que no han confirmado</label>
            <ul class="list-unstyled">
            <div class="row">
            <?php foreach($pending_friends as $key => $friend) { ?>
                <li class="[ clearfix ] [ col-xs-3 ]">
                    <img class="[ img-responsive ]" src="<?php echo $friend['profile_picture'] ?>" alt="" class="[ user-photo ]">
                    <p class="[  ]"><?php echo $friend['name'] ?></p>
                </li>
            <?php }// foreach ?>
            </div>
        <?php }// if ?>
        </ul>
        <div class="text-center">
            <a href="#" class="[ btn btn-primary ] [ j_invite_friends ] [ margin-bottom ]">Invitar mas amigos</a><br/>
            <button class="[ btn btn-primary btn-go ]">Editar intercambio</button>
        </div>
    </form>
</div><!-- CONTENIDO -->