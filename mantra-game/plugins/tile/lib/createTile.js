export default function createTile(tile, x, y, z = 0, tileWidth, tileHeight, tileDepth, color, customZ = true) {
  let layer = tile.layer || {}; // for now
  let tileId = tile.id;

  if (tile.kind === 'empty') {
    return;
  }

  // overrides for tile z position, used for 2.5D games
  if (customZ && typeof tile.z === 'number') {
    z = tile.z;
  }

  // overrides for tile size
  if (tile.size && typeof tile.size.width === 'number') {
    tileWidth = tile.size.width;
  }
  if (tile.size && typeof tile.size.height === 'number') {
    tileHeight = tile.size.height;
  }

  if (tile.size && typeof tile.size.depth === 'number') {
    tileDepth = tile.size.depth;
  } else {
    tileDepth = tileHeight;
  }

  let isStatic;

  let collisionStart = false;

  if (typeof tile.collisionStart === 'function') {
    collisionStart = tile.collisionStart;
  }

  if (typeof tile.isStatic === 'boolean') {
    isStatic = tile.isStatic;
  }

  const scale = 1;
  let body = tile.body;
  let mass = tile.mass || 1

  let _color;
  if (color && this.debug) {
    _color = color;
  }

  let _type = 'TILE';
  if (typeof tile.type !== 'undefined') {
    _type = tile.type;
  }
  
  /*
  Remark: Removed for now, optimization for 2.5D games representing 3d tilemap data
  if (customZ && z !== 0) {
    // this is required so don't dont stack 2d bodies inside each other in 2.5D space
    // body = false;
  }
  */

  let _texture;
  // check to see if a custom texture is set
  if (typeof tile.texture !== 'undefined') {
    _texture = tile.texture;
  } else{
    _texture = `tile-${tile.kind}`; // rename
  }

  let ent = this.game.createEntity({
    type: _type,
    name: tile.name || tile.kind,
    kind: tile.kind,
    body: body,
    container: layer.container,
    mass,
    // Remark: By default we will disable all collision events for Tiles
    //         This is done universally for performance reasons
    //         Each tile.kind could be configured via `TileSet` class with custom collision config
    // Note:   Entities will still collide if they have `body`, but no collision events will be emitted
    collisionActive: false,
    collisionStart: collisionStart,
    collisionEnd: false,
    hasInventory: false,
    collectable: false,
    /*
    restitution: 0,
    // set friction high so they dont' glide around on push
    */
    friction: tile.friction || 0.01,
    frictionAir: tile.friction || 0.01,
    frictionStatic: tile.friction || 0.01,

    isStatic,

    style: { cursor: 'pointer' },
    position: { x: x * scale, y: y * scale, z: z * scale },
    texture: _texture,
    color: _color,
    width: tileWidth * scale,
    height: tileHeight * scale,
    depth: tileDepth * scale,
    exit: tile.exit
  });
  return ent;
}