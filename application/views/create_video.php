<div class="[ contenido ] [ container ]">
    <h2 class="[ text-center margin-bottom ]">Graba una dedicatoria</h2>
    <h4 class="[ text-center ]">Para <?php echo $secret_friend['name'] ?></h4>
    <h4 class="[ text-center ] [ margin-bottom ]">(<?php echo $secret_friend['group'] ?>)</h4>
    <div class="[ text-center ] [ margin-bottom ]">
        <p class="[ uppercase ]">Se le mandará una notificación del video a <?php echo $secret_friend['name'] ?> después del intercambio.</p>
    </div>
    <div class="[ row ]">
        <div class="[ col-xs-12  col-sm-10 col-md-8 ] [ center-block margin-bottom ]">
            <?php
            $attributes = array('class' => '[ j-mobile-video-form ]');
            echo form_open_multipart('secret_friends/upload_video/'.$secret_friend['group_id'], $attributes);
            ?>
                <?php if ( $is_mobile == 1 ) {?>
                    <div class="[ form-group ]">
                        <input class="[ j-mobile-video-input ] [ margin-bottom ] [ center-block ] [ form-control ]" type="file" accept="video/*" name="userfile" placeholder="Graba tu video" />
                    </div>
                    <div class="[ text-center ]">
                        <button type="submit" value="" class="[ btn btn-primary btn-go ] [ j-mobile-video-button ]"><span>enviar</span></button>
                    </div>
                <?php } else { ?>
                    <div id="webcam"></div>
                    <p class="[ text-center uppercase ]"><small>El video debe durar máximo <span class="timer j-timer">15</span> segundos.</small></p>
                    <div class="[ text-center margin-bottom ]">
                        <button id="recordStartButton" class="[ btn btn-primary btn-go ]" disabled><span>Comenzar a grabar</span></button>
                        <button id="recordStopButton" class="[ btn btn-primary btn-go ]" disabled onclick="ga('send', 'event', 'amigosSecretos', 'click', 'grabarDedicatoriaDetener');"><span>Detener grabación</span></button>
                    </div>
                    <div id="message"></div>
                <?php } ?>
                <input type="hidden" name="secret_friend_id" value="<?php echo $secret_friend['secret_friend_id'] ?>">
                <input type="hidden" name="group_friend_id" value="<?php echo $secret_friend['group_friend_id'] ?>">
            </form>
        </div>
    </div>
    <div class="loader-lightbox">
        <div class="[ loader ] [ center-block ]">
            <img class="[ img-responsive ]" src="<?php echo base_url() ?>assets/images/loader.svg">
            <p class="[ text-center ]">…</p>
        </div><!-- loader -->
    </div><!-- loader-lightbox -->
</div><!-- contenido -->