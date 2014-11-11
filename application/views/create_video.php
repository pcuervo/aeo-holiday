<div class="[ contenido ] [ container ]">
    <h2 class="[ text-center margin-bottom ]">Graba una dedicatoria</h2>
    <h4 class="[ text-center ]">Para <?php echo $secret_friend['name'] ?></h4>
    <h4 class="[ text-center ] [ margin-bottom ]">(<?php echo $secret_friend['group'] ?>)</h4>
    <div class="[ text-center ] [ margin-bottom ]">
        <p class="[ uppercase ]">Se le mandará una notificación del video a <?php echo $secret_friend['name'] ?>  después del intercambio.</p>
    </div>
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <?php
            $attributes = array('class' => 'add-class-here');
            echo form_open_multipart('secret_friends/upload_video/'.$secret_friend['group_id'], $attributes);
            ?>
                <?php if ( $is_mobile == 1 ) {?>
                    <div class="form-group">
                        <input class="[ margin-bottom ] [ center-block ]" type="file" name="file-mobile"  />
                    </div>
                    <div class="text-center">
                        <button type="submit" value="" class="[ btn btn-primary btn-go ]"><span>enviar</span></button>
                    </div>
                <?php } else { ?>
                    <div id="webcam"></div>
                    <div class="[ text-center margin-bottom ]">
                        <button id="recordStartButton" class="[ btn btn-primary btn-go ]" disabled><span>Comenzar a grabar</span></button>
                        <button id="recordStopButton" class="[ btn btn-primary btn-go ]" disabled><span>Detener grabación</span></button>
                    </div>
                    <div id="message"></div>
                <?php } ?>
                <input type="hidden" name="secret_friend_id" value="<?php echo $secret_friend['secret_friend_id'] ?>">
                <input type="hidden" name="group_friend_id" value="<?php echo $secret_friend['group_friend_id'] ?>">
            </form>
        </div>
    </div>
</div><!-- contenido -->