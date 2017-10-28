var app = { 
    // Application Constructor 
    initialize: function() { 
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false); 
    }, 
    
    // deviceready Event Handler 
    // 
    // Bind any cordova events here. Common events are: 
    // 'pause', 'resume', etc. 
    onDeviceReady: function() { 
        this.receivedEvent('deviceready'); 
    }, 
    
    // Update DOM on a Received Event 
    receivedEvent: function(id) { 
        //get the current token 
        window.FirebasePlugin.getInstanceId( 
            function(token) { 
                console.log(token); 
            }, 
            
            function(error) { 
                alert(error); 
            } 
        );
        
        //subscribe to topic "example" 
        window.FirebasePlugin.subscribe("example"); 
        
        window.FirebasePlugin.onNotificationOpen( 
            function(notification) { 
                alert(JSON.stringify(notification)); 
            }, 
            
            function(error) { 
                alert(error); 
            } 
        ); 
    } 
}; 

app.initialize();