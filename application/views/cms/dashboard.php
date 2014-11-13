<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-md-10 ] [ center-block margin-bottom ]">
            <h3 class="[ text-center ] [ margin-bottom-small ]">Panel de administración</h3>
            <h3 class="[ text-center ] [ margin-bottom-big ]"><small><?php echo $_SESSION['username']; ?></small> </h3>
            <h3 class="[ text-center ] [ margin-bottom ]">Totales</h4>
            <div class="[ row ]">
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Total de Invitaciones</p>
                    <p class="[ text-large text-center ]"><?php echo $total_invitations ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Invitaciones aceptadas</p>
                    <p class="[ text-large text-center ]"><?php echo $total_accepted_invitations ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Invitaciones pendientes</p>
                    <p class="[ text-large text-center ]"><?php echo $total_pending_invitations ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Invitaciones rechazadas</p>
                    <p class="[ text-large text-center ]"><?php echo $total_rejected_invitations ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Mensajes enviados</p>
                    <p class="[ text-large text-center ]"><?php echo $total_sent_messages ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Grupos de intercambio</p>
                    <p class="[ text-large text-center ]"><?php echo $total_exchange_groups ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Usuarios</p>
                    <p class="[ text-large text-center ]"><?php echo $total_fb_users ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Intercambio terminados</p>
                    <p class="[ text-large text-center ]"><?php echo $total_closed_exchange_groups ?></p>
                </div>
                <div class="[ col-xs-4 ] [ margin-bottom ]">
                    <p class="[ text-center ]">Usuarios promedio por grupo</p>
                    <p class="[ text-large text-center ]"><?php echo $average_users_per_group ?></p>
                </div>
            </div><!-- row -->
            <hr class="[ center-block margin-bottom ]">
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
            <div class="[ results ]">
                <div class="[ row ]">
                    <div class="[ col-xs-6 ] [ margin-bottom-big ]">
                        <h4 class="[ text-center ]">Invitaciones aceptadas</h4>
                        <p class="[ notice ] [ text-center ] [ j-invitaciones-aceptadas ]"></p>
                        <canvas id="accepted_invitations_per_date"></canvas>
                    </div>
                    <div class="[ col-xs-6 ] [ margin-bottom-big ]">
                        <h4 class="[ text-center ]">Invitaciones pendientes</h4>
                        <p class="[ notice ] [ text-center ] [ j-invitaciones-pendientes ]"></p>
                        <canvas id="pending_invitations_per_date"></canvas>
                    </div>
                    <div class="[ col-xs-6 ] [ margin-bottom-big ]">
                        <h4 class="[ text-center ]">Invitaciones rechazadas</h4>
                        <p class="[ notice ] [ text-center ] [ j-invitaciones-rechazadas ]"></p>
                        <canvas id="rejected_invitations_per_date"></canvas>
                    </div>
                    <div class="[ col-xs-6 ] [ margin-bottom-big ]">
                        <h4 class="[ text-center ]">Mensajes enviados</h4>
                        <p class="[ notice ] [ text-center ] [ j-mensajes-enviados ]"></p>
                        <canvas id="sent_messages_per_date"></canvas>
                    </div>
                    <div class="[ col-xs-6 ] [ margin-bottom-big ]">
                        <h4 class="[ text-center ]">Usuarios</h4>
                        <p class="[ notice ] [ text-center ] [ j-usuarios ]"></p>
                        <canvas id="users_per_date"></canvas>
                    </div>
                </div><!-- row -->
            </div><!-- results -->
        </div>
    </div>
</div><!-- cms-dashboard -->
