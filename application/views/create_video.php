<div class="[ contenido ] [ container ]">
    <h2 class="text-center">Graba un mensaje para <?php echo $secret_friend['name'] ?></h2>
    <h3 class="[ text-center ]">(<?php echo $secret_friend['group'] ?>)</h3>
    <div class="[ row ]">
        <div class="[ col-xs-11] [ center-block ] [  ]">
            img pendiente...
        </div>
    </div><!-- row -->
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <?php
            $attributes = array('class' => 'add-class-here');
            echo form_open_multipart('secret_friends/upload_video/'.$secret_friend['group_id'], $attributes);
            ?>
                <label for="userfile">Sube o crea tu vídeo</label>
                <input class="margin-bottom" type="file" name="userfile"  />
                <input type="hidden" name="secret_friend_id" value="<?php echo $secret_friend['secret_friend_id'] ?>">
                <input type="hidden" name="group_friend_id" value="<?php echo $secret_friend['group_friend_id'] ?>">
                <button type="submit" value="" class="block boton chico right">Subir video</button>
            </form>
            <div class="row">
                <div class="[ text-center ] [ margin-bottom ]">
                    <p>Se le mandará una notificación del video a <?php echo $secret_friend['name'] ?>  después del intercambio.</p>
                </div>
            </div>
                
        </div>
    </div>
</div><!-- contenido -->