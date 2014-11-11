<div class="[ contenido ] [ margin-bottom ] [ clearfix ]">
    <div class="container">
        <h2 class="[ margin-bottom ] [ text-center ] [ center-block ]">Crea tu intercambio</h2>
        <form role="form" class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ j_group_form ]">
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="[ center-block ] [ ]" for="name">Nombre del intercambio</label>
                <input type="text" class="[ form-control ] [ required ]" id="nombre-intercambio" name="name">
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="center-block" for="exchange_date">Fecha del intercambio</label>
                <input type="date" class="[ form-control ] [ required ]" id="fecha-intercambio" name="exchange_date" >
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="center-block" for="join_deadline">Fecha límite de inscripción</label>
                <input type="date" class="[ form-control ] [ required ]" id="fecha-limite" name="join_deadline">
                <input type="text" class="[ form-control ] [ required ] [ j-datepicker ]" id="fecha-limite" name="join_deadline">
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="[ center-block ]" for="place">Lugar</label>
                <input type="text" class="[ form-control ]" id="lugar-intercambio" name="place">
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="[ center-block ]" for="budget">Monto del regalo</label>
                <select class="[ form-control ] [ required ]" id="precio-intercambio" name="budget">
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
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="[ center-block ]" for="description">Descripción</label>
                <textarea class="form-control" rows="6" id="descripcion-intercambio" name="description"></textarea>
            </div>
            <input type="hidden" name="admin_id" value="<?php echo $fb_user_id ?>">
            <div class="text-center">
                <a href="#" class="[ btn btn-primary btn-go ]  [ margin-bottom ] [ j_invite_friends ]"><span>Invitar amigos</span></a>
            </div><!-- text-center -->
            <div class="text-center">
                <button class="[ btn btn-primary btn-go ]" onclick="ga('send', 'event', 'intercambio', 'click', 'intercambioCreado');"><span>Crear intercambio</span></button>
            </div><!-- text-center -->
        </form>
    </div><!-- container -->
</div><!-- CONTENIDO -->