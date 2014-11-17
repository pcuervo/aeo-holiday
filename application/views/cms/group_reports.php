<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-md-10 ] [ center-block margin-bottom ]">
            <h2 class="[ text-center ] [ margin-bottom-small ]">Información de grupos del intercambio</h2>
            <h3 class="[ text-center ] [ margin-bottom-big ]"><small>Usuario: <?php echo $_SESSION['username']; ?></small> </h3>
            <div class="[ row ]">
                <?php $current_group = ''; ?>
                <?php
                foreach ( $group_info as $key => $info) {
                    if($current_group != $info['exchange_group_name']){
                        if ( $current_group != '' ){ echo '</table></article>'; }
                        $current_group = $info['exchange_group_name']; ?>
                        <article class="[ margin-bottom-big ]">
                            <div class="[ info ] [ margin-bottom ]">
                                <h4>Nombre: "<?php echo $info['exchange_group_name']; ?>"</h4>
                                <p>Descripción: <?php echo $info['description']; ?> </p>
                                <p>Número de participantes: <?php echo $info['number_of_members']; ?> </p>
                                <p>Fecha del intercambio: <?php echo str_replace("00:00:00","",$info['exchange_date']);?> </p>
                                <p>Último día para unirse: <?php echo str_replace("00:00:00","",$info['join_deadline']); ?> </p>
                                <p>Presupuesto: <?php if( $info['budget'] == 0 ){ echo 'Sin límite'; } else { echo '$'.$info['budget']; }  ?> </p>
                            </div><!-- info -->
                            <table class="[ table table-condensed ]">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Género</th>
                                        <th>Email</th>
                                        <th>¿Es administrador?</th>
                                    </tr>
                                </thead>
                            <?php } ?>
                            <tr>
                                <td><?php echo $info['member_name']; ?></td>
                                <td><?php echo $info['gender']; ?></td>
                                <td><?php echo $info['email']; ?></td>
                                <td><?php if( $info['admin'] == 1 ){ echo 'Sí'; } else { echo 'No'; } ?>    </td>
                            </tr><!-- fila -->
                    <?php } ?>
                    </table><!-- table -->
                </article>
            </div><!-- row -->
        </div>
    </div>
</div><!-- cms-dashboard -->
