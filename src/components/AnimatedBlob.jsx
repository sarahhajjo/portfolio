import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedBlob = () => {
    return (
        <Sphere visible args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
                color="#ffffff" /* مجسم أبيض ليتناسب مع الخلفية */
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.1} /* تقليل الخشونة ليعكس الضوء بنعومة */
            />
        </Sphere>
    );
};

export default AnimatedBlob;