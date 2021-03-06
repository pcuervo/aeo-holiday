<div class="[ contenido ] [ margin-bottom ] [ clearfix ]">
    <div class="container">
        <h2 class="[ margin-bottom ] [ text-center ] [ center-block ]">Crea tu intercambio</h2>
        <form role="form" class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ j_group_form ]">
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="[ center-block ] [ ]" for="name">Nombre del intercambio</label>
                <input type="text" class="[ form-control ] [ required ]" id="nombre-intercambio" name="name" maxlength="50">
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="center-block" for="exchange_date">Fecha del intercambio</label>
                <?php if ( $is_mobile == 1 ){ ?>
                    <input type="date" class="[ form-control ] [ required ]" id="fecha-intercambio" name="exchange_date" >
                <?php } else { ?>
                    <input type="text" class="[ form-control ] [ required ] [ j-datepicker ]" id="fecha-intercambio" name="exchange_date">
                <?php } ?>
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="center-block" for="join_deadline">Fecha límite para participar</label>
                <?php if ( $is_mobile == 1 ){ ?>
                    <input type="date" class="[ form-control ] [ required ]" id="fecha-limite" name="join_deadline">
                <?php } else { ?>
                    <input type="text" class="[ form-control ] [ required ] [ j-datepicker ]" id="fecha-limite" name="join_deadline">
                <?php } ?>
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="[ center-block ]" for="place">Lugar</label>
                <input type="text" class="[ form-control ]" id="lugar-intercambio" maxlength="50" name="place">
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
                    <option value="sin-limite">Sin límite</option>
                </select>
            </div>
            <div class="[ form-group ] [ margin-bottom ]">
                <label class="[ center-block ]" for="description">Descripción</label>
                <textarea class="form-control" rows="6" id="descripcion-intercambio"  maxlength="140" name="description"></textarea>
            </div>
            <input type="hidden" name="admin_id" value="<?php echo $fb_user_id ?>">
            <div class="text-center">
                <a href="#" class="[ btn btn-primary btn-go ]  [ margin-bottom ] [ j_invite_friends ]" onclick="ga('send', 'event', 'intercambio', 'click', 'agregarInvitados');"><span>Invitar amigos</span></a>
                <p class="[ j_invite_friends-notice ] [ text-center ]"></p>
            </div><!-- text-center -->
        </form>
    </div><!-- container -->
</div><!-- CONTENIDO -->
<div class="loader-lightbox">
    <div class="[ loader ] [ center-block ]">
        <img class="[ img-responsive ]" src="<?php echo base_url() ?>assets/images/loader.svg">
        <p class="[ text-center ]">…</p>
    </div><!-- loader -->
</div><!-- loader-lightbox -->
<!-- Modal -->
<div class="modal fade" id="modalCrearIntercambio" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
      </div>
      <div class="modal-body">
        <div class="text-center">
            <a class="[ btn btn-primary btn-go ] [ j-createExchangeGroup ]" onclick="ga('send', 'event', 'intercambio', 'click', 'intercambioCreado');"><span>Crear intercambio</span></a>
        </div><!-- text-center -->
      </div>
    </div>
  </div>
</div>