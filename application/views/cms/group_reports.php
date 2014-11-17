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
                        if ( $current_group != '' ){ echo '</table></div></article>'; }
                        $current_group = $info['exchange_group_name']; ?>
                        <article class="[ margin-bottom-big ]">
                            <div class="panel panel-default">
                            <div class="panel-heading"><h4 class="[ text-center ]">"<?php echo $info['exchange_group_name']; ?>"</h4></div>
                            <div class="panel-body">
                                <p><?php echo $info['description']; ?></p>
                            </div>
                            <table class="[ table table-condensed ]">
                                <thead>
                                    <tr>
                                        <th>Participantes</th>
                                        <th>Fecha del intercambio</th>
                                        <th>Último día para unirse</th>
                                        <th>Presupuesto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td><?php echo $info['number_of_members']; ?></td>
                                    <td><?php echo str_replace("00:00:00","",$info['exchange_date']);?></td>
                                    <td><?php echo str_replace("00:00:00","",$info['join_deadline']); ?></td>
                                    <td><?php if( $info['budget'] == 0 ){ echo 'Sin límite'; } else { echo '$'.$info['budget']; }  ?></td>
                                </tbody>
                            </table>
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
                    </div>
                </article>
            </div><!-- row -->
        </div>
    </div>
</div><!-- cms-group-reports -->
