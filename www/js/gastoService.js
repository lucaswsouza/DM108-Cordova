

var GastoService = {    

    //gastos: new Array(),
    // getAll: function(){      

    //     // zera o vetor
    //     gastos = Array();

    //     var db = openDatabase("storage.db" , "1.0" , "banco" , 2 * 1024);    
    //     db.transaction(function(tx) {
    //         tx.executeSql("select * from gastos", [], 
    //             function(tx, res) {
    //                 console.log("res.rows.length: " + res.rows.length );                    
    //                 // preenche o vetor
    //                 for (i=0; i<= res.rows.length -1 ; i++){
    //                     gasto = new Gasto(res.rows.item(i).descricao , res.rows.item(i).data , res.rows.item(i).valor);
    //                     gasto.id = res.rows.item(i).id;
    //                     gastos.push(gasto);
    //                 }                    
    //             }
    //         );
    //     } , onSuccessQuery , null);

    //     return gastos;

    // },

    add: function(descricao, data, valor) {
        // persiste no banco de dados
        var db = openDatabase("storage.db" , "1.0" , "banco" , 2 * 1024);
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO gastos (data, descricao , valor) VALUES (?,?,?)", [data, descricao , valor],                 
                function(tx, res) {
                    console.log("insertId: " + res.insertId );
                    console.log("rowsAffected: " + res.rowsAffected );                                             
                    alert("Adicionado com sucesso [" + descricao + "]");                    
                }, function(e) {
                    console.log("ERROR: " + e.message);
                    alert("erro" + e.message);        
                }
            );
        });
    },

    remove: function(gasto){
        // persiste no banco de dados
        var db = openDatabase("storage.db" , "1.0" , "banco" , 2 * 1024);
        db.transaction(function(tx) {
            tx.executeSql("DELETE FROM gastos where id = ? ", [gasto.id],                 
                function(tx, res) {
                    console.log("rowsAffected: " + res.rowsAffected );                                             
                    alert("Gasto removido com sucesso [" + gasto.descricao + "]");                    
                }, function(e) {
                    console.log("ERROR: " + e.message);
                    alert("erro" + e.message);        
                }
            );
        });           
    },

    edit: function(gasto){
        // persiste no banco de dados
        var db = openDatabase("storage.db" , "1.0" , "banco" , 2 * 1024);
        db.transaction(function(tx) {
            tx.executeSql("UPDATE gastos SET data = ? , descricao = ? , valor = ? where id = ? ", 
                              [gasto.data, gasto.descricao , gasto.valor , gasto.id],                 
                function(tx, res) {
                    console.log("rowsAffected: " + res.rowsAffected );                                             
                    alert("Gasto editado com sucesso [" + gasto.descricao + "]");                    
                }, function(e) {
                    console.log("ERROR: " + e.message);
                    alert("erro" + e.message);        
                }
            );
        });        
    }

}