<div class="[ contenido ] [ content ] [ margin-bottom ] [ clearfix ]">

    <h3 class="[ col-xs-11 col-sm-10 col-md-6 center-block ]">Edita tu intercambio</h3>
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
        <ul>
        <?php foreach($group_friends as $key => $friend) { ?>
            <li class="[ clearfix ]">
                <img class="[ col-xs-3 ]" src="<?php echo $friend['friend_picture'] ?>" alt="" class="[ user-photo ]">
                <p class="[ col-xs-9 ]"><?php echo $friend['friend_name'] ?></p>
            </li>
        <?php } ?>
        </ul>
        
        <?php if($pending_friends != 0) { ?>
            <label class="[ center-block ]" for="description">Amigos que no han confirmado</label>
            <ul>
            <?php foreach($pending_friends as $key => $friend) { ?>
                <li class="[ clearfix ]">
                    <img class="[ col-xs-3 ]" src="<?php echo $friend['profile_picture'] ?>" alt="" class="[ user-photo ]">
                    <p class="[ col-xs-9 ]"><?php echo $friend['name'] ?></p>
                </li>
            <?php }// foreach ?>
        <?php }// if ?>
        </ul>
        <a href="#" class="[ btn btn-primary ] [ center-block ] [ j_invite_friends ]">Invitar mas amigos</a><br/>
        <button class="[ btn btn-primary ] [ center-block ]">Editar intercambio</button>
    </form>

</div><!-- CONTENIDO -->