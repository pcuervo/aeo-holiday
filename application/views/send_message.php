<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Mi amigo secreto</h2>
    <div class="[ row ] [ margin-bottom ]">
        <div class="[ col-xs-6 col-sm-4 ] [ center-block ] [  ]">
            <img class="[ img-responsive img-circle user-photo ]" src="<?php echo $secret_friend['friend_picture'] ?>" alt="">
        </div>
    </div><!-- row -->
    <h4 class="[ text-center ]"><?php echo $secret_friend['name'] ?></h4>
    <h4 class="[ text-center ] [ margin-bottom ]">(<?php echo $secret_friend['group'] ?>)</h4>
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <form action="<?php echo base_url().'secret_friends/send_message' ?>" method="POST">
                <textarea class="[ form-control ] [ margin-bottom ]" name="message" rows="4" placeholder="Mensaje"></textarea>
                <input type="hidden" name="secret_friend_id" value="<?php echo $secret_friend['secret_friend_id'] ?>">
                 <div class="[ text-center ] [ margin-bottom ]">
                    <button type="submit" class="[ btn btn-primary btn-go ]" onclick="ga('send', 'event', 'amigosSecretos', 'click', 'enviarMsj');"><span>Enviar</span></button>
                </div>
            </form>
        </div>
    </div>
</div><!-- login -->