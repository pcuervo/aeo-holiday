<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <h3 class="[ text-center ] [ margin-bottom-small ]">Panel de administración</h3>
            <h3 class="[ text-center ] [ margin-bottom-big ]"><small><?php echo $_SESSION['username']; ?></small> </h3>
            <h3 class="[ text-center ] [ margin-bottom ]">Totales</h4>
            <div class="[ row ]">
                <div class="[ col-xs-3 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Invitaciones aceptadas</p>
                    <p class="[ text-large text-center ]"><?php echo $total_accepted_invitations ?></p>
                </div>
                <div class="[ col-xs-3 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Invitaciones pendientes</p>
                    <p class="[ text-large text-center ]"><?php echo $total_pending_invitations ?></p>
                </div>
                <div class="[ col-xs-3 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Mensajes enviados</p>
                    <p class="[ text-large text-center ]"><?php echo $total_sent_messages ?></p>
                </div>
                <div class="[ col-xs-3 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Grupos de intercambio</p>
                    <p class="[ text-large text-center ]"><?php echo $total_exchange_groups ?></p>
                </div>
                <div class="[ col-xs-3 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Usuarios</p>
                    <p class="[ text-large text-center ]"><?php echo $total_fb_users ?></p>
                </div>
            </div><!-- row -->
            <hr>
            <h3 class="[ text-center ]">Reportes por fecha</h4>
            <div class="[ text-center ]">
                <form class="[ white ] [ margin-bottom ] [ j-get-reports ]">
                    <div class="[ form-group ] [ margin-bottom ]">
                        <label class="[ center-block ]" for="start_date">Fecha inicial</label>
                        <input type="text" class="[ form-control ]" name="start_date">
                    </div>
                    <div class="[ form-group ] [ margin-bottom ]">
                        <label class="[ center-block ]" for="end_date">Fecha final</label>
                        <input type="text" class="[ form-control ]" name="end_date">
                    </div>
                    <button class="[ btn btn-primary btn-go ]"><span>Buscar</span></button>
                </form>
            </div>
            <h4 class="[ text-center ]">Resultados</h5>
            <div class="results">

            </div>
        </div>
    </div>
</div><!-- cms-dashboard -->
