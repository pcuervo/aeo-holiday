<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Cupón</h2>
    <div class="[ row ] [ margin-bottom ]">
        <div class="[ col-xs-10 col-sm-6 col-md-4 ] [ center-block ] [ margin-bottom ]">
            <?php if ( $exchange_groups != 0 ){ ?>
                <img class="[ img-responsive ]" src="<?php echo base_url() ?>assets/images/cupon.jpg" alt="">
            <?php } else { ?>
                <h3 class="[ text-center ]">Para utilizar tu cupón, primero debes crear un intercambio.</h3>
            <?php } ?>
        </div>
        <?php if ( $origin == 'ng' ){ ?>
            <h3 class="[ text-center ]">¡Acabas de crear un grupo!</h3>
            <h3 class="[ text-center ]">Compartir</h3>
            <div class="[ text-center ] [ margin-bottom ]">
                <div class="fb-share-button" onclick="ga('send', 'event', 'intercambio', 'click', 'creadoCompartir');" data-href="<?php echo base_url(); ?>" data-layout="button"></div>

            </div>
        <?php } ?>
        <?php if ( $exchange_groups != 0 ){ ?>
            <div class="[ text-center ] [ margin-bottom ]">
                <form action="" class="[ text-center ] [ j-send-email ]">
                    <input type="text" name="email" value="<?php echo utf8_encode($email) ?>">
                    <a href="#" class="[ btn btn-primary btn-go ]"><span>enviar al correo</span></a>
                </form>
            </div>
            <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo base_url().'assets/images/cupon.jpg' ?>" class="[ btn btn-primary btn-go ]" download onclick="ga('send', 'event', 'cupón', 'click', 'guardarImagen');"><span>guardar imagen</span></a>
            </div>
        <?php } ?>
    </div><!-- row -->
</div><!-- login -->