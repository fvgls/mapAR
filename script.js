// store visibility data in object;
//  can only draw line when both are visible.
let markerVisible = { m0: false, m1: false };

AFRAME.registerComponent('registerevents', {
    init: function () {
        let marker = this.el;

        marker.addEventListener('markerFound', function () {
            markerVisible[marker.id] = true;
        });

        marker.addEventListener('markerLost', function () {
            markerVisible[marker.id] = false;
        });
    }
});

AFRAME.registerComponent('run', {
    init: function () {
        this.m0 = document.querySelector("#m0");
        this.m1 = document.querySelector("#m1");
        this.p0 = new THREE.Vector3();
        this.p1 = new THREE.Vector3();

        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(new THREE.Vector3(-1, -1, -1));
        this.geometry.vertices.push(new THREE.Vector3(1, 1, 1));
        this.material = new THREE.LineBasicMaterial({ color: 0xFF0000 });

        this.line = new THREE.Line(this.geometry, this.material);
        let scene = document.querySelector('a-scene').object3D;
        scene.add(this.line);

        this.entities = m0.querySelectorAll('a-entity');
    },

    tick: function (time, deltaTime) {

        if (markerVisible["m0"] && markerVisible["m1"]) {

            this.m0.object3D.getWorldPosition(this.p0);
            this.m1.object3D.getWorldPosition(this.p1);
            this.geometry.vertices[0] = this.p0;
            this.geometry.vertices[1] = this.p1;
            this.geometry.verticesNeedUpdate = true;

            // this.line.visible = true;


            this.entities.forEach(entity => {
                // Get entity attributes
                let scale = entity.getAttribute("scale");
                let position = entity.getAttribute("position");

                switch (entity.getAttribute("geometry").primitive) {
                    case "sphere":
                        scale.y = 1;
                        entity.setAttribute("scale", scale);

                        entity.setAttribute("animation__rotate", { property: "rotation", dur: 8000, easing: "linear", dir: "normal", from: "0 0 0", to: "0 360 0", loop: true });
                        break;
                    case "box":
                        scale.y = 2;
                        entity.setAttribute("scale", scale);

                        position.y = 1.5;
                        entity.setAttribute("position", position);

                        entity.setAttribute("animation__rotate", { property: "rotation", dur: 8000, easing: "linear", dir: "normal", from: "0 0 0", to: "0 360 0", loop: true });
                        break;
                    case "cylinder":
                        scale.y = 1.2;
                        entity.setAttribute("scale", scale);

                        position.y = 1.0;
                        entity.setAttribute("position", position);

                        entity.setAttribute("animation__rotate", { property: "rotation", dur: 8000, easing: "linear", dir: "normal", from: "0 0 0", to: "360 0 360", loop: true });
                        break;
                    case "cone":
                        scale.y = 2;
                        entity.setAttribute("scale", scale);

                        position.y = 1.5;
                        entity.setAttribute("position", position);

                        entity.setAttribute("animation__rotate", { property: "rotation", dur: 8000, easing: "linear", dir: "normal", from: "0 0 0", to: "0 0 360", loop: true });
                        break;
                    case "torus":
                        scale.y = 0.3;
                        entity.setAttribute("scale", scale);

                        position.y = 1.5;
                        entity.setAttribute("position", position);

                        entity.setAttribute("animation__rotate", { property: "rotation", dur: 8000, easing: "linear", dir: "normal", from: "0 0 0", to: "360 360 360", loop: true });
                        break;
                }

            });

        }
        else {
            this.line.visible = false;


            this.entities.forEach(entity => {
                // Reset scale
                let scale = entity.getAttribute("scale");
                scale.y = 0;
                entity.setAttribute("scale", scale);

                // Reset position
                let position = entity.getAttribute("position");
                position.y = 0.5;
                entity.setAttribute("position", position);


                // Reset rotation
                entity.setAttribute("animation__rotate", { property: "rotation", dur: 8000, easing: "linear", dir: "normal", from: "0 0 0", to: "0 0 0", loop: true });
            });
        }
    }
});