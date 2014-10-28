        </div><!-- /#wrapper -->
        
        <script src="<?php echo base_url().'assets/js/jquery.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/bootstrap.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/plugins.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/functions.js' ?>"></script>
        <script>
            // Add site's base url and current view to local storage to use in Javascript
            localStorage.setItem('base_url', '<?php echo $base_url ?>');
            localStorage.setItem('current_view', '<?php echo $current_view ?>');

            toggleMainMenu();
            facebookInit();
            
        </script>
    </body>
</html>