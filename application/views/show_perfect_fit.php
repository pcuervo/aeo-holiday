<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Perfect Fit de</h2>
    <h3 class="[ text-center ]"><?php echo $group_friend['name'] ?></h3>
    <h3 class="[ text-center margin-bottom ]">(<?php echo $group['name'] ?>)</h3>
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <div class="[ row ]">
                <?php
                if ( count($user_answers) == 3 ){
                    foreach ($user_answers as $key => $user_answer) { ?>
                        <div class="[ col-xs-4 ]">
                            <p class="[ text-center uppercase ]"><?php echo $user_answer['question']; ?></p>
                            <p class="[ text-center text-large uppercase ]"><?php echo $user_answer['answer'] ?></p>
                        </div>
                <?php }
                } ?>
                <?php
                if ( count($user_answers) == 4 ){
                    foreach ($user_answers as $key => $user_answer) { ?>
                        <div class="[ col-xs-3 ]">
                            <p class="[ text-center uppercase ]"><?php echo $user_answer['question']; ?></p>
                            <p class="[ text-center text-large uppercase ]"><?php echo $user_answer['answer'] ?></p>
                        </div>
                <?php }
                } ?>
            </div><!-- row -->
        </div>
        <div class="[ text-center ] [ margin-bottom ]">
            <a href="<?php echo base_url().'secret_friends/view/'.$group_friend['group_friend_id'] ?>" class="[ btn btn-primary btn-go ]"><span>Regresar</span></a>
        </div>
    </div>
</div><!-- login -->