            <footer class="[ clearfix ]">
                <div class="row">
                    <div class="[ col-xs-4 ] [ center-block ]">
                        <p class="[ text-center ]">AEO Management 2014</p>
                    </div><!-- col-xs-4 -->
                </div>
            </footer>
        </div><!-- /.wrapper -->
        <script language="JavaScript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script src="<?php echo base_url().'assets/js/jquery.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/jquery-ui.min.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/bootstrap.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/plugins.min.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/functions.js' ?>"></script>
        <script>
            localStorage.setItem('base_url', '<?php echo base_url() ?>');
            toggleMainMenu();
            footerBottom();
            getAppReports();
            dateRange();
            Chart.defaults.global.responsive = true;

            total_accepted_invitations();
            
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-43305108-4', 'auto');ga('send', 'pageview');
        </script>
    </body>
</html>