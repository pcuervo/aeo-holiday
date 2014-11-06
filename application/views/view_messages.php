<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Mensajes</h2>
    <h3>Mensajes de mis amigos secretos.</h3>

    <div class="[ row ]">
        <?php foreach ($messages as $key => $message) {
            foreach ($message_sender_data as $sender) {
                if($message['from_group_friend_id'] != $sender['group_friend_id'])
                    continue;
                $sender_name = $sender['name'];
                $sender_profile_pic = $sender['profile_pic'];
                break;
            }
        ?>
        <img src="<?php echo $sender_profile_pic ?>" />
        <p>Manda: <?php echo $sender_name ?></p>
        <p>Grupo: <?php echo $message['group_name'] ?></p>
        <p>Mensaje: <?php echo $message['message_text'] ?></p>
        <?php } ?>
    </div>
    <div>
        <p>Escribir un mensaje para un amigo secreto</p>
          <a href=""  class="btn btn-primary j-secret-friends" data-user-id="<?php echo $group_friend_id ?>">Mensaje nuevo </a>
    </div>
</div><!-- login -->