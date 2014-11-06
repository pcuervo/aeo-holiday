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

            <?php if($video == 0){ ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo base_url().'secret_friends/create_video/'.$secret_friend['group_friend_id'] ?>" target="_top" class="btn btn-primary">Grabar dedicatoria <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>
                </div>
            <?php } else { ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo base_url().'secret_friends/view_video/'.$video['secret_friend_id'] ?>" target="_blank" class="btn btn-primary">Ver dedicatoria <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>
                </div>
            <?php } ?>

            <?php if($has_perfect_fit) { ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo '#' ?>" target="_top" class="btn btn-primary">Ver perfect fit <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>
                </div>
            <?php } ?>
             <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo '#' ?>" target="_top" class="btn btn-primary">Enviar mensaje <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>
            </div>
        </div>
    </div>
</div><!-- login -->