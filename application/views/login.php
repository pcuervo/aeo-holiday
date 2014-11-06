<div class="[ contenido ] [ container ]">
    <div class="[ row ] [ login ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <div class="[ margin-bottom-big ]">
                <h1>
                    <a href="#">
                        <img class="[ img-responsive ]" src="<?php echo base_url().'assets/images/logo-bge-white.png' ?>" alt="American Eagle Best Gift Ever" title="American Eagle Best Gift Ever" />
                    </a>
                </h1>
            </div><!-- row -->
            <h3 class="[ text-center ] [ margin-bottom-big ]">La primera web app con la que puedes hacer el intercambio desde tu celular</h3>
            <!-- <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" class="btn btn-primary center-block"></fb:login-button> -->
            <div class="[ text-center ]">
                <form class="[ white ] [ margin-bottom ]" action="#">
                    <fieldset>
                        <input class="js-acepto" type="checkbox"> <a href="#">Acepto términos y condiciones</a>
                    </fieldset>
                </form>
                <a href="<?php echo $fb_login_url ?>" target="_top" class="[ btn btn-primary ] [ js-login js-disabled ]" disabled>Conecta con tu facebook <i></i> <img src="<?php echo base_url().'assets/images/icon-fb.png' ?>" alt="go"></a>
            </div>
        </div>
    </div>
</div><!-- login -->