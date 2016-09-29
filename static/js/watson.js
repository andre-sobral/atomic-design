

$(function(){

	/* ------------------------------------------------------------------------ */
    /*  ANIMATION BUBBLES BACKGROUND
    /* ------------------------------------------------------------------------ */
        
        $( "body" ).append( '<div class="bubble-wrap"><div class="bubble"></div></div>' );

        var carimbo = $('.bubble-wrap');
        for (var i = 0; i < 10; i++) {
            var nbCount = i;
            $('.bubble-wrap > .bubble').eq(0).clone().appendTo(carimbo);
        }

});	

$(function(){
	
    /*//
    /* ------------------------------------------------------------------------ */
    /*  ANIMAÇÕES; 
    /* ------------------------------------------------------------------------ */
        
        // Scene 1 
        var time1 = 0;
    
        for (var i = 0; i < 1000; i++){
            time1 += 1000;
            setTimeout(function() {
                // PULSE SINAL REMOVE CLASS
                $('.baals').addClass('animated bounceInDown');
                $('.brand').addClass('animated bounceInUp');
                
            }, time1);

        }//FIM
        
        // Scene 2
        var time = 0;
    
            for (var i = 0; i < 1000; i++){
                time += 4000;
                setTimeout(function() {
                    // PULSE SINAL REMOVE CLASS
                    $('.baals').addClass('start-motion');
                    $('.brand').addClass('start-motion');
                    
                }, time);
            }//FIM

        
        // Scene 3
        var time3 = 0;
    
            for (var i = 0; i < 1000; i++){
                time3 += 6688;
                setTimeout(function() {
                    
                    // PULSE SINAL REMOVE CLASS
                    $('.cnt-interative').addClass('animated bounceInLeft');
                    
                }, time3);
            }//FIM

});	

$(function(){

    /*//
    /* ------------------------------------------------------------------------ */
    /*  TICKERS EXEMPLO
    /* ------------------------------------------------------------------------ */

        $(function() {

            $('#straps').vTicker('init', {
                speed: 400, 
                pause: 1800,
                showItems: 1,
                padding:11,
            });

            
        });//FIM

});	


$(function(){

    /*//
    /* ------------------------------------------------------------------------ */
    /*  FUNÇÃO LETTER
    /* ------------------------------------------------------------------------ */              
        
        function lettereffects() {
           
            $(".lettering").netkevin_text_animation("typing", { timer: 50, repeat: 1});
        
        };//FIM


    /* ------------------------------------------------------------------------ */
    /*  TEXTO BOAS-VINDAS ( Animação )
    /* ------------------------------------------------------------------------ */

        // pega texto localizado no data-txt
        var strTXT = $(".lettering").attr("data-txt");
        
        // time para exibir o texto de boas-vindas 
        function increase() {
            //                
            for (var i = 0; i < 1000; i++){
                setTimeout(function() {

                    // invoca a função letter 
                    lettereffects();

                });

            }}//FIM


        setTimeout(increase, 8880);

});	

$(function(){

    /* ------------------------------------------------------------------------ */
    /*  BOTÃO SIMULA POST E CHAMA A FUNÇÃO LETTER
    /* ------------------------------------------------------------------------ */


        d = new Date();
        hour = d.getHours();
        if(hour < 5)
        {
           var saudacao = "Boa Noite";
        }
        else
        if(hour < 8)
        {
           var saudacao = "Bom Dia";
        }
        else
        if(hour < 12)
        {
           var saudacao = "Bom Dia!";
        }
        else
        if(hour < 18)
        {
           var saudacao = "Boa tarde!";
        }
        else
        {
           var saudacao = "Boa noite!";
        }

    /* ------------------------------------------------------------------------ */
    /*  BOTÃO SIMULA POST E CHAMA A FUNÇÃO LETTER
    /* ------------------------------------------------------------------------ */

        $('button').click(function(){
           
            // valor do input
            var txt = $("input").val();

            // se o input estiver vazio atualiza o placeholder
            if (txt == "") {
                $("input").attr({
                    placeholder: 'O texto é obrigatório',
                });
            }

            // quandoo texto estiver informado
            else {

                //imprime o valor o texto
                $(".lettering").html("Oi "+ txt + ", "+saudacao+"Como posso te ajudar?");
                
                // invoca a função letter 
                lettereffects();

                //limpa o input
                $("input").val("");
            }

        });// END

});	