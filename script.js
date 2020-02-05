// store visibility data in object;
//  can only draw line when both are visible.
let markerVisible = { m0: false, m1: false };

AFRAME.registerComponent('registerevents', {
    init: function () 
    {
        let marker = this.el;
        
        marker.addEventListener('markerFound', function() {
            markerVisible[ marker.id ] = true;
        });

        marker.addEventListener('markerLost', function() {
            markerVisible[ marker.id ] = false;
        });
    }
});

AFRAME.registerComponent('run', {
    init: function()
    {
        this.m0 = document.querySelector("#m0");
        this.m1 = document.querySelector("#m1");
        this.p0 = new THREE.Vector3();
        this.p1 = new THREE.Vector3(); 
        
        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push( new THREE.Vector3(-1,-1,-1) );
        this.geometry.vertices.push( new THREE.Vector3( 1, 1, 1) );
        this.material = new THREE.LineBasicMaterial( {color: 0xFF0000} );
        this.line = new THREE.Line( this.geometry, this.material );
        let scene = document.querySelector('a-scene').object3D;
        scene.add( this.line );
    },
    
    tick: function (time, deltaTime) 
    {
        if ( markerVisible["m0"] && markerVisible["m1"] )
        {
            this.m0.object3D.getWorldPosition(this.p0);
            this.m1.object3D.getWorldPosition(this.p1);
            this.geometry.vertices[0] = this.p0;
            this.geometry.vertices[1] = this.p1;
            this.geometry.verticesNeedUpdate = true;
            this.line.visible = true;
        }
        else
        {
            this.line.visible = false;
        }
    }
});