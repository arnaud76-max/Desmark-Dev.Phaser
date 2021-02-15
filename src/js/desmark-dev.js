
var game = new Phaser.Game(448, 496, Phaser.AUTO);
// Création de la class  du personnage
var desmarkDev = function (game) 
{

    this.map = null;
    this.layer = null;
    this.pacman = null;

    this.safetile = 14;
    this.gridsize = 16;

    this.speed = 150;
    this.threshold = 3;

    this.marker = new Phaser.Point();
    this.turnPoint = new Phaser.Point();

    this.directions = [ null, null, null, null, null ];
    this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

    this.current = Phaser.NONE;
    this.turning = Phaser.NONE;

};
desmarkDev.prototype = 
{

    init: function () 
    {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.physics.startSystem(Phaser.Physics.ARCADE);

    },


    preload: function () 
    {
        this.load.image("mur", "asset/mur0.png","asset/mur1.png","asset/mur2.png","asset/mur3.png",
        "asset/mur4.png","asset/mur5.png", "assets/mur6.png","asset/mur7.png","asset/mur8.png","asset/mur9.png",
        "asset/mur10.png","asset/mur11.png","asset/mur12.png","asset/mur13.png","asset/mur14.png","asset/mur15.png");
        this.load.spritesheet('Desmark-Dev', 'asset/curseur.png' );
        

        

    },

create: function () 
{

    

    
    this.mur.addTilesetImage('mur');

    this.layer = this.map.createLayer('Desmark-Dev');

    this.dots = this.add.physicsGroup();

    this.map.createFromTiles(7, this.safetile, 'dot', this.layer, this.dots);

    //  The dots will need to be offset by 6px to put them back in the middle of the grid
    this.dots.setAll('x', 6, false, false, 1);
    this.dots.setAll('y', 6, false, false, 1);

    //  Pacman should collide with everything except the safe tile
    this.map.setCollisionByExclusion([this.safetile], true, this.layer);

    //  Position Pacman at grid location 14x17 (the +8 accounts for his anchor)
    this.desmarkDev = this.add.sprite((14 * 16) + 8, (17 * 16) + 8, 'Desmark-Dev', 0);
    this.desmarkDev.anchor.set(0.5);
    this.desmarkDev.animations.add('munch', [0, 1, 2, 1], 20, true);

    this.physics.arcade.enable(this.desmarkDev);
    this.desmarkDev.body.setSize(16, 16, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.desmarkDev.play('munch');
    this.move(Phaser.LEFT);

},
}
