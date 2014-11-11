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
                <div class="fb-share-button" data-href="<?php echo base_url(); ?>" data-layout="button"></div>
            </div>
        <?php } ?>
        <?php if ( $exchange_groups != 0 ){ ?>
            <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo base_url().'dashboard/send_coupon_by_email' ?>" class="[ btn btn-primary btn-go ]"><span>enviar al correo</span></a>
            </div>
            <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo base_url().'assets/images/cupon.jpg' ?>" class="[ btn btn-primary btn-go ]" download><span>guardar imagen</span></a>
            </div>
        <?php } ?>
    </div><!-- row -->
</div><!-- login -->