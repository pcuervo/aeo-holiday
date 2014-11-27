<div class="[ container ] [ contenido home ] [ margin-bottom ] [ clearfix ]">
    <h2 class="[ text-center ]">Catálogo</h2>
    <div class="[ margin-bottom ]">
        <div id="filters">
          <div class="ui-group">
            <h3 class="[ text-center margin-bottom ]">Género</h3>
            <div class="[ button-group js-radio-button-group ] [ text-center ]" data-filter-group="color">
              <button class="[ btn btn-primary btn-go ] [ margin-bottom ] [ is-checked ]" data-filter="" onclick="ga('send', 'event', 'catálogogénero', 'click', 'todo');"><span>todo</span></button>
              <button class="[ btn btn-primary btn-go ] [ margin-bottom ]" data-filter=".hombre" onclick ="ga('send', 'event', 'catálogogénero', 'click', 'hombre');"><span>hombre</span></button>
              <button class="[ btn btn-primary btn-go ] [ margin-bottom ]" data-filter=".mujer" onclick ="ga('send', 'event', ' catálogogénero ', 'click', 'mujer');"><span>mujer</span></button>
            </div>
          </div>
          <div class="ui-group">
            <h3 class="[ text-center margin-bottom ]">Categoría</h3>
            <div class="[ button-group js-radio-button-group ] [ text-center ]" data-filter-group="size">
              <button class="[ btn btn-primary btn-go ] [ margin-bottom ] [ is-checked ]" data-filter="" onclick="ga('send', 'event', ' catálogocategoría ', 'click', 'todo');"><span>todos</span></button>
              <button class="[ btn btn-primary btn-go ] [ margin-bottom ]" data-filter=".accesorios" onclick="ga('send', 'event', ' catálogocategoría ', 'click', 'accesorios');"><span>accesorios</span></button>
              <button class="[ btn btn-primary btn-go ] [ margin-bottom ]" data-filter=".top" onclick="ga('send', 'event', ' catálogocategoría ', 'click', 'tops');"><span>tops</span></button>
              <button class="[ btn btn-primary btn-go ] [ margin-bottom ]" data-filter=".pantalones" onclick="ga('send', 'event', ' catálogocategoría ', 'click', 'pantalones');"><span>pantalones</span></button>
            </div>
          </div>
        </div>
    </div>
    <div class="[ row ] [ margin-bottom ] [ isotope ]">
        <?php foreach ($catalog_images as $key => $image) { ?>
            <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item <?php echo $image['gender'].' '.$image['category'] ?> ]">
                <a href="../../uploads/catalog/<?php echo $image['url_big'] ?>" data-toggle="lightbox" data-gallery="multiimages" data-title="<?php echo $image['name'] ?>">
                    <img class="[ img-responsive margin-bottom ]" src="../../uploads/catalog/<?php echo $image['url_big'] ?>">
                </a>
                <p><?php echo $image['name'] ?></p>
                <a href="/cms/edit/<?php echo $image['id'] ?>" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
            </div>
        <?php } ?>

    	<div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
			<a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-vintage-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Camisa de Franela con Grecas AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-vintage-aeo.png">
            </a>
			<p>Camisa de Franela con Grecas AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
    	</div>
    	<div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
			<a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/camisa-de-franela-roja-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Camisa de Franela Roja AEO" >
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/camisa-de-franela-roja-aeo.png">
			</a>
            <p>Camisa de Franela Roja AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
    	</div>
    	<div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
			<a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/camisa-de-ranela-osos-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Camisa de Franela Osos AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/camisa-de-ranela-osos-aeo.png">
			</a>
            <p>Camisa de Franela Osos AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
    	</div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/camisa-gris-de-franela-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Camisa Gris de Franela AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/camisa-gris-de-franela-aeo.png">
            </a>
            <p>Camisa Gris de Franela AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/cardigan-estampado-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Cárdigan Estampado AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/cardigan-estampado-aeo.png">
            </a>
            <p>Cárdigan Estampado AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-de-plumas-azul-marino-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra de Plumas Azul Marino AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-de-plumas-azul-marino-aeo.png">
            </a>
            <p>Chamarra de Plumas Azul Marino AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-de-plumas-naranja-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra de Plumas Naranja AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-de-plumas-naranja-aeo.png">
            </a>
            <p>Chamarra de Plumas Naranja AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-de-plumas-plateada-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra de Plumas Plateada AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-de-plumas-plateada-aeo.png">
            </a>
            <p>Chamarra de Plumas Plateada AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-estilo-bombero-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra estilo bombero AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-estilo-bombero-aeo.png">
            </a>
            <p>Chamarra estilo bombero AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-vintage-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra Vintage AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/chamarra-vintage-aeo.png">
            </a>
            <p>Chamarra Vintage AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/hoodie-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Hoodie AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/hoodie-aeo.png">
            </a>
            <p>Hoodie AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/polo-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Polo AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/polo-aeo.png">
            </a>
            <p>Polo AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/sudadera-con-cierre-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Sudadera con Cierre AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/sudadera-con-cierre-aeo.png">
            </a>
            <p>Sudadera con Cierre AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/sudadera-gris-con-gorro-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Sudadera Gris con Gorro AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/sudadera-gris-con-gorro-aeo.png">
            </a>
            <p>Sudadera Gris con Gorro AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-aeo.png">
            </a>
            <p>Suéter AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-bicolor-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter Bicolor AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-bicolor-aeo.png">
            </a>
            <p>Suéter Bicolor AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-con-rayas-y-grecas-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter con Rayas y Grecas AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-con-rayas-y-grecas-aeo.png">
            </a>
            <p>Suéter con Rayas y Grecas AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-cuello-v-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter Cuello V AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-cuello-v-aeo.png">
            </a>
            <p>Suéter Cuello V AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-rayado-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter Rayado AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/sueter-rayado-aeo.png">
            </a>
            <p>Suéter Rayado AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/t-shirt-con-grafico-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="T-Shirt con Gráfico AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/t-shirt-con-grafico-aeo.png">
            </a>
            <p>T-Shirt con Gráfico AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/top/t-shirt-termica-clasica-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="T-Shirt Térmica Clásica AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/top/t-shirt-termica-clasica-aeo.png">
            </a>
            <p>T-Shirt Térmica Clásica AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/joggers-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Joggers AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/joggers-aeo.png">
            </a>
            <p>Joggers AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/joggers-cafes-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Joggers Cafés AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/joggers-cafes-aeo.png">
            </a>
            <p>Joggers Cafés AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/skinny-jeans-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Skinny Jeans">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/skinny-jeans.png">
            </a>
            <p>Skinny Jeans</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/slim-straight-jeans-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Slim Straight Jeans">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/slim-straight-jeans.png">
            </a>
            <p>Slim Straight Jeans</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/super-skinny-jeans-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Super Skinny Jeans">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/pantalon/super-skinny-jeans.png">
            </a>
            <p>Super Skinny Jeans</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/beanie-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Beanie AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/beanie-aeo.png">
            </a>
            <p>Beanie AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bóxer AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-aeo.png">
            </a>
            <p>Bóxer AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-con-grecas-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bóxer con Grecas AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-con-grecas-aeo.png">
            </a>
            <p>Bóxer con Grecas AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-de-pinguinos-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bóxer de Pinguinos AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-de-pinguinos-aeo.png">
            </a>
            <p>Bóxer de Pinguinos AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-multicolor-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bóxer Multicolor AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/boxer-multicolor-aeo.png">
            </a>
            <p>Bóxer Multicolor AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/bufanda-bicolor-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bufanda Bicolor AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/bufanda-bicolor-aeo.png">
            </a>
            <p>Bufanda Bicolor AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/bufanda-multicolor-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bufanda Multicolor">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/bufanda-multicolor.png">
            </a>
            <p>Bufanda Multicolor</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/calcetines-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Calcetines AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/calcetines-aeo.png">
            </a>
            <p>Calcetines AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item hombre accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/gorro-con-copos-de-nieve-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Gorro con Copos de Nieve AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/hombre/accesorios/gorro-con-copos-de-nieve-aeo.png">
            </a>
            <p>Gorro con Copos de Nieve AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/cardigan-estampado-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Cárdigan estampado AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/cardigan-estampado-aeo.png">
            </a>
            <p>Cárdigan estampado AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/chaleco-de-plumas-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chaleco de Plumas AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/chaleco-de-plumas-aeo.png">
            </a>
            <p>Chaleco de Plumas AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/chamarra-con-gorro-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra con Gorro AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/chamarra-con-gorro-aeo.png">
            </a>
            <p>Chamarra con Gorro AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/chamarra-de-mezclilla-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra de Mezclilla AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/chamarra-de-mezclilla-aeo.png">
            </a>
            <p>Chamarra de Mezclilla AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/chamarra-de-plumas-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Chamarra de Plumas AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/chamarra-de-plumas-aeo.png">
            </a>
            <p>Chamarra de Plumas AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/parka-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Parka AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/parka-aeo.png">
            </a>
            <p>Parka AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/polo-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Polo AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/polo-aeo.png">
            </a>
            <p>Polo AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/sudadera-con-grafico-y-brillo-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Sudadera con Gráfico y Brillo AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/sudadera-con-grafico-y-brillo-aeo.png">
            </a>
            <p>Sudadera con Gráfico y Brillo AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/sudadera-con-oso-polar-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Sudadera con Oso Polar AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/sudadera-con-oso-polar-aeo.png">
            </a>
            <p>Sudadera con Oso Polar AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/sudadera-merry-bright-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Sudadera Merry and Bright AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/sudadera-merry-bright-aeo.png">
            </a>
            <p>Sudadera Merry and Bright AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/sueter-con-capucha-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter con Capucha AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/sueter-con-capucha-aeo.png">
            </a>
            <p>Suéter con Capucha AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/sueter-con-copos-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter con Copos AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/sueter-con-copos-aeo.png">
            </a>
            <p>Suéter con Copos AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/sueter-para-jegging-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Suéter para Jegging AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/sueter-para-jegging-aeo.png">
            </a>
            <p>Suéter para Jegging AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-encaje-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="T-Shirt con encaje AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-encaje-aeo.png">
            </a>
            <p>T-Shirt con encaje AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-de-corazon-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="T-Shirt con Gráfico de Corazón">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-de-corazon.png">
            </a>
            <p>T-Shirt con Gráfico de Corazón</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-de-oso-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="T-Shirt con Gráfico de Oso">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-de-oso.png">
            </a>
            <p>T-Shirt con Gráfico de Oso</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-de-plumas-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="T-Shirt con Gráfico de Plumas">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-de-plumas.png">
            </a>
            <p>T-Shirt con Gráfico de Plumas</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-love-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="T-Shirt con Gráfico Love">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/t-shirt-con-grafico-love.png">
            </a>
            <p>T-Shirt con Gráfico Love</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/vestido-kate-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Vestido Kate AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/vestido-kate-aeo.png">
            </a>
            <p>Vestido Kate AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/jegging-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Jegging AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/jegging-aeo.png">
            </a>
            <p>Jegging AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/jegging-x-hi-rise-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Jegging X Hi-Rise">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/jegging-x-hi-rise.png">
            </a>
            <p>Jegging X Hi-Rise</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/pants-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Pants AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/pants-aeo.png">
            </a>
            <p>Pants AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/pants-azules-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Pants Azules AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/pants-azules-aeo.png">
            </a>
            <p>Pants Azules AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/pants-negros-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Pants Negros AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/pants-negros-aeo.png">
            </a>
            <p>Pants Negros AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/sky-high-jegging-gris-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Sky High Jegging Gris">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/sky-high-jegging-gris.png">
            </a>
            <p>Sky High Jegging Gris</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer pantalones ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/sky-high-jegging-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Sky High Jegging">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/pantalon/sky-high-jegging.png">
            </a>
            <p>Sky High Jegging</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/beanie-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Beanie AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/beanie-aeo.png">
            </a>
            <p>Beanie AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/beanie-con-estampado-de-corazones-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Beanie con Estampado de Corazones">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/beanie-con-estampado-de-corazones.png">
            </a>
            <p>Beanie con Estampado de Corazones</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/beanie-multicolor-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Beanie Multicolor AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/beanie-multicolor-aeo.png">
            </a>
            <p>Beanie Multicolor AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/bufanda-con-tejido-grueso-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bufanda con Tejido Grueso AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/bufanda-con-tejido-grueso-aeo.png">
            </a>
            <p>Bufanda con Tejido Grueso AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/bufanda-tejida-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Bufanda Tejida AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/bufanda-tejida-aeo.png">
            </a>
            <p>Bufanda Tejida AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer top ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/top/camisa-escocesa-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Camisa Escocesa AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/top/camisa-escocesa-aeo.png">
            </a>
            <p>Camisa Escocesa AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/collar-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Collar AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/collar-aeo.png">
            </a>
            <p>Collar AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/collar-con-dijes-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Collar con Dijes AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/collar-con-dijes-aeo.png">
            </a>
            <p>Collar con Dijes AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/gorro-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Gorro AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/gorro-aeo.png">
            </a>
            <p>Gorro AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/lentes-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Lentes AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/lentes-aeo.png">
            </a>
            <p>Lentes AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
        <div class="[ col-xs-6 col-md-3 ] [ margin-bottom ] [ j-item mujer accesorios ]">
            <a href="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/reloj-aeo-big.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Reloj AEO">
                <img class="[ img-responsive margin-bottom ]" src="<?php echo base_url() ?>assets/images/catalog/mujer/accesorios/reloj-aeo.png">
            </a>
            <p>Reloj AEO</p>
            <a href="/edit/1" class="[ btn btn-primary btn-go ]"><span>editar</span></a>
        </div>
    </div>
</div>