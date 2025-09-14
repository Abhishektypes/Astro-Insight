window.onload = function() {
    // 3D Canvas setup with Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 10;

    // Create a group to hold the icosahedrons
    const icosahedronGroup = new THREE.Group();
    scene.add(icosahedronGroup);

    // Create multiple icosahedrons with different properties
    const icosahedronsData = [
        { size: 2, color: 0xF4BF96, position: [-5, 0, 0], speed: 0.005 },
        { size: 1.5, color: 0xCE5A67, position: [0, 5, -5], speed: 0.008 },
        { size: 1.8, color: 0xF4BF96, position: [5, -5, 0], speed: 0.007 },
        { size: 2.5, color: 0xCE5A67, position: [-5, 5, -10], speed: 0.004 }
    ];

    icosahedronsData.forEach(data => {
        const geometry = new THREE.IcosahedronGeometry(data.size, 0);
        const material = new THREE.MeshLambertMaterial({
            color: data.color,
            emissive: data.color,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
        });
        const icosahedron = new THREE.Mesh(geometry, material);
        icosahedron.position.set(data.position[0], data.position[1], data.position[2]);
        icosahedron.userData.speed = data.speed;
        icosahedronGroup.add(icosahedron);
    });

    // Add ambient and point lighting for a more dramatic effect
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xF4BF96, 1.5, 50, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);


    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate the group of icosahedrons
        icosahedronGroup.rotation.x += 0.001;
        icosahedronGroup.rotation.y += 0.002;
        
        // Make the individual icosahedrons rotate on their own axis
        icosahedronGroup.children.forEach(icosahedron => {
            icosahedron.rotation.x += icosahedron.userData.speed;
            icosahedron.rotation.y += icosahedron.userData.speed;
        });
        
        renderer.render(scene, camera);
    };

    // Handle window resizing
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    animate();

    // Photo and text scroll animation
    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = 600;
        const progress = Math.min(scrollPosition / maxScroll, 1);

        const photoContainer = document.getElementById('hero-photo-container');
        const heroText = document.getElementById('hero-text');

        // Photo animation (scale and position)
        const photoSize = 1 - progress * 0.5;
        const photoTranslateX = progress * -50;
        const photoTranslateY = progress * -20;
        photoContainer.style.transform = `scale(${photoSize}) translateX(${photoTranslateX}%) translateY(${photoTranslateY}px)`;
        photoContainer.style.opacity = 1 - progress * 0.5;

        // Hero text fade out and translate
        const titleTranslateY = progress * 20;
        const subtitleTranslateY = progress * 40;
        heroText.style.transform = `translateY(${titleTranslateY}px)`;
        heroText.style.opacity = 1 - progress;
    });
};