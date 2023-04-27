# 3D Boids Ocean Simulation
Contributors: [Stephen](https://github.com/stephenrobxrts), [Nathan](https://github.com/DoMessWithProfile), [Michael](https://github.com/Unizzu), [Erencan](https://github.com/ErencanPelin)

## Boids algorithm
- uses octree spatial partitioning to optimise the simulation, can simulate up to 10k boids at 60fps
- boids's behaviour is not affected by boids behind it (boid field-of-view)
- customisable behaviour via GUI sliders
- limited worldsize 
- avoids edges of the world
- boids avoid boids which are higher up on the 'food chain' than them
- boids follow boids which are lower on the 'food chain' than them