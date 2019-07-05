let modelTap = undefined;
let ligthG = undefined;
const models = {
  {
    modelTag: "#car-glb",
    animName: "clip: e",
    rotation: "0 0 0",
    scale: "0.1 0.1 0.1"
  }
};

// Component that places trees where the ground is clicked
AFRAME.registerComponent('tap-place', {
  init: function () {
    const ground = document.getElementById('ground')
    ground.addEventListener('click', event => {
      document.getElementById('containerNextModel').style.display = 'inline-block';
      if (modelTap == undefined) {
        modelTap = document.createElement('a-entity')
        modelTap.setAttribute('id', 'foo')
        const touchPoint = event.detail.intersection.point
        modelTap.setAttribute('position', touchPoint)
		modelTap.setAttribute('rotation', models[0].rotation);
		modelTap.setAttribute('gltf-model', models[0].modelTag);
		modelTap.setAttribute('animation-mixer', models[0].animName);
		modelTap.setAttribute('scale', models[0].scale)
        modelTap.setAttribute('visible', 'false')
		//modelTap.setAttribute('xrextras-one-finger-rotate',true);

        ligthG = document.createElement('a-light')
        ligthG.setAttribute('type', 'directional')
        ligthG.setAttribute('intensity', '5')
        ligthG.setAttribute('target', '#foo')
        ligthG.setAttribute('position', '0 0.5 2')
        ground.appendChild(ligthG)

        this.el.sceneEl.appendChild(modelTap)
        modelTap.addEventListener('model-loaded', () => {
          modelTap.setAttribute('visible', 'true')
        })
      }
    })
  }
})
