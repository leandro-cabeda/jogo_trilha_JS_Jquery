function formatempo(t)
{
    if (t < 10)
    {
        return "0" + t;
    }
    else if (t === 60)
    {
        return "00";
    }
    else
    {
        return String(t);
    }
}

function tempodecorrido()
{
    var min = $("#tempo").find("span:first-child").text();
    var sec = $("#tempo").find("span:last-child").text();
    min = parseInt(min);
    sec = parseInt(sec);

    return min * 60 + sec; //tempo decorrido em segundos
}

function atualizacrono(templimit)
{
    if (tempodecorrido() >= templimit)
    {
        return;
    }

    var min = $("#tempo").find("span:first-child").text();
    var sec = $("#tempo").find("span:last-child").text();
    min = parseInt(min);
    sec = parseInt(sec);

    sec++;
    if (sec >= 60)
    {
        sec = 0;
        min++;
    }

    min = formatempo(min);
    sec = formatempo(sec);


    $("#tempo").find("span:first-child").text(min);
    $("#tempo").find("span:last-child").text(sec);

}
function calcpontfinal(acertos, error, min, sec, templimit)
{
    var tempodecorrido = (min * 60) + sec; //tempo decorrido em segundos

    var pontos = (acertos * 10) - (error * 5) + (templimit - tempodecorrido) * 2;

    if (pontos < 0)
    {
        pontos = 0;
    }
    return pontos;
}



//gera numeros de 1..valorMaximo
function geranumcasa(qtd, min, max)
{
    var num = [];
    var i;
    var n;
    for (i = 0; i < qtd; i++)
    {
        n = Math.floor(Math.random() * (max - min + 1)) + min;

        num.push(n);
    }

    return num;
}

function dado(atual)
{
    atual = String(atual);
    if (atual.trim().length === 0)
    {
        atual = 0;
    }

    atual = parseInt(atual);
    var numgerado = atual;

    do {
        numgerado = Math.floor(Math.random() * 6) + 1;
    } while (numgerado === atual);

    return numgerado;
}

$(document).ready(function () {
  var numeros=geranumcasa(12,6,10);
  //console.log(numeros);

  var casas=$("div.casa:gt(0)").not("div:last");

    var templimit =((50*5)-10); //segundos!
    var intervalotempo = null;
    var timeoutjogo = null;
    var i;
    for(i=0;i<12;i++)
    {
      $(casas[i]).text(numeros[i]);
    }
    var val;
    var i;
    var resto;
    var acertos=0;
    var error=0;
    var da;
    var esse;
    var res;
    var r;
    var n;
    var pontos=0;
    var min;
    var sec;
    var res2;
    var fim;
    var ponto;


    $(".c").click(function(){
      // metodos importantes
      // nextAll(); esses 2 comandos servem pra filtrar o q buscar
      //is();
      if($("#btnjogar").hasClass("btnativo"))
      {
        return;
      }

      esse=$(this).attr("id");
      esse=parseInt(esse);
      res=$(this).text();
      res=parseInt(res);


            if(esse==r)
            {

              val=$(this).addClass("marcado");
              $(".casa:first").removeClass("marcado");
              setTimeout(function () {
                $(val).removeClass("marcado");
              }, 200);

                da=n;

                n=dado($("#dado span").text());
                $("#dado span").text(n);


                resto=(res%da);

                resto=parseInt(resto);
                //$("#mo").html("Clica "+resto+" casa(s) a frente, se for 0 clica na mesma").addClass("mos");

                r=(resto+esse);
                if(r>12)
                {

                  min=$("#tempo").find("span:first-child").text();
                  min=parseInt(min);
                  sec=$("#tempo").find("span:last-child").text();
                  sec=parseInt(sec);
                  ponto=calcpontfinal(acertos, error, min, sec, templimit);
                  $("#pontos").find("span").text(ponto);

                  $("#msg").html("Parabéns chegou ao fim antes de acabar o \n\
                  tempo, total de pontos realizados é  "+ponto+" !!!").addClass("vitoria");
                  $(".c").stop();
                  $("#fim").addClass("marcado3");

                  clearInterval(intervalotempo);
                  clearInterval(timeoutjogo);
                  /*setTimeout(function () {
                    $("#mo").hide();
                      //window.location.href="codigo.html";
                  }, 5000);*/


                }


                acertos++;
            }
            else
            {

              val=$(this).addClass("marcado2");
              setTimeout(function(){
                $(val).removeClass("marcado2")},200);

                n=dado($("#dado span").text());
                $("#dado span").text(n);

                esse=r;
                r=esse;
                //$("#mo").html("Tem que clicar na casa "+esse+" porque o numero que caiu é na casa: "+r).addClass("mos");


              error++;

            }

            $("#acertos span").text(acertos);
            $("#erros span").text(error);




    });


    $("#btnjogar").click(function () {
        $(this).removeClass();
        $(this).addClass("btninativo");
        $(this).fadeOut(1500);
        n = dado($("#dado span").text());
        $("#dado span").text(n);
        n=parseInt(n);

        val=$(".casa:first").addClass("marcado");

        r=n;

        //$("#mo").html("Clica "+r+" casa(s) a frente, se for 0 clica na mesma").addClass("mos");


            intervalotempo = setInterval(atualizacrono, 1000, templimit);

            timeoutjogo = setTimeout(function () {

              //fim de jogo, o jogador perdeu...
              min=$("#tempo").find("span:first-child").text();
              min=parseInt(min);
              sec=$("#tempo").find("span:last-child").text();
              sec=parseInt(sec);
              ponto=calcpontfinal(acertos, error, min, sec, templimit);
              $("#pontos").find("span").text(ponto);

              $("#msg").html('<div>Tempo esgotado você perdeu o jogo,\n\
              "total de pontos realizados foi  '+ponto+'!!!</div').addClass("derrota");
              $(".c").stop();
              //$("#btnjogar").removeClass("btninativo");
              //$("#btnjogar").addClass("btnativo").fadeIn();

              /*setTimeout(function () {
                $("#mo").hide();
                //window.location.href="codigo.html";
              }, 5000);*/
            clearInterval(intervalotempo);

          },(templimit *1000) + 1000);



    });

});
