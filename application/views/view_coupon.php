<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Cupón</h2>
    <div class="[ row ] [ margin-bottom ]">
        <div class="[ col-xs-10 col-sm-6 col-md-4 ] [ center-block ] [ margin-bottom ]">
            <?php if ( $exchange_groups != 0 ){ ?>
                <img class="[ img-responsive ]" src="<?php echo base_url() ?>assets/images/cupon.jpg" alt="">
            <?php } else { ?>
                <h3 class="[ text-center margin-bottom ]">Para utilizar tu cupón, primero debes crear un intercambio.</h3>
                <div class="text-center">
                    <a href="<?php echo base_url() ?>dashboard/new_exchange_group" class="[ btn btn-primary btn-go ] [ margin-bottom ]" onclick="ga('send', 'event', 'intercambio', 'click', 'intenciónCrearIntercambio');"><span>Crear nuevo intercambio</span></a>
                </div>
            <?php } ?>
        </div>
        <?php if ( $origin == 'ng' ){ ?>
            <h3 class="[ text-center ] [ margin-bottom ]">¡Acabas de crear un grupo!</h3>
            <h3 class="[ text-center ] [ margin-bottom ]">Compartir</h3>
            <div class="[ text-center ] [ margin-bottom ]">
                <button class="[ btn btn-primary btn-go ] [ share-button ]" onclick="ga('send', 'event', 'intercambio', 'click', 'creadoCompartir');"><span>Share</span></button>
            </div>
        <?php } ?>
        <?php if ( $exchange_groups != 0 ){ ?>
            <div class="[ text-center ] [ margin-bottom ]">
                <div class="row">
                    <form action="" class="[ text-center center-block ] [ col-xs-12 col-sm-8 ] [ j-send-email ]">
                        <input class="[ form-control ] [ margin-bottom ] [ required email ]" type="text" name="email" value="<?php echo utf8_encode($email) ?>">
                        <br />
                        <button type="submit" class="[ btn btn-primary btn-go ] [ margin-bottom ]"><span>enviar al correo</span></button>
                    </form>
                    <p class="[ notice ] [ j-send-email-notice ]"></p>
                </div>
            </div>
            <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo base_url().'assets/images/cupon.jpg' ?>" class="[ btn btn-primary btn-go ]" download onclick="ga('send', 'event', 'cupón', 'click', 'guardarImagen');"><span>guardar imagen</span></a>
            </div>
        <?php } ?>
    </div><!-- row -->
</div><!-- login -->