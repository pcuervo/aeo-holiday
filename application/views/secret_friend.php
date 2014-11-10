<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Mi amigo secreto</h2>
    <div class="[ row ] [ margin-bottom ]">
        <div class="[ col-xs-8 ] [ center-block ] [  ]">
            <img class="[ img-responsive img-circle user-photo ]" src="<?php echo $secret_friend['friend_picture'] ?>" alt="">
        </div>
    </div><!-- row -->
    <h4 class="[ text-center ]"><?php echo $secret_friend['name'] ?></h4>
    <h4 class="[ text-center ] [ margin-bottom ]">(<?php echo $secret_friend['group'] ?>)</h4>
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <?php if($video == 0){ ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo base_url().'secret_friends/create_video/'.$secret_friend['group_friend_id'] ?>" target="_top" class="btn btn-primary btn-go" onclick="ga('send', 'event', 'amigosSecretos', 'click', 'grabarDedicatoria');"><span>Grabar dedicatoria</span></a>
                </div>
            <?php } else { ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo base_url().'uploads/'.$video['video_url'] ?>" target="_blank" class="btn btn-primary btn-go"><span>Ver dedicatoria</span></a>
                </div>
            <?php } ?>

            <?php if($has_perfect_fit) { ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo base_url().'secret_friends/view_perfect_fit/'.$secret_friend['group_friend_id'] ?>" target="_top" class="btn btn-primary btn-go" onclick="ga('send', 'event', 'amigosSecretos', 'click', 'verPerfectFit');"><span>Ver perfect fit</span></a>
                </div>
            <?php } ?>
             <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo base_url().'secret_friends/create_message/'.$secret_friend['group_friend_id']  ?>" target="_top" class="btn btn-primary btn-go" onclick="ga('send', 'event', 'amigosSecretos', 'click', 'enviarMensaje');"><span>Enviar mensaje</span></a>
            </div>
        </div>
    </div>
</div><!-- login -->