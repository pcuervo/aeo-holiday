<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Mi amigo secreto</h2>
    <div class="[ row ]">
        <div class="[ col-xs-11] [ center-block ] [  ]">
            <img class="[ img-circle ]" src="<?php echo $friend_info['friend_picture'] ?>" alt="">
        </div>
    </div><!-- row -->
    <h3 class="[ text-center ]"><?php echo $friend_info['name'] ?></h3>
    <h3 class="[ text-center ]"><?php echo $group['name'] ?></h3>
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo '#' ?>" target="_top" class="btn btn-primary">Grabar dedicatoria <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>
            </div>
            <?php if($has_perfect_fit) { ?>
                <div class="[ text-center ] [ margin-bottom ]">
                    <a href="<?php echo base_url().'secret_friends/view_perfect_fit/'.$group_friend_id ?>" target="_top" class="btn btn-primary">Ver perfect fit <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>

                </div>
            <?php } ?>
             <div class="[ text-center ] [ margin-bottom ]">
                <a href="<?php echo '#' ?>" target="_top" class="btn btn-primary">Enviar mensaje <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>
            </div>
        </div>
    </div>
</div><!-- login -->