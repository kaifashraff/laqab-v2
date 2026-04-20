'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FuturisticBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Colors
    const cyan = 0x00f5ff;
    const purple = 0xbf00ff;
    const pink = 0xff00ff;
    const blue = 0x0080ff;

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Torus (ring shapes)
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: cyan, 
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(5, 2, -5);
    scene.add(torus);
    shapes.push(torus);

    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({ 
      color: purple, 
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(-4, -2, -3);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.8, 0);
    const octaMaterial = new THREE.MeshBasicMaterial({ 
      color: pink, 
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(3, -3, -4);
    scene.add(octahedron);
    shapes.push(octahedron);

    // More rings
    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.2, 16, 100),
      new THREE.MeshBasicMaterial({ color: blue, wireframe: true, transparent: true, opacity: 0.2 })
    );
    torus2.position.set(-6, 3, -8);
    scene.add(torus2);
    shapes.push(torus2);

    // Torus knot
    const knotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const knotMaterial = new THREE.MeshBasicMaterial({ 
      color: cyan, 
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    torusKnot.position.set(0, 4, -10);
    scene.add(torusKnot);
    shapes.push(torusKnot);

    // Particles (stars)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: cyan,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add more particle colors
    const particlesGeometry2 = new THREE.BufferGeometry();
    const posArray2 = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray2[i] = (Math.random() - 0.5) * 50;
    }
    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    
    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.03,
      color: purple,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh2 = new THREE.Points(particlesGeometry2, particlesMaterial2);
    scene.add(particlesMesh2);

    // Grid lines
    const gridHelper = new THREE.GridHelper(50, 50, cyan, 0x111122);
    gridHelper.position.y = -5;
    (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
    (gridHelper.material as THREE.LineBasicMaterial).opacity = 0.1;
    scene.add(gridHelper);

    // Camera position
    camera.position.z = 8;
    camera.position.x = 2;
    camera.position.y = 1;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation
    let animationId: number;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.002 * (index + 1);
        shape.rotation.y += 0.003 * (index + 1);
        
        // Floating effect
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      // Rotate particles
      particlesMesh.rotation.y += 0.0005;
      particlesMesh2.rotation.y -= 0.0003;

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 1 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
}
