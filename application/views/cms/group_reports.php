<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-md-10 ] [ center-block margin-bottom ]">
            <h2 class="[ text-center ] [ margin-bottom-small ]">Información de grupos del intercambio</h2>
            <h3 class="[ text-center ] [ margin-bottom-big ]"><small>Usuario: <?php echo $_SESSION['username']; ?></small> </h3>
            <div class="[ row ]">
                <?php $current_group = ''; ?>
                <?php 
                foreach ($group_info as $key => $info) { 
                    if($current_group != $info['exchange_group_name']){
                        $current_group = $info['exchange_group_name'];
                        echo '<h4>'.$info['exchange_group_name'].'</h4>';
                        echo '<p>Descripción: '.$info['description'].'</p>';
                        echo '<p>Número de participantes: '.$info['number_of_members'].'</p>';
                        echo '<p>Fecha del intercambio: '.$info['exchange_date'].'</p>';
                        echo '<p>Último día para unirse: '.$info['join_deadline'].'</p>';
                        echo '<p>Presupuesto: '.$info['budget'].'</p>';
                    }
                    echo '<p>Nombre: '.$info['member_name'].'</p>';
                    echo '<p>Género: '.$info['gender'].'</p>';
                    echo '<p>Email: '.$info['email'].'</p>';
                    echo '<p>¿Es administrador?: '.$info['email'];
                    if($info['admin'] == 1)
                        echo 'Si';
                    else
                        echo 'No';
                    echo '</p>';
                    
                } ?>
               
            </div><!-- row -->
            <hr class="[ center-block margin-bottom ]">

        </div>
    </div>
</div><!-- cms-dashboard -->
