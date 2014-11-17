<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-md-10 ] [ center-block margin-bottom ]">
            <h2 class="[ text-center ] [ margin-bottom-small ]">Agregar producto</h2>
            <div class="[ row ]">
                <div class="[ col-xs-12  col-sm-10 col-md-8 ] [ center-block margin-bottom ]">
                    <?php
                    $attributes = array('class' => '[ ]');
                    echo form_open_multipart('cms/insert_product/', $attributes);
                    ?>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="name">Nombre del producto</label>
                            <input type="text" class="[ form-control ]" maxlength="50" name="name">
                        </div>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="gender">Género</label>
                            <select class="[ form-control ] [ required ]" name="gender">
                                <option value="m">hombre</option>
                                <option value="f">mujer</option>
                            </select>
                        </div>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="category">Categoría</label>
                            <select class="[ form-control ] [ required ]" name="category">
                                <option value="accesorio">accesorio</option>
                                <option value="top">top</option>
                                <option value="pantalon">pantalón</option>
                            </select>
                        </div>
                        <div class="[ form-group ]">
                            <input class="[ j-mobile-video-input ] [ margin-bottom ] [ center-block ] [ form-control ]" type="file" accept="video/*" name="userfile" placeholder="Graba tu video" />
                        </div>
                        <div class="[ text-center ]">
                            <button type="submit" value="" class="[ btn btn-primary btn-go ] [ j-mobile-video-button ]"><span>enviar</span></button>
                        </div>

                        <input type="hidden" name="secret_friend_id" value="<?php echo $secret_friend['secret_friend_id'] ?>">
                        <input type="hidden" name="group_friend_id" value="<?php echo $secret_friend['group_friend_id'] ?>">
                    </form>
                </div>
            </div><!-- row -->
        </div>
    </div>
</div><!-- cms-home -->
