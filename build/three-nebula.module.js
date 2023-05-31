import System, {
    Emitter,
    Rate,
    Span,
    Position,
    Mass,
    Radius,
    Life,
    Velocity,
    PointZone,
    Vector3D,
    Alpha,
    Scale,
    Color,
  } from './three-nebula.js';
  import * as THREE from './three.module.js';
  
  const system = new System();
  const emitter = new Emitter();
  const renderer = new SpriteRenderer(threeScene, THREE);
  
  // Set emitter rate (particles per second) as well as the particle initializers and behaviours
  emitter
    .setRate(new Rate(new Span(4, 16), new Span(0.01)))
    .setInitializers([
      new Position(new PointZone(0, 0)),
      new Mass(1),
      new Radius(6, 12),
      new Life(3),
      new RadialVelocity(45, new Vector3D(0, 1, 0), 180),
    ])
    .setBehaviours([
      new Alpha(1, 0),
      new Scale(0.1, 1.3),
      new Color(new THREE.Color(), new THREE.Color()),
    ]);
  
  // add the emitter and a renderer to your particle system
  system
    .addEmitter(emitter)
    .addRenderer(renderer)
    .emit({ onStart, onUpdate, onEnd });