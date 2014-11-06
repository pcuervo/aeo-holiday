<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Mi amigo secreto</h2>
    <div class="[ row ]">
        <div class="[ col-xs-11] [ center-block ] [  ]">
            <img class="[ img-circle ]" src="<?php echo $secret_friend['friend_picture'] ?>" alt="">
        </div>
    </div><!-- row -->
    <h3 class="[ text-center ]"><?php echo $secret_friend['name'] ?></h3>
    <h3 class="[ text-center ]"><?php echo $secret_friend['group'] ?></h3>
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <form action="<?php echo base_url().'secret_friends/send_message' ?>" method="POST">
                <textarea name="message"></textarea>
                <input type="hidden" name="secret_friend_id" value="<?php echo $secret_friend['secret_friend_id'] ?>">
                 <div class="[ text-center ] [ margin-bottom ]">
                    <button type="submit" class="btn btn-primary">Enviar <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></button>
                </div>
            </form>
        </div>
    </div>
</div><!-- login -->