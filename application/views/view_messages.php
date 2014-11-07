<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Mensajes</h2>
    <h3>Mensajes de mis amigos secretos.</h3>

    <?php if($messages != 0) { ?>
    <div class="[ row ]">
        <?php foreach ($messages as $key => $message) { ?>
        <p>Grupo: <?php echo $message['group_name'] ?></p>
        <p>Mensaje: <?php echo $message['message_text'] ?></p>
        <?php } ?>
    </div>
    <?php } else { ?>
     <div class="[ row ]">
        No tienes mensajes.
    </div>
    <?php } ?>
    <div>
        <p>Escribir un mensaje para un amigo secreto</p>
        <a href="" class="btn btn-primary j-secret-friends">Mensaje nuevo </a>
    </div>
    <div class="j-modal"></div>
</div><!-- login -->