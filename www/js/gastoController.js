var GastoController = {
    
    init: function (){
        //Register events via framework7
        $$(document).on("click", "#btnAddGasto", GastoController.goToAdd);
        $$(document).on("click", "#save", GastoController.save);
        $$(document).on("click", "#cancel", GastoController.cancel);
        $$(document).on("click", "#delete", GastoController.delete);

        //load list
        GastoController.refreshGastoList();
    },

    goToAdd: function () {
        //Framework7 carregando a página addGasto
        mainView.router.loadPage("addGasto.html");
    },

    save: function(){
        var descricao = $$("#descricao").val();
        var data = $$("#data").val();
        var valor = $$("#valor").val();
        var id = $$("#id").val();

        if (!id) {
            GastoService.add(descricao, data, valor);
        } else {
            var gasto = new Gasto(descricao, data, valor);
            gasto.id = id;
            GastoService.edit(gasto);
        }
        
        //refresh list
        GastoController.refreshGastoList();
    },

    delete: function(){
        var id = $$("#id").val();
        
        if (!id){
            alert('Produto ainda não salvo para excluir');
        }else {
            var descricao = $$("#descricao").val();        
        
            var gasto = new Gasto(descricao, null, null);
            gasto.id = id;

            GastoService.remove(gasto);

            //refresh list
            GastoController.refreshGastoList();
        }
    },

    cancel: function(){
        GastoController.refreshGastoList();
    },

    refreshGastoList: function(){
        //back to view
        mainView.router.back();

        // zera o vetor
        var gastos = Array();

        var db = openDatabase("storage.db" , "1.0" , "banco" , 2 * 1024);    
        db.transaction(function(tx) {
            tx.executeSql("select * from gastos", [], 
                function(tx, res) {
                    console.log("res.rows.length: " + res.rows.length );                    
                    // preenche o vetor
                    for (i=0; i<= res.rows.length -1 ; i++){
                        gasto = new Gasto(res.rows.item(i).descricao , res.rows.item(i).data , res.rows.item(i).valor);
                        gasto.id = res.rows.item(i).id;
                        gastos.push(gasto);
                    }        
                    
                    myApp.virtualList('.list-block.media-list', {
                    items: gastos,
                    template: 
                            '<li>'+
                            '  <a href="addGasto.html?id={{id}}&descricao={{descricao}}&data={{data}}&valor={{valor}}" class="item-link item-content">'+
                            '    <div class="item-inner">'+
                            '      <div class="item-title-row">' +
                            '        <div class="item-title">{{descricao}} - R$ {{valor}} </div>' +
                            '        <div class="item-after">{{data}}</div>' +
                            '      </div>' +
                            '    </div>' +
                            '  </a>' +
                            '</li>' 
                    });
                }
            );
        } , null , null);

    }

}