describe('jsts.index.quadtree.Quadtree', function() {
  var qtree, envelope;
  
  //NOTE: If any of the following variables are changed
  //tests below will probably fail
  var NUM_ITEMS = 100;
  var MIN_EXTENT = -1000.0;
  var MAX_EXTENT = 1000.0;
  var inserted = 0;
  
  it('can be created', function() {
    qtree = new jsts.index.quadtree.Quadtree();
    expect(qtree).toBeDefined();
  });
  
  
  var createGrid = function(nGridCells)
  {
    var gridSize = Math.floor(Math.sqrt(nGridCells));
    gridSize += 1;
    
    var extent = MAX_EXTENT - MIN_EXTENT;
    var gridInc = extent / gridSize;
    var cellSize = 2 * gridInc;

    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        var x = MIN_EXTENT + gridInc*i;
        var y = MIN_EXTENT + gridInc*j;
        
        var env = new jsts.geom.Envelope(x, x+cellSize, y, y+cellSize);
        qtree.insert(env, env);
        inserted++;
        
        if(qtree.queryAll().length !== inserted){
          var stop;
        }
        
        //envList.add(env);
      }
    }
  };
  
  
  it('can insert a range of envelopes/items', function() {
    createGrid(NUM_ITEMS);
  });
  
  it('correctly calculates the depth',function(){
    expect(qtree.depth()).toBe(4);
  });
  
  it('correctly calculates the size',function(){
    expect(qtree.size()).toBe(121);;
  });
  
  it('can return all items in the tree',function(){
    expect(qtree.queryAll().length).toBe(121);
  });
});