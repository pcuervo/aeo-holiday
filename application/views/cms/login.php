<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <div class="[ margin-bottom-big ]">
                <h1>
                    <a href="#">
                        <img class="[ img-responsive ] [ center-block ]" src="<?php echo base_url().'assets/images/logo-bge-white.png' ?>" alt="American Eagle Best Gift Ever" title="American Eagle Best Gift Ever" />
                    </a>
                </h1>
            </div><!-- row -->
            <h3 class="[ text-center ] [ margin-bottom-big ]">Panel de administración</h3>
            <!-- <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" class="btn btn-primary center-block"></fb:login-button> -->
            <div class="[ text-center ]">
                <form class="[ white ] [ margin-bottom ]" action="/cms" method="POST">
                    <div class="[ form-group ] [ margin-bottom ]">
                        <label class="[ center-block ]" for="user">Usuario</label>
                        <input type="text" class="[ form-control ]" name="user">
                    </div>
                    <div class="[ form-group ] [ margin-bottom ]">
                        <label class="[ center-block ]" for="password">Password</label>
                        <input type="password" class="[ form-control ]" name="password">
                    </div>
                    <button class="[ btn btn-primary btn-go ]" type="submit"><span>Entrar</span></button>
                </form>
            </div>
        </div>
    </div>
</div><!-- login -->
