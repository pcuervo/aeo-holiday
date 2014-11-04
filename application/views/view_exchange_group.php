<div class="[ contenido ] [ content ] [ margin-bottom ] [ clearfix ]">

    <h3 class="[ col-xs-11 col-sm-10 col-md-6 center-block ]">Datos del intercambio</h3>
    <p class="[ center-block ]" for="name">Administrador del intercambio: <?php echo $current_fb_user['first_name'].' '.$current_fb_user['last_name'] ?></p>
    <p class="[ center-block ]" for="name">Nombre del intercambio: <?php echo $group_details['name'] ?></p>
    <p class="[ center-block ]" for="name">Fecha del intercambio: <?php echo date('Y-m-d', strtotime($group_details['exchange_date'])) ?></p>
    <p class="[ center-block ]" for="name">Fecha límite de inscripción: <?php echo date('Y-m-d', strtotime($group_details['join_deadline'])) ?></p>
    <p class="[ center-block ]" for="name">Lugar: <?php echo $group_details['place'] ?></p>
    <p class="[ center-block ]" for="name">Monto del regalo: $<?php echo $group_details['budget'] ?></p>
    <p class="[ center-block ]" for="name">Descripción: <?php echo $group_details['description'] ?></p>
    <p class="[ center-block ]" for="name">Amigos en el grupo:</p>
    <ul class="list-unstyled">
    <?php foreach($group_friends as $key => $friend) { ?>
        <li class="[ clearfix ]">
            <img class="[ col-xs-3 ]" src="<?php echo $friend['friend_picture'] ?>" alt="" class="[ user-photo ]">
            <p class="[ col-xs-9 ]"><?php echo $friend['friend_name'] ?></p>
        </li>
    <?php } ?>
    </ul>


</div><!-- CONTENIDO -->