function Reset()
{
    materias = new Array;
    dificuldade = new Array;
    sessoesMateria = new Array;
}

function Quit()
{
    document.getElementById("rootInput").remove();
}

var cont = 0

var root;
var input;

function Main()
{
    Reset();
    cont += 1;

    root = document.getElementById("root");
    root.innerHTML += "<div id='rootInput'><div id='input'></div></div>";
    document.getElementById("rootInput").innerHTML += "<input class='inputs' id='quit' type='button' onclick='Quit()' value='X'>";

    input = document.getElementById("input");
    input.innerHTML += "<input class='inputs' id='qtdMaterias' type='text' placeholder='Quantas matérias vai estudar?' style='width: 300px;'>";
    input.innerHTML += "<input class='inputs' id='button' type='button' onclick='Set_qtdMaterias1()' value='Continuar'>";
}

var qtdMaterias;

function Set_qtdMaterias1()
{
    qtdMaterias = parseInt(document.getElementById("qtdMaterias").value);
    if (qtdMaterias > 0)
    {
        document.getElementById("qtdMaterias").remove();
        document.getElementById("button").remove();
        
        var i = 0;
        while (i < qtdMaterias)
        {
            input.innerHTML += "<input class='inputs' id='IDmateria" + i + "' type='text' placeholder='Digite a " + (i + 1) + "ª Matéria'>";
            i++;
        }

        input.innerHTML += "<input class='inputs' id='button' type='button' onclick='Set_dificuldade()' value='Continuar'>";
    }
    else
    {
        alert("Digite algum valor!");
    }
}

var materias = new Array();

function Set_dificuldade()
{
    var i = 0;
    while (i < qtdMaterias)
    {
        materias.push(document.getElementById("IDmateria" + i).value);

        document.getElementById("IDmateria" + i).remove();

        i++;
    }
    document.getElementById("button").remove();

    i = 0;

    input.innerHTML += "<span id='sub'>Digite seu nível de dificuldade de (1 - 5) em:</span>"

    while (i < qtdMaterias)
    {
        input.innerHTML += "<input class='inputs' id='IDdificuldade" + i + "' type='text' placeholder='" + materias[i] + "'>";
        i++;
    }
    input.innerHTML += "<input class='inputs' id='button' type='button' onclick='Set_dificuldadeTotal()' value='Continuar'>";
}

var dificuldade = new Array();
var dificuldadeTotal = 0;

function Set_dificuldadeTotal()
{
    var i = 0;
    while (i < qtdMaterias)
    {
        dificuldade.push(parseInt(document.getElementById("IDdificuldade" + i).value));

        dificuldadeTotal += parseInt(document.getElementById("IDdificuldade" + i).value);

        document.getElementById("IDdificuldade" + i).remove();
        i++;
    }
    document.getElementById("button").remove();
    document.getElementById("sub").remove();

    input.innerHTML += "<input class='inputs' id='qtdDias' type='text' placeholder='Quantos dias terá no seu ciclo de estudo?' style='width: 380px;'>";
    input.innerHTML += "<input class='inputs' id='qtdSessoes' type='text' placeholder='Quantas sessões planeja por dia?' style='width: 380px;'>";

    input.innerHTML += "<input class='inputs' id='button' type='button' onclick='Calc()' value='Criar'>";
}

var qtdDias;
var qtdSessoes;

function Calc()
{
    qtdDias = parseInt(document.getElementById("qtdDias").value);
    qtdSessoes = parseInt(document.getElementById("qtdSessoes").value);

    document.getElementById("rootInput").remove();

    var sessoesTotais = qtdDias * qtdSessoes;

    var sessoesMateria = new Array();
    var tempoX = sessoesTotais/dificuldadeTotal;

    i = 0

    while (i < qtdMaterias)
    {
        var sessoesAt = dificuldade[i] * tempoX;
        sessoesAt = Math.round(sessoesAt);
        sessoesMateria.push(sessoesAt);
        i++;
    }

    document.getElementById("ferramenta").innerHTML += "<div class='feedback' id='feedback" + cont + "'></div>"

    document.getElementById("feedback" + cont).innerHTML += "Ciclo: " + qtdDias + " dias <br>";
    document.getElementById("feedback" + cont).innerHTML += "Sessões: " + qtdSessoes + " sessões por dia <br><br>";

    document.getElementById("feedback" + cont).innerHTML += "<ul>";

    i = 0

    while (i < qtdMaterias)
    {
        document.getElementById("feedback" + cont).innerHTML +="<li>" + materias[i] + " terá " + sessoesMateria[i] + " sessões por ciclo </li><br>";
        i++;
    }

    document.getElementById("feedback" + cont).innerHTML += "</ul>";
}