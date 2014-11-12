<div class="[ contenido ] [ container ]">
    <div class="[ row ] [ login ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <h3 class="[ text-center ] [ margin-bottom-big ]">Panel de administración</h3>
            <p><?php echo $_SESSION['username']; ?></p>
            <h4>Totales</h4>
                <p>Invitaciones aceptadas: <?php echo $total_accepted_invitations ?></p>

                <p>Invitaciones pendientes: <?php echo $total_pending_invitations ?></p>
            <hr>

            <h4>Reportes por fecha</h4>
            <div class="[ text-center ]">
                <form class="[ white ] [ margin-bottom ] [ j-search- ]">
                    <div class="[ form-group ] [ margin-bottom ]">
                        <label class="[ center-block ]" for="beginning_date">Fecha inicial</label>
                        <input type="text" class="[ form-control ]" name="beginning_date">
                    </div>
                    <div class="[ form-group ] [ margin-bottom ]">
                        <label class="[ center-block ]" for="end_date">Fecha final</label>
                        <input type="text" class="[ form-control ]" name="end_date">
                    </div>
                    <button class="[ btn btn-primary btn-go ]"><span>Buscar</span></button>
                </form>
            </div>
            <h5>Resultados</h5>
            <div class="results">
                
            </div>
        </div>
    </div>
</div><!-- cms-dashboard -->
