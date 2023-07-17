import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { useEffect } from 'react';
import OfficeService from '../../../services/OfficeService';
import map from '../../../assets/map.jpg';
import './Globe.css';

let animate, camera, initPos;

const Globe = () => {

  const baseURL = import.meta.env.BASE_URL;

  useEffect(() => {
    const container = document.getElementById("globeContainer");
    let aspect = Math.max(window.innerWidth, 500) / Math.max(window.innerHeight - 89.5, 881.5) * (window.innerWidth > 1200 ? 0.5 : 2);
    let width = container.clientWidth;

    let renderer = new THREE.WebGLRenderer({
      antialias: true, 
      alpha: true
    });
    renderer.setSize(width, width / aspect);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    let labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, width / aspect);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    let scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, aspect, 1, 2000);
    const India = {lat: 21.9077, lon: 79.0447};
    const convertLat = (lat) => (90 - lat) * Math.PI / 180;
    const convertLon = (lat) => (90 + lat) * Math.PI / 180;
    const cameraDistance = (w) => {
      return window.innerWidth > 1200 ? -0.025 * w + 41 : 14;
    };
    initPos = new THREE.Vector3().setFromSphericalCoords(1, convertLat(India.lat), convertLon(India.lon)).setLength(cameraDistance(container.clientWidth));

    const handleResize = () => {
      aspect = Math.max(window.innerWidth, 500) / Math.max(window.innerHeight - 89.5, 881.5) * (window.innerWidth > 1200 ? 0.5 : 2);
      camera.aspect = aspect;
      initPos.setLength(cameraDistance(container.clientWidth));
      camera.position.setLength(cameraDistance(container.clientWidth));
      camera.updateProjectionMatrix();
      width = container.clientWidth;
      renderer.setSize(width, width / aspect);
      labelRenderer.setSize(width, width / aspect);
    };
    window.addEventListener("resize", handleResize);

    let controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed *= 0.25;

    let globalUniforms = {
      time: { value: 0 }
    };
    let clock = new THREE.Clock();
    
    let rad = 5;
    let globe = new THREE.Mesh(
      new THREE.SphereGeometry(rad, 50, 50), 
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vertexUV;
          void main() {
              vertexUV = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `, 
        fragmentShader: `
          uniform sampler2D globeTexture;
          varying vec2 vertexUV;
          void main() {
              gl_FragColor = vec4(texture2D(globeTexture, vertexUV).xyz, 1.0);
          }    
        `, 
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load(map)
          }
        }
      })
    );
    scene.add(globe);

    OfficeService.getOffices().then(res => {
      let offices = res.data;
      let markerInfo = [];
      let gMarker = new THREE.CircleGeometry(0.5);
      let mMarker = new THREE.MeshBasicMaterial({
        color: 0x4c99ff,
        onBeforeCompile: (shader) => {
          shader.uniforms.time = globalUniforms.time;
          shader.vertexShader = `${shader.vertexShader}`;
          shader.fragmentShader = `
            uniform float time;
            ${shader.fragmentShader}
          `.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
            vec2 lUv = (vUv - 0.5) * 2.;
            float val = 0.;
            float lenUv = length(lUv);
            val = max(val, 1. - step(0.25, lenUv)); // central circle
            val = max(val, step(0.4, lenUv) - step(0.5, lenUv)); // outer circle
            
            float tShift = fract(time * 0.5);
            val = max(val, step(0.4 + (tShift * 0.6), lenUv) - step(0.5 + (tShift * 0.5), lenUv)); // ripple
            
            if (val < 0.5) discard;
            
            vec4 diffuseColor = vec4( diffuse, opacity );`
          );
        }
      });
      mMarker.defines = { USE_UV: " " }; // needed to be set to be able to work with UVs
      let markers = new THREE.InstancedMesh(gMarker, mMarker, offices.length);
      let dummy = new THREE.Object3D();
      for (let i = 0; i < offices.length; i++) {
        dummy.position.setFromSphericalCoords(1, convertLat(offices[i].cityLatitude), convertLon(offices[i].cityLongitude)).setLength(rad + 0.1);
        dummy.lookAt(dummy.position.clone().setLength(rad + 1));
        dummy.updateMatrix();
        markers.setMatrixAt(i, dummy.matrix);
        markerInfo.push({
          city: offices[i].cityName,
          phone: offices[i].phoneNumber,
          address: offices[i].address,
          crd: dummy.position.clone()
        });
      }
      scene.add(markers);

      let divHeight;
      let closeBtn = document.getElementById("closeButton");
      let labelDiv = document.getElementById("markerLabel");
      closeBtn.addEventListener("pointerdown", () => {
        labelDiv.animate([
          {width: "230px", height: `${divHeight}px`, marginTop: `${divHeight / 2 - 5}px`, marginLeft: "-106px", opacity: label.userData.trackVisibility()},
          {width: "0px", height: "0px", marginTop: "-5px", marginLeft: "9px", opacity: 0}
        ], {duration: 250});
        setTimeout(function() {
          labelDiv.classList.add("hidden");
        }, 250);
      });
      let label = new CSS2DObject(labelDiv);
      label.userData = {
        cNormal: new THREE.Vector3(),
        cPosition: new THREE.Vector3(),
        mat4: new THREE.Matrix4(),
        trackVisibility: () => { // the closer to the edge, the less opacity
          let ud = label.userData;
          ud.cNormal.copy(label.position).normalize().applyMatrix3(globe.normalMatrix);
          ud.cPosition.copy(label.position).applyMatrix4(ud.mat4.multiplyMatrices(camera.matrixWorldInverse, globe.matrixWorld));
          let d = ud.cPosition.negate().normalize().dot(ud.cNormal);
          return smoothstep(0.2, 0.7, d);
          
          // https://github.com/gre/smoothstep/blob/master/index.js
          function smoothstep (min, max, value) {
            var x = Math.max(0, Math.min(1, (value-min) / (max-min)));
            return x * x * (3 - 2 * x);
          };
        }
      };
      scene.add(label);

      const lineHeight = 16;
      let pointer = new THREE.Vector2();
      let raycaster = new THREE.Raycaster();
      let intersections;
      let divCity = document.getElementById("city");
      let divPhone = document.getElementById("phone");
      let divAddress = document.getElementById("address");
      const handleMarkerSelection = e => {
        if (e.target !== closeBtn) {
          const containerRect = container.getBoundingClientRect();
          pointer.x = ((e.clientX - containerRect.left) / width) * 2 - 1;
          pointer.y = -((e.clientY - containerRect.top) / (width / aspect)) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);
          intersections = raycaster.intersectObject(markers).filter(m => {
            return (m.uv.subScalar(0.5).length() * 2) < 0.25; // check, if we're in the central circle only
          });
          if (intersections.length > 0) {
            let iid = intersections[0].instanceId;
            let mi = markerInfo[iid];
            divCity.innerHTML = `<b>&nbsp;${mi.city}</b>`;
            divPhone.innerHTML = mi.phone == null ? '' : `<b>&nbsp;${mi.phone}</b>`;
            divAddress.innerHTML = mi.address == null ? '' : `<b>&nbsp;${mi.address.replace(/, /g, ',<br>&nbsp;&nbsp;')}</b>`;
            let noOfLines = mi.phone == null ? 1 : 2;
            if (mi.address != null) {
              noOfLines += (mi.address.match(/, /g) || []).length + 1;
            }
            divHeight = noOfLines * lineHeight;
            if (labelDiv.classList.contains('hidden')) {
              label.position.copy(mi.crd);
              labelDiv.animate([
                {width: "0px", height: "0px", marginTop: "-5px", marginLeft: "9px", opacity: 0},
                {width: "230px", height: `${divHeight}px`, marginTop: `${divHeight / 2 - 5}px`, marginLeft: "-106px", opacity: label.userData.trackVisibility()}
              ], {duration: 250});
              labelDiv.classList.remove("hidden");
            }
            else {
              setTimeout(function() {
                label.position.copy(mi.crd);
              }, 250);
              labelDiv.animate([
                {width: "230px", height: labelDiv.style.height, marginTop: labelDiv.style.marginTop, marginLeft: "-106px"},
                {width: "0px", height: "0px", marginTop: "-5px", marginLeft: "9px", opacity: 0},
                {width: "230px", height: `${divHeight}px`, marginTop: `${divHeight / 2 - 5}px`, marginLeft: "-106px", opacity: label.userData.trackVisibility()}
              ], {duration: 500});
            }
            labelDiv.style.height = `${divHeight}px`;
            labelDiv.style.marginTop = `${divHeight / 2 - 5}px`;
          }
        }
      };
      container.addEventListener("pointerdown", handleMarkerSelection);

      animate = () => {
        if (location.pathname === `${baseURL}contact-us`) {
          requestAnimationFrame(animate);
          globalUniforms.time.value = clock.getElapsedTime();
          labelDiv.style.opacity = label.userData.trackVisibility();
          controls.update();
          renderer.render(scene, camera);
          labelRenderer.render(scene, camera);
        }
      };
    }).catch(error => {
      console.error('Error fetching offices:', error);
      animate = () => {
        if (location.pathname === `${baseURL}contact-us`) {
          requestAnimationFrame(animate);
          globalUniforms.time.value = clock.getElapsedTime();
          controls.update();
          renderer.render(scene, camera);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (location.pathname === `${baseURL}contact-us` && animate !== undefined) {
      document.getElementById("markerLabel").classList.add("hidden");
      camera.position.set(...initPos);
      animate();
    }
  }, [location.pathname, animate]);

  return (
    <div id="globeContainer">
      <div id="markerLabel" className='hidden'>
        <button id="closeButton" tabIndex={-1}>X</button>
        <div className="text" id="city"></div>
        <div className="text" id="phone"></div>
        <div className="text" id="address"></div>
      </div>
    </div>
  );
};

export default Globe;
