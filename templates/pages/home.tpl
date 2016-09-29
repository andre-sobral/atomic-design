
<!DOCTYPE html>
<html>
<head>
    {{>head}} 
</head>
<body>

    <!--** MENU MOBILE -->
    <div class="cnt-view">

            <!--** MENU MOBILE -->
            <div data-ref="menu-mobile"></div>

            <!--** Header -->
            <header data-ref="cnt-header">
                {{>header}}
            </header>

              <!--// 
                  // CONTAINER
                  //////////// --> 
                  <main data-ref="home">
                     
                        <div data-ref="watson">
                            {{>watson}}
                        </div>

                  </main>
        
        <!--** Footer -->
        <footer data-ref="cnt-footer">
            {{>footer}} 
        </footer>
            
        <!-- /* JS  */-->
        <script src="static/js/home.js" type="text/javascript" charset="utf-8"></script>

    </div>   

</body>
</html>


