        </div><!-- /#wrapper -->
        
        <script src="<?php echo base_url().'assets/js/jquery.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/bootstrap.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/plugins.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/functions.js' ?>"></script>
        <script>
            // Add site's base url to local storage to use in Javascript
            localStorage.setItem('base_url', '<?php echo $base_url ?>');

            <?php if($current_view == 'login') { ?>
                facebookInit();
            <?php } ?>

        </script>
    </body>
</html>