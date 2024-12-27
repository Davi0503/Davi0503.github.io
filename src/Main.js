$(document).ready(function (){

    // $.get("https://api.tibiadata.com/v2/world/Belobra.json", function(result){
    //     var listaChar = result.world.players_online;
    //    $.each(listaChar, function(i, v){
    //         console.log(v.name);
    //         $('.lista').append('<tr><td>'+ v.name +'</td><td>'+ v.level +'</td></tr>');
    //    });
    // });

    $('.btnVerificar').click(function(){
        var carta = $('.carta').val();
        var allNames = [];
        var linhas = carta.split(/\r|\r\n|\n/);
        console.log(linhas);
        var count = linhas.length;
        console.log(count);

        $.each(linhas, function(i, v){
            var ret = LimparLinha(v);
            var names = FindNamesLine(ret);

            $.each(names, function(i, v){
                allNames.push(v);
            });
        });
        CheckarStatus(allNames);
    });

});

function LimparLinha(linha){
    var clear1 = linha.toLowerCase().replace(/[n:|n-]{2}/,'').replace("next:", '');
    return clear1;
}

function PrimeiraLetra(linha){
    var count = linha.length;
    for (let index = 0; index < count; index++) {

        if(linha[index].match(/[a-z]/i)){

            return index;
        }        
    }
}

function UltimaLetra(name){ 
    var countB = name.length;
    for (let index = countB - 1; index >= 0; index--) {

        if(name[index].match(/[a-z]/i)){

            return index + 1;
        }        
    }
}

function FindNamesLine(linha){
    
    var listName = [];
    var namePT = linha.split("/");
    $.each(namePT, function(i, v){
       var inicio =  PrimeiraLetra(v); 
       var final = UltimaLetra(v);
       

        var name = v.substring(inicio, final);

     
       var finalName = name.replace(" ", "+");
       listName.push(finalName);
    });
    return listName;
}

function CheckarStatus(nameList){
    var listaChar;
    let verificados = [];
    console.log("chamada api")
    $.get("https://api.tibiadata.com/v4/world/venebra", function(result, status){
        debugger
        listaChar = result.world.online_players;
        var carta = $('.carta').val().toLowerCase();

        $.each(listaChar, function(i, v){
            if(carta.includes(v.name.toLowerCase())){
                verificados.push(v);
            }
        });
        MontarTable(verificados);
    });

    
    
}

function MontarTable(list){
    $.each(list, function(i, v){
        $('.lista').append('<tr><td>'+ v.name +'</td><td>'+ v.level +'</td><td>'+ v.vocation +'</td><td> Online </td></tr>');
    });
}






