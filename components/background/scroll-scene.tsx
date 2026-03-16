"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type ScrollDriver = {
  get: () => number;
};

type Vec3 = [number, number, number];

type ColumnConfig = {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  delay: number;
};

type SlabConfig = {
  y: number;
  width: number;
  depth: number;
  delay: number;
};

type BeamConfig = {
  x: number;
  y: number;
  z: number;
  width: number;
  depth: number;
  delay: number;
};

const floorLevels = [0.12, 2.05, 3.98, 5.91];
const roofLevel = 7.32;
const buildingX = [-3.4, -1.1, 1.2, 3.5];
const buildingZ = [-2.3, -0.1, 2.1];

const columns: ColumnConfig[] = buildingX.flatMap((x, columnIndex) =>
  buildingZ.map((z, rowIndex) => ({
    x,
    z,
    width: 0.14,
    depth: 0.14,
    height: roofLevel,
    delay: 0.08 + (columnIndex + rowIndex) * 0.035,
  })),
);

const slabs: SlabConfig[] = [...floorLevels, roofLevel].map((y, index) => ({
  y,
  width: 7.9,
  depth: 5.15,
  delay: 0.18 + index * 0.08,
}));

const beams: BeamConfig[] = floorLevels.flatMap((y, index) => [
  { x: 0.05, y, z: -2.3, width: 7.05, depth: 0.12, delay: 0.2 + index * 0.08 },
  { x: 0.05, y, z: 2.1, width: 7.05, depth: 0.12, delay: 0.22 + index * 0.08 },
  { x: -3.4, y, z: -0.1, width: 0.12, depth: 4.52, delay: 0.24 + index * 0.08 },
  { x: 3.5, y, z: -0.1, width: 0.12, depth: 4.52, delay: 0.26 + index * 0.08 },
]);

function pair(start: Vec3, end: Vec3) {
  return [...start, ...end];
}

function flattenSegments(segments: Array<[Vec3, Vec3]>) {
  return segments.flatMap(([start, end]) => pair(start, end));
}

function createLineGeometry(points: number[]) {
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

  return geometry;
}

function getSingleMaterial(material: THREE.Material | THREE.Material[]) {
  return Array.isArray(material) ? material[0] : material;
}

function phaseProgress(value: number, start: number, end: number) {
  return THREE.MathUtils.smootherstep(
    THREE.MathUtils.clamp(value, start, end),
    start,
    end,
  );
}

const cadGuidePoints = flattenSegments([
  [[-10.5, -0.88, -6.6], [10.5, -0.88, -6.6]],
  [[-10.5, -0.88, -3.3], [10.5, -0.88, -3.3]],
  [[-10.5, -0.88, 0], [10.5, -0.88, 0]],
  [[-10.5, -0.88, 3.3], [10.5, -0.88, 3.3]],
  [[-10.5, -0.88, 6.6], [10.5, -0.88, 6.6]],
  [[-8.8, -0.88, -8.2], [-8.8, -0.88, 7.8]],
  [[-5.5, -0.88, -8.2], [-5.5, -0.88, 7.8]],
  [[-2.2, -0.88, -8.2], [-2.2, -0.88, 7.8]],
  [[1.1, -0.88, -8.2], [1.1, -0.88, 7.8]],
  [[4.4, -0.88, -8.2], [4.4, -0.88, 7.8]],
  [[7.7, -0.88, -8.2], [7.7, -0.88, 7.8]],
  [[-4.3, -0.68, 3.35], [4.45, -0.68, 3.35]],
  [[-4.3, -0.62, 3.15], [-4.3, -0.75, 3.55]],
  [[4.45, -0.62, 3.15], [4.45, -0.75, 3.55]],
  [[-2.1, -0.62, 3.15], [-2.1, -0.75, 3.55]],
  [[0.05, -0.62, 3.15], [0.05, -0.75, 3.55]],
  [[2.25, -0.62, 3.15], [2.25, -0.75, 3.55]],
]);

const facadeGuidePoints = flattenSegments([
  [[-4.6, 0, -8.1], [4.6, 0, -8.1]],
  [[-4.6, roofLevel, -8.1], [4.6, roofLevel, -8.1]],
  [[-4.6, 0, -8.1], [-4.6, roofLevel, -8.1]],
  [[4.6, 0, -8.1], [4.6, roofLevel, -8.1]],
  [[-4.6, 1.95, -8.1], [4.6, 1.95, -8.1]],
  [[-4.6, 3.88, -8.1], [4.6, 3.88, -8.1]],
  [[-4.6, 5.81, -8.1], [4.6, 5.81, -8.1]],
  [[-3.4, 0, -8.1], [-3.4, roofLevel, -8.1]],
  [[-1.1, 0, -8.1], [-1.1, roofLevel, -8.1]],
  [[1.2, 0, -8.1], [1.2, roofLevel, -8.1]],
  [[3.5, 0, -8.1], [3.5, roofLevel, -8.1]],
  [[-5.15, 0, -8.1], [-4.7, 0, -8.1]],
  [[-5.15, 1.95, -8.1], [-4.7, 1.95, -8.1]],
  [[-5.15, 3.88, -8.1], [-4.7, 3.88, -8.1]],
  [[-5.15, 5.81, -8.1], [-4.7, 5.81, -8.1]],
  [[-5.15, roofLevel, -8.1], [-4.7, roofLevel, -8.1]],
]);

const executiveOverlayPoints = flattenSegments([
  [[4.3, roofLevel, 2.45], [6.9, 8.2, 4.8]],
  [[6.9, 8.2, 4.8], [9.1, 8.2, 4.8]],
  [[3.45, 5.93, 2.25], [6.2, 6.85, 4.2]],
  [[6.2, 6.85, 4.2], [8.25, 6.85, 4.2]],
  [[-3.55, 2.08, 2.25], [-6.6, 3.2, 4.6]],
  [[-6.6, 3.2, 4.6], [-8.5, 3.2, 4.6]],
  [[-3.55, -0.02, 2.25], [-6.45, 0.9, 4.45]],
  [[-6.45, 0.9, 4.45], [-8.3, 0.9, 4.45]],
  [[-4.05, 3.88, 2.6], [4.2, 3.88, 2.6]],
  [[-4.05, 3.72, 2.8], [-4.05, 4.04, 2.4]],
  [[4.2, 3.72, 2.8], [4.2, 4.04, 2.4]],
  [[-3.65, 5.93, -2.55], [-6.8, 6.95, -4.8]],
  [[-6.8, 6.95, -4.8], [-8.65, 6.95, -4.8]],
]);

const executiveMarkerPoints = flattenSegments([
  [[8.95, 8.05, 4.65], [9.25, 8.35, 4.95]],
  [[8.95, 8.35, 4.95], [9.25, 8.05, 4.65]],
  [[8.1, 6.7, 4.05], [8.4, 7, 4.35]],
  [[8.1, 7, 4.35], [8.4, 6.7, 4.05]],
  [[-8.45, 3.05, 4.45], [-8.15, 3.35, 4.75]],
  [[-8.45, 3.35, 4.75], [-8.15, 3.05, 4.45]],
  [[-8.25, 0.75, 4.3], [-7.95, 1.05, 4.6]],
  [[-8.25, 1.05, 4.6], [-7.95, 0.75, 4.3]],
  [[-0.6, 3.88, 2.5], [-0.3, 4.18, 2.8]],
  [[-0.6, 4.18, 2.8], [-0.3, 3.88, 2.5]],
]);

const redlinePoints = flattenSegments([
  [[-1.95, 1.92, 2.55], [-1.1, 2.28, 2.95]],
  [[-1.68, 1.7, 2.4], [-1.28, 2.54, 3.1]],
  [[2.1, 5.78, 2.45], [2.92, 6.12, 2.92]],
  [[2.42, 5.54, 2.26], [2.06, 6.28, 3]],
  [[1.35, 3.86, -2.72], [2.02, 4.2, -3.08]],
  [[1.58, 3.62, -2.58], [1.18, 4.42, -3.16]],
]);

function useMobileScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function SceneFallback() {
  return <div className="scene-fallback" />;
}

function SegmentLines({
  points,
  color,
  opacity,
  lineRef,
}: {
  points: number[];
  color: string;
  opacity: number;
  lineRef?: (line: THREE.LineSegments | null) => void;
}) {
  const geometry = useMemo(() => createLineGeometry(points), [points]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments
      ref={(line) => {
        if (lineRef) {
          lineRef(line);
        }
      }}
      geometry={geometry}
    >
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </lineSegments>
  );
}

function BuildingDocumentationScene({ progress }: { progress: ScrollDriver }) {
  const rootRef = useRef<THREE.Group>(null);
  const envelopeRef = useRef<THREE.Mesh | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const floorPlaneRef = useRef<THREE.Mesh | null>(null);
  const backPlaneRef = useRef<THREE.Mesh | null>(null);
  const sidePlaneRef = useRef<THREE.Mesh | null>(null);
  const cadLineRefs = useRef<Array<THREE.LineSegments | null>>([]);
  const overlayLineRefs = useRef<Array<THREE.LineSegments | null>>([]);
  const markerLineRefs = useRef<Array<THREE.LineSegments | null>>([]);
  const redlineRefs = useRef<Array<THREE.LineSegments | null>>([]);
  const columnRefs = useRef<Array<THREE.Mesh | null>>([]);
  const columnEdgeRefs = useRef<Array<THREE.LineSegments | null>>([]);
  const slabRefs = useRef<Array<THREE.Mesh | null>>([]);
  const slabEdgeRefs = useRef<Array<THREE.LineSegments | null>>([]);
  const beamRefs = useRef<Array<THREE.Mesh | null>>([]);
  const beamEdgeRefs = useRef<Array<THREE.LineSegments | null>>([]);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const lookAtTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const progressValue = progress.get();
    const framePhase = phaseProgress(progressValue, 0.14, 0.58);
    const docsPhase = phaseProgress(progressValue, 0.42, 0.82);
    const cleanPhase = phaseProgress(progressValue, 0.72, 1);

    const blueprintOpacity = THREE.MathUtils.lerp(0.34, 0.08, cleanPhase);
    const farWireOpacity = THREE.MathUtils.lerp(0.16, 0.05, cleanPhase);
    const surfaceOpacity = THREE.MathUtils.lerp(0.04, 0.22, framePhase) +
      cleanPhase * 0.1;
    const frameEdgeOpacity = THREE.MathUtils.lerp(0.1, 0.28, framePhase) -
      cleanPhase * 0.06;
    const overlayOpacity = THREE.MathUtils.lerp(0, 0.26, docsPhase) -
      cleanPhase * 0.08;
    const markerOpacity = THREE.MathUtils.lerp(0, 0.22, docsPhase) -
      cleanPhase * 0.07;
    const redlineOpacity = THREE.MathUtils.lerp(0, 0.14, docsPhase) -
      cleanPhase * 0.03;
    const envelopeOpacity = THREE.MathUtils.lerp(0, 0.12, cleanPhase);

    cameraTarget.set(
      THREE.MathUtils.lerp(-2.8, -1.1, framePhase),
      THREE.MathUtils.lerp(5.9, 5.15, cleanPhase),
      THREE.MathUtils.lerp(19.8, 14.2, framePhase + cleanPhase * 0.25),
    );
    state.camera.position.lerp(cameraTarget, 0.05);

    lookAtTarget.set(
      THREE.MathUtils.lerp(1.5, 2.45, framePhase),
      THREE.MathUtils.lerp(1.15, 2.2, framePhase + cleanPhase * 0.15),
      THREE.MathUtils.lerp(-2.25, -1.25, cleanPhase),
    );
    state.camera.lookAt(lookAtTarget);

    if (rootRef.current) {
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        THREE.MathUtils.lerp(-0.26, -0.16, cleanPhase),
        0.05,
      );
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        THREE.MathUtils.lerp(-0.33, -0.2, framePhase),
        0.05,
      );
      rootRef.current.position.x = THREE.MathUtils.lerp(
        rootRef.current.position.x,
        THREE.MathUtils.lerp(2.6, 3.1, cleanPhase),
        0.05,
      );
    }

    [floorPlaneRef, backPlaneRef].forEach((ref) => {
      if (!ref.current) {
        return;
      }

      const material = getSingleMaterial(ref.current.material);

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        blueprintOpacity,
        0.08,
      );
    });

    if (sidePlaneRef.current) {
      const material = getSingleMaterial(sidePlaneRef.current.material);

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        farWireOpacity,
        0.08,
      );
    }

    cadLineRefs.current.forEach((line) => {
      if (!line) {
        return;
      }

      const material = getSingleMaterial(line.material);

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        blueprintOpacity,
        0.08,
      );
    });

    overlayLineRefs.current.forEach((line) => {
      if (!line) {
        return;
      }

      const material = getSingleMaterial(line.material);

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        Math.max(0, overlayOpacity),
        0.08,
      );
    });

    markerLineRefs.current.forEach((line) => {
      if (!line) {
        return;
      }

      const material = getSingleMaterial(line.material);

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        Math.max(0, markerOpacity),
        0.08,
      );
    });

    redlineRefs.current.forEach((line) => {
      if (!line) {
        return;
      }

      const material = getSingleMaterial(line.material);

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        Math.max(0, redlineOpacity),
        0.08,
      );
    });

    columns.forEach((column, index) => {
      const mesh = columnRefs.current[index];
      const edge = columnEdgeRefs.current[index];

      if (!mesh || !edge) {
        return;
      }

      const local = phaseProgress(framePhase, column.delay, 1);
      const heightScale = THREE.MathUtils.lerp(0.08, 1, local);
      const meshMaterial = getSingleMaterial(mesh.material);
      const edgeMaterial = getSingleMaterial(edge.material);

      mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, heightScale, 0.08);
      mesh.position.y = THREE.MathUtils.lerp(
        mesh.position.y,
        -0.8 + (column.height * heightScale) / 2,
        0.08,
      );

      meshMaterial.opacity = THREE.MathUtils.lerp(
        meshMaterial.opacity,
        surfaceOpacity,
        0.08,
      );
      edge.position.y = mesh.position.y;
      edge.scale.y = mesh.scale.y;
      edgeMaterial.opacity = THREE.MathUtils.lerp(
        edgeMaterial.opacity,
        Math.max(0.08, frameEdgeOpacity),
        0.08,
      );
    });

    slabs.forEach((slab, index) => {
      const mesh = slabRefs.current[index];
      const edge = slabEdgeRefs.current[index];

      if (!mesh || !edge) {
        return;
      }

      const local = phaseProgress(framePhase, slab.delay, 1);
      const meshMaterial = getSingleMaterial(mesh.material);
      const edgeMaterial = getSingleMaterial(edge.material);
      const targetY = slab.y - 0.8;

      mesh.position.y = THREE.MathUtils.lerp(
        mesh.position.y,
        THREE.MathUtils.lerp(targetY - 0.55, targetY, local),
        0.08,
      );
      meshMaterial.opacity = THREE.MathUtils.lerp(
        meshMaterial.opacity,
        surfaceOpacity + 0.02,
        0.08,
      );
      edge.position.y = mesh.position.y;
      edgeMaterial.opacity = THREE.MathUtils.lerp(
        edgeMaterial.opacity,
        Math.max(0.08, frameEdgeOpacity),
        0.08,
      );
    });

    beams.forEach((beam, index) => {
      const mesh = beamRefs.current[index];
      const edge = beamEdgeRefs.current[index];

      if (!mesh || !edge) {
        return;
      }

      const local = phaseProgress(framePhase, beam.delay, 1);
      const meshMaterial = getSingleMaterial(mesh.material);
      const edgeMaterial = getSingleMaterial(edge.material);
      const targetY = beam.y - 0.8;

      mesh.position.y = THREE.MathUtils.lerp(
        mesh.position.y,
        THREE.MathUtils.lerp(targetY - 0.35, targetY, local),
        0.08,
      );
      meshMaterial.opacity = THREE.MathUtils.lerp(
        meshMaterial.opacity,
        surfaceOpacity * 0.92,
        0.08,
      );
      edge.position.y = mesh.position.y;
      edgeMaterial.opacity = THREE.MathUtils.lerp(
        edgeMaterial.opacity,
        Math.max(0.08, frameEdgeOpacity - 0.02),
        0.08,
      );
    });

    if (coreRef.current) {
      const material = getSingleMaterial(coreRef.current.material);
      const local = phaseProgress(framePhase, 0.16, 0.86);
      const targetScale = THREE.MathUtils.lerp(0.18, 1, local);

      coreRef.current.scale.y = THREE.MathUtils.lerp(
        coreRef.current.scale.y,
        targetScale,
        0.08,
      );
      coreRef.current.position.y = THREE.MathUtils.lerp(
        coreRef.current.position.y,
        -0.8 + (roofLevel * targetScale) / 2,
        0.08,
      );
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        surfaceOpacity + 0.06,
        0.08,
      );
    }

    if (envelopeRef.current) {
      const material = getSingleMaterial(envelopeRef.current.material);

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        envelopeOpacity,
        0.08,
      );
    }
  });

  return (
    <>
      <fog attach="fog" args={["#f5efe6", 14, 30]} />
      <ambientLight intensity={0.88} color="#f4f6f7" />
      <directionalLight position={[8, 12, 9]} intensity={0.55} color="#f2f5f7" />
      <directionalLight position={[-7, 6, -6]} intensity={0.16} color="#8c9ba4" />

      <group ref={rootRef} position={[2.6, -1.08, -0.95]}>
        <mesh ref={floorPlaneRef} rotation={[-Math.PI / 2, 0, 0]} position={[0.2, -0.86, -0.2]}>
          <planeGeometry args={[30, 24, 16, 14]} />
          <meshBasicMaterial color="#cfd8de" wireframe transparent opacity={0.34} />
        </mesh>

        <mesh ref={backPlaneRef} position={[0.15, 3.75, -8.1]}>
          <planeGeometry args={[28, 11.5, 18, 10]} />
          <meshBasicMaterial color="#d7dfe4" wireframe transparent opacity={0.34} />
        </mesh>

        <mesh ref={sidePlaneRef} rotation={[0, Math.PI / 2, 0]} position={[-9, 2.8, -0.8]}>
          <planeGeometry args={[18, 9.5, 12, 8]} />
          <meshBasicMaterial color="#c8d1d8" wireframe transparent opacity={0.16} />
        </mesh>

        <SegmentLines
          points={cadGuidePoints}
          color="#96a4ae"
          opacity={0.34}
          lineRef={(line) => {
            cadLineRefs.current[0] = line;
          }}
        />
        <SegmentLines
          points={facadeGuidePoints}
          color="#bac5cc"
          opacity={0.3}
          lineRef={(line) => {
            cadLineRefs.current[1] = line;
          }}
        />

        {columns.map((column, index) => (
          <group key={`column-${column.x}-${column.z}`}>
            <mesh
              ref={(node) => {
                columnRefs.current[index] = node;
              }}
              position={[column.x, -0.8 + column.height * 0.04, column.z]}
              scale={[1, 0.08, 1]}
            >
              <boxGeometry args={[column.width, column.height, column.depth]} />
              <meshStandardMaterial
                color="#d4dde2"
                transparent
                opacity={0.04}
                roughness={0.98}
                metalness={0.04}
              />
            </mesh>
            <lineSegments
              ref={(node) => {
                columnEdgeRefs.current[index] = node;
              }}
              position={[column.x, -0.8 + column.height * 0.04, column.z]}
              scale={[1, 0.08, 1]}
            >
              <edgesGeometry
                args={[new THREE.BoxGeometry(column.width, column.height, column.depth)]}
              />
              <lineBasicMaterial color="#819099" transparent opacity={0.1} />
            </lineSegments>
          </group>
        ))}

        {slabs.map((slab, index) => (
          <group key={`slab-${slab.y}`}>
            <mesh
              ref={(node) => {
                slabRefs.current[index] = node;
              }}
              position={[0.05, slab.y - 1.35, -0.1]}
            >
              <boxGeometry args={[slab.width, 0.14, slab.depth]} />
              <meshStandardMaterial
                color="#dce4e8"
                transparent
                opacity={0.04}
                roughness={0.96}
                metalness={0.04}
              />
            </mesh>
            <lineSegments
              ref={(node) => {
                slabEdgeRefs.current[index] = node;
              }}
              position={[0.05, slab.y - 1.35, -0.1]}
            >
              <edgesGeometry args={[new THREE.BoxGeometry(slab.width, 0.14, slab.depth)]} />
              <lineBasicMaterial color="#8c9aa4" transparent opacity={0.1} />
            </lineSegments>
          </group>
        ))}

        {beams.map((beam, index) => (
          <group key={`beam-${beam.x}-${beam.y}-${beam.z}`}>
            <mesh
              ref={(node) => {
                beamRefs.current[index] = node;
              }}
              position={[beam.x, beam.y - 1.08, beam.z]}
            >
              <boxGeometry args={[beam.width, 0.12, beam.depth]} />
              <meshStandardMaterial
                color="#cfd8de"
                transparent
                opacity={0.04}
                roughness={0.98}
                metalness={0.03}
              />
            </mesh>
            <lineSegments
              ref={(node) => {
                beamEdgeRefs.current[index] = node;
              }}
              position={[beam.x, beam.y - 1.08, beam.z]}
            >
              <edgesGeometry args={[new THREE.BoxGeometry(beam.width, 0.12, beam.depth)]} />
              <lineBasicMaterial color="#7e8c97" transparent opacity={0.1} />
            </lineSegments>
          </group>
        ))}

        <mesh ref={coreRef} position={[-0.7, -0.8 + roofLevel * 0.09, 0.52]} scale={[1, 0.18, 1]}>
          <boxGeometry args={[1.65, roofLevel, 1.4]} />
          <meshStandardMaterial
            color="#c6d0d7"
            transparent
            opacity={0.05}
            roughness={0.9}
            metalness={0.06}
          />
        </mesh>

        <mesh ref={envelopeRef} position={[0.05, roofLevel / 2 - 0.8, -0.1]}>
          <boxGeometry args={[8.2, roofLevel, 5.3]} />
          <meshStandardMaterial
            color="#e4eaee"
            transparent
            opacity={0}
            roughness={1}
            metalness={0.01}
          />
        </mesh>

        <SegmentLines
          points={executiveOverlayPoints}
          color="#7e8f9a"
          opacity={0}
          lineRef={(line) => {
            overlayLineRefs.current[0] = line;
          }}
        />
        <SegmentLines
          points={executiveMarkerPoints}
          color="#a7b4bc"
          opacity={0}
          lineRef={(line) => {
            markerLineRefs.current[0] = line;
          }}
        />
        <SegmentLines
          points={redlinePoints}
          color="#9c6d5f"
          opacity={0}
          lineRef={(line) => {
            redlineRefs.current[0] = line;
          }}
        />
      </group>
    </>
  );
}

export function ScrollScene() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMobileScene();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const sceneProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.46, 0.78, 1], [0, 0.18, 0.56, 0.86, 1]),
    {
      stiffness: 46,
      damping: 24,
      mass: 0.6,
    },
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reducedMotion || isMobile) {
    return (
      <div className="page-scene-layer" aria-hidden="true">
        <SceneFallback />
      </div>
    );
  }

  return (
    <div className="page-scene-layer" aria-hidden="true">
      <Canvas
        className="page-scene-canvas"
        dpr={[1, 1.45]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ fov: 31, position: [-2.8, 5.9, 19.8] }}
      >
        <BuildingDocumentationScene progress={sceneProgress} />
      </Canvas>
    </div>
  );
}
