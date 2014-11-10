<div class="[ contenido ] [ container ]">
    <h2 class="[ text-center margin-bottom ]">Graba una dedicatoria</h2>
    <h4 class="[ text-center ]">Para <?php echo $secret_friend['name'] ?></h4>
    <h4 class="[ text-center ]">(<?php echo $secret_friend['group'] ?>)</h4>
    <div class="[ row ]">
        <div class="[ col-xs-12 col-sm-8 col-md-6 ] [ center-block margin-bottom ]">
            <div class="[ text-center ] [ margin-bottom ]">
                <p>Se le mandará una notificación del video a <?php echo $secret_friend['name'] ?>  después del intercambio.</p>
            </div>
            <?php
            $attributes = array('class' => 'add-class-here');
            echo form_open_multipart('secret_friends/upload_video/'.$secret_friend['group_id'], $attributes);
            ?>
                <div class="form-group">
                    <label class="[ text-center ] [ center-block ]" for="userfile">Sube o crea tu vídeo</label>
                    <input class="[ margin-bottom ] [ center-block ]" type="file" name="userfile"  />
                </div>
                <input type="hidden" name="secret_friend_id" value="<?php echo $secret_friend['secret_friend_id'] ?>">
                <input type="hidden" name="group_friend_id" value="<?php echo $secret_friend['group_friend_id'] ?>">
                <div class="text-center">
                    <button type="submit" value="" class="[ btn btn-primary btn-go ]">Subir video</button>
                </div>
            </form>
        </div>
    </div>
</div><!-- contenido -->