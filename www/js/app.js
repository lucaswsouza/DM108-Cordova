// Inicializacao
var myApp = new Framework7({
    material: true, //quando material:true nao suporta back link com navegacao dinamica
    template7Pages: true,
    animateNavBackIcon: true,
    precompileTemplates: true
});

// Exportando os seletores
var $$ = Dom7;

// Adicionando uma view principal
var mainView = myApp.addView('.view-main', {
    // Configurado para o modo de navegação dinâmico
    dynamicNavbar: true
});

//evento especifico do cordova
$$(document).on('deviceready', function() {

    console.log('splash show');
    navigator.splashscreen.show();
    window.setTimeout(function () {
        navigator.splashscreen.hide();
        console.log('splash hide');
    }, 3000);


    // inicia o banco de dados
    var db = openDatabase("storage.db" , "1.0" , "banco" , 2 * 1024);

    // confere estrutura do banco
    db.transaction(
        function(tx) {       
            tx.executeSql('CREATE TABLE IF NOT EXISTS gastos (id integer primary key, data text, descricao text , valor numeric(10,2) )');            
        }, 
        
        function(error) {
           console.log('Transaction ERROR: ' + error.message);
        }, 
        
        function() {
           console.log('Banco Criado com sucesso');
        }
    );

    GastoController.init();
});