<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Perfect Fit de</h2>

    <div class="[ row ]">
    </div><!-- row -->

    <h3 class="[ text-center ]"><?php echo $group_friend['name'] ?></h3>
    <h3 class="[ text-center ]"><?php echo $group['name'] ?></h3>


    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
        <?php foreach ($user_answers as $key => $user_answer) { ?>
            <p><?php echo $user_answer['question'].': '.$user_answer['answer'] ?></p>
        <?php } ?>
        </div>

        <div class="[ text-center ] [ margin-bottom ]">
        <a href="<?php echo base_url().'secret_friends/view/'.$group_friend['group_friend_id'] ?>" target="_top" class="btn btn-primary">Regresar <i></i> <img src="<?php echo base_url().'assets/images/icon-go.png' ?>" alt="go"></a>

        </div>
    </div>

</div><!-- login -->