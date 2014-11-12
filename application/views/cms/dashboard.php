<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-md-10 ] [ center-block margin-bottom ]">
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
                <div class="[ col-xs-3 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Intercambio terminados</p>
                    <p class="[ text-large text-center ]"><?php echo $total_closed_exchange_groups ?></p>
                </div>
            </div><!-- row -->
            <hr class="[ center-block margin-bottom ]" >
            <h3 class="[ text-center margin-bottom ]">Reportes por fecha</h4>
            <div class="[ text-center ]">
                <form class="[ white ] [ margin-bottom ] [ j-get-reports ]">
                    <div class="[ row ]">
                        <div class="[ col-xs-6 ] [ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="start_date">Fecha inicial</label>
                            <input type="text" class="[ form-control ] [ j-datepicker j-start_date ]" name="start_date">
                        </div>
                        <div class="[ col-xs-6 ] [ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="end_date">Fecha final</label>
                            <input type="text" class="[ form-control ] [ j-datepicker j-end_date ]" name="end_date">
                        </div>
                    </div><!-- row -->
                    <button class="[ btn btn-primary btn-go ]"><span>Buscar</span></button>
                </form>
            </div>
            <h4 class="[ text-center ]">Resultados</h5>
            <div class="results">

            </div>
        </div>
    </div>
</div><!-- cms-dashboard -->
