import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'


const context = createContext();
export function InstancesMountains({ children, ...props }) {

  const { nodes } = useGLTF("/models/mountains.glb");


  const instances = useMemo(
    () => ({
      EverestDistantHD: nodes.EverestDistant1HD,
      EverestDistantHD1: nodes.EverestDistant2HD,
      EverestPeakHD: nodes.EverestPeakHD,
      EverestMidHD: nodes.EverestMidHD,
    }),
    [nodes]
  );
  console.log("🚀 ~ file: InstancedMountains.jsx:23 ~ InstancesMountains ~ instances:", instances)

  return (
    <Merged meshes={instances} {...props}>
      {(instances) => (
        <context.Provider value={instances}>
          {children}
          </context.Provider>
      )}
    </Merged>
  );
}



export function InstancedMountains(props) {
  const instances = useContext(context);
  
  const group = useRef();
  
  instances.needsUpdate = true
  
  return (
    <group ref={group} dispose={null} {...props}>
      <group name='Scene'>

        <instances.EverestDistantHD
          name="EverestDistant1HD"
          position={[-101.24, 48.69, 505.31]}
        />
        <instances.EverestDistantHD1
          name="EverestDistant2HD"
          position={[-100.5, 67.3, -555.05]}
        />
        <instances.EverestPeakHD name="EverestPeakHD" />
        <instances.EverestMidHD name="EverestMidHD" />
      </group>
    </group>
  )
}

useGLTF.preload("/models/mountains.glb");
