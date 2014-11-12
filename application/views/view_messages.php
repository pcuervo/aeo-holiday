<div class="[ contenido ] [ container ]">
    <h2 class="[ text-center ] [ margin-bottom ]">Mensajes de mis amigos secretos</h2>
    <div>
        <div class="row">
            <div class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ]">
                <p class="[ text-center ]">Escribir un mensaje para un amigo secreto</p>
                <div class="[ text-center ]">
                    <a href="" class="[ btn btn-primary btn-go ] [ margin-bottom ] [ j-secret-friends ]">Mensaje nuevo </a>
                </div>
                <hr>
            </div>
        </div>
    </div>
    <div class="j-modal">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ scroll-box ]">
            <p class="[ center-block ] [ trade ]" for="name">Selecciona un amigo:</p>
            <ul class="list-unstyled">

            </ul>
        </div>
    </div>
    <?php if($messages != 0) { ?>
        <?php foreach ($messages as $key => $message) { ?>
            <div class="[ row ]">
                <div class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ]">
                    <p>Grupo: <?php echo $message['group_name'] ?></p>
                    <p class="[ margin-bottom ]">Mensaje: <?php echo $message['message_text'] ?></p>
                    <hr>
                </div>
            </div>
        <?php } ?>
    <?php } else { ?>
     <div class="[ row ]">
        <p class="[ text-center ]">No tienes mensajes.</p>
    </div>
    <?php } ?>
</div><!-- login -->